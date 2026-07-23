import { Button } from '@/components/ui/button'
import Mapclickhandler from '@/utils/mapevent/Mapclickhandler'
import RoutingMap from '@/utils/mapevent/RoutingMap'
import { Bike, Car, CarFront, CarTaxiFront, Dot, Home, Motorbike, Van } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { motion, useDragControls } from "framer-motion"
import uselocation from '../../zustand/location'
import useScoket from '../../zustand/socket.config'

type LocationType = {
    lat: number,
    lng: number
}
interface props{
    setsatellite: React.Dispatch<React.SetStateAction<any>>
    stellite: boolean
    setLocations: React.Dispatch<React.SetStateAction<any>>
    Locations: LocationType
}
const Trialmap = ({setLocations, Locations,setsatellite,stellite}: props) => {
    // const [Locations, setLocations] = useState<LocationType | null>(null)
 
  const {currentLocation,} = uselocation()
    // const control = useDragControls()
  const {Socket,checkauth, authUser} = useScoket()

    useEffect(()=>{
    checkauth()
     console.log('the authuser iss ',authUser)
    },[])
    
    useEffect(() => {
        if (!navigator.geolocation) {
            console.log("Geolocation not supported");
            return;
        }
        // if(!Socket?.connected) return;
        navigator.geolocation.watchPosition((position) => {

             Socket?.emit("updateLocation",{
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                bearing: position.coords.heading ?? 0
            })

            setLocations({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
              currentLocation({
                 lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        },
            (error) => {
                console.log(error)
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 100000000
            }
        )
    }, [authUser])

    


    console.log("my current locations is ", Locations)
    return (

        <div className='w-full h-[500px]'>
            <MapContainer
             center={[27.6180, 85.5380]}
                zoom={14}
                scrollWheelZoom={true}
                className='w-full h-full'

            >
              
                {stellite ? (
              
                  <>
                        <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                            <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                /> 
                </>
                ):(
                        <>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                </>
                       )
               }
                {/* <Mapclickhandler
                    setLocation={setLocation}
                    setDestination={setDestination}
                    setopenform={setopenform}
                /> */}
                {Locations &&
                    <Marker position={[Locations.lat, Locations.lng]}>
                        <Popup>
                            your cuttent locations <br />

                        </Popup>
                    </Marker>}

                {/* {Location &&
                    <Marker position={[Location.lat, Location.lng]}>
                        <Popup>
                            your choose  locations <br />
                        </Popup>
                    </Marker>} */}

                {/* {Destination &&
                    <Marker position={[Destination.lat, Destination.lng]}>
                        <Popup>
                            your choose  destinations{Destination.lat} <br />
                        </Popup>
                    </Marker>} */}
                  
                
               
            </MapContainer>


        </div>

    )
}

export default Trialmap;
