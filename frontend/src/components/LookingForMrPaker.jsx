import React from 'react'

const LookingForMrPaker = (props) => {
  return (  
    <div>
      {/*<div className='ml-0 -mt-12'>hi</div>*/}
      <h3 className='text-2xl font-semibold mb-5'>Looking for a Mr.Parker</h3>
      <div className='flex gap-2 justify-between flex-col items-center'>
        <img src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="vscd" />
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-fill"></i>
            <div><h3 className='text-lg font-medium'>
            {props.pickup}
            </h3>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="text-lg ri-money-rupee-circle-line"></i>
            <div><h3 className='text-lg font-medium'>
              Rupees{props.fare[props.vehicleType]}
            </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash or Select Mode of Payment at Mr.Parker</p>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default LookingForMrPaker