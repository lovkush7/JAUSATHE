import React from 'react'
import Navbar from '../../molecules/navbar/Navbar'
import Searching from '../../atoms/Driver/searching/Searching'

const MyRides = () => {
  return (
    <div className='w-full h-screen bg-[#08080F] '>
      <Navbar />
      <div className='flex '>
        <div className='flex-1'>
          <Searching />
        </div>

      </div>


    </div>
  )
}

export default MyRides
