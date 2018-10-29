var express = require('express');
var router = express.Router();
var clientMock = require('../mock/clientMock');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var client = new clientMock('Lucio', new Date().getDate(), '27302434','active');
    res.send(client);
});

router.post('/signup', notLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}))

function notLoggedIn(req, res, next) {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
