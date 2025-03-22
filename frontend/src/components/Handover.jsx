import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Handover = (props) => {
  const [inputOtp, setInputOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [isPaying, setIsPaying] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setGeneratedOtp(props.otp)
  }, [props.otp])

  const handlePayClick = () => {
    setIsPaying(true)
    setTimeout(() => {
      setIsPaying(false)
      setIsPaid(true)
    }, 3000)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    navigate('/home')
  }

return (
    <div>
        <div className='flex items-center justify-between'>
            <img className="h-14" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="vscd" />
            <div className='text-right'>
                <h2 className='text-lg font-medium'>
                    {props.park?.mrparker.fullname.firstname} {props.park?.mrparker.fullname.lastname}
                </h2>
                <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ props.park?.user.vehicle.plate }</h4>
                <p className='text-sm text-gray-600'>do not share the OTP unless Mr.Parker holds back your vehicle</p>
                <h1 className='text-lg font-semibold'>{generatedOtp}</h1>
            </div>
        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-fill"></i>
                    <div><h3 className='text-lg font-medium'>
                        Handover in Process
                    </h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.park?.pickup}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-money-rupee-circle-line"></i>
                    <div><h3 className='text-lg font-medium'>
                        Rupees {props.park?.fare}
                    </h3>
                        <p className='text-sm -mt-1 text-gray-600'>Click Pay to complete the payment</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-circle-line"></i>
                    <div><h3 className='text-lg font-medium'>
                        Status: {props.park?.status}
                    </h3>
                        
                    </div>
                </div>
                <button 
                    onClick={handlePayClick} 
                    disabled={isPaying || isPaid} 
                    className='w-full mt-5 bg-yellow-400 text-white font-semibold p-2 rounded-lg flex items-center justify-center'
                >
                    {isPaying ? (
                    <span className="loader"></span>
                    ) : isPaid ? (
                    <span>✔</span>
                    ) : (
                    "Pay"
                    )}
                </button>
                {isPaid && (
                    <button 
                    onClick={submitHandler} 
                    className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'
                    >
                    Done
                    </button>
                )}
            </div>
        </div>
    </div>
)
}

export default Handover