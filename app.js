var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var logger = require('morgan');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const axios = require('axios');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const logger = require("./config/logger");


var app = express();
// mongoose.connect('mongodb://localhost/student', { useNewUrlParser: true });


//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

//logger.error("Testing logger");
//logger.error("Testing logger 1");
//logger.info("Testing logger");

console.log("Markani");
console.log("Grana 1")
console.log("Grana 1 opet")
console.log("Grana 1 opet opet")
console.log("Sada isprobavamo cherry pick");

console.log("SAD CE STASH");

