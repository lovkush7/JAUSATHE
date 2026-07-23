import { create } from "zustand";

export interface RideData {
  id: string;
  pickupAddress: string;
  DropoffAddress: string;
  estimatedFare: number;
  estimatedDistance: number;
  DurationMinutes: number;
  reqVehicleType: string;
  ridestauts: string;

  pickupLocation: {
    type: string;
    coordinates: [number, number];
  };

  DropoffLocation: {
    type: string;
    coordinates: [number, number];
  };

  rider: {
    id: string;
    FullName: string;
    Email: string;
    Phone: string;
    Role: string;
  };
}

interface RideStore {
  ride: RideData | null;

  setRide: (data: RideData) => void;
  clearRide: () => void;
}

const useRide = create<RideStore>((set) => ({
  ride: null,

  setRide: (data) => set({ ride: data }),

  clearRide: () => set({ ride: null }),
}));

export default useRide;