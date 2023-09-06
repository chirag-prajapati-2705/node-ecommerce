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

passport.use('user-local', new LocalStrategy({usernameField: 'email', passwordField: 'password', session: true},async function (email, password, done) {
        let user = await User.findOne({email: email});
        let validatePassword = await bcrypt.compare(password,user.password)
        if (!user || !validatePassword) {
            return done(null, false);
        }
        return done(null, user);
    }
));

router.get('/login', function (req, res, next) {
    res.json({message: "login page"});
});


router.post('/login', passport.authenticate('user-local', {failureRedirect: '/auth/login'}), function (req, res) {

    res.redirect('/auth/profile');
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