var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', !notLoggedIn, function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/login', notLoggedIn, function (req, res, next) {
    res.render('login');
});

router.get('/', function (req, res, next) {
    res.render('register');
});

router.post('/signup', notLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));

function notLoggedIn(req, res, next) {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;
