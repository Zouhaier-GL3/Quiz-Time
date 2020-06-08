const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const model = require('../models/user');

var User = mongoose.model('User');

passport.use(
    new localStrategy({ usernameField: 'email' },

        (username, password, done) => {

            User.findOne({ email: username }, // select la 1ére aparence de l'email from data base

                (err, user) => {

                    if (err)

                        return done(err);

                    // unknown user

                    else if (!user)

                        return done(null, false, { message: 'Email is not registered' });

                    // wrong password

                    else if (!user.verifyPassword(password))

                       return done(null, false, { message: 'Wrong password.' });

                    // authentication succeeded

                    else

                        return done(null, user);

                });

        })

);