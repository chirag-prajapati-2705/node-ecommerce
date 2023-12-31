const mongoose = require("mongoose");

var CustomerSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'This field is required'
    },
    last_name: {
        type: String,
        required: 'This field is required'
    },
    email: {
        type: String,
        required: 'This field is required'
    },
    password: {
        type: String,
        required: 'This field is required'
    },
    status: {
        type: Boolean,
        default: 1,
    },
    customer_address: [],
    created_date: {
        type: Date,
        default: Date.now, // Date in one week from now
    },
    updated_date: {
        type: Date,
        default: Date.now, // Date in one week from now
    },

})

CustomerSchema.methods.isValidPassword = async function (password) {
    const customer = this;
    const compare = await bcrypt.compare(password, customer.password);
    return compare;
}


module.exports = mongoose.model('Customer', CustomerSchema);



