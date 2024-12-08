const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    newPrice: {
        type: Number,
    },
    category:{
       type: String,
		required: true
    },
    instructor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
    thumbnail:{
        type:String,
        required:true
    },
    token:{
      type:String
    },
    createdAt: {
        type: Date,
        default: Date.now  // Use a function reference instead of function call
    }
});

module.exports = mongoose.model("Product", productSchema);
