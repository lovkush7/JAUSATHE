import React, { useState } from 'react'
import DriverNavbar from '../../lib/DriverNavbar'
import HomeMap from '../../atoms/map/HomeMap'
import Driverhome from '../../atoms/Driver/DriverHome/Driverhome'

type LocationsType={
    lat: number,
    lng: number
}

const DriverDashboard = () => {
    const [Locations,setLocations] = useState<LocationsType | null>(null)
    return (
        <div className=' bg-[#08080F] h-screen w-full'>
            <DriverNavbar />
            <div className='flex '>
                <div className='flex-1 ml-4 mt-4'>
                    <HomeMap setLocations={setLocations}
                    Locations={Locations!} />
                </div>
                <div className='w-[350px] border-l p-3 '>
                      <Driverhome/>
                </div>
            </div>

        </div>
    )
}

export default DriverDashboard
