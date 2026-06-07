import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CarFront, CarTaxiFront, Motorbike, Van } from 'lucide-react'
import React from 'react'

const BookRide = ({Locations}:any) => {
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
                     border-gray-500 rounded-md w-full p-4' >{Locations?.lat}, {Locations?.lng}</p>
                </div>
                <div className='flex gap-2 items-center justify-center'>
                    <div className='w-2 h-2 rounded-full bg-purple-600'></div>
                    <Input placeholder='Where to go?' className='outline- placeholder:text-white bg-[#222233] text-gray-400 border border-gray-500 rounded-md w-full p-4' />
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
            <Button className=' m-3 p-5 w-full bg-[#1B96D9]'>Book Ride</Button>
        </div>

    )
}

export default BookRide
