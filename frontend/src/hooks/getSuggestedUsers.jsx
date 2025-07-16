import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {setSuggestedUsers} from '../redux/userSlice'
import { serverUrl } from '../App' // Adjust the import path as necessary



import { useSelector } from 'react-redux'
import {  setUserData } from '../redux/userSlice'

function getSuggestedUsers() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
  useEffect(()=>{
const fetchUser=async ()=>{
    try {
        const result=await axios.get(`${serverUrl}/api/user/suggested`,{withCredentials:true})
        console.log("Suggested Users frontend", result.data)
         dispatch(setSuggestedUsers(result.data))
    } catch (error) {
        console.log(error)
    }
}
fetchUser()
  },[userData])
}

export default getSuggestedUsers