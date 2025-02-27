import React, { useRef, useState, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishParking from '../components/FinishParking'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import LiveTracking from '../components/LiveTracking'
import { SocketContext } from '../Context/SocketContext'
import axios from 'axios'

const MrParkerParking = () => {
  const [finishParkPanel, setFinishParkPanel] = useState(false)
  const [isHandoverRequested, setIsHandoverRequested] = useState(false)
  const finishParkPanelRef=useRef(null)
  const location = useLocation();
  const parkData = location.state?.park
  const { socket } = useContext(SocketContext)
  const [spClicked, setSpClicked] = useState(false)
  const [parkAddress,getParkAddress]=useState('')
  useGSAP(() => {
    if(finishParkPanel){
      gsap.to(finishParkPanelRef.current, {transform: 'translateY(0%)'})
    } else {
      gsap.to(finishParkPanelRef.current, {transform: 'translateY(100%)'})
    }}, [finishParkPanel])

    useEffect(() => {
      socket.on('request-handover', (data) => {
        if (!finishParkPanel) {
          setFinishParkPanel(true);
          setIsHandoverRequested(true);
        }
      });
    }, [socket, finishParkPanel]);

    const loadAddress = async ()=>{
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response1 = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-address`, {
            params: { lat: latitude, lng: longitude },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          getParkAddress(response1.data.address.formatted_address)
          console.log(response1.data.address.formatted_address)
          console.log('MrParker coordinates:', latitude, longitude);
        } catch (error) {
          console.error('Error fetching address:', error);
        }
      });
      setSpClicked(true); // Update state after emitting the event
    }



    const handleSpClick = async () => {
      console.log(parkAddress)
      socket.emit('sp-clicked', { message: parkAddress });
    };

  return (
    <div className='h-screen'>
      
      <div>
        <img src="" alt="" />
        <Link to='/mrparker-login' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
      </Link>
      </div>
      
      <div className='h-4/5'>
        <LiveTracking/>
      </div>
      <div className='h-1/5 p-6 flex items-center justify-between relative' >
      <h5 className='p-1 text-center absolute w-[90%] top-0'><i className="text-3xl text-gray-400 ri-arrow-up-wide-line"></i></h5>
      <button 
  className="bg-gray-300 text-gray-700 font-semibold p-3 px-12 rounded-lg" onClick={loadAddress} // Call the function
>
  SP
</button>

<button 
  disabled={!spClicked} 
  onClick={() => {
    setFinishParkPanel(true);
    handleSpClick();
  }} 
  className={`bg-gray-300 text-gray-700 font-semibold p-3 px-12 rounded-lg ${spClicked ? '' : 'opacity-50 cursor-not-allowed'}`} 
  
>
  Complete Parking
</button>
        </div>
        <div ref={finishParkPanelRef} className="fixed w-full h-screen z-10 translate-y-full bottom-0 bg-white px-3 py-12">
          <FinishParking isHandoverRequested={isHandoverRequested} park={parkData} setFinishParkPanel={setFinishParkPanel}/>
        </div>  
        
    </div>
  )
}

export default MrParkerParking