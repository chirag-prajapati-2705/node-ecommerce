const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const Cart = mongoose.model("Cart");
const Product = mongoose.model("Products");
var _ = require('lodash');
const bcrypt = require("bcryptjs")


router.get("/", async (req, res) => {
    console.log('cart controller');
    let carts = await Cart.find();
    res.json({'carts': carts})
});


router.post("/add-cart", async (req, res) => {
    let {quantity, product_id, customer_id} = req.body;
    let cart_data = {};
    try {
        var product = await Product.findById(product_id);
    } catch (e) {
        res.json({'message': 'Product is not available'})
    }

    const cart_items = {
        product_name: product.product_name,
        product_slug: product.product_slug,
        price: product.price,
        quantity:  quantity,
        total_price : product.price * quantity,
        productId: product_id,
    }
    const cart = await Cart.findOne({customer: customer_id});
    if (cart) {
        let item_index = _.findIndex(cart.items, function (o) {return o.productId == product_id});
        if (item_index >= 0) {
            cart.items[item_index].quantity = quantity;
            cart.items[item_index].total_price = product.price * cart.items[item_index].quantity
        } else {
            cart.items.push(cart_items);
        }
        await cart.save();
        res.json({'message': 'product has been successfully added in cart!'});
    } else {
        cart_data.items = cart_items;
        cart_data.customer = customer_id
        Cart.create(cart_data).then((item) => {
            res.json({'message': 'product has been successfully added in cart!'})
        });
    }
});

router.patch("/update-cart", async (req, res) => {
    let cartId = req.body._id;
    let {quantity, product_id} = req.body;
    try {
        var product = await Product.findById(product_id);
    } catch (e) {
        res.json({'message': 'Product is not available'})
    }
    const cart = await Cart.findOne({_id: cartId});
    if (cart){
        let item_index = _.findIndex(cart.items, function (o) {return o.productId == product_id});
        if (item_index >= 0) {
            cart.items[item_index].quantity = quantity;
            cart.items[item_index].total_price = product.price * cart.items[item_index].quantity
            await cart.save();
            res.json({'message': 'cart has been successfully updated!'});
        }else{
            res.json({'message': 'Product not found!'});
        }
    }else{
        res.json({ 'message': 'Cart not found' });
    }
});

router.delete("/delete", (req, res) => {
    const cartId = req.body._id;
    Cart.deleteOne({_id: cartId}).then((item) => {
        res.json({'message': 'cart Item has been successfully removed!'})
    })
});

module.exports = router;
