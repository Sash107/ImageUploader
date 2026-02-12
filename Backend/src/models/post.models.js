const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
    images:[String],
    caption:String,
})

const postModel=mongoose.model("Posts",postSchema);

module.exports=postModel;