import { Button } from '@/components/ui/button'
import Mapclickhandler from '@/utils/mapevent/Mapclickhandler'
import RoutingMap from '@/utils/mapevent/RoutingMap'
import { Bike, Car, CarFront, CarTaxiFront, Dot, Motorbike, Van } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { motion, useDragControls } from "framer-motion"
import uselocation from '../../zustand/location'

type LocationType = {
    lat: number,
    lng: number
}
 interface props {
  setLocations: React.Dispatch<React.SetStateAction<any> >
   Locations: LocationType | null
    setDestination: React.Dispatch<React.SetStateAction<any> >
     Destination: LocationType | null
     setTime : React.Dispatch<React.SetStateAction<any> >
     setDistanceinkm: React.Dispatch<React.SetStateAction<any> >
     setFare: React.Dispatch<React.SetStateAction<any> >
   
 }
const Map = ({setLocations,Locations,setDestination,Destination, setTime, setDistanceinkm,setFare}:props) => {

    // const [Locations, setLocations] = useState<LocationType | null>(null)
    const [Location, setLocation] = useState<LocationType | null>(null)
    const [openform, setopenform] = useState(false)
     
   const { destination:mapdestination ,locations:mylocation} = uselocation()
    // const control = useDragControls()



    useEffect(() => {
        if (!navigator.geolocation) {
            console.log("Geolocation not supported");
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            setLocations({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
            // currentLocation({
            //      lat: position.coords.latitude,
            //     lng: position.coords.longitude
            // })
        },
            (error) => {
                console.log(error)
            }
        )
    }, [])
    console.log("mapdestination",mapdestination)
     console.log("my loccaatt",mylocation)
    console.log("my current locations is ", Locations)
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
                    {
                        mapdestination &&
                        <Marker position={[mapdestination.lat, mapdestination.lng]}>
                            <Popup>
                                  your destination
                            </Popup>
                        </Marker>
                    }

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
                    Locations  && mapdestination &&

                    <RoutingMap 
                     pickup={[Locations?.lat, Locations?.lng]} 
                    //  destination={[Destination?.lat, Destination?.lng]}
                     mydestination = {[mapdestination?.lat, mapdestination?.lng]}
                     setTime={setTime}
                     setDistanceinkm={setDistanceinkm}
                     setFare={setFare}
                     />
                }
            </MapContainer>


        </div>

    )
}

export default Map
