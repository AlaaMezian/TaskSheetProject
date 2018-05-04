//authorization token
var config = require('../../config/main');
var User = require('../../models/').user

var LocalStrategy = require('passport-local').Strategy;
var response = require('./responseObject');
var passport = require ('passport')
    
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (user) {
        if (user) {
            done(null, user.get());
        }
        else {
            done(user.errors, null);
        }
    });
});

passport.use('local-login', new LocalStrategy(
    {

        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    function (req ,email,password,done ) {
        if (!req.body.email || !req.body.password) {
            console.log(done);
            return done(null , flase ,{message : "username and password are required "})
        } else {
            User
                .findOne(
                {
                    where: {
                        email: req.body.email
                    }
                })
                .then((user) => {
                    if (!user) {
                      return done(null , false , {message :"Email Does not exist"})
                    } else {
                        user.comparePasswords(req.body.password, function (error, isMatch) {
                            if (isMatch && !error) {
                                var userinfo = user.get();
                                console.log(userinfo);
                                //this will return the user object 
                                return done(null, userinfo);

                            } else {
                                return done(null, false, { message: 'Incorrect password.' });
                            }
                        })
                    }

                });
              }
            })

        )





