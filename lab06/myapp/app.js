// 1) Dependencies.
var createError = require('http-errors');
var express = require('express');
var fs = require('fs');
var logger = require('morgan');
var path = require('path');
var cors = require('cors');

var indexRouter = require('./routes/index');
var gradesRouter = require('./routes/grades');

// 2) Initialization 
var app = express();

// 3) Setup / Configuration 
app.set('views', path.join(__dirname, 'views'));
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })


// 4) Middlewares 
app.use(cors())
app.use(logger('combined', { stream: accessLogStream }))
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
});

// 7) Boot Application
app.listen(3000, () => console.log("Listening on port 3000"));
