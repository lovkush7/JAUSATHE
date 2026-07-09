import React, { useEffect, useState } from 'react'
import DriverNavbar from '../../lib/DriverNavbar'
import HomeMap from '../../atoms/map/HomeMap'
import Driverhome from '../../atoms/Driver/DriverHome/Driverhome'
import { useMutation } from '@tanstack/react-query'
import { api } from '../../api/Api'
import useScoket from '../../zustand/socket.config'

type LocationsType={
    lat: number,
    lng: number
}
// const updatedriverlocation = async(
//     locations: LocationsType,
// ) =>{
//     const res = await api.post("driver/locations",{
//         lat: locations.lat,
//         lng: locations.lng
//     })
// }

const DriverDashboard = () => {
    const [Locations,setLocations] = useState<LocationsType | null>(null)
    const {Socket} = useScoket()

    // const mutation = useMutation({
    //     mutationKey:[Locations],
    //     mutationFn: ()=>updatedriverlocation(Locations!)
    // })
    
useEffect(() => {

    if (!Socket) return;

    const handleConnect = () => {
        console.log("Connected");

        Socket.emit("driveronline");
    };

    Socket.on("connect", handleConnect);

    if (Socket.connected) {
        handleConnect();
    }

    return () => {
        Socket.emit("driveroffline");
        Socket.off("connect", handleConnect);
    };

}, [Socket]);
    
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
