const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const Product = mongoose.model("Products");

router.get("/", async (req, res) => {
  console.log(req.query);
  const page = parseInt(req.query.page || 1);
  const pageSize = parseInt(req.query.pageSize || 2);
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  let products = await Product.find().populate("category");
  const paginatedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / pageSize);
  console.log(products);
  if (req.query.all) {
    res.json({ products: products });
  } else {
    res.json({ products: paginatedProducts, totalPages });
  }
});

router.get("/get-product/:_id", async (req, res) => {
  let product = await Product.findById(req.params._id).populate("category");
  res.json({ product: product });
});

router.post("/get-by-slug/", async (req, res) => {
  console.log(req.body.params.slug);
  let product = await Product.find({
    product_slug: req.body.params.slug,
  }).populate("category");
  res.json({ product: product[0] });
});

router.post("/store", async (req, res) => {
  let {
    product_name,
    product_description,
    product_slug,
    price,
    quantity,
    categories,
    status,
  } = req.body;
  const newProduct = {
    product_name: product_name,
    product_description: product_description,
    product_slug: product_slug,
    price: price,
    quantity: quantity,
    category: categories,
    status: status,
  };

  Product.create(newProduct)
    .then((product) => {
      res.json({
        message: "Product has been successfully created!",
        product: product,
      });
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

router.patch("/update", async (req, res) => {
  let {
    product_name,
    product_description,
    product_slug,
    price,
    quantity,
    categories,
  } = req.body;
  const productId = req.body._id;
  const updateData = {
    product_name: product_name,
    product_description: product_description,
    product_slug: product_slug,
    price: price,
    quantity: quantity,
    category: categories,
  };

  await Product.updateOne({ _id: productId }, updateData)
    .then((result) => {
      res.json({ message: "product has been successfully updated!" });
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

router.delete("/delete/:productId", (req, res) => {
  const productId = req.params.productId;
  Product.deleteOne({ _id: productId })
    .then((result) => {
      res.json({ message: "product has been successfully deleted!" });
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

module.exports = router;
