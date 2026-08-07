import React, { useEffect, useState } from 'react'
import DriverNavbar from '../../lib/DriverNavbar'
import HomeMap from '../../atoms/map/HomeMap'
import Driverhome from '../../atoms/Driver/DriverHome/Driverhome'
import { useMutation } from '@tanstack/react-query'
import { api } from '../../api/Api'
import useScoket from '../../zustand/socket.config'
import Trialmap from '../../atoms/map/Trial'
import { Switch } from '../../components/ui/switch'
import { Label } from '../../components/ui/label'
import DriverEarningChart from '../../atoms/Driver/CHART/DriverEarningChart'
// import { Satellite } from 'lucide-react'
// import { Satellite } from 'lucide-react'

type LocationsType = {
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
    const [Locations, setLocations] = useState<LocationsType | null>(null)
    const { Socket } = useScoket()
    const [stellite, setSatellite] = useState(true)

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
                    <Trialmap
                        setsatellite={setSatellite}
                        stellite={stellite}
                        setLocations={setLocations}
                        Locations={Locations!} />
                    <div className="flex items-center text-white text-sm space-x-2">

                        <Switch id="airplane-mode" checked={stellite}
                            onCheckedChange={setSatellite}
                            className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-600" />
                        <Label htmlFor="airplane-mode">Satellite mode</Label>
                    </div>
                </div>
               
                <div className='w-[350px] border-l p-3 '>
                    <Driverhome />
                    <DriverEarningChart/>
                </div>
                
            </div>

        </div>
    )
}

export default DriverDashboard
