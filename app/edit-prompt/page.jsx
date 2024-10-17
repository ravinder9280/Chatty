'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import axios from 'axios';
import { toast} from 'sonner';

const page = () => {

    const router= useRouter()
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");



    const [data,setData]=useState({
        prompt: '',
        tag: ''
      })
    const onChangeHandler=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
        console.log(data);
        
    
      }
      useEffect(()=>{
        const fetchData=async()=>{
            try {
                const response=await axios.get(`/api/prompt/${promptId}`);
                console.log(response);
                
                setData({
                  prompt: response.data.prompt.prompt,
                  tag: response.data.prompt.tag
                })
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()

      },[promptId])

      
      const onSubmitHandler=async(e)=>{
        e.preventDefault();
        // const response=await axios.post('/api/prompt/new',{prompt:data.prompt,tag:data.tag,userId:"6709fb35c714c03b17b5cd28"})
        const response=await axios.patch(`/api/users/${promptId}/posts`,{prompt:data.prompt,tag:data.tag})
        console.log(response);
        if(response.data.success){
          toast.success(response.data.message)
          setData({
            prompt: '',
            tag: ''
          })
          router.push('/profile', { scroll: false })
        } else {
          toast.error(response.data.message)
        }

      }
  return (
<div className='flex items-center justify-center'>

<form onSubmit={onSubmitHandler} className='flex gap-4 p-4 pl-8 flex-col sm:w-[75vw] md:w-[60vw] lg:w-[50vw]'>
  <div className='flex flex-col gap-2'>

  <h1 className='text-4xl font-extrabold text-blue-500'>Edit Post</h1>
  <p className='text-gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic nam beatae rem labore quis enim praesentium autem laborum iure? Perferendis ad temporibus suscipit, amet dicta molestias velit praesentium.</p>
  </div>
  <div className='flex flex-col gap-4'>
    <div className='flex flex-col gap-1'>

    <h1 className=''>Your AI Prompt</h1>
    <textarea required onChange={onChangeHandler} value={data.prompt} name="prompt" type='text' className=' text-gray-500 rounded-md border p-2 ' rows={5} cols={1}  placeholder='Enter your Prompt Here'  id=""></textarea>
    </div>
    <div className='flex flex-col gap-1'>

    <h1 className=''>Tag</h1>
    <input required onChange={onChangeHandler} value={data.tag} name="tag" type="text" className='border  text-gray-500 rounded-md p-2' placeholder='#tag' />
    </div>
    <div className='flex gap-4 justify-end items-center'>
      <button type='button'  className='p-2 border border-gray-500 text-gray-600 hover:bg-gray-300  rounded-2xl px-5 '>Cancel</button>
      <button type='submit' className='p-2 bg-orange-400 text-white rounded-2xl px-6 hover:bg-orange-500 '>Create</button>

    </div>


  </div>
    
    
</form>
</div>  )
}

export default page