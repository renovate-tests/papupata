const gulp = require('gulp'),
  gulpClean = require('gulp-clean'),
  gulpTS = require('gulp-typescript')

const tsProject = gulpTS.createProject('tsconfig.json')

function clean() {
  return gulp.src('dist/*', {read: false})
    .pipe(gulpClean())
}

function ts() {
  return gulp.src('src/**/*')
    .pipe(tsProject())
    .pipe(gulp.dest('dist'))
}

exports.default = gulp.series(clean, ts)
