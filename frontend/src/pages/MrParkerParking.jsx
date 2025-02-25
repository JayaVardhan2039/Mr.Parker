import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishParking from '../components/FinishParking'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const MrParkerParking = () => {
  const [finishParkPanel, setFinishParkPanel] = useState(false)
  const finishParkPanelRef=useRef(null)
  const location = useLocation();
  const parkData = location.state?.park
  useGSAP(() => {
    if(finishParkPanel){
      gsap.to(finishParkPanelRef.current, {transform: 'translateY(0%)'})
    } else {
      gsap.to(finishParkPanelRef.current, {transform: 'translateY(100%)'})
    }}, [finishParkPanel])
  return (
    <div className='h-screen'>
      
      <div>
        <img src="" alt="" />
        <Link to='/mrparker-login' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center k justify-center rounded-full'>
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
      </Link>
      </div>
      
      <div className='h-4/5'>
        <img className="h-full w-full object-cover" src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"></img>

      </div>
      <div className='h-1/5 p-6 flex items-center justify-between relative' onClick={()=>{setFinishParkPanel(true)}}>
      <h5 className='p-1 text-center absolute w-[90%] top-0' onClick={() => {}}><i className="text-3xl text-gray-400 ri-arrow-up-wide-line"></i></h5>
      
      <button className=' bg-gray-300 text-gray-700 font-semibold p-3 px-12 rounded-lg'>Complete Parking</button>

        </div>
        <div ref={finishParkPanelRef} className="fixed w-full h-screen z-10 translate-y-full bottom-0 bg-white px-3 py-12">
          <FinishParking park={parkData} setFinishParkPanel={setFinishParkPanel}/>
        </div>  
        
    </div>
  )
}

export default MrParkerParking