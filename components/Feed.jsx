'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PromptCard from './PromptCard'
import { toast } from 'sonner'

const Feed = ({ userInput }) => {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])

  const handleCopy = (prompt) => {
    try {
      navigator.clipboard.writeText(prompt)
      toast.success("Prompt copied to clipboard")
    } catch (error) {
      console.error(error)
      toast.error("Error copying prompt to clipboard")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/prompt')
        setData(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [userInput])

  useEffect(() => {
    if (data.length > 0) {
      const filteredData = data.filter((item) => {
        const tagMatch = item.tag.toLowerCase().includes(userInput.toLowerCase());
        const promptMatch = item.prompt.toLowerCase().includes(userInput.toLowerCase());
        const usernameMatch = item.creator.username.toLowerCase().includes(userInput.toLowerCase());
        return tagMatch || promptMatch || usernameMatch;
      });
      setFilterData(filteredData);
    }
  }, [data, userInput]);

  return (
    <div className='grid grid-cols-1 mt-8 sm:grid-cols-2 gap-2 px-2  lg:grid-cols-3'>
      {filterData.map((item, idx) => (
        <PromptCard key={idx} prompt={item.prompt} image={item.creator.image} tag={item.tag} username={item.creator.username} email={item.creator.email} handleCopy={handleCopy} />
      ))}
    </div>
  )
}

export default Feed