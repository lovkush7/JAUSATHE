import React, { useEffect } from 'react'
import L from "leaflet"
import "leaflet-routing-machine"

import { useMap } from 'react-leaflet'
type props ={
    pickup: [number, number],
    destination: [number , number]
}

const RoutingMap = ({pickup, destination}: props) => {
    const map = useMap();

    useEffect(()=>{
        if(!map) return;

         const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(pickup[0], pickup[1]),
                L.latLng(destination[0], destination[1])
            ],
             lineOptions:{
                  styles: [{color: "blue", weight: 5}],
                  extendToWaypoints: true,
                  missingRouteTolerance: 0
             },
             routeWhileDragging: false,
             addWaypoints: false,
             draggableWaypoints: false,
             fixSelectedRoutes: true,
             show: false,
              
             
         }).addTo(map)

         return ()=> {
            map.removeControl(routingControl)
         }
    },[map, pickup, destination])
  return null;
}

export default RoutingMap
