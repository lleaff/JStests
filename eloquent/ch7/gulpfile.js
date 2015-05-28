var gulp = require('gulp');
var merge = require('merge-stream');
var order = require('gulp-order');
var concat = require('gulp-concat'); /* sourcemaps */
var uglify = require('gulp-uglify'); /* sourcemaps */
var sourcemaps = require('gulp-sourcemaps'); /* sourcemaps */
var insert = require('gulp-insert');
var replace = require('gulp-replace');
var minifyCss = require('gulp-minify-css');

var debug = require('gulp-debug'); /* DEBUG */

var package = require('./package.json');

/* =Variables
 * ------------------------------------------------------------ */
var paths = {
	source: './src',
	build: './build',
};

package.pretty = {
	name: package.name.replace('-',' '),
	author: package.author,
};

var mainJs = 'all.js';

/* =Tasks
 * ------------------------------------------------------------ */

gulp.task('default', function() {

});

gulp.task('deploy', ['build', 'license']);

gulp.task('build', ['js', 'css', 'html']);

gulp.task('js', function() {
	var jsfolder = paths.source+'/js/';
	var jsFilenames = [
		'miscHelperFunctions.js',
		'vector.js',
		'grid.js',
		'world.js',
		'world_directions.js',
		'world_perception.js',
		'world_logic.js',
		'ai.js',
		'color.js',
		'legend.js',
		'plans.js',
		'animate.js',
		'main.js'
	];

	return merge (
		gulp.src([jsfolder+'*.js',
				 '!'+jsfolder+'main.js',
				 '!'+jsfolder+'test*']),
		gulp.src(jsfolder+'main.js')
			.pipe(insert.append('main()')))
			.pipe(order(jsFilenames.map(
				function(filename) { return '**/'+filename; })))
			.pipe(sourcemaps.init())
				.pipe(concat(mainJs))
				.pipe(uglify())
			.pipe(sourcemaps.write('../sourcemaps'))
			.pipe(gulp.dest(paths.build));
});

gulp.task('css', function() {
	return gulp.src(paths.source+'/*css')
		.pipe(minifyCss())
		.pipe(gulp.dest(paths.build));
});

gulp.task('html', function() {
	return gulp.src(paths.source+'/*html')
		.pipe(replace('$Title', package.pretty.name))
		.pipe(replace('scriptManager.js', mainJs))
		.pipe(gulp.dest(paths.build));
});

gulp.task('license', function() {
	var copyrightText =
		"Copyright "+new Date().getFullYear()+" "+
		package.pretty.author+"\n";
	var licenseText =
		"This file is part of "+package.pretty.name+".\n\n"+package.pretty.name+" is free software: you can redistribute it and/or modify\nit under the terms of the GNU General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\n"+package.pretty.name+" is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU General Public License for more details.\n\nYou should have received a copy of the GNU General Public License\nalong with "+package.pretty.name+".  If not, see <http://www.gnu.org/licenses/>.\n";

	var headerText = copyrightText + licenseText;

	return merge(
		gulp.src(paths.build+'/*.js')
			.pipe(insert.prepend(commentString(headerText, "js"))),
		gulp.src(paths.build+'/*.css')
			.pipe(insert.prepend(commentString(headerText, "css"))),
		gulp.src(paths.build+'/*.html')
			.pipe(insert.prepend(commentString(headerText, "html")))
	).pipe(gulp.dest(paths.build));

});

/* Helper functions
 * ------------------------------------------------------------ */
function commentString(string, fileType) {
	var tags = {
		html:	['<!--', '-->'],
		css:	['/*', '*/'],
		js:		['/*', '*/']
	};
	return tags[fileType][0]+' '+string+' '+tags[fileType][1];
}
