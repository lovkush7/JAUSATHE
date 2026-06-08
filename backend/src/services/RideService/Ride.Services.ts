import { FareConfig } from "../../entity/FareConfig.entities.ts";
import type { VehicleType } from "../../enum/enum.details.ts";

class RideService {
    async estimateFare(
        pickuplat: number,
        pickuplng: number,
        dropofflat: number,
        dropofflng: number,
        vehicleType: VehicleType
    ){
          const fareConfig = await FareConfig.findOne({
             where:
              { 
                vechicleType: vehicleType, 
                isActive: true } 
            });
    if (!fareConfig) throw new Error(`No fare config found for ${vehicleType}`);
 
  
    const R = 6371;
    const dLat = ((dropofflat - pickuplat) * Math.PI) / 180;
    const dLng = ((dropofflng - pickuplng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((pickuplat * Math.PI) / 180) *
        Math.cos((dropofflat * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    const distanceKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
 
    const estimatedDurationMinutes = Math.ceil(distanceKm * 3); // ~20 km/h avg in city
    const rawFare =
      Number(fareConfig.baseFare) +
      distanceKm * Number(fareConfig.perKmRate) +
      estimatedDurationMinutes * Number(fareConfig.perMinRate);
 
    const estimatedFare = Math.max(rawFare, Number(fareConfig.minimumFare));
 
    return {
      estimatedFare: parseFloat(estimatedFare.toFixed(2)),
      estimatedDistanceKm: parseFloat(distanceKm.toFixed(3)),
      estimatedDurationMinutes,
    };

    }
}
export default new RideService();