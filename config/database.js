const mongoose = require("mongoose");
DATABASE_URL =
  "mongodb+srv://chiragp:1CiciqDnH3rvuTHB@cluster0.d4sdsxv.mongodb.net/node-ecommerce?retryWrites=true&w=majority";

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


mongodb+srv://expi:*****@expiwell.8inrc.mongodb.net/expimetrics-prod?authSource=admin&replicaSet=atlas-de0hb1-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true

mongodb+srv://chiragp:1CiciqDnH3rvuTHB@cluster0.d4sdsxv.mongodb.net/node-ecommerce?retryWrites=true&w=majority&readPreference=primary