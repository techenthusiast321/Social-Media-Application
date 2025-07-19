import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFollowing, setUserData } from "../redux/userSlice";
import {serverUrl} from '../App.jsx'
import { useSelector } from "react-redux";
import { setStoryList } from "../redux/storySlice.js";
function getAllStories() {

const dispatch = useDispatch();
const {userData}=useSelector(state=>state.user)
const {storyData}=useSelector(state=>state.story)
  useEffect(() => {
    const fetchStories = async () => {
      try {
        console.log("get current user called at frontend");
        const result = await axios.get(`${serverUrl}/api/story/getAll`, {
          withCredentials: true,
        });
        // const res = await
        // dispatch(setUserData(result.json().data))
        console.log("Current User frontend", result);
        dispatch(setStoryList(result.data));
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchStories();
  }, [userData,storyData]);
}

export default getAllStories;
