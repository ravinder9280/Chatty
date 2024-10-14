import React from 'react'
import Image from 'next/image'
import PromptCard from './PromptCard'

const Profile = ({user,headline,desc,posts}) => {
    console.log(posts);
    
  return (
    <div className='px-4'>
        <div className='flex border-b pb-5 border-gray-400 flex-col gap-6 items-center'>


        <h1 className='text-3xl text-center font-extrabold'>{headline} Profile</h1>
        <div className='flex flex-col items-center '>

        <Image
        alt="user"
        className=" cursor-pointer hover:border-cyan-700 border-2 border-graynpm run dev-500 rounded-full  "
        
        src={user?.image}
        width={100}
        height={100}
        />
        <p className='text-gray-700' >{user?.name}</p>
        <p className='text-gray-500' >{user?.email}</p>
        </div>
        </div>
        <div className='flex flex-col'>
            <h1 className='text-xl font-semibold my-2'>
              {headline?headline:""} Posts
            </h1>
            
    <div className='grid grid-cols-1 mt-8 sm:grid-cols-2 gap-2 px-2  lg:grid-cols-3'>


                    {
                        posts&&posts.map((item,idx)=>(
                            <PromptCard key={idx} prompt={item.prompt} image={item.creator.image} tag={item.tag} username={item.creator.username} email={item.creator.email} />
            
                        ))
                    }
                     </div>
            
            
            
                
                
            
            

        </div>
    </div>
  )
}

export default Profile