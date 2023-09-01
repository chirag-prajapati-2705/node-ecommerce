const mongoose = require("mongoose");

var CustomerAddress = new mongoose.Schema({
    address:{
        type:String,
        required:'This field is required'
    },
    city:{
        type:String,
        required:'This field is required'
    },
    state:{
        type:String,
        required:'This field is required'
    },
    country:{
        type:String,
        required:'This field is required'
    },
    created_date: {
        type: Date,
        default: Date.now, // Date in one week from now
    },
    updated_date: {
        type: Date,
        default: Date.now , // Date in one week from now
    },

})


module.exports = mongoose.model('Customer', CustomerAddress);



