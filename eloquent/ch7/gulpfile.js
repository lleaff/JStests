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

var mainJs = 'all.js';

/* =Tasks
 * ------------------------------------------------------------ */

gulp.task('default', function() {

});

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
		.pipe(gulp.dest(paths.build));
});
});
