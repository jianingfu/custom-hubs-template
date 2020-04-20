const gulp = require('gulp');
const texturePacker = require('gulp-free-tex-packer');
 
gulp.task('default', function() {
    return gulp.src('src/**/*.*')
        .pipe(texturePacker({
            textureName: "atlas",
            width: 10000,
            height: 10000,
            fixedSize: true,
            padding: 0,
            allowRotation: false,
            detectIdentical: false,
            allowTrim: false,
            exporter: "Pixi",
            removeFileExtension: true,
            prependFolderName: true,
            scale: 0.1
        }))
    .pipe(gulp.dest('dest/'));
});