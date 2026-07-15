import React from 'react'
import DriverNavbar from '../../../lib/DriverNavbar'
import HomeMap from '../../map/HomeMap'
import Drivermap from '../../map/Drivermap'
import AcceptRides from '../acceptrides/AcceptRides'

function DriverTrips() {

    return (

        <div className=' bg-[#08080F] h-screen w-full'>
            <DriverNavbar />
            <div className='flex '>
                <div className='flex-1 mt-4  ml-4'>
                    <Drivermap />
                </div>
                <div className=' w-[350px] border-l p-3 '>
                   <AcceptRides/>
                </div>

            </div>

        </div>
    )
}

export default DriverTrips
