const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageFile: {
    type: String,
  },
  email: {
    type: String,
  },
  tags: {
    type: String,
  },
});


const File = mongoose.model("File" , fileSchema);
module.exports = File;