import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import MrParkerLogin from './pages/MrParkerLogin'
import MrParkerRegister from './pages/MrParkerRegister'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/user-login' element={<UserLogin/>} /> 
        <Route path='/user-register' element={<UserRegister/>} />
        <Route path='/mrparker-login' element={<MrParkerLogin/>} />
        <Route path='/mrparker-register' element={<MrParkerRegister/>} />
      </Routes>
      </div>
  )
}

export default App