import React from 'react'

const LookingForMrPaker = (props) => {
  return (  
    <div>
      <h5 className='p-1 text-center absolute top-0 w-[93%]' onClick={() => props.setConfirmParkPanel(false)}><i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Looking for a Mr.Parker</h3>
      <div className='flex gap-2 justify-between flex-col items-center'>
        <img src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="vscd" />
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-fill"></i>
            <div><h3 className='text-lg font-medium'>
              562/11-A
            </h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="text-lg ri-money-rupee-circle-line"></i>
            <div><h3 className='text-lg font-medium'>
              Rupees{props.fare[props.vehicleType]}
            </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default LookingForMrPaker