var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel'); // sourcemaps

var merge = require('merge-stream');
var debug = require('gulp-debug');

//------------------------------------------------------------
var concat = (a, b) => a.concat(b);

var paths = {};
paths.srcDir = 'src/';
paths.destDir = 'dist/';
paths.sourcemaps = 'sourcemaps/';

var toSrc = concat.bind(null, paths.srcDir);

paths.other = [''].map(toSrc);
paths.js = ['**.js'].map(toSrc);
paths.jsLibs = ['lib/**.js'].map(toSrc);
paths.html = ['**.html'].map(toSrc);
paths.css = ['**.css'].map(toSrc);

var cfg = {};
cfg.babel = {
  presets: [ "es2015"]
};

//------------------------------------------------------------

gulp.task('default', ['build']);

gulp.task('build', ['js', 'html', 'css'], function() {
  return gulp.src(paths.other)
    .pipe(gulp.dest(paths.destDir));
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.destDir));
});

gulp.task('js', function() {
  var appJs = gulp.src(paths.js)
    .pipe(sourcemaps.init())
        .pipe(babel(cfg.babel))
    .pipe(sourcemaps.write(paths.sourcemaps));

  var libJs = gulp.src(paths.jsLibs, {base: paths.srcDir});

  return merge(appJs, libJs)
    .pipe(gulp.dest(paths.destDir));
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write(paths.sourcemaps))
    .pipe(gulp.dest(paths.destDir));
});

gulp.task('watch', ['build'], function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.css, ['css']);
});
