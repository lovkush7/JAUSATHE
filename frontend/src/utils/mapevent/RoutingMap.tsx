import React, { useEffect } from 'react'
import L from "leaflet"
import "leaflet-routing-machine"

import { useMap } from 'react-leaflet'
type props = {
    pickup: [number, number],
    // destination: [number, number],
    mydestination: [number, number],
    setTime: React.Dispatch<React.SetStateAction<any>>
    setDistanceinkm: React.Dispatch<React.SetStateAction<any>>
    setFare: React.Dispatch<React.SetStateAction<any>>
}

const RoutingMap = ({ pickup, setTime, setDistanceinkm,setFare,mydestination}: props) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(pickup[0], pickup[1]),
                // L.latLng(destination[0], destination[1])
                L.latLng(mydestination[0], mydestination[1])
            ],
            router: (L.Routing as any).osrmv1({
                serviceUrl: "https://router.project-osrm.org/route/v1",
            }),
            lineOptions: {
                styles: [{ color: "blue", weight: 5 }],
                extendToWaypoints: true,
                missingRouteTolerance: 0
            },
            routeWhileDragging: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fixSelectedRoutes: true,
            show: false,


        }).addTo(map)

       routingControl.on("routesfound", (e: any) => {
  const route = e.routes[0];

  // meters -> km
  const distanceKm = route.summary.totalDistance / 1000;

  // seconds -> minutes
  const osrmTime = route.summary.totalTime / 60;

  // Nepal realistic estimate
  // 1 km = 3 min
  const realisticTime = distanceKm * 3;
  const fare = distanceKm * 5;
  setFare(fare.toFixed(2))
  setDistanceinkm(distanceKm.toFixed(2))

  console.log("Distance KM:", distanceKm.toFixed(2));

  console.log("OSRM Time:", osrmTime.toFixed(1));

  setTime(realisticTime.toFixed(1))
  console.log(
    "Realistic Nepal ETA:",
    realisticTime.toFixed(1),
    "minutes"
  );
});

        return () => {
            map.removeControl(routingControl)
        }
    }, [map, pickup, mydestination])
    return null;
}

export default RoutingMap
