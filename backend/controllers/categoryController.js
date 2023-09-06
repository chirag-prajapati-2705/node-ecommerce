const express = require("express");
const mongoose = require("mongoose");
const app = express();
var router = express.Router();
const Category = mongoose.model("Category");

router.get("/", async (req, res) => {
    var categories = await Category.find();
    res.json({'categories':categories})
});


router.post("/store", async (req, res) => {
    var {category_name,category_description,category_slug} = req.body;
    const newCategory = {
        category_name: category_name,
        category_description: category_description,
        category_slug: category_slug
      };
      Category.create(newCategory)
      .then((category) => {
        res.json({'message':'category has been successfully created!','category':category})
      })
      .catch((error) => {
        res.json({'message':error})
      });

});

router.post("/update", async (req, res) => {
    var {category_name,category_description} = req.body;
    const categoryId = req.body._id;
    const updateData = {
        category_name: category_name,
        category_description: category_description,
      };

      await Category.updateOne({ _id: categoryId }, updateData)
        .then((result) => {
          res.json({'message':'category has been successfully updated!'})
        })
        .catch((error) => {
          res.json({'message':error})
        });
});


router.delete("/delete", (req, res) => {
  const categoryId = req.body._id;
  Category.deleteOne({ _id: categoryId }).then((result) => {
    res.json({'message':'category has been successfully deleted!'})
  }).catch((error) => {
    res.json({'message':error})
  });

});

module.exports = router;
