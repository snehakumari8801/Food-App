const Buyitems = require("../modals/Buyitems");
const User = require("../modals/User");
const Products =  require("../modals/Products");
const mongoose = require('mongoose'); // Ensure you import mongoose if using ObjectId

exports.buyProducts = async (req, res) => {
    try {
        let { id } = req.body;

        // Validate the ID
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing product ID."
            });
        }

        // Find product by ID
        let currentProduct = await Products.findById(id);

        console.log("current Product " ,currentProduct)

        if (!currentProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found by ID."
            });
        }

        // Create entry in buy array
        let buyProduct = await Buyitems.create({
             name:currentProduct.name,
            details: [currentProduct._id],
        });

        if (!buyProduct) {
            return res.status(500).json({
                success: false,
                message: "Error while buying product."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product bought successfully.",
            data: buyProduct // Include the created product details
        });
    } catch (error) {
        console.error("Error while buying product:", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while buying product."
        });
    }
};


exports.getAllBuyProduct = async ( req,res) => {
    try{
       let allProduct = await Buyitems.find({}).populate("details");

      // console.log("all " , allProduct)

       if(!allProduct){
        return res.status(400).json({
            success:false,
            message:"Couldn't get buy products"
        })
       }

       return res.status(200).json({
        success:true,
        message:"Get All Product Successfully",
        data:allProduct
       });

    }catch(error){
        console.log(error.message);
        return res.status(401).json({
            success:false,
            message:"Error while getting all products"
        })
    }
}



