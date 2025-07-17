import React from 'react'
import {Routes} from 'react-router-dom'
import { Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home.jsx'
import { useSelector } from 'react-redux'
import getCurrentUser from './hooks/getCurrentUser'
import { Navigate } from 'react-router-dom'
import getSuggestedUsers from './hooks/getSuggestedUsers'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Upload from './pages/Upload';
export const serverUrl="http://localhost:8000"
const App = () => {
  getCurrentUser()
  getSuggestedUsers()
  const {userData}=useSelector(state=>state.user)
  console.log("userData frontend appjsx", userData)
  // console.log("first", userData)
  return (
    <Routes>
      <Route path='/signup' element={!userData?<SignUp />:<Navigate to={"/"}/>}></Route>
      <Route path="/signin" element={!userData?<SignIn />:<Navigate to={"/"}/>}></Route>
      <Route path="/" element={userData?<Home/>:<Navigate to={"/signin"}/>}></Route>
      <Route  path="/forgot-password" element={!userData?<ForgotPassword />:<Navigate to={"/"}/>}></Route>
      <Route path="/profile/:userName" element={userData?<Profile/>:<Navigate to={"/signin"}/>}></Route>
      <Route path="/editprofile" element={userData?<EditProfile/>:<Navigate to={"/signin"}/>}></Route>
      <Route path="/upload" element={userData?<Upload/>:<Navigate to={"/signin"}/>}></Route>
    </Routes>
  )
}

export default App