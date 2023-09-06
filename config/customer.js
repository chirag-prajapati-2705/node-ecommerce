const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");
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
    let customer = await Customer.findOne({id: jwtPayload.sub});
    if (customer) {
        return done(null, customer);
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

router.post('/customer-login', async (req, res) => {
    const {email, password} = req.body;
    const customer = await Customer.findOne({email});
    const validatePassword = await bcrypt.compare(password, customer.password)

    if (customer && validatePassword) {
        const token = generateToken(customer);
        res.json({token});
    } else {
        res.status(401).json({message: 'Authentication failed'});
    }
});

router.get('/customer-profile/', authenticateJWT, (req, res) => {

    console.log(req.user);
    res.json({message: 'You have access to this protected route.', customer: req.user});
});

module.exports = router;
