require('./config/database')
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

//model binding
require("./models/category");
require("./models/customer");
require("./models/products.js");
require("./models/cart.js");


//middleware
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

dotenv.config();


app.get("/", (req, res) => {
  res.json({'message':'Connected with the API'})
});

//Users Route


app.listen(process.env.PORT, () => {
  console.log(`This is the port Number ${process.env.PORT}`);
});

const category = require('./controllers/categoryController')
const users = require('./controllers/usersController')
const customer = require('./controllers/customerController')
const product = require('./controllers/productController')
const cart = require('./controllers/CartController')

app.use('/users',users);
app.use('/categories',category);
app.use('/customer',customer);
app.use('/product',product);
app.use('/cart',cart);