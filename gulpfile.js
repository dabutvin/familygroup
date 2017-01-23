var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');

gulp.task('styles', function() {
    gulp.src(['app.less'])
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('output'));
});

gulp.task('watch', function() {
    gulp.watch('app.less', function(event) {
        gulp.run('styles');
    });
});

gulp.task('default', function() {
    gulp.run('styles');
});
