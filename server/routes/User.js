const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/Auth");
const {
  createProduct,
  getInstructorCourses,
  editCourse,
  getFullProductDetails,
  deleteProduct,
  getAllProducts,
} = require("../controllers/Products");
const { auth, isInstructor,isCustomer } = require("../middleware/auth");
const { buyProducts,getAllBuyProduct } = require("../controllers/BuyItems");

router.post("/signup", signup);
router.post("/login", login);
router.post("/createproduct", auth, createProduct);
router.get("/getInstructorCourses", auth, getInstructorCourses);
router.post("/editProduct", auth,isInstructor, editCourse);
router.post("/getFullProductDetails", auth, getFullProductDetails);
router.delete("/deleteProduct", auth, deleteProduct);
router.get("/getAllProducts", getAllProducts);
router.post("/buyProduct", auth , buyProducts);
router.get("/getAllBuyproducts",  getAllBuyProduct);


module.exports = router; 
