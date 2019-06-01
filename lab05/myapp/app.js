var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var test2Router = require('./routes/test2');

var app = express();

//---------------My Settings---------------
app.disable('x-powered-by');

app.set('trust proxy', true);
app.enable('trust proxy');

app.enable('case sensitive routing');

app.enable('strict routing');

app.set('etag', 'strong');  

//-----------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// Apparently there is a bug with "strict routing" when using app.use(), 
// it only works when I use app.get()
app.use('/users', usersRouter);
app.use('/users/', test2Router);
app.use('/Users', testRouter);

// app.get('/users', function(req, res, next) {
//   res.send('strict routes works no slash');
// });

// app.get('/users/', function(req, res, next) {
//   res.send('strict routes works with');
// });

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
