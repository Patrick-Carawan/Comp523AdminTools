const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'user[onyen]',
    passwordField: 'user[password]',
}, (onyen, password, done) => {
    User.findOne({ onyen })
        .then((user) => {
            if(!user || !user.validatePassword(password)) {
                return done(null, false, { errors: { 'onyen or password': 'is invalid' } });
            }

            return done(null, user);
        }).catch(done);
}));