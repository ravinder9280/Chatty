import React, {  } from 'react'
import Image from 'next/image'
import { BsCopy } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai"




const PromptCard = ({image,tag,prompt,username,email,handleCopy,handleEdit,handleDelete,id}) => {
 
  
  return (
    <div className='p-3 flex flex-col gap-3  rounded-md shadow-md '>
        <div className='flex items-center justify-between'>
            <div className='flex gap-4'>
            <Image
          alt="user"
          className=" cursor-pointer hover:border-cyan-700  object-contain "

          src={image}
          width={40}
          height={40}
          />
          <div className='flex flex-col  '>
            <p className='font-semibold text-sm'>{username}</p>
            <p className='text-gray-500 text-sm '>{email}</p>

          </div>

            </div>

            <p className='text-gray-600 cursor-pointer hover:text-black' onClick={()=>handleCopy(prompt)}>
            <BsCopy />

            </p>

        </div>
        <div className='flex flex-col gap-4'>
            <p className='  text-gray-700'>
            {prompt}

            </p>
            <div className='flex items-center justify-between'>

            <p className=' text-sm text-blue-600'>
            {tag}

            </p>
            {handleEdit&&handleDelete?
            
          
            <div className='flex gap-4'>

            <p onClick={()=>handleEdit(id)} className='text-gray-700  cursor-pointer hover:text-black' >
            <CiEdit />

            </p>
            <p onClick={()=>handleDelete(id)} className='text-gray-600 cursor-pointer  hover:text-black'>
              
            <AiOutlineDelete />


            </p>
            </div>:<></>
          }

            </div>

        </div>

    </div>
  )
}

export default PromptCard