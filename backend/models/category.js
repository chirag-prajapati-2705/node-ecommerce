const mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({
    category_name:{
        type:String,
        required:'This field is required'
    },
    category_description:{
        type:String,
    },
    category_slug:{
        type:String,
        required:'This field is required'
    },

    parent_id:[{type: mongoose.Schema.Types.ObjectId,ref: 'Category',default: 0}],

    status:{
        type:Boolean,
        default: 1,
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

module.exports = mongoose.model('Category', categorySchema);
