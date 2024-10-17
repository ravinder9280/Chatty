'use client'

import React from 'react'
import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner';
import { useRouter } from "next/navigation";


const page = () => {
  const router = useRouter()

    const handleEdit = (postid) => {
        router.push(`/edit-prompt?id=${postid}`);
      };
    
    const {data:session}=useSession()
    const [data,setData]=useState(false)
    const handleDelete=async(id)=>{
        setData(data.filter(post=>post._id!==id))
        try {
            const response=await axios.delete(`/api/users/${id}/posts`);
            console.log("Deleted Post");
            if(response.data.success){
                toast.success(response.data.message);
            }
            else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const response=await axios.get(`/api/users/${session?.user?.id}/posts`);
                console.log(response.data);
                setData(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        if (session?.user.id) fetchData();
    }, [session?.user.id]);
  

    

  return (
    <div>
        <Profile headline="My" handleDelete={handleDelete} handleEdit={handleEdit}  posts={data} desc={"Customize Your Profile"} user={session?.user} /> 

        
    </div>
  )
}

export default page