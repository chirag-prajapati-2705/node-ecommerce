require("./config/database");
//const passport = require("./config/passport");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

dotenv.config();
//model binding
require("./models/category");
require("./models/customer");
require("./models/products");
require("./models/cart");

//middleware
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use(session({secret: "custom-session",resave: true,saveUninitialized: true,}));
app.use(passport.initialize());
app.use(passport.session());

const passportConfiguration = require("./config/passport");
app.use("/auth", passportConfiguration);
const customerAuthConfiguration = require("./config/customer");
app.use("/", customerAuthConfiguration);



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







