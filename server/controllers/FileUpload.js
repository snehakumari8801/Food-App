const File = require("../modals/File");
const cloudinary = require("cloudinary").v2

exports.localFileupload = async(req,res)=>{
    try{
        //fetch file 
        const file = req.files.file;
        console.log("FIle is " ,file)

        //define path
        const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH->" ,path);

        //move file into path
        file.mv(path,(err)=>{
            console.log(err)
        })

        res.json({
            success:true,
            message:"Local File uploaded Successfullly"
        })

    }catch(error){
        console.log(error.message)
    }
}


function isFileTypeSupported(type,supportedTypes){
  return supportedTypes.includes(type);
}

 exports.uploadImageToCloudinary=async(file,folder)=>{
const options = {folder};
console.log("Temp is -> ", file.tempFilePath)
return await cloudinary.uploader.upload(file.tempFilePath, options );
}

exports.imageUpload = async(req,res) =>{
    try{
        //data fetch
        const {name,email,tags} = req.body;
        console.log(name,email,tags);

        //fetch file
        const file = req.files.imageFile;
        console.log("File is " ,file)

        //validation
        const supportedTypes = ['jpg' ,'jpeg','png'];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type -> ", fileType)

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }

        //agar file format supported
        const response = await uploadImageToCloudinary(file , "Products");
        console.log("Response is " ,response)

        //save in db
        const fileData = await File.create({
            name,
            imageFile:response.secure_url
        })

        return res.status(200).json({
            success:true,
            message:"Image upload in cloudinary",
            fileData
        })

    }catch(error){
      console.log(error);
      return res.status(400).json({
        success:false,
        // message:"Image not upload in cloudinary"
        message:error.message
    })
    }
}


