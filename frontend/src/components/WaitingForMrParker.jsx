import React from 'react'

const WaitingForMrParker = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center absolute top-0 w-[93%]' onClick={() => props.WaitingForMrParker(false)}><i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i></h5>

      <div className='flex items-center justify-between'>
        <img className="h-14" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="vscd" />
        <div className='text-right'>
          <h2 className='text-lg font-medium'>
            Jaya
          </h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>AB02 AS 0554</h4>
          <p className='text-sm text-gray-600'>Maruti suzuki Alto</p>
        </div>
      </div>


      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-fill"></i>
            <div><h3 className='text-lg font-medium'>
              562/11-A
            </h3>
              <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab,Ahmedabad</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="text-lg ri-money-rupee-circle-line"></i>
            <div><h3 className='text-lg font-medium'>
              Rupees 193.20
            </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForMrParker