import type { Driverdto } from "../../dto/Driver.dto.ts";
import { Driver } from "../../entity/Driver.entities.ts";
import { User } from "../../entity/User.entities.ts";
import { Driverstatus, type VehicleType } from "../../enum/enum.details.ts";

class DriverServices {
    async createDriver(
        userId: string,
        body: Driverdto,
    ){
         try{
            const existinguser = await User.findOne({
                where:{
                    id: userId
                },
                relations:{
                    Driver: true
                }
            })
            if(!existinguser){
                   throw new Error("the driver doesnot exist")
            }

            const newdriver = new Driver()
            newdriver.licenseNumber = body.licenseNumber;
            newdriver.licenseExpery = body.licenseExpery;
            newdriver.citizenshipNumber = body.citizenshipNumber;
            existinguser.Driver = newdriver;
            await newdriver.save()

            return newdriver;
         }catch(err){
            throw err;
         }

    }
    async getDriverprofile(
     userId: string,
    ){
        try{
            const existingUser = await User.findOne({
                where:{
                    id: userId,
                },
                relations:{
                   Driver: {
                     vechicles: true,
                   },
                   
                }
            })
            if(!existingUser){
                throw new Error("the driver doesnot exist")
            }
            return existingUser.Driver;

        }catch(err){
            throw err;
        }
    }
    async updateDriverLocation(
        userId: string,
        lat: number,
        lng: number,
        bearing: number
    ){
        try{
            const qb =  Driver.createQueryBuilder()
            .update(Driver)
            .set({
               CurrentLocation: ()=>
                `ST_SetSRID(
                    ST_MakePoint(${lng}, ${lat}),
                    4326)`,
                lastLocationUpdate: new Date(),
                currentBearing: bearing ?? 0,
            })
            .where("userId = :userId", {userId})
            await qb.execute();
             return {message: "location updated successfully"}

        }catch(err){
            throw err;
        }
    }
    async updateDriverStatus(
        status: Driverdto["status"],
        userId: string,
    ){
        try{
            const exdriver = await Driver.findOne({
                where:{
                    user:{
                        id: userId
                    }
                }
            })
            if(!exdriver){
                throw new Error("the driver doesnot exist")
            }
            exdriver.status = status;
            await exdriver.save();
            return {message: "status updated successfully"}

        }catch(err){
            throw err;
        }

    }
          
    async getNearbyDrivers(
        lat: number,
        lng: number,
        vehicleType: VehicleType,
        radious: number = 5000
    ){
        try{
            let qb = Driver.createQueryBuilder("dq")
            .select([
                "dq.id",
                "dq.userId",
                "dq.status",
                "dq.currentBearing",
                "dq.rating"
            ])
            .addSelect(
                `ST_Distance(
                   dq."CurrentLocation"::geography,
                   ST_SetSRID(
                     ST_MakePoint(:lng, :lat),
                     4326
                   )::geography
                )`,
                'distanceMeters'
            )
            .leftJoinAndSelect("dq.user", "user")
            .leftJoinAndSelect("dq.vechicles", "vechicles", 'vechicles."isDefault" = true')
            .where("dq.status = :status",{status: Driverstatus.ONLINE })
            .andWhere(
                `ST_DWithin(
                 dq."currentLocation"::geography,
                 ST_SetSRID(
                   ST_MakePoint(:lng, :lat),
                     4326
                 )::geography,
                 :radious
                     )`

            )
            .setParameters({
                lat: lat,
                lng: lng,
                radious: radious 
            })
            if(vehicleType){
             qb  =  qb.andWhere('vechicles.type = :type',{type: vehicleType})
            }
            return (await qb.orderBy("distanceMeters", "ASC").limit(10).getRawAndEntities().then(r => r.entities))
        }catch(err){
            throw err;
        }
    }
}
export default new DriverServices();