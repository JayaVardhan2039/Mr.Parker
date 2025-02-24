import React from 'react'
import { useContext } from 'react'
import { MrParkerDataContext } from '../Context/MrParkerContext'

const MrParkerDetails = () => {
  const { mrParker } = useContext(MrParkerDataContext)
  return (
    <div><div className='flex items-center justify-between'>
    <div className='flex items-center justify-start gap-3'>
      <img className="h-10 w-10 rounded-full object-cover" src="https://tse1.mm.bing.net/th?id=OIP.irrwNUlWRwXVio_sQb4SrgHaE8&pid=Api&P=0&h=180" alt="" />
      <h4 className='text-lg font-medium'>{ mrParker.fullname.firstname + " " + mrParker.fullname.lastname }</h4>
    </div>
    <div>
      <h4 className='text-xl font-semibold '>$295.8</h4>
      <p className='text-sm text-gray-600'>Earned</p>
    </div>
  </div>
  <div className='flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
    <div className='text-center'><i className="text-3xl mb-2 font-thin ri-time-line"></i>
    <h5 className='text-lg font-medium'>10.2</h5>
    <p className='text-sm text-gray-600'>Hours Online</p></div>
    <div className='text-center'><i className="text-3xl mb-2 font-thin ri-speed-up-line">
    <h5 className='text-lg font-medium'>10.2</h5>
    <p className='text-sm text-gray-600'>Hours Online</p></i></div>
    <div className='text-center'><i className="text-3xl mb-2 font-thin ri-booklet-line">
    <h5 className='text-lg font-medium'>10.2</h5>
    <p className='text-sm text-gray-600'>Hours Online</p></i></div>
  </div></div>
  )
}

export default MrParkerDetails