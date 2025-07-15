import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import serverUrl from '../App.jsx'
function getCurrentUser() {
    const dispatch=useDispatch();
  useEffect(()=>{
    const fetchUser=async(dispatch)=>{
        try{
            const result=await axios.get(`${serverUrl}/api/auth/current`,{withCredentials:true})
            // const res = await
            // dispatch(setUserData(result.json().data))
            dispatch(setUserData(result.data))
        }catch(error){
            console.log(error)
        }
    }
    fetchUser()
  },[])
}

export default getCurrentUser