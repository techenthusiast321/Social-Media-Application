import React from 'react'
import {Routes} from 'react-router-dom'
import { Route } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
export const serverUrl="http://localhost:8000"
const App = () => {
  return (
    <Routes>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn/>}></Route>
      <Route  path="/forgot-password" element={<ForgotPassword/>}></Route>
    </Routes>
  )
}

export default App