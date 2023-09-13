const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");


const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    await User.findById(id).then(function (user) {
        done(null, user);
    })
});

passport.use('user-local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: true
    }, async function (email, password, done) {
        let user = await User.findOne({email: email});
        if (!user) {
            //return done(null, false,{ message: 'bad password' });
            console.log('user does not found');
            return done(null, false, {message: 'Invalid username or password'});
        }
        let validatePassword = await bcrypt.compare(password, user.password)
        if (!user || !validatePassword) {
            console.log('Yesssdddddd');
            return done(null, false, {message: 'bad password'});
        }
        return done(null, user);
    }
));

router.get('/login', function (req, res, next) {
    res.json({message: "login page"});
});

const sendError = (err, res) => res.status(500).json({err: err.toString()});

// router.post('/login', passport.authenticate('user-local', {failureMessage: true,failureRedirect: '/auth/login'}), function (req, res) {
//
//     res.redirect('/auth/profile');
// });
//router.post('/login',passport.authenticate('user-local', { successRedirect: '/',failureRedirect: '/auth/login',failureFlash: true }));

router.post('/login', (req, res, next) => {
    passport.authenticate('user-local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // Authentication failed, return an error response
            return res.status(401).json({message: 'Invalid username or password'});
        }

        // Authentication successful, log the user in
        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            // Return a success response or redirect as needed
            return res.json({message: 'Login successful', user}); // You can customize the response format
        });
    })(req, res, next);
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({message: "User is not authenticated!"});
}

router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/profile', isLoggedIn, function (req, res, next) {
    res.json({message: "You have been successfully Login!", user: req.user});
});


module.exports = router;
