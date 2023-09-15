// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const bcrypt = require("bcryptjs");
//
//
// const LocalStrategy = require("passport-local").Strategy;
// const User = require("../models/users");
//
// passport.serializeUser(function (user, done) {
//     done(null, user._id);
// });
//
// passport.deserializeUser(async function (id, done) {
//     await User.findById(id).then(function (user) {
//         done(null, user);
//     })
// });
//
// passport.use('user-local', new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password',
//         session: true
//     }, async function (email, password, done) {
//         let user = await User.findOne({email: email});
//         if (!user) {
//             //return done(null, false,{ message: 'bad password' });
//             console.log('user does not found');
//             return done(null, false, {message: 'Invalid username or password'});
//         }
//         let validatePassword = await bcrypt.compare(password, user.password)
//         if (!user || !validatePassword) {
//             console.log('Yesssdddddd');
//             return done(null, false, {message: 'bad password'});
//         }
//         return done(null, user);
//     }
// ));
//
// router.get('/login', function (req, res, next) {
//     res.json({message: "login page"});
// });
//
// const sendError = (err, res) => res.status(500).json({err: err.toString()});
//
// // router.post('/login', passport.authenticate('user-local', {failureMessage: true,failureRedirect: '/auth/login'}), function (req, res) {
// //
// //     res.redirect('/auth/profile');
// // });
// //router.post('/login',passport.authenticate('user-local', { successRedirect: '/',failureRedirect: '/auth/login',failureFlash: true }));
//
// router.post('/login', (req, res, next) => {
//     passport.authenticate('user-local', (err, user, info) => {
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             // Authentication failed, return an error response
//             return res.status(401).json({message: 'Invalid username or password'});
//         }
//
//         // Authentication successful, log the user in
//         req.logIn(user, (loginErr) => {
//             if (loginErr) {
//                 return next(loginErr);
//             }
//             // Return a success response or redirect as needed
//             return res.json({message: 'Login successful', user}); // You can customize the response format
//         });
//     })(req, res, next);
// });
//
//
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.json({message: "User is not authenticated!"});
// }
//
// router.post('/logout', function (req, res, next) {
//     req.logout(function (err) {
//         if (err) {
//             return next(err);
//         }
//         res.redirect('/');
//     });
// });
//
// router.get('/profile', isLoggedIn, function (req, res, next) {
//     res.json({message: "You have been successfully Login!", user: req.user});
// });
//
//
// module.exports = router;


const express = require("express");
const router = express.Router();
const User = require("../models/users");
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const secretKey = process.env.secretKey;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
}, async (jwtPayload, done) => {
    let user = await User.findOne({id: jwtPayload.sub});
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}));

// Middleware to protect routes with JWT authentication
const authenticateJWT = passport.authenticate('jwt', {session: false});

// Generate a JWT token for a user
function generateToken(user) {
    const payload = {id: user.id, username: user.username};
    return jwt.sign(payload, secretKey, {expiresIn: '1h'});
}

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    const validatePassword = await bcrypt.compare(password, user.password)

    if (user && validatePassword) {
        const token = generateToken(user);
        res.json({token});
    } else {
        res.status(401).json({message: 'Authentication failed'});
    }
});

router.get('/profile/', authenticateJWT, (req, res) => {
    console.log(req.user);
    res.json({message: 'You have access to this protected route.', user: req.user});
});

module.exports = router;
