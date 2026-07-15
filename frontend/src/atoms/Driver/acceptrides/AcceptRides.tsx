import { MessageCircleMore, Phone } from 'lucide-react'
import React from 'react'
import { Button } from '../../../components/ui/button'

const AcceptRides = () => {
    return (
        <div className='bg-[#0E1328]  rounded-lg border-2 border-[#3B3B4F] p-4' >
            <div className='flex gap-2  items-center'>
                <p className='text-green-500 bg-green-500 w-2 h-2 rounded-full'></p>
                <p className='text-sm text-green-500'>Active trips</p>
            </div>
            <div className='flex justify-between items-center mt-5'>
                <div className='flex gap-2.5'>
                    <img src="/logo.png" alt="" className='w-10 h-10 rounded-lg ' />
                    <div className='flex gap-0.1 flex-col'>
                        <p className='font-bold text-2xl text-white'>lov karki</p>
                        <p className='text-sm text-gray-600'>Rating: <span>2.5</span></p>
                    </div>
                </div>
                <div className='flex gap-0.5 '>
                   <Button className='bg-gray-800 p-3' > <Phone className=''/> </Button>
                   <Button className='bg-gray-800 p-3'><MessageCircleMore/> </Button>
                </div>
            </div>
        </div>
    )
}

export default AcceptRides
