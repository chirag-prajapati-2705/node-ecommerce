const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const Product = mongoose.model("Products");

router.get("/", async (req, res) => {
    let products = await Product.find().populate("category");
    res.json({'products':products})
});

router.get("/get-product/:_id", async (req, res) => {
    let product = await Product.findById(req.params._id).populate("category");
    res.json({'product':product})
});

router.post("/store", async (req, res) => {
    let {product_name,product_description,product_slug,price,quantity,categories} = req.body;
    const newProduct = {
        product_name: product_name,
        product_description: product_description,
        product_slug: product_slug,
        price: price,
        quantity: quantity,
        category:categories
    };

    Product.create(newProduct).then((product) => {
            res.json({'message':'Product has been successfully created!','product':product})
        })
        .catch((error) => {
            res.json({'message':error})
        });
});

router.patch("/update", async (req, res) => {
    let {product_name,product_description,product_slug,price,quantity,categories} = req.body;
    const productId = req.body._id;
    const updateData = {
        product_name: product_name,
        product_description: product_description,
        product_slug: product_slug,
        price: price,
        quantity: quantity,
        category:categories
    };

    await Product.updateOne({ _id: productId }, updateData).then((result) => {
            res.json({'message':'product has been successfully updated!'})
        })
        .catch((error) => {
            res.json({'message':error})
        });
});

router.delete("/delete", (req, res) => {
    const productId = req.body._id;
    Product.deleteOne({ _id: productId }).then((result) => {
        res.json({'message':'product has been successfully deleted!'})
    }).catch((error) => {
        res.json({'message':error})
    });

});

module.exports = router;
