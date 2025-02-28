/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/server');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'splash')));

app.use('/users', usersRouter);

// error handler
app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  //   // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
