import gulp from 'gulp';
import webpack from 'webpack';
import gulpUtil from 'gulp-util';
import path from 'path';



//for production build
gulp.task("build", function(){

});

//for devlopment build
gulp.task("serve", function(){
  webpack({
    entry: "./app/app.js",
    output: {
      path: path.join(__dirname, '/dist'),
      filename: "app.js"
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
    // gulpUtil.log("[webpack]", status.toString());
  });
});
