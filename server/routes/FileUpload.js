const express = require("express");
const router = express.Router();

const {
  imageUpload,
  imageReducerUpload,
  localFileupload,
} = require("../controllers/FileUpload");


router.post("/localFileupload" , localFileupload);
router.post("/imageUpload" , imageUpload);


module.exports = router;
