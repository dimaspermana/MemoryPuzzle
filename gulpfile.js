"use strict"

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
 	return gulp.src("style.scss")
		.pipe(sass.sync().on("error", sass.logError))
		.pipe(gulp.dest("./"));
});

gulp.task("watch", function() {
	gulp.watch("style.scss", ["sass"]);
});

gulp.task("default", ["sass"]);

