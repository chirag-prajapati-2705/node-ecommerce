const express = require("express");
const mongoose = require("mongoose");
const app = express();
var router = express.Router();
const Category = mongoose.model("Category");

router.get("/", async (req, res) => {
    let limitValue = req.query.limit  || 1;
    let skipValue = req.query.skip * limitValue || 0;
    let totalPages =0;

    let categories = [];
    if(req.query.all){
         categories = await Category.find();
    }else{
         categories = await Category.find().limit(limitValue).skip(skipValue);
        let category_count = await Category.count().then(count => {
            return count;
        });
        totalPages = Math.ceil(category_count / limitValue);
    }
    res.json({'categories':categories,'totalPages':totalPages})
});


router.post("/store", async (req, res) => {
    var {category_name,category_description,category_slug,parent_id} = req.body;
    const newCategory = {
        category_name: category_name,
        category_description: category_description,
        category_slug: category_slug,
        parent_id:parent_id
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


router.delete("/delete/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  Category.deleteOne({ _id: categoryId }).then((result) => {
    res.json({'message':'category has been successfully deleted!'})
  }).catch((error) => {
    res.json({'message':error})
  });

});

module.exports = router;
