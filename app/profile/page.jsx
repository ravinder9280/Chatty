'use client'

import React from 'react'
import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'
import { useState,useEffect } from 'react'
import axios from 'axios'

const page = () => {
    const {data:session}=useSession()
    const [data,setData]=useState(false)

    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const response=await axios.get('/api/users/67090bfdc597bd45a3813ba1/posts');
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        if (session?.user.id) fetchData();
    }, [session?.user.id]);
  

  return (
    <div>
        <Profile headline="My" posts={data} desc={"Customize Your Profile"} user={session?.user} /> 

        
    </div>
  )
}

export default page