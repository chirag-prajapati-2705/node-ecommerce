const express = require("express");
const mongoose = require("mongoose");
const app = express();
var router = express.Router();
const User = mongoose.model("User");

router.get("/", async (req, res) => {
    var users = await User.find();
    res.json({'user':users})
});

router.post("/store", async (req, res) => {
    var {first_name,last_name,email,password} = req.body;
    const newUser = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      };
      User.create(newUser)
      .then((user) => {
        res.json({'message':'user has been successfully created!','user':user})
      })
      .catch((error) => {
        res.json({'message':error})
      });

});

router.post("/update", async (req, res) => {
    var {first_name,last_name} = req.body;
    const userId = req.body._id;
    const updateData = {
        first_name: first_name,
        last_name: last_name, // New age value
      };

      await User.updateOne({ _id: userId }, updateData).then((result) => {
          res.json({'message':'user has been successfully updated!'})
        })
        .catch((error) => {
          res.json({'message':error})
     });
});


router.delete("/delete", (req, res) => {
  const userId = req.body._id;
  User.deleteOne({ _id: userId }).then((result) => {
    res.json({'message':'user has been successfully deleted!'})
  }).catch((error) => {
    res.json({'message':error})
  });

});

module.exports = router;
