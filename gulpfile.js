var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');

gulp.task('compileLess', function () {
  return gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/css/'));
});

gulp.task('default', ['watch']);
gulp.task('watch', function() {
  gulp.watch('less/*.less', ['compileLess']);
});