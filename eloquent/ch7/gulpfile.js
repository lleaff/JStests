var gulp = require('gulp');
var merge = require('merge-stream');
var order = require('gulp-order');
var concat = require('gulp-concat'); /* sourcemaps */
var uglify = require('gulp-uglify'); /* sourcemaps */
var sourcemaps = require('gulp-sourcemaps');
var insert = require('gulp-insert');
var minifyCss = require('gulp-minify-css');

/* ------------------------------------------------------------ */
var srcD = './src';
var buildD = './build';

gulp.task('default', function() {

});

gulp.task('build', ['js', 'css', 'html']);

gulp.task('js', function() {
	var jsfolder = srcD+'/js/';
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
				.pipe(concat('all.js'))
				.pipe(uglify())
			.pipe(sourcemaps.write('maps'))
			.pipe(gulp.dest(buildD));
});

gulp.task('css', function() {
	return gulp.src(srcD+'/*css')
		.pipe(minifyCss())
		.pipe(gulp.dest(buildD));
});

gulp.task('html', function() {
	return gulp.src(srcD+'/*html')
		.pipe(gulp.dest(buildD));
});
