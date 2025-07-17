import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import loopSlice from "./loopSlice"
import postSlice from "./postSlice"
import storySlice from "./storySlice"
const store = configureStore({
  reducer: {
    user: userSlice,
    post:postSlice,
    loop:loopSlice,
    story:storySlice
  },
});

export default store;
