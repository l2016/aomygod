const gulp = require('gulp'); 
const concat = require('gulp-concat');//合并文件
const cssmin = require('gulp-cssmin');//压缩css文件
const imagemin = require('gulp-imagemin');//压缩图片
const rename = require('gulp-rename');//重名民
const sass = require('gulp-sass');//将sass转成css
const uglify = require('gulp-uglify');//压缩js文件


//css任务
gulp.task('sass',function(){
	gulp.src('./src/sass/*.scss')
	.pipe(sass())
	.pipe(cssmin())
	.pipe(rename({"suffix" : ".min"}))
	.pipe(gulp.dest('./dist/css'));
})
gulp.task('js',function(){
	gulp.src('./src/js/index.js')
	.pipe(uglify())
	.pipe(rename({"suffix" : ".min"}))
	.pipe(gulp.dest('./dist/js'));
})
gulp.task('img',function(){
	gulp.src('./src/img/*.png')
	.pipe(imagemin())
	.pipe(rename({"suffix" : ".min"}))
	.pipe(gulp.dest('./dist/img'));
})
//监听
gulp.task('default',function(){
	gulp.watch('./src/js/*.js',['js']);
})
gulp.task('default',()=>{
	gulp.watch('./src/sass/*.scss',['sass']);
	
})