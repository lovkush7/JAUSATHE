import React from 'react'
import DriverNavbar from '../../lib/DriverNavbar'
import HomeMap from '../../atoms/map/HomeMap'

const DriverDashboard = () => {
    return (
        <div className=' bg-[#08080F] h-screen w-full'>
            <DriverNavbar />
            <div className='flex '>
                <div className='flex-1 ml-4 mt-4'>
                    <HomeMap />
                </div>
                <div className='w-[350px] border-l p-3 '>
                    <p>hellow world</p>
                </div>
            </div>

        </div>
    )
}

export default DriverDashboard
