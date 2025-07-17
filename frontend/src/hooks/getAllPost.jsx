import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { serverUrl } from '../App' 



import { useSelector } from 'react-redux'

import { setPostData } from '../redux/postSlice'

function getAllPost() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
  useEffect(()=>{
const fetchPost=async ()=>{
    try {
        const result=await axios.get(`${serverUrl}/api/post/getAll`,{withCredentials:true})
        console.log("Suggested Users frontend", result.data)
         dispatch(setPostData(result.data))
    } catch (error) {
        console.log(error)
    }
}
fetchPost()
  },[dispatch,userData])
}

export default getAllPost