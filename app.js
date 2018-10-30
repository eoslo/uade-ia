var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var payrollJob = require('./api/jobs/payroll');
var indexRouter = require('./routes/index');
var clientRouter = require('./routes/client');
var employeeRouter = require('./routes/employee');
var updateRouter = require('./routes/update');
var billingRouter = require('./routes/billing');
var payrollRouter = require('./routes/payroll');

var app = express();

//Setting up MongoDB Database Connection
var mongoDB = 'mongodb://testing:uadeia2018@ds145043.mlab.com:45043/uade-ia';
mongoose.connect(mongoDB, { useNewUrlParser: true });
require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'mysupersecretkey', resave:false, saveUnitiliazed:false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/vendor', express.static(__dirname + '/public/vendor'));
app.use('/js', express.static(__dirname + '/public/js'));

app.use('/', indexRouter);
app.use('/client', clientRouter);
app.use('/update', updateRouter);
app.use('/employee', employeeRouter);
app.use('/billing', billingRouter);
app.use('/billing', payrollRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


//Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Getting the default connection
var db = mongoose.connection;

//Bind connection to error event (to track Database connection errors)
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));
payrollJob;
module.exports = app;
