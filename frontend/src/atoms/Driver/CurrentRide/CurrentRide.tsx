import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { api } from '../../../api/Api'
import useRide from '../../../zustand/userride'
import { MessageCircleMore, Phone, X } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import uselocation from '../../../zustand/location'

const RideDriverData =  async(RideId:string)=>{
  const res = await api.get("ride/GetDriver",
    {
      params:{
        RideId
      }
    }
  )
  return res.data
}

const CurrentRide = () => {

  const {ride} = useRide()
  const {getdriverpos,getpickuppros}  = uselocation()

  const {data} = useQuery({
    queryKey: [ "data" ],
    queryFn: ()=>RideDriverData(ride?.id!)
  })
  console.log("data,",data)
 
 useEffect(() => {
  if (!data) return;

  getdriverpos({
    lat: data.driver.CurrentLocation.coordinates[1],
    lng: data.driver.CurrentLocation.coordinates[0],
  });

  getpickuppros({
    lat: data.pickupLocation.coordinates[1],
    lng: data.pickupLocation.coordinates[0],
  });
}, [data, getdriverpos, getpickuppros]);
  return (
    <div>
       <div className='bg-[#0E1328]  rounded-lg border-2 border-[#3B3B4F] p-4 mt-2 mb-2' >
              <span className='text-white font-bold'>Driver Found </span>
       </div>
         <div className='bg-[#0E1328]  rounded-lg border-2 border-[#3B3B4F] p-4' >
                <div className='flex gap-2  items-center'>
                    <p className='text-green-500 bg-green-500 w-2 h-2 rounded-full'></p>
                    <p className='text-sm text-green-500'>Active trips</p>
                </div>
                <div className='flex justify-between items-center mt-5'>
                    <div className='flex gap-2.5'>
                        <img src="/logo.png" alt="" className='w-10 h-10 rounded-lg ' />
                        <div className='flex gap-0.1 flex-col'>
                            <p className='font-bold text-2xl text-white'>{data?.driver.user.FullName}</p>
                            <p className='text-sm text-gray-600'>Rating: <span>2.5</span></p>
                        </div>
                    </div>
                    <div className='flex gap-0.5 '>
                        <Button className='bg-gray-800 p-3' > <Phone className='' /> </Button>
                        <Button className='bg-gray-800 p-3'><MessageCircleMore /> </Button>
                    </div>

                </div>
                <div className='flex gap-3 mt-3 '>
                    <div className='bg-[#182030] rounded-lg flex flex-1 justify-between  p-3 '>
                        <p className='text-white font-bold'>FARE </p>
                        <p className='text-white'>NRP<span>{data?.estimatedFare}</span></p>
                    </div>
                </div>
                <div className='flex gap-3 mt-4'>
                    <div className='bg-[#182030] rounded-lg flex-1 justify-center items-center p-3 '>
                        <p className='text-sm font-bold text-green-500'>PICKUP</p>
                        <p className='text-[14px] text-white'>{data?.pickupAddress}</p>
                        <p className='text-[12px] text-gray-600 mb-0'>{data?.estimatedDistance}km <span>away</span></p>
                    </div>
                    <div className='bg-[#182030] rounded-lg flex-1 justify-center items-center p-3'>
                        <p className='text-sm font-bold text-purple-600'>Drop</p>
                        <p className='text-[14px] text-white'>{data?.DropoffAddress}</p>
                        <p className='text-[12px] text-gray-600 mb-0'>{data?.estimatedDistance}km <span>total</span></p>
                    </div>
                </div>
                <div className='flex gap-4 justify-center mt-5'>
                  
                   
                </div>
                
            </div>
            
            
        
        
    </div>
  )
}

export default CurrentRide
