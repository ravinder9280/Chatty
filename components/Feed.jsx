'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PromptCard from './PromptCard'
import { toast } from 'sonner'

const Feed = () => {
    const [copied,setCopied]=useState("")
  const handleCopy=(prompt)=>{
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied to clipboard");
    
  }
    const [data,setData]=useState(false)

    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const response=await axios.get('/api/prompt');
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    },[])
  return (
    <div className='grid grid-cols-1 mt-8 sm:grid-cols-2 gap-2 px-2  lg:grid-cols-3'>


        {
            data&&data.map((item,idx)=>(
                <PromptCard key={idx} prompt={item.prompt} image={item.creator.image} tag={item.tag} username={item.creator.username} email={item.creator.email} handleCopy={handleCopy}/>

            ))
        }



    </div>
  )
}

export default Feed