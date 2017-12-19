var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    minifyCSS  = require('gulp-minify-css'),
    uglify     = require('gulp-uglify'),
    rename     = require("gulp-rename"),
    spritesmith = require('gulp.spritesmith'),
    imageResize = require('gulp-image-resize');
gulp.task('concat', function() {
    return gulp.src('./vendor/*/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('minify-css',['concat'], function() {
  return gulp.src('./build/css/all.css')
    .pipe(minifyCSS({
       keepBreaks: true,
    }))
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".css";
    }))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('fonts-move',function(){
    return gulp.src('./vendor/*/fonts/*.*')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./build/fonts'));
})

gulp.task('uglify', function() {
    return gulp.src(['./vendor/jquery/js/*.js','./vendor/bootstrap/js/*.js','./vendor/select/js/*.js','./vendor/theme/js/*.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('webp-move',function(){
    return gulp.src('./img/*.webp')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./build/img'));
});

gulp.task('resize-icon', function resize () {
return gulp.src('./img/flag/new/*.png')
    .pipe(imageResize({width: 50, height: 50}))
    .pipe(gulp.dest('./img/flag/new_resize/'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('./img/flag/new_resize/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    padding: 5
  }));

  return spriteData.pipe(gulp.dest('./vendor/build/css/'));
});

gulp.task('sprite-move',function(){
    return gulp.src('./vendor/build/css/*.png')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('default',['resize-icon','sprite','minify-css','fonts-move','uglify','webp-move','sprite-move']);