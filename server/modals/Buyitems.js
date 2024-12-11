const mongoose = require("mongoose");

const buyitemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true, 
  }],
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
  versionKey: false // Optionally disable versioning
});

module.exports = mongoose.model("Buyitems", buyitemsSchema);
