var passport = require('passport');
var Client = require('../api/models/client');
var ClientService = require('../api/services/clientService');
var clientService = new ClientService();
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (client, done) {
    done(null, client._id);
});

passport.deserializeUser(function (id, done) {
    Client.findById(id, function (err, client) {
        done(err, client);
    });
})

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    clientService.createClient(username, password, req.body.name, req.body.person_type, req.body.address, req.body.cuit, req.body.iva, req.body.gross_income, req.body.pay_date, done);
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    clientService.getClientForPassport(username, password, done);
}));