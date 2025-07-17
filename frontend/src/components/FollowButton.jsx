import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { toggleFollow } from '../redux/userSlice'
import { serverUrl } from '../App'

function FollowButton({targetUserId,tailwind,onFollowChange}) {
    const {following}=useSelector(state=>state.user)
    const isFollowing=following.includes(targetUserId)

    const dispatch=useDispatch()
    const handleFollow=async()=>{
        try{
            const result=await axios.get(`${serverUrl}/api/user/follow/${targetUserId}`,{withCredentials:true})
            
            if(onFollowChange){
                onFollowChange()
            }
            dispatch(toggleFollow(targetUserId))
        }catch(error){
            console.log(error)
        }
    }
  return (
    <button className={tailwind} onClick={handleFollow}>
        {isFollowing?"Unfollow":"Follow"}
    </button>
  )
}

export default FollowButton