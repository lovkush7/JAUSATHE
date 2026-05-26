import React from 'react'
import { useMapEvents } from 'react-leaflet'

type props = {
    setLocation: React.Dispatch<React.SetStateAction<any>>
     setopenform: React.Dispatch<React.SetStateAction<boolean>>
     setDestination: React.Dispatch<React.SetStateAction<any>>
}

const Mapclickhandler = ({setLocation,setopenform,setDestination} : props) => {

    useMapEvents({
        click(e){
            const latlng = {
                lat: e.latlng.lat,
                lng: e.latlng.lng,
            }
            setLocation(latlng)
            setDestination(latlng)
            setopenform(true)
        }

    })
  return null
}

export default Mapclickhandler
