import React from 'react'
import {Routes} from 'react-router-dom'
import { Route } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Home from './pages/Home.jsx'
import { useSelector } from 'react-redux'
import getCurrentUser from './hooks/getCurrentUser.jsx'
import { Navigate } from 'react-router-dom'
import getSuggestedUsers from './hooks/getSuggestedUsers.jsx'
export const serverUrl="http://localhost:8000"
const App = () => {
  getCurrentUser()
  getSuggestedUsers()
  const {userData}=useSelector(state=>state.user)
  console.log("first", userData)
  return (
    <Routes>
      <Route path='/signup' element={!userData?<SignUp />:<Navigate to={"/"}/>}></Route>
      <Route path="/signin" element={!userData?<SignIn />:<Navigate to={"/"}/>}></Route>
      <Route path="/" element={userData?<Home/>:<Navigate to={"/signin"}/>}></Route>
      <Route  path="/forgot-password" element={!userData?<ForgotPassword />:<Navigate to={"/"}/>}></Route>
    </Routes>
  )
}

export default App