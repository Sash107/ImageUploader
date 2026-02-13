'use client'
import React, { useState,useEffect } from "react";
import axios from "axios";

function posts(){
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/posts")
        .then((res)=>{
            setPosts(res.data)
            console.log(res.data);
        })
        .catch((err)=> console.log(err));
    },[])
    return(
        <div className='p-5  w-full mx-auto border-2'>
            <h1 className='text-3xl w-fit font-bold mb-5 mx-auto'>All Posts</h1>
            <div className="border-2 w-full p-3 flex flex-col gap-3">
                {
                posts.map((post,idx)=>{return(
                    <div className="border-b-4 w-full">
                        <div className="text-2xl">Post {idx}:</div>
                        <div className=" w-full  grid grid-cols-5 gap-2 bg-gray-100">
                            {
                            post.images.map((image)=>{
                                return(
                                    <img src={image} alt="" className="h-[320px] w-[270px] object-contain bg-white p-[10px]" />
                                )
                            })
                            } 
                        </div>
                        <div className="p-2 w-fit mx-auto font-medium">{post.caption}</div>
                    </div>
                    
                )})
                }
                
                
            </div>
        </div>
    )
}

export default posts;