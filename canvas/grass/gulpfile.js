var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat'); // sourcemaps
//var order = require('gulp-order');
var R = require('ramda');

var babel = require('gulp-babel'); // sourcemaps

var debug = require('gulp-debug');

/* =Utilities
 *------------------------------------------------------------*/

/**
 * String a => a -> (a -> a) -> a
 * Negate glob if 'str' begins by !!!
 * @param fn - String a => a -> a
 */
var negateMaybe = R.curry(function (str, fn) {
  if (str.substr(0, 3) === '!!!')
    return '!' + fn(str.slice(3));
  else
    return fn(str);
});

/*------------------------------------------------------------*/

var dirSrc  = './src/';
var dirDist = './dist/';
var libsDir = '../../libs/';

var srcGlob = R.concat(dirSrc);

var jsFiles = [
	'utils.js',
	'!(main)*.js',
	'main.js',
  '!!!flycheck_*' /* emacs tmp files */
].map(a => negateMaybe(a, R.concat(srcGlob('**/'))));

var otherFiles = [
	'*.!(js)*'
].map(a => negateMaybe(a, R.concat(srcGlob('**/'))));


/*------------------------------------------------------------*/

gulp.task('default', ['build']);

gulp.task('build', ['jsLibs', 'js', 'otherFiles']);

gulp.task('otherFiles', function () {
	return gulp.src(otherFiles)
		.pipe(gulp.dest(dirDist));
});

gulp.task('js', function () {
	return gulp.src(jsFiles)
	  //.pipe(debug())
		.pipe(sourcemaps.init())
			.pipe(concat('all.js'))
			.pipe(babel())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dirDist));
});

gulp.task('jsLibs', function () {
	return gulp.src(libsDir + '*.js')
		.pipe(gulp.dest(dirDist + 'libs'));
});

gulp.task('watch', function () {
	gulp.watch(jsFiles, ['js']);
	gulp.watch(otherFiles, ['otherFiles']);
});
