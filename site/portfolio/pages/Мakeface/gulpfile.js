const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// Задача для запуска сервера
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        browser: 'chrome'
    });

    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('css/*.css').on('change', browserSync.reload);
    gulp.watch('js/*.js').on('change', browserSync.reload);
});

// Задача по умолчанию
gulp.task('default', gulp.series('serve'));
