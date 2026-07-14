import React, { use, useEffect, useState } from 'react'
// import { Button } from '../../../components/ui/button'
import { Check, Cross, User, X } from 'lucide-react'
import { api } from '../../../api/Api'
import { useQuery } from '@tanstack/react-query'
import useScoket from '../../../zustand/socket.config'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
const getride = async () => {
  try {
    const req = await api.get("driver/myprofile" )
    console.log("my driverisid ", req.data)
    return req.data;
  } catch (error) {
    console.error("Error fetching ride data:", error)
    throw error
  }

}
export default function Driverhome() {
  const [open, setopen] = useState(false)
  const data = [
    {
      cost: "95",
      pickup: "Dhulikhel",
      destination: "kathmandu",
      username: "love",
      km: "14",
      away: "2"
    }
  ]
  const {authUser} = useScoket()
  const { listenToRides, Socket, nonlistentorides, newRide } = useScoket()
  useEffect(() => {
    if (!Socket) return;
 listenToRides()

    return () => nonlistentorides()
  }, [Socket])

  useEffect(()=>{
      
    if(newRide){
    setopen(true)
    }
  },[newRide])
  console.log("the new ride is ", newRide)

  const { data: driver } = useQuery({
    queryKey: ["rides"],
    queryFn: () => getride()
  })
  console.log("the rides are ", driver?.id)
  return (
   
   
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent className="z-[999999] fixed bg-[#0E1328]  rounded-lg border-2 border-[#3B3B4F]"> 
        {/* <DialogHeader> */}
          <DialogDescription>
             {newRide &&(
            <div className='bg-[#0E1328] p-4'>
              <p className='text-sm font-bold text-white'>New Ride Request</p>

              {data && Array.isArray(data) && data.map((dta) => (
                <div>
                  <p className='m-2 font-bold text-white'>NRP {newRide.estimatefare}</p>
                  <div className='flex gap-3 mt-4'>
                    <div className='bg-[#182030] rounded-lg flex-1 justify-center items-center p-3 '>
                      <p className='text-sm font-bold text-green-500'>PICKUP</p>
                      <p className='text-[14px] text-white'>{newRide.pickupAddress}</p>
                      <p className='text-[12px] text-gray-600 mb-0'>{dta.away}km <span>away</span></p>
                    </div>
                    <div className='bg-[#182030] rounded-lg flex-1 justify-center items-center p-3'>
                      <p className='text-sm font-bold text-purple-600'>Drop</p>
                      <p className='text-[14px] text-white'>{newRide.DropoffAddress}</p>
                      <p className='text-[12px] text-gray-600 mb-0'>{dta.km}km <span>total</span></p>
                    </div>
                  </div>
                  <div className='mt-4 mb-4 flex gap-1  items-center'>
                    <User size={15} className='text-purple-700' />
                    <p className='text-purple-700 text-sm'>{}</p>
                  </div>
                  <div className='flex gap-4 justify-center mt-5'>
                    <Button onClick={()=>
                    {
                      Socket?.emit("reject-ride",  {
                           rideId:newRide.rideId,
                           DriverId: driver?.id,
                           vechiclesId:  driver?.vechicles?.id
                          })
                      setopen(false)} 
                    }className='px-8 py-6 rounded-lg border-2 border-gray-400
                      text-red-600 bg-transparent'><span><X /> </span> Decline</Button>
                    <Button onClick={
                      ()=>{
                        Socket?.emit("ride-accept", 

                          {
                           rideId:newRide.rideId,
                           DriverId: authUser?.id,
                           vechiclesId:  driver?.vechicles?.id
                          }
                        
                        )
                        setopen(false)
                      }
                    }
                    
                    className='px-8 py-6 rounded-lg bg-gradient-to-r
                     from-cyan-500 to-blue-500  text-white '><span><Check /> </span> Accept</Button>
                  </div>
                </div>
              ))

              }
            </div>
             )}

          </DialogDescription>
        {/* </DialogHeader> */}
      </DialogContent>
    </Dialog>



  )
}
