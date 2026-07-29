import React, { useEffect } from 'react'
import L from "leaflet"
import "leaflet-routing-machine"

import { useMap } from 'react-leaflet'

type Props = {
  start: [number, number];
  end: [number, number];
};

const UserAcceptanceRouting = ( {start,end}: Props ) => {
    const map = useMap()
    useEffect(() => {
        if (!map) return;
        { start && end 
        const routingcontrol = L.Routing.control(
            {
                waypoints: [
                    L.latLng(start[0], start[1]),
                    L.latLng(end[0], end[1])
                ],
                router: (L.Routing as any).osrmv1({
                    serviceUrl: "https://router.project-osrm.org/route/v1",
                }),
                lineOptions: {
                    styles: [{ color: "red", weight: 5 }],
                    extendToWaypoints: true,
                    missingRouteTolerance: 0
                },
                routeWhileDragging: false,
                addWaypoints: false,
                draggableWaypoints: false,
                fixSelectedRoutes: true,
                show: false,
            }
        ).addTo(map)
    
          return () => {
            map.removeControl(routingcontrol)
        }
    }

    }, [map,start,end])
    return (
        <div>

        </div>
    )
}

export default UserAcceptanceRouting;
