var gulp = require('gulp'),
	sass = require('gulp-sass'),
	config = require('./../gulpfile.config');

gulp.task('sass', function(){
	return gulp.src(config.mainSass)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(config.sourceSass));
})