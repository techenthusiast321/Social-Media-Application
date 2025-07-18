import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFollowing, setUserData } from "../redux/userSlice";
import {serverUrl} from '../App.jsx'
import { useSelector } from "react-redux";
import { setCurrentUserStory } from "../redux/storySlice.js";
function getCurrentUser() {

const dispatch = useDispatch();
const {storyData}=useSelector(state=>state.story)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("get current user called at frontend");
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        // const res = await
        // dispatch(setUserData(result.json().data))
        console.log("Current User frontend", result);
        dispatch(setUserData(result.data));
        dispatch(setFollowing(result.data.following))
        dispatch(setCurrentUserStory(result.data.story))
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [storyData]);
}

export default getCurrentUser;
