'use client'
import React, { useState } from 'react'
import '@/styles/index.css';
import Feed from '@/components/Feed';
import { X } from 'lucide-react';




const Home = () => {
  const [userInput,setUserInput]=useState('')
  return (<>
    <div className="flex flex-col  items-center mt-4 gap-4 p-4 " > 

      <h1 className='text-4xl text-orange-500 text-center font-black sm:font-bold md:text-6xl' >
        <span className='text-black'>Discover & Share</span> The Future of Ai Through <span className='text-green-500'>Chatty</span> 
      </h1>
      <p className='text-gray-500   text-center'>Chatty is a platform to create, explore, and share pre-made prompts for better AI interactions. It offers a growing library of user-generated prompts to ensure accuracy and efficiency. Save time, refine ideas, and enhance your AI experience with Chatty—a hub for smarter, collaborative prompt crafting.</p>
    </div>
    <div className='flex flex-col mt-8 p-2 '>
      <div className='w-full flex justify-center items-center'>

        <div className='bg-white   relative flex items-center justify-center border border-gray-300  w-full sm:w-[75%] md:w-[60%] lg:w-[50%] rounded-md'>

      <input  value={userInput} onChange={(e)=>{setUserInput(e.target.value)}} type="text" className='w-full p-2 h-full' placeholder='Search For A Prompt , Tag Or Username' />
        {
        userInput&&<X onClick={()=>setUserInput('')} className='absolute hover:bg-gray-200 text-gray-500 cursor-pointer mr-2 right-0 '/>
        }
          
        </div>
      </div>
    
      <Feed userInput={userInput}/>

    </div>
  </>
  )
}

export default Home