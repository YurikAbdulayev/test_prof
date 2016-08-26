var gulp = require('gulp'),
	sass = require('gulp-sass'),
	cssnano = require('gulp-cssnano'),
	autoprefixer = require('autoprefixer'),
	postcss = require('gulp-postcss'),
	rename = require('gulp-rename');

gulp.task('css', function() {
	var processors = [
		autoprefixer({browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7']}),
	];

	return gulp.src('sass/**/*.sass')
		.pipe(sass())		
		.pipe(postcss(processors))
		.pipe(gulp.dest('css'));
});

gulp.task('min', ['css'], function() {
	return gulp.src('css/main.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('css'))
});

gulp.task('watch', ['min'], function() {
	gulp.watch('sass/**/*.sass', ['css', 'min']);
});