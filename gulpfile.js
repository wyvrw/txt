var gulp = require('gulp');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default', function () {
	return gulp.src('tests')
	.pipe(mocha());
});

gulp.task('release', ['default'], function () {
	return gulp.src('src/txt.js')
	.pipe(gulp.dest('./'))
	.pipe(uglify({ preserveComments: 'some' }))
	.pipe(rename('txt.min.js'))
	.pipe(gulp.dest('./'));
});
