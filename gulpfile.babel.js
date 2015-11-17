import gulp from 'gulp';
import webpack from 'webpack';
import gulpUtil from 'gulp-util';
import path from 'path';
import jade from 'gulp-jade';
import sass from 'gulp-sass';
import express from 'express';
import livereload from 'gulp-livereload';



const PATHS = {
  src: 'app',
  html: ['app/*.html', 'app/*/*.html'],
  dist: 'dist/',
  js: ['app/js/*.js', 'app/js/*/*.js'],
  all_sass: ['app/styles/*.scss', 'app/styles/*/*.scss'], //scss watch的文件
  module_sass: 'app/styles/*.scss', //scss相应的模块文件
  module_js: {index:'./app/js/index.js'}, //页面对应的js文件
  img: ['./app/images/*.*', './app/images/*/*.*']

};

gulp.task('sass', function(){
  gulp.src(PATHS.module_sass, {base: PATHS.src})
    .pipe(sass())
    .pipe(gulp.dest(PATHS.dist))
    .pipe(livereload());
});
gulp.task("copy", function(){
  gulp.src(PATHS.html, {base: PATHS.src})
    .pipe(gulp.dest(PATHS.dist));
  gulp.src(PATHS.img, {base: PATHS.src})
    .pipe(gulp.dest(PATHS.dist));
});
gulp.task("copy-img", function(){
  gulp.src(PATHS.img, {base: PATHS.src})
    .pipe(gulp.dest(PATHS.dist))
    .pipe(livereload());
});
gulp.task("copy-html", function(){
  gulp.src(PATHS.html, {base: PATHS.src})
    .pipe(gulp.dest(PATHS.dist))
    .pipe(livereload());
});
//for production build
gulp.task("build", function(){

});

//for devlopment build
gulp.task("serve",[
  'sass',
  'webpack',
  'express',
  'watch'
]);
gulp.task("webpack", ['copy'], function(){
  webpack({
    entry: PATHS.module_js,
    output: {
      path: path.join(__dirname, '/dist/js/'),
      filename: '[name].js'
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        { test: /\.js|jsx$/,
          loader: 'babel-loader?presets[]=es2015&presets[]=react',
        }
      ]
    }
  }, function(err, status){
    if(err) throw new gulpUtil.PluginError("webpack", err);
  });
});

gulp.task('watch', function(){
  gulp.watch(PATHS.js, ['webpack']);
  gulp.watch(PATHS.all_sass, ['sass']);
  gulp.watch(PATHS.html, ['copy-html']);
  gulp.watch(PATHS.img, ['copy-img']);
  livereload.listen();
});

gulp.task('express', function(){
  var app = express();
  app.use("/js", express.static("dist/js"));
  app.use("/styles", express.static("dist/styles"));
  app.use("/images", express.static("dist/images"));
  app.use("/partials", express.static("dist/partials"));
  app.use("/fonts", express.static("dist/fonts"));
  app.listen(9001);
});
