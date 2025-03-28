import React, { useState, useRef, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Handover from '../components/Handover'
// Add this import
import axios from 'axios'
import { SocketContext } from '../Context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking';

const Parking = ({ timeLeft }) => {
  const location = useLocation();
  const { park } = location.state;
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()
  const [otpPanel, setOtpPanel] = useState(false)
  const [otp, setOtp] = useState('')
  const otpPanelRef = useRef(null)
  const [statusMessage, setStatusMessage] = useState('hehe')

  socket.on('park-ended', () => {
    navigate('/home')
  })

  const requestOtp = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/parks/request-otp`, {
      params: { parkId: park._id },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setOtp(response.data.otp);
    setOtpPanel(true);
    if (timeLeft>10 || timeLeft==null) {
      socket.emit('request-handover', { parkId: park._id });
    }
  }



  useEffect(() => {
    socket.on('sp-clicked', (data) => {
      console.log(data.message)
      setStatusMessage(data.message)
    });

    socket.on('trigger-request-otp', () => {
      requestOtp();
    });

    return () => {
      socket.off('sp-clicked');
      socket.off('trigger-request-otp');
    };
  }, [socket])

  useEffect(() => {
    if (timeLeft === 0) {
      requestOtp();
    }
  }, [timeLeft]);

  useGSAP(() => {
    if (otpPanel) {
      gsap.to(otpPanelRef.current, { transform: 'translateY(0%)' })
    } else {
      gsap.to(otpPanelRef.current, { transform: 'translateY(100%)' })
    }
  }, [otpPanel])

  return (
    <div className='h-screen'>

      <div className='h-1/2'>
        <LiveTracking />
        <Link to='/home' className='fixed left-3 top-3 h-10 w-10 bg-white flex items-center k justify-center rounded-full'>
          <i className="text-lg font-medium ri-home-4-fill"></i>
        </Link>
      </div>
      <div className='h-1/2 p-4'>
        <div className='flex items-center justify-between'>
          <img className="h-14" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="vscd" />
          <div className='text-right'>
            <h2 className='text-lg font-medium'>
              {park?.mrparker.fullname.firstname} {park?.mrparker.fullname.lastname}
            </h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{park?.user.vehicle.plate}</h4>
            <p className='text-sm text-gray-600'>your vehicle info</p>
          </div>
        </div>
        <div className='flex gap-2 justify-between flex-col items-center'>
          <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-lg ri-map-pin-fill"></i>
              <div><h3 className='text-lg font-medium'>
                Pickup Completed
              </h3>
                <p className='text-sm -mt-1 text-gray-600'>{park?.pickup}</p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-lg ri-money-rupee-circle-line"></i>
              <div><h3 className='text-lg font-medium'>
                Rupees {park?.fare}
              </h3>

              </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
              <i className="text-lg ri-information-line"></i>
              <div>
                <h3 className={`text-lg font-medium ${statusMessage=='hehe' ? 'text-yellow-600' :'text-green-500' }`}>
                  {statusMessage=='hehe' ? 'Not yet parked' : `Your vehicle is parked at ${statusMessage}`}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <button onClick={requestOtp} className='w-full -mt-4 bg-green-600 text-white  font-semibold p-2 rounded-lg'>Request for handover</button>

      </div><div ref={otpPanelRef} className="fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12">
        <Handover park={park} otp={otp} setOtpPanel={setOtpPanel} />
      </div>
    </div>
  )
}

export default Parking