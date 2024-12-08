const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  products : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
  buyItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyitems",
  }]
});

module.exports = mongoose.model("Category", categorySchema);
