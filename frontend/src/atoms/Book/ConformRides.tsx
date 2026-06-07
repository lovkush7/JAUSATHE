import React from 'react'
import Map from '../map/Map'

const ConformRides = () => {
  
  return (
    <div className= "w-full h-screen flex  justify-center bg-[#08080F] text-white ">
        <div className='flex-1 mt-5 rounded-2xl '>
         <Map/>
        </div>
        <div className='flex-1 flex-col  m-5'>
             <div className='bg-[#161628] p-4 rounded-lg border-2 border-[#3B3B4F]'>
                <p>your Rides</p>
                <div className='w-full flex flex-col gap-2 mt-4'>
                  <p className='text-sm text-gray-400 uppercase'>pickup</p>
                  <div className='flex gap-2 items-center '>
                    <div className='bg-green-600 rounded-full w-2 h-2'></div>
                  <span className=' flex-1 bg-[#222233] p-3  rounded-lg border border-gray-700 '>Kathmandu</span>
                     </div>
                     
                  
                </div>
                 <div className='w-full flex flex-col gap-2 mt-4'>
                  <p className='text-sm text-gray-400 uppercase'>Destination</p>
                  <div className='flex gap-2 items-center '>
                    <div className='bg-purple-700 rounded-full w-2 h-2'></div>
                  <span className=' flex-1 bg-[#222233] p-3  rounded-lg border  border-gray-700'>Kathmandu</span>
                     </div>
                     
                  
                </div>
             </div>
        </div>
      
    </div>
  )
}

export default ConformRides
