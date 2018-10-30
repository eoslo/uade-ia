var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', loggedIn ,function (req, res, next) {
    res.redirect('/employees');
});

router.get('/login', notLoggedIn, function (req, res, next) {
    res.render('login');
});

router.get('/logout', loggedIn, function(req, res){
    req.logout();
    res.redirect('/login');
});

router.get('/register', notLoggedIn, function (req, res, next) {
    res.render('register');
});

router.get('/employees', loggedIn, function (req, res, next) {
    res.render('employees', {user: req.user});
});

router.get('/updates', loggedIn, function (req, res, next) {
    res.render('updates', {user: req.user});
});

router.post('/signup', notLoggedIn, passport.authenticate('local.signup'), function(req, res) {
    res.status(200);
    res.send({});
});

router.post('/signin', notLoggedIn, passport.authenticate('local.signin'), function(req, res) {
    if(req.isAuthenticated()){
        res.status(200);
        res.send({});
    } else{
        res.status(404);
        res.send({});
    }
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
