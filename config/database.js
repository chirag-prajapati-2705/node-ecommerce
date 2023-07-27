// const mongoose = require('mongoose');
// // Connection URL and database name
//  const url = 'mongodb://localhost:27017/node-ecommerce';
// //const url = 'mongodb+srv://chiragp:1CiciqDnH3rvuTHB@cluster0.d4sdsxv.mongodb.net/node-ecommerce'

// // Connect to MongoDB
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// // Get the default connection
// const db = mongoose.connection;

// // Event listeners for connection events
// db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
// db.once('open', function() {
// console.log('Connected successfully to MongoDB');
//   // Perform database operations here
//   // Close the MongoDB connection
//   mongoose.connection.close();
// });
// require("../models/users");

const mongoose = require("mongoose");
//const url = 'mongodb://localhost:27017/node-ecommerce';
//DATABASE_URL='mongodb://localhost:27017/swoogo?retryWrites=true&w=majority'
DATABASE_URL = 'mongodb+srv://chiragp:1CiciqDnH3rvuTHB@cluster0.d4sdsxv.mongodb.net/node-ecommerce?retryWrites=true&w=majority'


mongoose.connect(DATABASE_URL).catch((error) => {
  console.log(`* * * Database connected failed -> ${error.message} * * *`);
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.log(`* * * Database connected error -> ${error.message} * * *`);
});
db.once("open", () => {
  console.log("* * * Database connected successfully * * *");
});
require("../models/users");
module.exports = db;
