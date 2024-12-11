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

//------------------------------Deployment------------------------------------------
// const __dirname1 = path.resolve();


// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, ".." ,"build")));
//   console.log(__dirname1)
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname1, "..", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }
//------------------------------------------------------------------------

app.use(cors({
    origin:'http://localhost:3000'         //'https://food-app-13.onrender.com'                  //'http://localhost:3000'        //'https://food-app-13.onrender.com'               // // Allow requests from this origin
  }));

const userRoute = require("./routes/User");
const Upload = require('./routes/FileUpload');

app.use("/api/v1", userRoute);
app.use("/api/v1/upload" , Upload)



const PORT = process.env.PORT || 4000
app.listen(PORT , ()=>{
    console.log(`Server is running at ${PORT}`);
  })


