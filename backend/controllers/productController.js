const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const Product = mongoose.model("Products");

router.get("/", async (req, res) => {
    // const limitValue = req.query.limit || 2;
    // const skipValue = req.query.skip || 0;
    //
    // let products = await Product.find().populate("category").limit(limitValue).skip(skipValue);
    // console.log(products);
    // res.json({'products':products})

    const page = parseInt(req.query.page || 1);
    const pageSize = parseInt(req.query.pageSize || 2);

    console.log(page);
    console.log(pageSize);

    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    let products = await Product.find().populate("category");

    // Slice the products array based on the indexes
    const paginatedProducts = products.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(products.length / pageSize);

    // Send the paginated products and total pages as the API response

    const limitValue = req.query.limit || 2;
    const skipValue = req.query.skip || 0;
    console.log(products);
    //res.json({'products':products})
    res.json({products: paginatedProducts, totalPages })
});

router.get("/get-product/:_id", async (req, res) => {
    let product = await Product.findById(req.params._id).populate("category");
    res.json({'product':product})
});

router.post("/store", async (req, res) => {
    let {product_name,product_description,product_slug,price,quantity,categories,status} = req.body;
    const newProduct = {
        product_name: product_name,
        product_description: product_description,
        product_slug: product_slug,
        price: price,
        quantity: quantity,
        category:categories,
        status:status
    };

    console.log(newProduct);

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
