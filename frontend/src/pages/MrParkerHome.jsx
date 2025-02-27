import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import MrParkerDetails from '../components/MrParkerDetails'
import ParkPopUp from '../components/ParkPopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmParkPopUp from '../components/ConfirmParkPopUp'
import { MrParkerDataContext } from '../Context/MrParkerContext'
import { SocketContext } from '../Context/SocketContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

const MrParkerHome = () => {
  const [parkPopUpPanel, setParkPopUpPanel] = useState(false)
  const [confirmParkPopUpPanel, setConfirmParkPopUpPanel] = useState(false)
  const { mrParker } = useContext(MrParkerDataContext)
  const parkPopUpPanelRef = useRef(null)
  const confirmParkPopUpPanelRef = useRef(null)
  const { socket } = useContext(SocketContext)
  const [park, setPark] = useState(null)
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    socket.emit('join', { userId: mrParker._id, userType: 'mrparker' })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-mrparker', {
            userId: mrParker._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    return () => clearInterval(locationInterval)
  }, [socket, mrParker._id])

  useEffect(() => {
    if (timeLeft === 0) {
      alert('Time is over');
    }
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  useEffect(() => {
    socket.on('finish-park-panel', () => {
      setTimeLeft(null);
    });
  }, [socket]);

  socket.on('new-park', (data) => {
    console.log(data)
    setPark(data)
    setParkPopUpPanel(true)
  })

  async function confirmPark() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/parks/confirm`, {
      parkId: park._id,
      mrparker: mrParker._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    setParkPopUpPanel(false);
    setConfirmParkPopUpPanel(true);

    const parkEndTime = new Date(park.time).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = Math.floor((parkEndTime - currentTime) / 1000); // Time difference in seconds

    setTimeLeft(timeDifference);
  }

  useGSAP(() => {
    if (parkPopUpPanel) {
      gsap.to(parkPopUpPanelRef.current, { transform: 'translateY(0%)' })
    } else {
      gsap.to(parkPopUpPanelRef.current, { transform: 'translateY(100%)' })
    }
  }, [parkPopUpPanel])
  useGSAP(() => {
    if (confirmParkPopUpPanel) {
      gsap.to(confirmParkPopUpPanelRef.current, { transform: 'translateY(0%)' })
    } else {
      gsap.to(confirmParkPopUpPanelRef.current, { transform: 'translateY(100%)' })
    }
  }, [confirmParkPopUpPanel])
  return (
    <div className='h-screen'>
      {/* Timer UI */}
      {timeLeft !== null && (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-50">
          <h3 className="text-2xl font-semibold">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</h3>
        </div>
      )}
      <div className="absolute left-5 top-5 z-50 bg-white p-3 rounded-3xl shadow">
        Hello, {mrParker.fullname.firstname}
      </div>
      <div>
        <Link to='/mrparker-login' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center k justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5 '>
        <LiveTracking />
      </div>
      <div className='h-2/5 p-6'>
        <MrParkerDetails />
      </div>
      <div ref={parkPopUpPanelRef} className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-12">
        <ParkPopUp
          park={park}
          setParkPopUpPanel={setParkPopUpPanel} setConfirmParkPopUpPanel={setConfirmParkPopUpPanel}
          confirmPark={confirmPark} />
      </div>
      <div ref={confirmParkPopUpPanelRef} className="fixed w-full h-screen z-10 translate-y-full bottom-0 bg-white px-3 py-12">
        <ConfirmParkPopUp
          park={park}
          setConfirmParkPopUpPanel={setConfirmParkPopUpPanel} setParkPopUpPanel={setParkPopUpPanel} />
      </div>
    </div>
  )
}

export default MrParkerHome