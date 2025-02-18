import React, { useRef,useState } from 'react'
import { Link } from 'react-router-dom'
import MrParkerDetails from '../components/MrParkerDetails'
import ParkPopUp from '../components/ParkPopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmParkPopUp from '../components/ConfirmParkPopUp'

const MrParkerHome = () => {
  const [parkPopUpPanel, setParkPopUpPanel] = useState(true)
  const [confirmParkPopUpPanel,setConfirmParkPopUpPanel] = useState(false)

  const parkPopUpPanelRef = useRef(null)
  const confirmParkPopUpPanelRef = useRef(null)
  useGSAP(() => {
    if(parkPopUpPanel){
      gsap.to(parkPopUpPanelRef.current, {transform: 'translateY(0%)'})
    } else {
      gsap.to(parkPopUpPanelRef.current, {transform: 'translateY(100%)'})
    }}, [parkPopUpPanel])
    useGSAP(() => {
      if(confirmParkPopUpPanel){
        gsap.to(confirmParkPopUpPanelRef.current, {transform: 'translateY(0%)'})
      } else {
        gsap.to(confirmParkPopUpPanelRef.current, {transform: 'translateY(100%)'})
      }}, [confirmParkPopUpPanel])
  return (
    <div className='h-screen'>

      <div>
        <img src="" alt="" />
        <Link to='/mrparker-login' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center k justify-center rounded-full'>
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
      </Link>
      </div>
      <div className='h-3/5'>
        <img className="h-full w-full object-cover" src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"></img>

      </div>
      <div className='h-2/5 p-6'>
        <MrParkerDetails/>
        </div>
        <div ref={parkPopUpPanelRef} className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-12">
          <ParkPopUp setParkPopUpPanel={setParkPopUpPanel} setConfirmParkPopUpPanel={setConfirmParkPopUpPanel} />
        </div>
        <div ref={confirmParkPopUpPanelRef} className="fixed w-full h-screen z-10 translate-y-full bottom-0 bg-white px-3 py-12">
          <ConfirmParkPopUp setConfirmParkPopUpPanel={setConfirmParkPopUpPanel} setParkPopUpPanel={setParkPopUpPanel}/>
        </div>
    </div>
  )
}

export default MrParkerHome