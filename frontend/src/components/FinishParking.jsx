import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FinishParking = (props) => {
  const [inputOtp, setInputOtp] = useState('')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/parks/complete-handover`, {
        parkId: props.park._id,
        otp: parseInt(inputOtp)
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.status === 200) {
        setVerified(true)
        setError('')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify OTP')
    }
  }



  const endPark = async () => {
    if (!verified) {
      setError('Please verify OTP first')
      return
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/parks/end-park`, {
        parkId: props.park._id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.status === 200) {
        navigate('/mrparker-home')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to end park')
    }
  }

  return (
    <div>
      <h5 className='p-1 text-center absolute top-0 w-[93%]' onClick={() => props.setOtpPanel(false)}><i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Finish the Pickup</h3>
      {props.isHandoverRequested && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          User requested for handover
        </div>
      )}
      <div className='flex items-center justify-between p-3 border-2 border-yellow-300 rounded-lg mt-3'>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
        <div className='flex items-center gap-3'>
        <img className='h-12 w-12 rounded-full object-cover' src="https://tse4.mm.bing.net/th?id=OIP.I3bHrPM06IgZd93C91B2sgHaFj&pid=Api&P=0&h=180" alt="" />
        <h2 className='text-xl font-medium'>
            {props.park?.user.fullname.firstname}    
        </h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 km</h5>
      </div>
      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-fill"></i>
            <div><h3 className='text-lg font-medium'>
              562/11-A
            </h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.park?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="text-lg ri-money-rupee-circle-line"></i>
            <div><h3 className='text-lg font-medium'>
              Rupees {props.park?.fare}
            </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
        <div className='mt-6 w-full'>
        <form onSubmit={submitHandler}>
          <input 
            value={inputOtp} 
            onChange={(e) => setInputOtp(e.target.value)} 
            type="text" 
            className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' 
            placeholder='Enter OTP'
            disabled={verified} 
          />
          <button 
            type="submit" 
            className={`w-full mt-5 flex justify-center ${verified ? 'bg-gray-400' : 'bg-green-600'} text-white font-semibold p-3 rounded-lg`}
            disabled={verified}
          >
            {verified ? 'Verified' : 'Verify'}
          </button>
        </form>
        
        <button 
          onClick={endPark} 
          className={`w-full mt-5 flex justify-center ${verified ? 'bg-green-600' : 'bg-gray-400'} text-white font-semibold p-3 rounded-lg`}
          disabled={!verified}
        >
          Complete Handover
        </button>
      </div>
        
</div>
    </div>
  )
}

export default FinishParking