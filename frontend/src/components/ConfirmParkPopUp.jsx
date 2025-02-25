import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmParkPopUp = (props) => {

    const [otp, setOtp] = useState('')
    const navigate = useNavigate()


    const submitHandler = async (e)=>{
    e.preventDefault()

    const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/parks/start-park`,{
        params:{
          parkId:props.park._id,
        otp:parseInt(otp)
        },
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        
    })

    if(response.status===200){
        props.setConfirmParkPopUpPanel(false)
        props.setParkPopUpPanel(false)
        navigate('/mrparker-parking', { state: { park: props.park } })
    }


    }
  return (
    <div>
      <h5 className='p-1 text-center absolute top-0 w-[93%]' onClick={() => props.setParkPopUpPanel(false)}><i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Confirm to Start</h3>
      <div className='flex items-center justify-between p-3 bg-yellow-300 rounded-lg mt-3'>
        <div className='flex items-center gap-3'>
        <img className='h-12 w-12 rounded-full object-cover' src="https://tse4.mm.bing.net/th?id=OIP.I3bHrPM06IgZd93C91B2sgHaFj&pid=Api&P=0&h=180" alt="" />
        <h2 className='text-xl font-medium'>
            {props.park?.user.fullname.firstname} {props.park?.user.fullname.lastname}   
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
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
            <input value={otp} type="text" onChange={(e)=>setOtp(e.target.value)}
            className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3'  placeholder='Enter OTP'/>
        <button onClick={()=>{}} className='w-full mt-5 flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>confirm</button>
        <button onClick={()=>{props.setConfirmParkPopUpPanel(false)
            props.setParkPopUpPanel(false)
        }} className='w-full mt-1 bg-red-600 text-white font-semibold p-3 rounded-lg'>Cancel</button>
       
        </form>
        </div>
</div>
    </div>
  )
}

export default ConfirmParkPopUp