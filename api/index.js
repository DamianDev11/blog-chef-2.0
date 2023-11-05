const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute =   require("./routes/categories")
const multer = require("multer");
const path = require("path")
const app = express();

dotenv.config();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(express.static(path.join(__dirname,"public")))

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("connected to the database"))
.catch(err=>console.log(err))


const storage =  multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
});

const upload = multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File uploaded successfully");
})


app.get("/*",(req,res)=>res.sendFile(path.join(__dirname,"public")))
app.use("/api/auth",authRoute)
app.use("/api/categories",categoryRoute)
app.use("/api/posts",postRoute)
app.use("/api/users",userRoute)



app.listen(PORT,()=>{
    console.log(`Server listening on PORT:${PORT}`)
})