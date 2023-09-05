const express = require("express");
const mongoose = require("mongoose");
const app = express();
var router = express.Router();
const Customer = mongoose.model("Customer");
const bcrypt = require("bcryptjs");


router.get("/", async (req, res) => {
    var customers = await Customer.find();
    res.json({'customers':customers})
});

router.post("/store", async (req, res) => {
    var {first_name,last_name,email,password} = req.body;
    const newUser = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: bcrypt.hashSync(password, 8),

    };
      Customer.create(newUser)
      .then((user) => {
        res.json({'message':'user has been successfully created!','user':user})
      })
      .catch((error) => {
        res.json({'message':error})
      });

});

router.post("/update", async (req, res) => {
    var {first_name,last_name} = req.body;
    const customerId = req.body._id;
    const updateData = {
        first_name: first_name,
        last_name: last_name, // New age value
      };

      await Customer.updateOne({ _id: customerId }, updateData)
        .then((result) => {
          res.json({'message':'user has been successfully updated!'})
        })
        .catch((error) => {
          res.json({'message':error})
        });
});


router.delete("/delete", (req, res) => {
  const customerId = req.body._id;
  Customer.deleteOne({ _id: customerId }).then((result) => {
    res.json({'message':'user has been successfully deleted!'})
  }).catch((error) => {
    res.json({'message':error})
  });

});

module.exports = router;
