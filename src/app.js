
//this is the main booting point for the app
import express from 'express';  // ES6 import!
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var morgan       = require('morgan');
var fs            = require('fs');
var passport = require('passport');
var session = require('express-session');


 var hookJWTStrategy = require('../api/helpers/passport');


// var app = express();
export const app=express();

app.use(session({ secret: 'eypZAZy0CY^g9%KreypZAZy0CY^g9%Kr',resave: true, saveUninitialized:true})); // session secret

app.use(passport.initialize());

app.use(passport.session());


app.set('port', process.env.PORT || 3000);
 app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))

//logging requests to morgan
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());


//compress all responses 
app.use(compression());


//use embedded java script template engine as the template engine for the application
app.set('view engine', 'ejs');

app.set('db', require('../config/db'));

//this should be checked and changed
app.use(express.static(__dirname+ '/public'));



if (process.env.NODE_ENV === 'development') {
  // only use in development 
  app.use(errorhandler())
}


// require('../api/routes')(app, express);
// import userRouter from '../api/Routes/UserRouter';

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
// no stacktraces leaked to user unless in development environment
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});
