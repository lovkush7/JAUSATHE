import { error } from "node:console";
import type { Driverdto } from "../../dto/Driver.dto.ts";
import { Driver } from "../../entity/Driver.entities.ts";
import { Ride } from "../../entity/Ride.entities.ts";
import { User } from "../../entity/User.entities.ts";
import { Vechicles } from "../../entity/Vechiles.entity.ts";
import { Driverstatus, type VehicleType } from "../../enum/enum.details.ts";

class DriverServices {
    async createDriver(
        userId: string,
        body: Driverdto,
    ) {
        try {
            const existinguser = await User.findOne({
                where: {
                    id: userId
                },
                relations: {
                    Driver: true,
                    
                }
            })
            if (!existinguser) {
                throw new Error("the driver doesnot exist")
            }
            if (existinguser.Driver) {
                throw new Error("the driver already exist")
            }



            const newdriver = new Driver()
            newdriver.licenseNumber = body.licenseNumber;
            newdriver.licenseExpery = body.licenseExpery;
            newdriver.citizenshipNumber = body.citizenshipNumber;
            newdriver.user = existinguser;
            await newdriver.save()

            const vecicle = new Vechicles()
            vecicle.model = body.Vechiclemodel;
            vecicle.plateNumber = body.plateNumber;
            vecicle.seatCapacity = body.seatCapacity;
            vecicle.type = body.vehicleType;
            vecicle.driver = newdriver;
            await vecicle.save();

            newdriver.vechicles = vecicle;
            await newdriver.save();

            return {
                message: "Driver registered successfully",
                driver: {
                    id: newdriver.id,
                    licenseNumber: newdriver.licenseNumber,
                    citizenshipNumber: newdriver.citizenshipNumber,
                },
                vehicle: {
                    id: vecicle.id,
                    model: vecicle.model,
                    plateNumber: vecicle.plateNumber,
                    type: vecicle.type,
                    seatCapacity: vecicle.seatCapacity,
                }
            };
        } catch (err) {
            throw err;
        }

    }
    async getDriverprofile(
        userId: string,
    ) {
        try {
            const existingUser = await User.findOne({
                where: {
                    id: userId,
                },
                relations: {
                    Driver: {
                        vechicles: true,
                    },

                }
            })
            if (!existingUser) {
                throw new Error("the driver doesnot exist")
            }
            return existingUser.Driver;

        } catch (err) {
            throw err;
        }
    }
    async updateDriverLocation(
        userId: string,
        lat: number,
        lng: number,
        bearing: number
    ) {
        try {
            const qb = Driver.createQueryBuilder()
                .update(Driver)
                .set({
                    CurrentLocation: () =>
                        `ST_SetSRID(
                    ST_MakePoint(${lng}, ${lat}),
                    4326)`,
                    lastLocationUpdate: new Date(),
                    currentBearing: bearing ?? 0,
                })
                .where("userId = :userId", { userId })
         const result =   await qb.execute();
         console.log(result)
            return { message: "location updated successfully" }

        } catch (err) {
            throw err;
        }
    }
    async updateDriverStatus(
        userId: string,
        status: Driverstatus
    ) {
        try {
            const exdriver = await Driver.findOne({
                where: {
                    user: {
                        id: userId
                    }
                }
            })
            if (!exdriver) {
                return "driver dosenot exist"
            };
            exdriver.status = status  ;
            await exdriver.save();
            return { message: "status updated successfully" }

        } catch (err) {
            throw err;
        }

    }

    async getNearbyDrivers(
        lat: number,
        lng: number,
        vehicleType: VehicleType,
        radious: number = 5000
    ) {
        try {
            let qb = Driver.createQueryBuilder("dq")
                .select([
                    "dq.id",
                    "dq.userId",
                    "dq.status",
                    "dq.currentBearing",
                    "dq.rating"
                ])
                // .addSelect(
                //     `ST_Distance(
                //        dq."CurrentLocation"::geography,
                //        ST_SetSRID(
                //          ST_MakePoint(:lng, :lat),
                //          4326
                //        )::geography
                //     )`,
                //     'distanceMeters'
                // )
                .addSelect(`
                     ST_Distance(
                     dq."CurrentLocation"::geography,
                     ST_SetSRID(
                     ST_MakePoint(:lng, :lat),
                     4326
                      )::geography
                     )
                     `)
                .leftJoinAndSelect("dq.user", "user")
                .leftJoinAndSelect("dq.vechicles", "vechicles", 'vechicles."isDefault" = true')
                .where("dq.status = :status", { status: Driverstatus.ONLINE })
                .andWhere("dq.isApproped = :isApproped", { isApproped: true })
                // .andWhere("dq.status != :busystatus",
                //     {busystatus: Driverstatus.BUSY}
                // )
                .andWhere(
                    `ST_DWithin(
                 dq."CurrentLocation"::geography,
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
            if (vehicleType) {
                qb = qb.andWhere('vechicles.type = :type', { type: vehicleType })
            }



            return (await qb.orderBy(`
  ST_Distance(
    dq."CurrentLocation"::geography,
    ST_SetSRID(
      ST_MakePoint(:lng, :lat),
      4326
    )::geography
  )
`, "ASC").limit(10).getRawAndEntities().then(r => r.entities))
        } catch (err) {
            throw err;
        }
    }
    async ApproveDriver(
        id: string
    ) {
        const existance = await Driver.findOne({
            where: {
                user: {
                    id
                }
            }
        })
        if (!existance) {
            throw new Error("the driver doesnot exist")

        }
        existance.isApproped = true;
        await existance.save();
        return { message: "driver approved successfully" }

    }

   
}
export default new DriverServices();