import BookRide from '@/atoms/Book/BookRide'
import Map from '@/atoms/map/Map'
import Navbar from '@/molecules/navbar/Navbar'
import React from 'react'

const Home = () => {
  return (
    <div className=' bg-[#08080F] h-screen w-full'>
      <Navbar />
      <div className='flex '>
        <div className='flex-1'>
          <Map />
        </div>
        <div className='w-[350px] border-l p-3 '>
          <BookRide />
        </div>
      </div>
        <div className='text-white'>
          
        </div>
    </div>
  )
}

export default Home
