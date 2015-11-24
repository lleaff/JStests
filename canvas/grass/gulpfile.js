var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat'); // sourcemaps

var babel = require('gulp-babel'); // sourcemaps

/*------------------------------------------------------------*/

var dirSrc  = './src/';
var dirDist = './dist/';
var libsDir = '../../libs/';

var jsFiles = [
	'!(main)*.js',
	'main.js'
].map(function(a) { return dirSrc + '**/' + a; });

var otherFiles = [
	'*.!(js)*'
].map(function(a) { return dirSrc + '**/' + a; });


/*------------------------------------------------------------*/

gulp.task('default', ['build']);

gulp.task('build', ['jsLibs', 'js', 'otherFiles']);

gulp.task('otherFiles', function () {
	return gulp.src(otherFiles)
		.pipe(gulp.dest(dirDist));
});

gulp.task('js', function () {
	return gulp.src(jsFiles)
		.pipe(sourcemaps.init())
			.pipe(concat('all.js'))
			.pipe(babel())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dirDist));
})

gulp.task('jsLibs', function () {
	return gulp.src(libsDir + '*.js')
		.pipe(gulp.dest(dirDist + 'libs'));
});

gulp.task('watch', function () {
	gulp.watch(jsFiles, ['js']);
	gulp.watch(otherFiles, ['otherFiles']);
});
