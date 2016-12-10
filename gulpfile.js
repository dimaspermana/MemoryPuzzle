"use strict"

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
 	return gulp.src("css/style.scss")
		.pipe(sass.sync().on("error", sass.logError))
		.pipe(gulp.dest("./css/"));
});

gulp.task("watch", function() {
	gulp.watch("css/style.scss", ["sass"]);
});

gulp.task("default", ["sass"]);

