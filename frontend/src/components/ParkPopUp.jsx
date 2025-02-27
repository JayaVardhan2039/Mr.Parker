import React from 'react'

const ParkPopUp = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center absolute top-0 w-[93%]' onClick={() => props.setParkPopUpPanel(false)}><i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>A New Job for you!</h3>
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
          <div className='flex items-center gap-5 p-3'>
            <i className="text-lg ri-money-rupee-circle-line"></i>
            <div><h3 className='text-lg font-medium'>
              Handover time {props.park?.time}
            </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between mt-5 w-full'>
          <button onClick={() => { props.setParkPopUpPanel(false) }} className=' bg-gray-300 text-gray-700 font-semibold p-3 px-12 rounded-lg'>Ignore</button>

          <button onClick={() => {
            props.setConfirmParkPopUpPanel(true)
            props.confirmPark()
          }} className=' bg-green-600 text-white font-semibold p-3 px-12 rounded-lg'>Accept</button>

        </div>
      </div>
    </div>
  )
}

export default ParkPopUp