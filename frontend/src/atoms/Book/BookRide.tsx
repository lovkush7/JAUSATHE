import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CarFront, CarTaxiFront, Motorbike, Van } from 'lucide-react'
import React, { useState } from 'react'
import { api } from '../../api/Api'
import uselocation from '../../zustand/location'
type locationType ={
    lat: number,
    lng: number
}
const sendlocations = async(
   locations: any
)=>{
    
    const res = await api.get("/geocoading/geocode",{
        params:{
        address: locations
        }
    
    })
    return res.data;
}
const [Locations , setLocations] = useState<locationType | null>(null)
const {currentdestination} = uselocation()
const handlesubmit = (e:any) =>{
e.preventDefault()


}

const BookRide = () => {
    console.log("mero location", Locations)
    const vechicles = [
        {
            type: "Electric",
            icons: <CarFront />
        },
        {
            type: "Bike",
            icons: <Motorbike />
        },
        {
            type: "fuel_Car",
            icons: <CarTaxiFront />
        },
        {
            type: "tampo",
            icons: <Van />
        }
    ]
    const {data} = useQuery({
        queryKey: ["locations"],
        queryFn: ()=>sendlocations(Locations),
        enabled: Locations !== null
    })


    return (
        <div className='flex flex-col gap-2 mt-4 w-full items-center justify-center bg-[#161628] rounded-xl pb-6 pt-4 border border-gray-700 pl-1 pr-1'>
            <div className='flex justify-start'>
                <h2 className='text-white text-sm font-semibold'>Quick book</h2>
            </div>
            <div className='flex flex-col gap-2 w-full  p-2 ml-2 '>
                <div className='flex gap-2 items-center justify-center'>
                    <div className='w-2 h-2 rounded-full bg-green-600'></div>
                    <p  
                    className='outline- placeholder:text-white bg-[#222233] text-gray-400 border
                     border-gray-500 rounded-md w-full p-4' >{data}</p>
                </div>
                <div className='flex gap-2 items-center justify-center'>
                    <div className='w-2 h-2 rounded-full bg-purple-600'></div>
                    <Input placeholder='Where to go?'  onChange={(e)=>sendlocations(e.target.value)} className='outline- placeholder:text-white bg-[#222233]
                     text-gray-400 border border-gray-500 rounded-md w-full p-4' />
                </div>
            </div>
            <div className="flex flex-wrap gap-4 p-2 justify-center">
                {vechicles.map((car) => (
                    <div
                        key={car.type}
                        className="w-[140px] bg-[#222233] text-white p-4 rounded-xl cursor-pointer border border-gray-700"
                    >
                        <div className="flex justify-between items-center">
                            <p>{car.type}</p>
                            {car.icons}
                        </div>
                    </div>
                ))}
            </div>
            <Button onClick={handlesubmit} className=' m-3 p-5 w-full bg-[#1B96D9]'>Book Ride</Button>
        </div>

    )
}

export default BookRide
