import React, { useEffect } from 'react'
import L from "leaflet"
import "leaflet-routing-machine"

import { useMap } from 'react-leaflet'


type props = {
    driverlocation: [number, number]
    userlocation: [number, number]
}

const Driverrouting = ({ driverlocation, userlocation }: props) => {
    const map = useMap()
    useEffect(() => {
        if (!map) return;

        const routingcontrol = L.Routing.control(
            {
                waypoints: [
                    L.latLng(driverlocation[0], driverlocation[1]),
                    L.latLng(userlocation[0], userlocation[1])
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
    }, [map,driverlocation,userlocation])
    return (
        <div>

        </div>
    )
}

export default Driverrouting
