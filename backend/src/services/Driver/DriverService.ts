import type { Driverdto } from "../../dto/Driver.dto.ts";
import { Driver } from "../../entity/Driver.entities.ts";
import { User } from "../../entity/User.entities.ts";

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
            
}
export default new DriverServices();