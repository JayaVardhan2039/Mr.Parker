import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import MrParkerLogin from './pages/MrParkerLogin'
import MrParkerRegister from './pages/MrParkerRegister'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import MrParkerHome from './pages/MrParkerHome'
import MrParkerProtectWrapper from './pages/MrParkerProtectWrapper'
import MrParkerLogout from './pages/MrParkerLogout'
import Parking from './pages/Parking'
import MrParkerParking from './pages/MrParkerParking'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/user-login' element={<UserLogin/>} /> 
        <Route path='/parking' element={<Parking/>} /> 
        <Route path='/mrparker-parking' element={<MrParkerParking/>} />
        <Route path='/user-register' element={<UserRegister/>} />
        <Route path='/mrparker-login' element={<MrParkerLogin/>} />
        <Route path='/mrparker-register' element={<MrParkerRegister/>} />
        <Route path='/home' element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />
        <Route path='/user/logout' element={<UserProtectWrapper>
          <UserLogout />
          </UserProtectWrapper>}/>
        <Route path='/mrparker-home' element={<MrParkerProtectWrapper>
          <MrParkerHome />
        </MrParkerProtectWrapper>} />
        <Route path='/mrparker/logout' element={<MrParkerProtectWrapper>
          <MrParkerLogout />
          </MrParkerProtectWrapper>}/>

      </Routes>
      </div>
  )
}

export default App