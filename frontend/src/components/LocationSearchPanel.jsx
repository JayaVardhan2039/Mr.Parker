import React from 'react'

const LocationSearchPanel = (props) => {
    console.log(props)
    //sample array for location
    const locations = [
        "D.No 20-4-29/1, Durgavanipalem, Pedangantyada",
        "123 Main Street, Springfield, IL 62704, USA",
        "45 Rue de Rivoli, 75004 Paris, France",
        "10 Downing Street, London, SW1A 2AA, United Kingdom",
        "7-1 Hongo, Bunkyo City, Tokyo 113-0033, Japan",
        "Sydney Opera House, Bennelong Point, Sydney NSW 2000, Australia",
      ];
  return (
    <div>
  {/* This is just sample data */}
  
  <div className='flex gap-4 my-2 items-center justify-start mb-8'>
    <h2 className='bg-[#eee] h-8 w-36 flex items-center justify-evenly font-medium rounded-full text-base'>
      <i className="ri-time-fill text-xl"></i>Set a Time
    </h2>
    </div>

    {
    locations.map(function(elem,index){

return <div key={index} onClick={()=>{props.setVehiclePanel(true)
    props.setPanelOpen(false)
}} className='flex gap-4 border-2  border-gray-100 active:border-black rounded-xl  my-4 items-center justify-start'>
    <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
      <i className="ri-map-pin-2-fill text-xl"></i>
    </h2>
    <h4 className='font-medium break-words max-w-[80%]'>{elem}</h4>
  </div>
    })
  }

  <div className='flex gap-4 border-2  border-gray-100 active:border-black rounded-xl  my-4 items-center justify-start'>
    <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
      <i className="ri-crosshair-2-fill text-xl"></i>
    </h2>
    <button onClick={()=>{console.log("clicked")}}><h4 className='font-medium break-words '>
      Your Current Location
    </h4></button>
    
  </div>
</div>
  )
}

export default LocationSearchPanel