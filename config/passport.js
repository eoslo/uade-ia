var passport = require('passport');
var Client = require('../api/models/client');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (client, done) {
    done(null, client.id);
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
}, function (req, name, password, done) {
    Client.findOne({'username': name}, function (err, client) {
        if(err){
            return done(err);
        }
        if(client){
            return done(null, false, {message:'Cliente ya existente.'});
        }
        var newClient = new Client();
        newClient.name = name;
        newClient.password = password;
        newClient.save(function (err, result) {
            if(err){
                return done(err);
            }
            return done(null, newClient);
        })
    })
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, name, password, done) {
    Client.findOne({'username': name}, function (err, client) {
        if(err){
            return done(err);
        }
        if(client){
            return done(null, client);
        }
        return done(err, false, {message: "Cliente no existente."})
    })
}));