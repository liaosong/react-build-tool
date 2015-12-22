import gulp from 'gulp';
import webpack from 'webpack';
import gulpUtil from 'gulp-util';
import path from 'path';
import jade from 'gulp-jade';
import sass from 'gulp-sass';
import express from 'express';
import livereload from 'gulp-livereload';
import proxy from 'proxy-middleware';
import logger from 'morgan';
import url from 'url';


const PROXY_URL = 'http://127.0.0.1:4000/api';
const UPLOAD_URL= 'http://127.0.0.1:4000/uploads';
const PATHS = {
  src: 'app',
  html: ['app/*.html', 'app/*/*.html'],
  dist: 'dist/',
  js: ['app/js/*.js', 'app/js/*/*.js', 'app/js/*.jsx', 'app/js/*/*.jsx', 'app/js/*/*/*/*.js'],
  all_sass: ['app/styles/*.scss', 'app/styles/*/*.scss'], //scss watch的文件
  module_sass: 'app/styles/*.scss', //scss相应的模块文件
  module_js: {index:'./app/js/index.js',
    company_list: './app/js/company_list.js',
    company_show: './app/js/company_show.js',
    user_home: './app/js/user_home.js',
    company_home: './app/js/company_home.js',
    user_register: './app/js/user_register.js',
    company_register: './app/js/company_register.js'
  }, //页面对应的js文件
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
          loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0',
          exclude: /node_modules/
        }
      ]
    }
  }, function(err, stats){
    if(err) throw new gulpUtil.PluginError("webpack", err);
    var jsonStats = stats.toJson();
    if(jsonStats.errors.length > 0) {
      console.error(jsonStats.errors.join('\n\r'));
    }
    if(jsonStats.warnings.length > 0)
      console.log(jsonStats.warnings);

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

  var router = express.Router();

  app.set('views', path.join(__dirname, 'dist'));
  app.engine('.html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use("/js", express.static("dist/js"));
  app.use("/styles", express.static("dist/styles"));
  app.use("/images", express.static("dist/images"));
  app.use("/partials", express.static("dist/partials"));
  app.use("/fonts", express.static("dist/fonts"));


  app.use(logger('dev'));
  var proxyOptions = url.parse(PROXY_URL);
  proxyOptions.route = '/api';
  app.use(proxy(proxyOptions));

  var uploadsOptions = url.parse(UPLOAD_URL);
  uploadsOptions.route = '/uploads';
  app.use(proxy(uploadsOptions));



  router.get('/', function(req, res){
    var user = {"_id":"55e450bfa02797ea0448b171","__v":0,"status":"normal","volume":0,"created_at":"2015-08-31T13:03:59.124Z","city":"","role":"system","salt":"105790163844","hashed_password":"d9f48810cafca7c591127d6f62dbf9cd230c93fc","phone_number":"18782972908","username":"","avatar":"uploads/image-1437896764820aa.jpg","email":"","name":"廖小松"};

    res.render('index',{user: undefined});
  });

  router.all('/user_home/*', function(req, res){
    var user = {"_id":"55e450bfa02797ea0448b183","status":"normal","volume":0,"created_at":"2015-08-31T13:03:59.153Z","phone_number":"17131338013","username":"","avatar":"","email":"","name":"流浪的鱼"};

    res.render('user_home',{user: user});
  })
  router.all('/company_home/*', function(req, res){
    var user = { "_id" : "55e450bfa02797ea0448b174", "volume" : 0, "created_at" : "2015-08-31T13:03:59.142Z", "city" : "", "role" : "company", "salt" : "591103770255", "hashed_password" : "1eab2efa5a5b4fd78dc27b7a1cfc6e7e2bb4342e", "phone_number" : "15928124305", "username" : "", "avatar" : "uploads/image-1437896764820aa.jpg", "email" : "", "name" : "马永旭", "__v" : 0 };
    var company = {"_id":"55e450bfa02797ea0448b1a7","owner":"55e450bfa02797ea0448b174","coordinate":[95,40],"__v":3,"keywords":["test","啊啊","发生地方，ss"],"tel":"xxx","email":"xxx","contacts":"xxx","status":"normal","area":"武侯区","city":"成都市高新区世纪城路新会展中心","province":"","created_at":"2015-08-31T13:03:59.336Z","company_img":"uploads/1450754497620dGVzdA==.jpg","company_logo":"uploads/1450754487784cHNi.jpeg","_description":"test","phone_number":"","address":"成都市高新区世纪城路新会展中心","company_address":"成都市高新区世纪城","services_type":["展位设计","制作搭建","广告制作","展具租赁","AV租赁","植物租摆","设备租赁","篷房展具租赁","物流"],"services":["开锁","搭积木","喷绘","策划","广告制作","你倒是"],"category":["会议","展览","活动"],"type":"full","is_in_limit":false,"score":2,"calls_count":77,"visited_count":8835,"name":"普锐斯会展服务公司"};
    res.render('company_home',{user: user, company: company});
  })
  router.get('/user/register', function(req, res){
    res.render('register', {type: 'user'});
  });
  router.get('/company/register', function(req, res){
    var company = {"_id":"5661032ac4bf605df8d5c738","owner":"5661032ac4bf605df8d5c737","__v":0,"email":"","contacts":"","status":"unfinished","area":"","city":"","province":"","created_at":"2015-12-04T03:06:18.863Z","company_img":"","_description":"","phone_number":"","address":"","company_address":"","services_type":[],"services":[],"category":[],"type":"junior","is_in_limit":true,"score":0,"calls_count":0,"visited_count":1,"name":""};
    res.render('company_register', {company: company});
  });
  app.use('/', router);


  app.listen(9001);
});
