import gulp from 'gulp';
import webpack from 'webpack';
import gulpUtil from 'gulp-util';
import path from 'path';
import jade from 'gulp-jade';
import sass from 'gulp-sass';

const PATHS = {
  src: 'app',
  html: ['app/*.html', 'app/*/*.html'],
  dist: 'dist/',
  js: ['app/*.js', 'app/*/*.js'],
  all_sass: ['app/styles/*.scss', 'app/styles/*/*.scss'], //scss watch的文件
  module_sass: 'app/styles/*.scss', //scss相应的模块文件
  module_js: {app:'./app/app.js', index:'./app/inde.js'}, //页面对应的js文件

};

gulp.task('sass', function(){
  gulp.src(PATHS.module_sass, {base: PATHS.src})
    .pipe(sass())
    .pipe(gulp.dest(PATHS.dist));
});
gulp.task("copy", function(){
  gulp.src(PATHS.html)
    .pipe(gulp.dest(PATHS.dist));
});
//for production build
gulp.task("build", function(){

});

//for devlopment build
gulp.task("serve",[
  'sass',
  'webpack',
  'watch'
]);
gulp.task("webpack", ['copy'], function(){
  webpack({
    entry: PATHS.module_js,
    output: {
      path: path.join(__dirname, '/dist'),
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
  }, function(err){
    if(err) throw new gulpUtil.PluginError("webpack", err);
  });
});

gulp.task('watch', function(){
  gulp.watch(PATHS.js, ['webpack']);
  gulp.watch(PATHS.all_sass, ['sass']);
});
