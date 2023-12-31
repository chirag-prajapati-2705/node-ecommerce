const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        customer : {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'Customer'
        },
        items:[{
                productId: Object,
                product_name: String,
                price: Number,
                quantity: Number,
                product_slug:String,
                total_price:Number
           }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);


