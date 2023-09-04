const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const customer = require("../models/customer");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
// This is the basic express session({..}) initialization.
app.use(passport.initialize());
// init passport on every route call.
app.use(passport.session());
// allow passport to use "express-session".

passport.use(
  new LocalStrategy(function (username, password, done) {
    customer.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function (email, done) {
  done(null, customer.id);
});

passport.deserializeUser(function (id, done) {
  customer.findById(id, function (err, customer) {
    done(err, customer);
  });
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);
