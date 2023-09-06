const mongoose = require("mongoose");
DATABASE_URL =  "mongodb+srv://chiragp:1CiciqDnH3rvuTHB@cluster0.d4sdsxv.mongodb.net/node-ecommerce?retryWrites=true&w=majority";

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

