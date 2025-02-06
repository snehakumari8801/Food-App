const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")
const bodyParser = require('body-parser');
const path = require('path')

const database = require('./config/databse');
database.dbConnect()

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

const fileupload = require("express-fileupload");
app.use(fileupload({
  useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const {cloudinaryConnect} = require("../server/config/cloudinary");
cloudinaryConnect();


// app.use(cors({
//     origin:'*'                         
//   }));

app.use(cors());


const userRoute = require("./routes/User");
const Upload = require('./routes/FileUpload');

app.use("/api/v1", userRoute);
app.use("/api/v1/upload" , Upload)



const PORT = process.env.PORT || 4000
app.listen(PORT , ()=>{
    console.log(`Server is running at ${PORT}`);
  })


