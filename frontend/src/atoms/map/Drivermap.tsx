import { Button } from '@/components/ui/button'
import Mapclickhandler from '@/utils/mapevent/Mapclickhandler'
import RoutingMap from '@/utils/mapevent/RoutingMap'
import { Bike, Car, CarFront, CarTaxiFront, Dot, Home, Motorbike, Van } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { motion, useDragControls } from "framer-motion"
import uselocation from '../../zustand/location'
import Driverrouting from '../../utils/mapevent/Driverrouting'

type LocationType = {
    lat: number,
    lng: number
}
interface props {
    setLocations: React.Dispatch<React.SetStateAction<any>>
    Locations: LocationType
}
const Drivermap = () => {
    // const [Locations, setLocations] = useState<LocationType | null>(null)

    const { currentLocation, driverloc, riderloc, passdestination, routemode } = uselocation()
    // const control = useDragControls()



    useEffect(() => {
        if (!navigator.geolocation) {
            console.log("Geolocation not supported");
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            // setLocations({
            //     lat: position.coords.latitude,
            //     lng: position.coords.longitude
            // })
            currentLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        },
            (error) => {
                console.log(error)
            }
        )
    }, [])

    // console.log("my current locations is ", Locations)
    return (

        <div className='w-full h-[500px]'>
            <MapContainer
                center={[27.6180, 85.5380]}
                zoom={13}
                scrollWheelZoom={true}
                className='w-full h-full'

            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {routemode === "driver" &&
                    driverloc &&
                    riderloc && (
                        <Driverrouting
                          start={[driverloc.lat, driverloc.lng]}
                            end={[riderloc.lat, riderloc.lng]}
                        />
                    )}

                {routemode === "trip" &&
                    driverloc &&
                    passdestination && (
                        <Driverrouting
                            start={[driverloc.lat, driverloc.lng]}
                          end ={[passdestination.lat, passdestination.lng]}
                        />
                    )}

            </MapContainer>



        </div>

    )
}

export default Drivermap;
