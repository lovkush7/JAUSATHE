import { Button } from '@/components/ui/button'
import Mapclickhandler from '@/utils/mapevent/Mapclickhandler'
import RoutingMap from '@/utils/mapevent/RoutingMap'
import { Bike, Car, CarFront, CarTaxiFront, Dot, Motorbike, Van } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

type LocationType = {
    lat: number,
    lng: number
}
const  Map = () => {
    const [Locations, setLocations] = useState<LocationType | null>(null)
    const [Location, setLocation] = useState<LocationType | null>(null)
    const [openform, setopenform] = useState(false)
    const [Destination, setDestination] = useState<LocationType | null>(null)


    const vechicles = [
        {
            type: "Electric",
            icons: <CarFront  />
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

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocations({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        },
            (error) => {
                console.log(error)
            }
        )
    }, [])

    return (
        <div className='relative h-screen w-full overflow-y-auto'>
            <MapContainer
                center={[27.6180, 85.5380]}
                zoom={13}
                scrollWheelZoom={true}
                style={{ "height": "100vh", "width": "100%" }}

            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Mapclickhandler
                    setLocation={setLocation}
                    setDestination={setDestination}
                    setopenform={setopenform}
                />
                {Locations &&
                    <Marker position={[Locations.lat, Locations.lng]}>
                        <Popup>
                            your cuttent locations <br />
                        </Popup>
                    </Marker>}

                {Location &&
                    <Marker position={[Location.lat, Location.lng]}>
                        <Popup>
                            your choose  locations <br />
                        </Popup>
                    </Marker>}

                    {Destination &&
                    <Marker position={[Destination.lat, Destination.lng]}>
                        <Popup>
                            your choose  destinations{Destination.lat} <br />
                        </Popup>
                    </Marker>}
             {
                Locations && Destination &&

            <RoutingMap pickup={[Locations?.lat, Locations?.lng]} destination={[Destination?.lat, Destination?.lng]}/>
             }
            </MapContainer>

            <div className='absolute bottom-0 left-0 w-full z-[1000] '>

                <div className='bg-gray-900 rounded-t-3xl p-5 shadow-2xl '>

                    {/* TOP LINE */}
                    <div className='w-16 h-1 bg-gray-300 rounded-full mx-auto mb-4'></div>

                    <div className='flex flex-col bg-gray-800 border border-gray-700 rounded-2xl'>
                        <div className='flex items-center p-3 gap-2'>
                            {/* <Dot
                                size={50}
                                className='text-green-500 shrink-0'
                            /> */}
                            <div className='w-3 h-3 rounded-full bg-green-500 '></div>
                            <div className='flex flex-col gap-0.5 ml-3'>
                                <p className='text-gray-500'>{Locations?.lat},{Locations?.lng}</p>
                                <p className='text-gray-600'>Your Current Location</p>
                            </div>

                        </div>
                        <hr className='flex items-center p-1 border-gray-700 ' />
                        <div className='flex items-center p-4 gap-2'>
                            <div className='w-3 h-3 bg-purple-950 rounded-l-3xl'></div>
                            <p className='text-gray-600'>where to ?</p>

                        </div>
                    </div>
                    <div className='flex gap-4 overflow-x-auto p-2 justify-center items-center '>
                        {vechicles.map((car) => (
                            <div
                               
                                className='min-w-[160px] flex-shrink-0 bg-gray-600 text-white p-4 rounded-xl hover:bg-blue-700 cursor-pointer border border-gray-700'
                            >
                                <p>{car.type}</p>
                                <p>{car.icons}</p>
                            </div>
                        ))}
                    </div>
          
                   <div className='mt-2'>
                  <p className='text-gray-400'>RECENT</p>
                   </div>




                    

                </div>

            </div>

        </div>

    )
}

export default Map
