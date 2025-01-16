'use client'
import React, { useState } from 'react'
import '@/styles/index.css';
import Feed from '@/components/Feed';


const Home = () => {
  const [userInput,setUserInput]=useState('')
  return (<>
    <div className="flex flex-col  items-center mt-4 gap-4 p-4 " > 

      <h1 className='text-4xl text-orange-500 text-center font-black sm:font-bold md:text-6xl' >
        <span className='text-black'>Discover & Share</span> The Future of Ai Through <span className='text-green-500'>Chatty</span> 
      </h1>
      <p className='text-gray-500   text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, rerum ratione eum qui ad perferendis laboriosam doloremque fuga consectetur.lorem sit amet consectetursit amet consectetursit amet consectetursit amet y </p>
    </div>
    <div className='flex flex-col mt-8 p-2 '>
      <div className='w-full flex justify-center items-center'>


      <input value={userInput} onChange={(e)=>{setUserInput(e.target.value)}} type="text" className='border border-gray-300 p-2 w-full sm:w-[75%] md:w-[60%] lg:w-[50%] rounded-md' placeholder='Search For A Tag Or Username' />
      </div>
      
      <Feed userInput={userInput}/>

    </div>
  </>
  )
}

export default Home