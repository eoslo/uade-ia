var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', loggedIn ,function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/login', notLoggedIn, function (req, res, next) {
    res.render('login');
});

router.get('/register', notLoggedIn, function (req, res, next) {
    res.render('register');
});

router.post('/signup', notLoggedIn, passport.authenticate('local.signup'), function(req, res) {
    res.redirect('/login');
});

router.post('/signup', notLoggedIn, passport.authenticate('local.signin'), function(req, res) {
    res.redirect('/');
});

function notLoggedIn(req, res, next) {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function loggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;
