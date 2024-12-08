const Products = require("../modals/Products");
const User = require("../modals/User");
const Category = require("../modals/Category")
const { uploadImageToCloudinary } = require("../controllers/FileUpload");
const { useParams } = require("react-router-dom");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, newPrice, category } = req.body;
    const thumbnail = req.files?.thumbnail;
    console.log("thumbnail is " , thumbnail);

    console.log(name, price, newPrice, category,thumbnail);
    console.log("Category " ,category,thumbnail)

    const userId = req.user.id;

    if (!name || !price || !newPrice || !category || !thumbnail) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    // Upload the thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )
    console.log(thumbnailImage)

    const instructorDetails = await User.findById(userId, {
      role: "Instructor",
    });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    
    const newproduct = await Products.create({
      name: name,
      price: price,
      newPrice: newPrice,
      category:category,
      thumbnail:thumbnailImage?.secure_url,
      instructor: userId, // Make sure this field is provided
    });

    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          products: newproduct._id,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: newproduct,
      message: "Product Created Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Product is not created",
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id;
    console.log(instructorId);

    // Find all courses belonging to the instructor
    const instructorCourses = await Products.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

// Get Course List
exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.find({})
      .populate("instructor")
      .populate("category")
      .exec(1)
    console.log("allproducts " , allProducts)
    return res.status(200).json({
      success: true,
      data: allProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Course Data`,
      error: error,
    });
  }
};

// Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { productId} = req.body;
    console.log("ProductId is ", productId)
    const updates = req.body;
    const product = await Products.findById(productId);

    console.log("course -> ", product);

    if (!product) {
      return res.status(404).json({
        error: "product not found",
      });
    }

    // // If thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      product.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "instructions") {
          product[key] = JSON.parse(updates[key]);
        } else {
          product[key] = updates[key];
        }
      }
    }

    await product.save();

    const updatedProduct = await Products.findOne({
      _id: productId,
    }).exec();

    res.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//getFullProduct Details

exports.getFullProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log("Id is ", productId);
    const userId = req.user.id;
    const productDetails = await Products.findById(productId).exec();
    //console.log(productDetails);

    if (!productDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find product with id: ${productId}`,
      });
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    return res.status(200).json({
      success: true,
      data: productDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if productId is provided
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    console.log('Product Id is delete ', productId);

    console.log("Before extraction ")

    // Find and delete the product by ID
    const deleteProduct = await Products.findByIdAndDelete(productId);

    console.log("After extraction ")


    console.log("Delete products " , deleteProduct)

    // Check if the product was found and deleted
    if (!deleteProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.log("Delete product is", deleteProduct);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product",
    });
  }
};
