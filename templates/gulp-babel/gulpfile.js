var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel'); // sourcemaps

//------------------------------------------------------------
var concat = (a, b) => a.concat(b);

var paths = {};
paths.srcDir = 'src/';
paths.destDir = 'dist/';
paths.sourcemaps = 'sourcemaps/';

var toSrc = concat.bind(null, paths.srcDir);

paths.other = [''].map(toSrc);
paths.js = ['**.js'].map(toSrc);
paths.html = ['**.html'].map(toSrc);

//------------------------------------------------------------

gulp.task('default', ['build']);

gulp.task('build', ['js', 'html'], function() {
  return gulp.src(paths.other)
    .pipe(gulp.dest(paths.destDir));
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.destDir));
});

gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
        .pipe(babel())
    .pipe(sourcemaps.write(paths.sourcemaps))
    .pipe(gulp.dest(paths.destDir));
});

gulp.task('watch', ['build'], function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['html']);
});
