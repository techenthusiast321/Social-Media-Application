import React from 'react'
import {Routes} from 'react-router-dom'
import { Route } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Home from './pages/Home.jsx'
import { useSelector } from 'react-redux'
export const serverUrl="http://localhost:8000"
const App = () => {
  const {userData}=useSelector(state=>state.user)
  return (
    <Routes>
      <Route path='/signup' element={!userData?<SignUp />:<Home/>}></Route>
      <Route path="/signin" element={!userData?<SignIn />:<Home/>}></Route>
       <Route path="/" element={userData?<Home/>:<SignIn/>}></Route>
      <Route  path="/forgot-password" element={!userData?<ForgotPassword />:<Home/>}></Route>
    </Routes>
  )
}

export default App