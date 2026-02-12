const ImageKit =require('@imagekit/nodejs') ;


const client=ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadImage(myfile){
    const response=await client.files.upload({
        file:myfile.buffer.toString("base64"),
        fileName:myfile.originalname
    })
    return response;
}
module.exports=uploadImage;