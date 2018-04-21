var gulp = require('gulp');

var componentsDevPath = 'marquee/src/components/ion-marquee';

gulp.task('copy2src',function () {
    return gulp.src(
        [componentsDevPath+'/**/*']
    ).pipe(gulp.dest('src'))
});

gulp.task('copy-scss',function () {
    return gulp.src(
        ['src/*.scss']
    ).pipe(gulp.dest('dist'))
});