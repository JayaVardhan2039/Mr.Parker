import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { use } from 'react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehicleComponents from '../components/VehicleComponents'
import ConfirmPark from '../components/ConfirmPark'
import LookingForMrPaker from '../components/LookingForMrPaker'
import WaitingForMrParker from '../components/WaitingForMrParker'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmParkPanel, setConfirmParkPanel] = useState(false)
  const [vehicleParkFound, setVehicleParkFound] = useState(false)
  const [waitingForMrParker, setWaitingForMrParker] = useState(false)
  const vehiclePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const confirmParkPanelRef = useRef(null)
  const waitingForMrParkerRef = useRef(null)
  const submitHandler = (e) => {
    e.preventDefault()
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



  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://d2az9qivg16qd4.cloudfront.net/s3fs-public/Uber_Logo_Black_CMYK_Logo.png"></img>
      <div className='h-screen w-screen'>
        {/*image for temp use*/}
        <img className="h-full w-full object-cover" src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"></img>
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full '>
        <div className='h-[20%] bg-white p-6 relative'>
          <h5 ref={panelCloseRef} onClick={() =>
            setPanelOpen(false)
          } className='absolute opacity-0 top-2 right-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a Mr.Parker</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
              type="text"
              placeholder="Add a pickup Location"
            ></input>
          </form>
        </div>
        <div ref={panelRef} className=' bg-white h-0'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-12">
        <VehicleComponents setConfirmParkPanel={setConfirmParkPanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmParkPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <ConfirmPark setConfirmParkPanel={setConfirmParkPanel} setVehicleParkFound={setVehicleParkFound} />
      </div>
      <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <LookingForMrPaker setVehicleParkFound={setVehicleParkFound} />
      </div>
      <div ref={waitingForMrParkerRef} className="fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12">
        <WaitingForMrParker waitingForMrParker={waitingForMrParker} />
      </div>
    </div>
  )
}

export default Home