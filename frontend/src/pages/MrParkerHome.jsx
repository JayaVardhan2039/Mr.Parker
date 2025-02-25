import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import MrParkerDetails from '../components/MrParkerDetails'
import ParkPopUp from '../components/ParkPopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmParkPopUp from '../components/ConfirmParkPopUp'
import { MrParkerDataContext } from '../Context/MrParkerContext'
import { useContext } from 'react'
import { SocketContext } from '../Context/SocketContext'
import { useEffect } from 'react'
import axios from 'axios'

const MrParkerHome = () => {
  const [parkPopUpPanel, setParkPopUpPanel] = useState(false)
  const [confirmParkPopUpPanel, setConfirmParkPopUpPanel] = useState(false)
  const { mrParker } = useContext(MrParkerDataContext)
  const parkPopUpPanelRef = useRef(null)
  const confirmParkPopUpPanelRef = useRef(null)
  const { socket } = useContext(SocketContext)
  const [park, setPark] = useState(null)


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

    // return () => clearInterval(locationInterval)
  })

  socket.on('new-park', (data) => {
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
    })


    setParkPopUpPanel(false)
    setConfirmParkPopUpPanel(true)
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
      <div className="absolute left-5 top-5  bg-white p-3 rounded shadow">
        Hello, {mrParker.fullname.firstname}
      </div>
      <div>
        {/* Removed empty image element */}
        <Link to='/mrparker-login' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center k justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className="h-full w-full object-cover" src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"></img>

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