import React from 'react'

const VehicleComponents = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center absolute top-0 w-[93%]' onClick={()=>props.setVehiclePanel(false)}><i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i></h5>
          <h3 className='text-2xl font-semibold mb-5'>Choose a vehicle</h3>
          <div onClick={()=>props.setConfirmParkPanel(true)} className='flex border-2 active:border-black mb-2 rounded-lg w-full p-3  items-center justify-between'>
            <img className='h-10' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="vscd"/>
            <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-lg'>
                Maruthi suzuki<span><i className="ri-user-fill">4</i></span>
              </h4>
              <h5 className='font-medium text-sm'>2 min away</h5>
            </div>
            <h2 className='text-lg font-semibold'>193$</h2>
          </div>
          <div onClick={()=>props.setConfirmParkPanel(true)} className='flex border-2 active:border-black mb-2 rounded-lg w-full p-3  items-center justify-between'>
            <img className='h-10' src="https://static.vecteezy.com/system/resources/previews/019/544/488/non_2x/modern-car-isolated-on-transparent-background-3d-rendering-illustration-free-png.png" alt="vscd"/>
            <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-lg'>
                Maruthi suzuki<span><i className="ri-user-fill">4</i></span>
              </h4>
              <h5 className='font-medium text-sm'>2 min away</h5>
            </div>
            <h2 className='text-lg font-semibold'>193$</h2>
          </div>
          <div onClick={()=>props.setConfirmParkPanel(true)} className='flex border-2 active:border-black mb-2 rounded-lg w-full p-3  items-center justify-between'>
            <img className='h-10' src="https://static.vecteezy.com/system/resources/previews/019/391/069/non_2x/modern-car-isolated-on-transparent-background-3d-rendering-illustration-free-png.png" alt="vscd"/>
            <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-lg'>
                Posh car<span><i className="ri-user-fill">4</i></span>
              </h4>
              <h5 className='font-medium text-sm'>4 min away</h5>
            </div>
            <h2 className='text-lg font-semibold'>193$</h2>
          </div>
          <div onClick={()=>props.setConfirmParkPanel(true)} className='flex border-2 active:border-black mb-2 rounded-lg w-full p-3  items-center justify-between'>
            <img className='h-10' src="http://clipart-library.com/images_k/cars-transparent-background/cars-transparent-background-21.png" alt="vscd"/>
            <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-lg'>
                Posh car<span><i className="ri-user-fill">4</i></span>
              </h4>
              <h5 className='font-medium text-sm'>4 min away</h5>
            </div>
            <h2 className='text-lg font-semibold'>193$</h2>
          </div>
    </div>
  )
}

export default VehicleComponents