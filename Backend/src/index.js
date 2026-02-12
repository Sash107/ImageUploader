const express=require("express");
const multer=require("multer");
const uploadImage=require("./services/imageUpload.services");
const postModel=require("./models/post.models");
const cors=require("cors");

const app=express();

const upload=multer({storage:multer.memoryStorage()});
app.use(express.json());
app.use(cors());

app.post("/create-post",upload.array("gallery",5),async (req,res)=>{
    const images=[];
    for(let i=0;i<req.files.length;i++){
        const response=await uploadImage(req.files[i]);
        images.push(response.url)
    }
    await postModel.create({
        images:images,
        caption:req.body.caption
    })
    res.status(201).json({
        message:"files uploaded",
    });
})

app.get("/posts",async (req,res)=>{
    const data=await postModel.find();
    res.status(201).json({
        message:"data fetched successfully",
        data
    })
})
module.exports=app;