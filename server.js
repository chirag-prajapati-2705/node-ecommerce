require("./config/database");
//const passport = require("./config/passport");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyparser = require("body-parser");

const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

//model binding
require("./models/category");
require("./models/customer");
require("./models/products");
require("./models/cart");
const routepaa = require("./config/passport");
app.use("/", routepaa);

//middleware
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

dotenv.config();

app.get("/", (req, res) => {
    res.json({message: "Connected with the API"});
});




app.post("/register", function (req, res) {
});

app.listen(process.env.PORT, () => {
    console.log(`This is the port Number ${process.env.PORT}`);
});

const category = require("./controllers/categoryController");
const users = require("./controllers/usersController");
const customer = require("./controllers/customerController");
const product = require("./controllers/productController");
const cart = require("./controllers/CartController");

app.use("/users", users);
app.use("/categories", category);
app.use("/customer", customer);
app.use("/products", product);
app.use("/cart", cart);



app.use(
    session({
        secret: "custom-session",
        resave: false,
        saveUninitialized: true,
    })
);
// This is the basic express session({..}) initialization.
app.use(passport.initialize());
// init passport on every route call.
app.use(passport.session());
// allow passport to use "express-session".

passport.serializeUser(function (customer, done) {
   // console.log('-----------customer-----------------', customer);
    done(null, customer._id);
});

passport.deserializeUser( async function (id, done) {
    // Customer.findById(id).then(function (err, customer)){
    //     done(err, customer);
    // });

    await Customer.findById(id).then(function (customer) {
        done(null, customer);
    })
});

const Customer = require("./models/customer.js");

passport.use('local', new LocalStrategy({
        usernameField: 'email', passwordField: 'password', session: false
    },
    async function (email, password, done) {
        let customers = await Customer.findOne({email: email});
        if (!customers) {
            return done(null, false);
        }
        return done(null, customers);
    }
));


app.get('/login', function (req, res, next) {
    res.json({message: "login-data"});
});


app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), function (req, res) {
    res.redirect('/profile');
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.json({message: "User is not authenticated!"});
}

app.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


app.get('/profile', isLoggedIn ,function (req, res, next) {
    res.json({message: "You have been successfully Login!",user:req.user});
});


