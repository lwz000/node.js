var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 导入路由文件
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 创建express实例
var app = express();

// 改写
var http = require('http')
var server = http.createServer(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

// 允许post请求
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 允许cookie操作
app.use(cookieParser());

// 静态资源
app.use(express.static(path.join(__dirname, 'public')));

// 将路由文件挂载到实例
app.use('/', indexRouter);
app.use('/users', usersRouter);


server.listen('3380', () => {
  console.log('正在运行 http://localhost:3380');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
