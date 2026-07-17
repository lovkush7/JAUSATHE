import { ArrowBigLeft, Check, MessageCircleMore, MoveRight, Phone, X } from 'lucide-react'
import React from 'react'
import { Button } from '../../../components/ui/button'
import { api } from '../../../api/Api'
import useScoket from '../../../zustand/socket.config'
import { useQuery } from '@tanstack/react-query'
import Driverrouting from '../../../utils/mapevent/Driverrouting'

const acceptride = async (rideId: string) => {
    const req = await api.get("/ride/getacceptRide", {
        params: {
            rideId
        }

    })
    return req.data;
}

const AcceptRides = () => {
    const { newRide } = useScoket()
    const { data } = useQuery({
        queryKey: [newRide],
        queryFn: () => acceptride(newRide?.rideId!),
        enabled: !!newRide?.rideId
    })
    console.log("the new ride ", data)
    const Trips = [
        {
            Name: " priya sharma",
            pickup: 'Dhulikhel',
            Dropoff: 'banepa',
            img: "/logo.png",
            price: "200",
            Date: "10:10",
            rate: "2.5"
        },
        {
            Name: " priya sharma",
            pickup: 'Dhulikhel',
            Dropoff: 'banepa',
            img: "/logo.png",
            price: "200",
            Date: "10:10",
            rate: "2.5"
        },


    ]
  const driverPosition =
  data?.driver?.CurrentLocation
    ? [
        data.driver.CurrentLocation.coordinates[1],
        data.driver.CurrentLocation.coordinates[0],
      ] as [number, number]
    : undefined;

const riderPosition =
  data?.pickupLocation
    ? [
        data.pickupLocation.coordinates[1],
        data.pickupLocation.coordinates[0],
      ] as [number, number]
    : undefined;
    return (
        <div>
            {
                newRide && 
            <div className='bg-[#0E1328]  rounded-lg border-2 border-[#3B3B4F] p-4' >
                <div className='flex gap-2  items-center'>
                    <p className='text-green-500 bg-green-500 w-2 h-2 rounded-full'></p>
                    <p className='text-sm text-green-500'>Active trips</p>
                </div>
                <div className='flex justify-between items-center mt-5'>
                    <div className='flex gap-2.5'>
                        <img src="/logo.png" alt="" className='w-10 h-10 rounded-lg ' />
                        <div className='flex gap-0.1 flex-col'>
                            <p className='font-bold text-2xl text-white'>{data?.rider.FullName}</p>
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
                    <Button
                        className='px-8 py-6 rounded-lg border-2 border-gray-400
                      text-white  bg-red-500'><span><X /> </span> cancle</Button>
                    <Button


                        className='px-8 py-6 rounded-lg bg-gradient-to-r
                     from-cyan-500 to-blue-500  text-white '><span><Check /> </span> Pickup</Button>
                </div>
            </div>}
            <div className="bg-[#0E1328] mt-2.5 text-white rounded-lg border-2 border-[#3B3B4F] p-4">
                <p className="font-bold">Today's completed trips</p>

                <div className="mt-3 max-h-80 overflow-y-auto">
                    {Array.isArray(Trips) &&
                        Trips.map((dta, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-center p-2">
                                    <div className="flex gap-5 items-center">
                                        <img
                                            className="w-9 h-9 rounded-lg"
                                            src={dta.img}
                                            alt="photo"
                                        />

                                        <div>
                                            <p className="font-bold">{dta.Name}</p>

                                            <div className="text-gray-500 text-sm flex gap-1 items-center">
                                                <span>{dta.pickup}</span>
                                                <MoveRight size={19} />
                                                <span>{dta.Dropoff}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p>NRP {dta.price}</p>
                                        <p className="text-gray-500 text-sm">
                                            Rate {dta.rate}
                                        </p>
                                    </div>
                                </div>

                                <hr className="border-gray-600" />
                            </div>
                        ))}
                </div>
            </div>
            
        </div>
        
    )
  
}

export default AcceptRides
