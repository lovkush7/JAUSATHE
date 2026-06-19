import React from 'react'
import { Button } from '../../../components/ui/button'
import { Check, Cross, User, X } from 'lucide-react'

export default function Driverhome() {
  const data = [
    {
      cost: "95",
      pickup: "Dhulikhel",
      destination: "kathmandu",
      username: "love",
      km:"14",
      away: "2"
    }
  ]
  return (

    <div className='bg-[#0E1328] p-4 rounded-lg border-2 border-[#3B3B4F]'>
      <p className='text-sm font-bold text-white'>New Ride Request</p>
      
      {data && Array.isArray(data) && data.map((dta) => (
        <div>
          <p className='m-2 font-bold text-white'>NRP{dta.cost}</p>
         <div className='flex gap-3 mt-4'>
        <div className='bg-[#182030] rounded-lg flex-1 justify-center items-center p-3 '>
          <p className='text-sm font-bold text-green-500'>PICKUP</p>
          <p className='text-[14px] text-white'>{dta.pickup}</p>
          <p className='text-[12px] text-gray-600 mb-0'>{dta.away}km <span>away</span></p>
        </div>
        <div className='bg-[#182030] rounded-lg flex-1 justify-center items-center p-3'>
          <p className='text-sm font-bold text-purple-600'>Drop</p>
          <p className='text-[14px] text-white'>{dta.destination}</p>
          <p className='text-[12px] text-gray-600 mb-0'>{dta.km}km <span>total</span></p>
        </div>
      </div>
      <div className='mt-4 mb-4 flex gap-1  items-center'>
      <User size={15} className='text-purple-700'/> 
      <p className='text-purple-700 text-sm'>{dta.username}</p>
      </div>
      <div className='flex gap-4 justify-center mt-5'>
       <Button className='px-8 py-6 rounded-lg border-2 border-gray-400  text-red-600 bg-transparent'><span><X/> </span> Decline</Button>
        <Button className='px-8 py-6 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500  text-white '><span><Check/> </span> Accept</Button>
      </div>
      </div>
      ))

      }
    </div>

  )
}
