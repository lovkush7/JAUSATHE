import React, { useState } from 'react'
import Map from '../map/Map'
import { Button } from '../../components/ui/button'

const vechicles = [
  {
    type: "car",
    icons: "🚗",
    spec: "confortable 1-4 persons"
  },
  {
    type: "Bike",
    icons: "🏍️",
    spec: "fastest for 1 persons",
  },
  {
    type: "taxi",
    icons: "🚕",
    spec: "suitable for 4 persons"
  },

]

const ConformRides = () => {
  const [isActive, SetIsActive] = useState(null)
  const [vechiclestype, setVechiclestype] = useState(null)
  console.log("the vehicles is ",vechiclestype)

  return (
    <div className="w-full h-screen flex  justify-center bg-[#08080F] text-white ">
      <div className='flex-1 mt-5 rounded-2xl '>
        <Map />
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
        <div className='mt-4 bg-[#161628] p-4 rounded-lg border-2 border-[#3B3B4F]'>
          {Array.isArray(vechicles) && vechicles.map((v, index: any) => (
            <div
              onClick={(e: any) => { 
                e.preventDefault()
                setVechiclestype(v.type as any)
                SetIsActive(index)
              }}
              className={`w-full p-4 border rounded-lg mt-2 transition-all duration-200
              ${isActive === index
                  ? "bg-[#1C1B3B] text-[#4F46E5] border-[#4F46E5]"
                  : "bg-[#222233] border-gray-700"
                }`
              }
            >
              <div className='flex justify-between items-center '>
                <div className='flex gap-2 items-center '>
                  {v.icons}
                  <p className='flex flex-col gap-0.3'>
                    {v.type}
                    <span className='text-sm text-gray-500'>{v.spec}</span> </p>
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='font-bold'>NRP :20</p>
                  <p className='text-sm text-gray-600'>3 MIN</p>

                </div>

              </div>
            </div>
          ))}
        </div>
        <Button className='w-full p-5 rounded-2xl bg-blue-800 mt-4 '>Continue - fare estimation</Button>
      </div>

    </div>
  )
}

export default ConformRides
