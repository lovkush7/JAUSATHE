import { notifyDriversnewRides, notifyNoDriverFound,  } from "../../config/socket.config.ts";
import type CreateRideDto from "../../dto/Ridecreate.dto.ts";
import { FareConfig } from "../../entity/FareConfig.entities.ts";
import { Ride } from "../../entity/Ride.entities.ts";
import { User } from "../../entity/User.entities.ts";
import { RideStatus, type UserRole, type VehicleType } from "../../enum/enum.details.ts";
import DriverService from "../Driver/DriverService.ts";

class RideService {
  async estimateFare(
    pickuplat: number,
    pickuplng: number,
    dropofflat: number,
    dropofflng: number,
    vehicleType: VehicleType
  ) {
    const fareConfig = await FareConfig.findOne({
      where:
      {
        vechicleType: vehicleType,
        isActive: true
      }
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
  ) {
    const est = await this.estimateFare(
      body.pickuplat,
      body.pickuplng,
      body.dropofflat,
      body.dropofflng,
      body.vehicleType

    );

    const existance = await User.findOne({
      where: {
        id: userid
      }
    });
    if (!existance) {
      throw new Error("user doesnot exist")

    }
    const ride = new Ride();
    ride.pickupAddress = body.PickupAddress;
    ride.pickupLocation = {
      type: "Point",
      coordinates: [body.pickuplng, body.pickuplat],

    }
    ride.DropoffAddress = body.DropoffAddress;
    ride.DropoffLocation = {
      type: "Point",
      coordinates: [body.dropofflng, body.dropofflat],

    }
    ride.reqVehicleType = body.vehicleType;
    ride.estimatedFare = est.estimatedFare;
    ride.estimatedDistance = est.estimatedDistanceKm;
    ride.DurationMinutes = est.estimatedDurationMinutes;
    if (body.SpecialInstruction)
      ride.specialInstruction = body.SpecialInstruction;
    if (body.PromoCode)
      ride.promoCode = body.PromoCode;
    ride.isScheduled = body.isScheduled ?? false;
    if (body.ScheduledAt)
      ride.ScheduledAt = body.ScheduledAt;
    ride.ridestauts = RideStatus.REQUESTED;

    ride.rider = existance;
    await ride.save();

    const driver = await DriverService.getNearbyDrivers(
      body.pickuplat,
      body.pickuplng,
      body.vehicleType,
      

    );

console.log("Nearby Drivers:", driver);
console.log("Driver Count:", driver.length);
    if (driver.length > 0) {
      ride.ridestauts = RideStatus.SEARCHING;
      await ride.save();


      notifyDriversnewRides(
        driver.map(d => d.user.id),
        {
          rideId: ride.id,
          pickupAddress: ride.pickupAddress,
          DropoffAddress: ride.DropoffAddress,
          estimatefare: ride.estimatedFare,
          vechicletype: ride.reqVehicleType
        }

      )
        setTimeout(async () => {
                const current = await Ride.findOne({
                    where:{
                        id: ride.id
                    }
                })
                if(
                  current &&
                (current && current?.ridestauts === RideStatus.SEARCHING 
                  || current?.ridestauts === RideStatus.REQUESTED)
                ){
                    current.ridestauts = RideStatus.DRIVERNOTFOUND;
                    await current.save();
                    notifyNoDriverFound(ride.id, existance.id)
                  
                }
                
            }, 60000);
    }else{
      ride.ridestauts = RideStatus.DRIVERNOTFOUND;
      await ride.save()
      notifyNoDriverFound(ride.id, existance.id)

    }
    return ride;

  }
  async GetActiveRide(
    role: UserRole,
    userid: string
  ) {
    try {
      const Activestatus = [
        RideStatus.REQUESTED,
        RideStatus.ACCEPTED,
        RideStatus.ARRIVING,
        RideStatus.STARTED,

      ]
      const find = await Ride.createQueryBuilder("r")
        .where(`r.${role === 'PASSENGERS' ? "riderId" : "driverId"} =:userid`, { userid })
        .andWhere('r.ridestauts  IN (:...status) ', { status: Activestatus })
        .leftJoinAndSelect("r.rider", "rider")
        .leftJoinAndSelect("r.vechicle", "vechicle")
        .leftJoinAndSelect("r.driver", "driver")
        .leftJoinAndSelect("driver.user", "driveruser")
        .getOne();

      return find;


    } catch (err) {
      throw err;
    }

  }
  async GetAvailableRides(page: number, limit: number) {
    return await Ride.createQueryBuilder("r")
      .where("r.ridestauts = :status", {
        status: RideStatus.REQUESTED,
      })
      .leftJoinAndSelect("r.rider", "rider")
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }
  async AcceptRide(
    vechicleId: string,
    driverid: string,
    rideId: string
  ) {
    try {
      const ride = await Ride.findOne({
        where: {
          id: rideId,

        },

      })
      if (!ride) {
        throw new Error("ride doesnot exist")
      }
      if (ride?.ridestauts !== RideStatus.REQUESTED && ride?.ridestauts !== RideStatus.SEARCHING) {
        throw new Error("ride no longer existance")
      }
      await Ride.update(rideId, {
        vechicle: { id: vechicleId },
        driver: { id: driverid },
        ridestauts: RideStatus.ACCEPTED,
        driverAcceptedAt: new Date(),
      })
      return ride;
    } catch (err) {
      throw err;
    }

  }
   async getAcceptRide(
        rideId: string,
      
    ){
      try{
       const active = await Ride.findOne(
        {
         where:{
          id: rideId
         },
          relations:{
            driver: true,
            rider: true,
            vechicle: true
          }
        }
      
       )
         if(!active){
          throw new Error("ride not found")
        }
        return active;
      }catch(err){
        console.log("the error is ", err)
      }

    }
}
export default new RideService();