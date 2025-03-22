import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { io } from 'socket.io-client'
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

const socket = io(import.meta.env.VITE_BASE_URL);

const App = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [timer, setTimer] = useState(true);
  

  const updateTimeLeft = (time) => {
    setTimeLeft(time);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setTimer(false);
      socket.emit('trigger-request-otp');
    }
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        console.log(timeLeft)
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  return (
    <div>
      {/* Timer UI */}
      {timeLeft !== null && timer && (
        <div className="absolute right-2 top-3 z-50 bg-white p-3 rounded-3xl shadow">
          <h3>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</h3>
        </div>
      )}
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/user-login' element={<UserLogin/>} /> 
        <Route path='/parking' element={<Parking timeLeft={timeLeft} />} /> 
        <Route path='/mrparker-parking' element={<MrParkerParking timeLeft={timeLeft} setTimeLeft={updateTimeLeft} />} />
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
          <MrParkerHome setTimeLeft={updateTimeLeft} />
        </MrParkerProtectWrapper>} />
        <Route path='/mrparker/logout' element={<MrParkerProtectWrapper>
          <MrParkerLogout />
          </MrParkerProtectWrapper>}/>

      </Routes>
      </div>
  )
}

export default App