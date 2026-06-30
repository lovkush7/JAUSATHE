import BookRide from '@/atoms/Book/BookRide'
import Map from '@/atoms/map/Map'
import Navbar from '@/molecules/navbar/Navbar'
import React, { useEffect, useState } from 'react'
import HomeMap from '../../atoms/map/HomeMap'
import useScoket from '../../zustand/socket.config'

type LocationType = {
    lat: number,
    lng: number
}

const Home = () => {
   const [Locations, setLocations] = useState<LocationType | null>(null)
   const {authUser, checkauth} = useScoket.getState()
   useEffect(()=>{
    checkauth()
   },[authUser])
   console.log("the auth user is ", authUser)
  return (
    <div className=' bg-[#08080F] h-screen w-full'>
      <Navbar />
      <div className='flex '>
        <div className='flex-1 ml-4 mt-4'>
        <HomeMap  setLocations={setLocations}  Locations={Locations!} />
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
