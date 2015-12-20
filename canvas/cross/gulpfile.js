var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel'); // sourcemaps
var sass = require('gulp-sass'); // sourcemaps
var jade = require('gulp-jade');

//------------------------------------------------------------
var concat = (a, b) => a.concat(b);

var paths = {};
paths.srcDir = 'src/';
paths.destDir = 'dist/';
paths.sourcemaps = 'sourcemaps/';

var toSrc = concat.bind(null, paths.srcDir);
var negate = concat.bind(null, '!');

paths.js = ['**.js'].map(toSrc);
paths.jade = ['**.jade'].map(toSrc);
paths.sass = ['**.scss'].map(toSrc);
paths.other = ['**'].map(toSrc)
  .concat([paths.js,
           paths.jade,
           paths.sass].map(negate));

var cfg = {};
cfg.babel = {
  presets: [ 'es2015'] 
};

//------------------------------------------------------------

gulp.task('default', ['build']);

gulp.task('build', ['js', 'jade', 'sass'], function() {
  return gulp.src(paths.other)
    .pipe(gulp.dest(paths.destDir));
});

gulp.task('jade', function() {
  return gulp.src(paths.jade)
        .pipe(jade(cfg.jade))
    .pipe(gulp.dest(paths.destDir));
});

gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
        .pipe(babel(cfg.babel))
    .pipe(sourcemaps.write(paths.sourcemaps))
    .pipe(gulp.dest(paths.destDir));
});

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
        .pipe(sass(cfg.sass))
    .pipe(sourcemaps.write(paths.sourcemaps))
    .pipe(gulp.dest(paths.destDir));
});

gulp.task('watch', ['build'], function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.sass, ['sass']);
});
