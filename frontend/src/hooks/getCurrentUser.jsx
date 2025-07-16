import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import {serverUrl} from '../App.jsx'
function getCurrentUser() {

const dispatch = useDispatch();
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
}

export default getCurrentUser;
