import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setStoryData } from '../redux/storySlice'
import { useEffect } from 'react'
import StoryCard from '../components/StoryCard'
import { serverUrl } from '../App'
import axios from 'axios'
const Story = () => {
    const {userName}=useParams()
    const dispatch=useDispatch()
    const {storyData}=useSelector(state=>state.story)
    const handleStory=async()=>{
        dispatch(setStoryData(null))
        try{
            console.log("handle story called in frontend")
            const result=await axios.get(`${serverUrl}/api/story/getByUserName/${userName}`,{withCredentials:true})
            console.log("result in handleStory: ", result.data);
            dispatch(setStoryData(result.data))
            console.log("Story Data Fetched in frontend: ", result.data);

        }catch(error){
            console.log("Error occur during fetching story data frontend", error);
        }
    }
    useEffect(()=>{
        if(userName){
            handleStory()
        }
        
    },[userName])
  return (
    <div className="w-full h-[100vh] bg-black flex justify-center items-center">
       <StoryCard story={storyData}/>
    </div>
  )
}

export default Story