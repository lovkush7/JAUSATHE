// utils/mapIcons.ts
import L from "leaflet";
import { renderToString } from "react-dom/server";
import { Car, UserRound, MapPin } from "lucide-react";

export const carIcon = L.divIcon({
  html: renderToString(
    <div
      style={{
        width: "40px",
        height: "40px",
        background: "#2563eb",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid white",
      }}
    >
      <Car size={22} color="white" />
    </div>
  ),
  className: "",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export const userIcon = L.divIcon({
  html: renderToString(
    <div
      style={{
        width: "40px",
        height: "40px",
        background: "blue",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid white",
      }}
    >
      <UserRound size={22} color="white" />
    </div>
  ),
  className: "",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export const pickupIcon = L.divIcon({
  html: renderToString(
    <MapPin size={32} color="red" fill="red" />
  ),
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});