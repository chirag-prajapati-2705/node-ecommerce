const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:'This field is required'
    },
    last_name:{
        type:String,
        required:'This field is required'
    },
    email:{
        type:String,
        required:'This field is required'
    },
    password:{
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


module.exports = mongoose.model('User', UserSchema);



