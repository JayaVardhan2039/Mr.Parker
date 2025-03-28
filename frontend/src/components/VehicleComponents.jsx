import React from 'react'

const VehicleComponents = (props) => {
  return (
    <div>
        <h3 className='text-2xl font-semibold mb-5'>Choose a vehicle</h3>
          <div onClick={() => {
            props.setConfirmParkPanel(true);
            props.setVehiclePanel(false);
            props.setVehicleType('car');
          }} className='flex border-2 active:border-black mb-2 rounded-lg w-full p-3  items-center justify-between'>
                        <img className='h-10' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="vscd"/>
                        <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-lg'>
                Car (4 Wheeler)
              </h4>
              <h5 className='font-medium text-sm'>2 min away</h5>
            </div>
            <h2 className='text-lg font-semibold'>₹{props.fare.car}</h2>
          </div>
          <div onClick={()=> {
            props.setConfirmParkPanel(true);
            props.setVehiclePanel(false);
            props.setVehicleType('motorcycle');
          }} className='flex border-2 active:border-black mb-2 rounded-lg w-full p-3  items-center justify-between'>
                        <img className='h-10' src="https://tse3.mm.bing.net/th?id=OIP.dpmrOvyLRZ9nxsVwjIdMIAHaGd&pid=Api&P=0&h=180" alt="vscd"/>
                        <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-lg'>
                Motorcycle (2 Wheeler)
              </h4>
              <h5 className='font-medium text-sm'>2 min away</h5>
            </div>
            <h2 className='text-lg font-semibold'>₹{props.fare.motorcycle}</h2>
          </div>
          <div onClick={()=> {
            props.setConfirmParkPanel(true);
            props.setVehiclePanel(false);
            props.setVehicleType('auto');
          }} className='flex border-2 active:border-black mb-2 rounded-lg w-full p-3  items-center justify-between'>
                        <img className='h-10' src="https://tse1.mm.bing.net/th?id=OIP.Sv9J6yKf-roz4XGCtInIhQHaGb&pid=Api" alt="vscd"/>
                        <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-lg'>
                Auto (3 Wheeler)
              </h4>
              <h5 className='font-medium text-sm'>3 min away</h5>
            </div>
            <h2 className='text-lg font-semibold'>₹{props.fare.auto}</h2>
          </div>
          <div onClick={()=> {
            props.setConfirmParkPanel(true);
            props.setVehiclePanel(false);
            props.setVehicleType('truck');
          }} className='flex border-2 active:border-black mb-2 rounded-lg w-full p-3  items-center justify-between'>
                        <img className='h-10' src="https://tse4.mm.bing.net/th?id=OIP.sPScpv8emWhd1tLqjxjr3gHaFb&pid=Api&P=0&h=180" alt="vscd"/>
                        <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-lg'>
                Truck (Heavy Vehicle)
              </h4>
              <h5 className='font-medium text-sm'>5 min away</h5>
            </div>
            <h2 className='text-lg font-semibold'>₹{props.fare.truck}</h2>
          </div>
          <div onClick={()=> {
            props.setConfirmParkPanel(true);
            props.setVehiclePanel(false);
            props.setVehicleType('business_vehicle');
          }} className='flex border-2 active:border-black mb-2 rounded-lg w-full p-3  items-center justify-between'>
                        <img className='h-10' src="https://tse1.mm.bing.net/th?id=OIP.pHer_3VkwWEYNdAAZTj8CgHaHa&pid=Api&P=0&h=180" alt="vscd"/>

            <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-lg'>
                Business Vehicle
              </h4>
              <h5 className='font-medium text-sm'>6 min away</h5>
            </div>
            <h2 className='text-lg font-semibold'>₹{props.fare.business_vehicle}</h2>
          </div>
    </div>
  )
}

export default VehicleComponents