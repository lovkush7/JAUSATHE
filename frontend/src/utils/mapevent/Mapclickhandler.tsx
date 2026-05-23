import React from 'react'
import { useMapEvents } from 'react-leaflet'

type props = {
    setLocation: React.Dispatch<React.SetStateAction<any>>
     setopenform: React.Dispatch<React.SetStateAction<boolean>>
}

const Mapclickhandler = ({setLocation,setopenform} : props) => {

    useMapEvents({
        click(e){
            const latlng = {
                lat: e.latlng.lat,
                lng: e.latlng.lng,
            }
            setLocation(latlng)
            setopenform(true)
        }

    })
  return null
}

export default Mapclickhandler
