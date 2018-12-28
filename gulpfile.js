const gulp = require('gulp');
const deleteFiles = require('gulp-rimraf');
const replaceHTML = require('gulp-html-replace');
const minifyHTML = require('gulp-minify-html');
const minifyJS = require('gulp-terser');
const minifyJSON = require('gulp-jsonminify');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const zip = require('gulp-zip');
const size = require('gulp-size');
 
const paths = {
  src: {
      html: 'src/index.html',
      js: 'src/js/**.js',
      lib: 'src',
      json: 'src/data/**.json',
      img: 'src/img/**'
  },
  dist: {
      dir: 'dist',
      js: 'script.min.js',
      img: 'dist/img'
  }
};

gulp.task('cleanDist', () => {
  return gulp.src('dist/**/*', { read: false })
    .pipe(deleteFiles());
});

gulp.task('buildHTML', () => {
  return gulp.src(paths.src.html)
    .pipe(replaceHTML({
      js: paths.dist.js
    }))
    .pipe(minifyHTML())
    .pipe(gulp.dest(paths.dist.dir));
});

gulp.task('buildJSON', () => {
  return gulp.src(paths.src.json)
    .pipe(minifyJSON())
    .pipe(gulp.dest(paths.dist.dir));
});

gulp.task('buildJS', () => {
  return gulp.src(paths.src.js)
    .pipe(concat(paths.dist.js))
    .pipe(minifyJS())
    .pipe(gulp.dest(paths.dist.dir));
});

gulp.task('copyLibraries', () => {
  return gulp.src([`${paths.src.lib}/kontra.min.js`, `${paths.src.lib}/TinyMusic.min.js`])
    .pipe(gulp.dest(paths.dist.dir));
})

gulp.task('optimizeImages', () => {
  return gulp.src(paths.src.img)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.img));
});

gulp.task('zip', () => {
  gulp.src('zip/*')
    .pipe(deleteFiles());

  return gulp.src(`${paths.dist.dir}/**`)
    .pipe(zip('dominion-melee.zip'))
    .pipe(gulp.dest('zip'))
    .pipe(size())
});

gulp.task('build', gulp.series(
  'cleanDist',
  gulp.parallel('buildHTML', 'buildJS', 'buildJSON', 'copyLibraries', 'optimizeImages'/*, 'optimizeImages'*/),
  'zip'
));