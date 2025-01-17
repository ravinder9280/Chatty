'use client'
import React, { useState } from 'react'
import { SendHorizontal } from 'lucide-react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const page = () => {
    const [prompt,setPrompt]=useState('')
    const [loading,setLoading]=useState(false)
    const [result,setResult]=useState('')
        const generatePrompt=async(e)=>{
          e.preventDefault()
          setLoading(true)
            try {
                const response= await axios.post('/api/generate-prompt',{prompt})
                setResult(response.data.data)
                
                // setPrompt('')
                
            } catch (error) {
                console.log(error);
                
                
            }
            setLoading(false)

    }

  
  return (
    <div className='flex justify-center h-full w-full p-2 items-center'>
      
      <div className='overflow-y-scroll p-4 max-h-[75vh]'>
        <div className='flex items-center justify-end'>

        <div className='bg-gray-400 rounded-b-xl max-w-[80%]    rounded-s-xl p-4'>

        <p className='text-white ' >
          {prompt}

        </p>
        </div>
        </div>
        <div className='mt-2 '>
        <p>AI:</p>
        <p dangerouslySetInnerHTML={{__html:result}} >
          

        </p>
        </div>

      </div>
<form onSubmit={generatePrompt} className='bg-white absolute bottom-2   flex items-center justify-center border border-gray-300  w-[90%] sm:w-[75%] md:w-[60%] lg:w-[50%] rounded-full'>

<input
  
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  type="text"
  className='w-full text-gray-600 rounded-full  p-4 h-full'
  placeholder='Search For A Prompt , Tag Or Username'
/>
<button type='submit' className='absolute  bg-white text-gray-500 cursor-pointer mr-4 right-0'>
  {

 loading? <Loader2 className='animate-spin'/>:<SendHorizontal/>
  }
</button>


</form>


    </div>
  )
}

export default page