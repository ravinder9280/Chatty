'use client'
import React, { useState } from 'react'
import { SendHorizontal } from 'lucide-react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const page = () => {
    const [prompt,setPrompt]=useState('')
    const [recentPrompt,setRecentPrompt]=useState('')
    const [loading,setLoading]=useState(false)
    const [result,setResult]=useState('')
        const generatePrompt=async(e)=>{
          e.preventDefault()
          setLoading(true)
            try {
                const response= await axios.post('/api/generate-prompt',{prompt})
                setResult(response.data.data)
                setRecentPrompt(prompt)
                
                setPrompt('')
                
            } catch (error) {
                console.log(error);
                
                
            }
            setLoading(false)

    }

  
  return (
    <div className='flex justify-center h-full w-full  items-center'>
      
      {

       result? <div className='overflow-y-scroll w-[90%] sm:w-[75%] md:w-[60%] lg:w-[50%]   max-h-[75vh]'>
        <div className='flex items-end justify-end'>

        <div className='bg-gray-400 rounded-b-xl max-w-[80%]    rounded-s-xl p-4 py-3'>

        <p className='text-white ' >
          {recentPrompt}

        </p>
        </div>
        </div>
        <div className='mt-2 flex flex-col gap-2  '>
          <Image height={32} width={32} src={'/google-gemini-icon.png'} />
        
        <p className='text-gray-900 shadow-lg' dangerouslySetInnerHTML={{__html:result}} >
          

        </p>
        </div>

      </div>:
      <>
      <div className='flex flex-col items-center w-full justify-center gap-4'>
        

        <Image height={200} width={200} src={'/google-gemini-icon.png'}/>
        <p className='text-gray-500'>Hello, ask Anything You want</p>
        
        
      </div>
      </>
      }
<form onSubmit={generatePrompt} className='bg-white shadow-xl absolute bottom-2  flex items-center  border border-gray-300  w-[90%] sm:w-[75%] md:w-[60%] lg:w-[50%] rounded-full'>

<input
  
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  type="text"

  className='w-full text-gray-600 rounded-full focus:outline-none p-4 h-full'
  placeholder='Ask Gemini'
/>
<button type='submit' className=' flex items-center justify-center text-gray-500 w-[10%] cursor-pointer  '>
  {

 loading? <Loader2 className='animate-spin'/>:<SendHorizontal/>
  }
</button>


</form>


    </div>
  )
}

export default page
