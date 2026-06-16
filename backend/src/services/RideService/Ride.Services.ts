import type CreateRideDto from "../../dto/Ridecreate.dto.ts";
import { FareConfig } from "../../entity/FareConfig.entities.ts";
import { Ride } from "../../entity/Ride.entities.ts";
import { User } from "../../entity/User.entities.ts";
import { RideStatus, type UserRole, type VehicleType } from "../../enum/enum.details.ts";

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
    async CreateRide(
      body: CreateRideDto,
      userid: string
    ){
      const est = await this.estimateFare(
        body.pickuplat,
        body.pickuplng,
        body.dropofflat,
        body.dropofflng,
        body.vehicleType

      );

      const existance = await User.findOne({
        where:{
          id: userid
        }
      });
      if(!existance){
        throw new Error("user doesnot exist")
      
      }
      const ride = new Ride();
      ride.pickupAddress = body.PickupAddress;
      ride.pickupLocation = {
        type: "Point",
        coordinates: [body.pickuplng, body.pickuplat],
      
      }
      ride.DropoffAddress = body.DropoffAddress;
      ride.DropoffLocation ={
        type: "Point",
        coordinates: [body.dropofflng, body.dropofflat],
      
      }
      ride.reqVehicleType = body.vehicleType;
      ride.estimatedFare = est.estimatedFare;
      ride.estimatedDistance = est.estimatedDistanceKm;
      ride.DurationMinutes = est.estimatedDurationMinutes;
      ride.specialInstruction = body.SpecialInstruction;
      ride.promoCode = body.PromoCode;
      ride.isScheduled = body.isScheduled ?? false;
      ride.ScheduledAt = body.ScheduledAt;
      ride.ridestauts = RideStatus.REQUESTED;

      ride.rider = existance;
      await ride.save();
      return ride;
       
    }
    async GetActiveRide(
      role: UserRole,
      userid: string
    ){
      try{
        const Activestatus = [
          RideStatus.REQUESTED,
          RideStatus.ACCEPTED,
          RideStatus.ARRIVING,
          RideStatus.STARTED,

        ]
        const find =await Ride.createQueryBuilder("r")
        .where(`r.${role === 'PASSENGERS' ? "riderid": "driverid"} =:userid`,{userid})
        .andWhere('r.status IN (:...status) ', {status: Activestatus})
        .leftJoinAndSelect("r.rider ","rider")
        .leftJoinAndSelect("r.vechicle","vechicle")
        .leftJoinAndSelect("r.driver","driver")
        .leftJoinAndSelect("driver.user","driveruser")
        .getOne();

        return find;


      }catch(err){
        throw err;
      }

    }
    async AcceptRide(
      vechicleId: string,
      driverid: string,
      rideId: string
    ){
      try{
        const ride = await Ride.findOne({
          where:{
            id: rideId,
            
          },
          
        })
        if(!ride){
          throw new Error("ride doesnot exist")
        }
        if(ride?.ridestauts !== RideStatus.REQUESTED && ride?.ridestauts !== RideStatus.SEARCHING){
          throw new Error("ride no longer existance")
        }
          await Ride.update(rideId,{
           vechicle: {id: vechicleId} ,
          driver: {id: driverid},
          ridestauts: RideStatus.ACCEPTED,
          driverAcceptedAt: new Date(),
          })
          return ride;
      }catch(err){
        throw err;
      }

    }
}
export default new RideService();