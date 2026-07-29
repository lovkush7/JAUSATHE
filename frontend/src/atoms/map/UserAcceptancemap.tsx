
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { motion, useDragControls } from "framer-motion"
import uselocation from '../../zustand/location'
import useScoket from '../../zustand/socket.config'
import UserAcceptanceRouting from '../../utils/mapevent/UserAcceptanceRouting'
import { Car, UserRound } from 'lucide-react'
import L from "leaflet";
import { renderToString } from "react-dom/server";
import { carIcon, pickupIcon } from '../../utils/icons/Icons'

type LocationType = {
    lat: number,
    lng: number
}
interface props{
    setLocations: React.Dispatch<React.SetStateAction<any>>
    Locations: LocationType
}
const UserAcceptance = () => {
     const { currentLocation, driverloc, riderloc, passdestination, routemode,pickuppros,driverpros } = uselocation()
    // const [Locations, setLocations] = useState<LocationType | null>(null)
 
//   const {currentLocation,driverloc,passdestination} = uselocation()
    // const control = useDragControls()
  const {Socket,checkauth, authUser} = useScoket()
console.log("the loc c is ",driverloc,passdestination)
 
    
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
            },
            
        )
    }, [ ])

   

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

                       {/* <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                            <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                /> */}
               {driverpros && (
  <Marker
    position={[driverpros.lat, driverpros.lng]}
    icon={carIcon}
  >
    <Popup>Driver</Popup>
  </Marker>
)}

{pickuppros && (
  <Marker
    position={[pickuppros.lat, pickuppros.lng]}
    icon={pickupIcon}
  >
    <Popup>Pickup</Popup>
  </Marker>
)}



              
              
               { pickuppros && driverpros &&(
               <UserAcceptanceRouting
                  start={[pickuppros.lat, pickuppros.lng]}
                  end ={[driverpros.lat, driverpros.lng]}
               />
               )
}
              
                
                  
                
               
            </MapContainer>


        </div>

    )
}

export default UserAcceptance;
