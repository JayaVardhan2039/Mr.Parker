import React from 'react'
import { Link } from 'react-router-dom'

const Parking = () => {
    return (
        <div className='h-screen'>
        
        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center k justify-center rounded-full'>
            <i className="text-lg font-medium ri-home-4-fill"></i>
        </Link>
            <div className='h-1/2'>
                <img className="h-full w-full object-cover" src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"></img>

            </div>
            <div className='h-1/2 p-4'>
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
<button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Parking