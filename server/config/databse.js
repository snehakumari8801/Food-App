const mongoose = require("mongoose")
require("dotenv").config();

exports.dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB connection successfully"))
    .catch((error) => console.log(error));
};
