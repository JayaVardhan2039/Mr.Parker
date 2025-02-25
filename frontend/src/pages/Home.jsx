import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect } from 'react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehicleComponents from '../components/VehicleComponents'
import ConfirmPark from '../components/ConfirmPark'
import LookingForMrPaker from '../components/LookingForMrPaker'
import WaitingForMrParker from '../components/WaitingForMrParker'
import axios from 'axios'
import { SocketContext } from '../Context/SocketContext'
import { useContext } from 'react'
import { UserDataContext } from '../Context/UserContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmParkPanel, setConfirmParkPanel] = useState(false)
  const [vehicleParkFound, setVehicleParkFound] = useState(false)
  const [waitingForMrParker, setWaitingForMrParker] = useState(false)
  const [vehicleType, setVehicleType] = useState(null)
  const [fare, setFare] = useState({})
  const vehiclePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const confirmParkPanelRef = useRef(null)
  const waitingForMrParkerRef = useRef(null)
  const destination = 'vizag'
  const { socket } = useContext(SocketContext)
  const {user} = useContext(UserDataContext)
  const [park,setPark] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    socket.emit('join', { userId: user._id, userType: 'user' })
  }, [user, socket])

  const submitHandler = (e) => {
    e.preventDefault()
  }
  const handlePickupChange = async (e) => {
    const value = e.target.value
    setPickup(value)
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        setPickupSuggestions(response.data)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        setPickupSuggestions([])
      }
    } else {
      setPickupSuggestions([])
    }
  }
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '80%', padding: '20px' })
      gsap.to(panelCloseRef.current, { opacity: 1 })
    } else {
      gsap.to(panelRef.current, { height: '0%', padding: '0px' })
      gsap.to(panelCloseRef.current, { opacity: 0 })
    }
  }, [panelOpen])

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, { transform: 'translateY(0%)' })
    } else {
      gsap.to(vehiclePanelRef.current, { transform: 'translateY(100%)' })
    }
  }, [vehiclePanel])

  useGSAP(() => {
    if (confirmParkPanel) {
      gsap.to(confirmParkPanelRef.current, { transform: 'translateY(0%)' })
    } else {
      gsap.to(confirmParkPanelRef.current, { transform: 'translateY(100%)' })
    }
  }, [confirmParkPanel])

  useGSAP(() => {
    if (vehicleParkFound) {
      gsap.to(vehicleFoundRef.current, { transform: 'translateY(0%)' })
    } else {
      gsap.to(vehicleFoundRef.current, { transform: 'translateY(100%)' })
    }
  }, [vehicleParkFound])

  useGSAP(() => {
    if (waitingForMrParker) {
      gsap.to(waitingForMrParkerRef.current, { transform: 'translateY(0%)' })
    } else {
      gsap.to(waitingForMrParkerRef.current, { transform: 'translateY(100%)' })
    }
  }, [waitingForMrParker])

  async function findPark() {
    setVehiclePanel(true)
    setPanelOpen(false)

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/parks/get-fare`,
      {
        params: { pickup: pickup, destination: destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    setFare(response.data)
    console.log(response.data)
  }
  async function createPark() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/parks/create`,
      {
        pickup: pickup,
        destination: destination,
        vehicleType: vehicleType
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    console.log(response.data)
  }

  socket.on('park-confirmed', (park) => {
    console.log(park)
    setPark(park)
    setVehiclePanel(false)
    setVehicleParkFound(false)
    setWaitingForMrParker(true)
  })

  socket.on('park-started', (park) => {
    setWaitingForMrParker(false);
    navigate('/parking', { state: {park} });
  })


  return (
    <div className='h-screen relative overflow-hidden'>
      <div className="absolute left-5 top-5  bg-white p-3 rounded shadow">
        Welcome, {user.fullname.firstname}
      </div>
      
      <div className='h-screen w-screen'>
        {/*image for temp use*/}
        <img
          className='h-full w-full object-cover'
          src='https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif'
        ></img>
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full '>
        <div className='h-[20%] bg-white p-6 relative'>
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className='absolute opacity-0 top-3 right-14 text-2xl'
          >
            <i className='ri-arrow-down-wide-line'></i>
          </h5>
          <Link
            to='/user-login'
            className=' fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'
          >
            <i className='text-lg font-medium ri-logout-box-r-line'></i>
          </Link>
          <h4 className='text-2xl font-semibold'>Find a Mr.Parker</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e)
            }}
          >
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
              type='text'
              placeholder='Add a pickup Location'
            ></input>
          </form>
          <button
            onClick={findPark}
            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'
          >
            Find a Parker
          </button>
        </div>
        <div ref={panelRef} className=' bg-white h-0'>
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            pickupSuggestions={pickupSuggestions}
            setPickup={setPickup}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-12'
      >
        <VehicleComponents
          setVehicleType={setVehicleType}
          fare={fare}
          setConfirmParkPanel={setConfirmParkPanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={confirmParkPanelRef}
        className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'
      >
        <ConfirmPark
          pickup={pickup}
          fare={fare}
          vehicleType={vehicleType}
          createPark={createPark}
          setConfirmParkPanel={setConfirmParkPanel}
          setVehicleParkFound={setVehicleParkFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'
      >
        <LookingForMrPaker
          pickup={pickup}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleParkFound={setVehicleParkFound}
        />
      </div>
      <div
        ref={waitingForMrParkerRef}
        className='fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12'
      >
        <WaitingForMrParker
         park={park}
         setVehicleParkFound={setVehicleParkFound}
         setWaitingForMrParker={setWaitingForMrParker}
         waitingForMrParker={waitingForMrParker} />
      </div>
    </div>
  )
}

export default Home