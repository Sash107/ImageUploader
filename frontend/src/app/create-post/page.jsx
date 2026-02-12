'use client'
import React from 'react';
import { useState ,useEffect} from 'react';
import axios from 'axios';

function create_post(){
    const [image,setImage]=useState([]);
    const [caption,setCaption]=useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        const mypost=new FormData();
        image.forEach((currpost)=>{
            mypost.append("gallery",currpost)
        })
        mypost.append("caption",caption);
        axios.post("http://localhost:3000/create-post",mypost).then((res)=>{
            setImage([]);
            setCaption("");
        }).catch((err)=>{
            console.log(err);
        });
    }
    return(
        <div className='p-5  max-w-[700px] mx-auto'>
            <h1 className='text-3xl font-bold mb-5'>Create Post</h1>
            <form className='p-3 border-2 flex flex-col gap-3' onSubmit={handleSubmit}>
                <label className='p-2 border-2 cursor-pointer text-gray-600'>
                    Choose Image
                <input  type="file" multiple accept='image/*' className='border-2 hidden' onChange={(e)=>{
                    image.length+e.target.files.length<=5?
                    (
                        setImage([...image, ...e.target.files])
                    ):
                    (
                        alert("You cannot choose more that 5 files!")
                    )
                }}/>
                </label>
                <div className='flex flex-col text-[10px] font-bold border-2 border-amber-600'>
                    {
                        image.map((img,idx)=>{
                            return <div key={idx} className='font-serif italic text-sm'>
                                {idx+1}. {img.name}
                            </div>
                        })
                    }
                </div>
                <textarea  rows={1} className='overflow-hidden border-2 p-3 w-full rounded-2xl resize-none ' placeholder='Enter Caption' onInput={(e)=>{
                    e.target.style.height="auto";
                    e.target.style.height=e.target.scrollHeight+"px";
                }}
                onChange={(e)=>{
                    setCaption(e.target.value);
                }}></textarea>
                <button type='submit' className='bg-green-400 w-fit self-center p-2 px-7 rounded-3xl'>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default create_post;