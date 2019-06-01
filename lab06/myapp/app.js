// 1) Dependencies.
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var gradesRouter = require('./routes/grades');

// 2) Initialization 
var app = express();

// 3) Setup / Configuration 
app.set('views', path.join(__dirname, 'views'));

// 4) Middlewares 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// 5) Routing
app.use('/', indexRouter);
app.use('/grades', gradesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.json({status: 404, error: "route not found"});
});

// 6) Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 7) Boot Application
app.listen(3000, () => console.log("Listening on port 3000"));
