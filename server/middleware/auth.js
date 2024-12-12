const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    //console.log("BEFORE TOKEN EXTRACTION");
    //extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    //console.log("AFTER ToKEN EXTRACTION");

    //console.log("Token is ", token);

    //if token missing, then return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    //verify the token
    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      //console.log(decode);
      req.user = decode;
      //console.log("User is ", req.user);
    } catch (err) {
      console.log(err);
      //verification - issue
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
  const user = req.user;
  //console.log("User is 87" ,req.user.role,user)
  try {
    if (req.user.role !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructor only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

//isCustomer
exports.isCustomer = async (req, res, next) => {
  const user = req.user;
  //console.log("User is 87" ,req.user.role,user)
  try {
    if (req.user.role !== "Customer") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Customer only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};
