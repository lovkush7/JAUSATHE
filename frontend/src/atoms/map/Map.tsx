import { Button } from '@/components/ui/button'
import Mapclickhandler from '@/utils/mapevent/Mapclickhandler'
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

type LocationType = {
    lat: number,
    lng: number
}
const Map = () => {
    const [Locations, setLocations] = useState<LocationType | null>(null)
     const [Location, setLocation] = useState<LocationType | null>(null)
    const [openform , setopenform] = useState(false)

     useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            setLocations({
                lat : position.coords.latitude,
                lng: position.coords.longitude
            })
        },
        (error)=>{
            console.log(error)
        }
    )
     },[])

    return (
        <div className='relative h-screen w-full'>
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

                
            </MapContainer>
            
                {/* <div  className='absolute bottom-8 right-4 -translate-x-1/2 z-[1000]'>
                     <Button>hello</Button>
                </div> */}
        </div>
    )
}

export default Map
