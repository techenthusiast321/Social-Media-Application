import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { serverUrl } from "../App";

import { useSelector } from "react-redux";

import { setLoopData } from "../redux/loopSlice";

function getAllLoops() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchloops = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/loop/getAll`, {
          withCredentials: true,
        });
        console.log("Suggested Users frontend", result.data);
        dispatch(setLoopData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchloops();
  }, [dispatch, userData]);
}

export default getAllLoops;
