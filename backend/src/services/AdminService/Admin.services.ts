import { error } from "node:console";
import { Driver } from "../../entity/Driver.entities.ts";
import { FareConfig } from "../../entity/FareConfig.entities.ts";
import { Ride } from "../../entity/Ride.entities.ts";
import { User } from "../../entity/User.entities.ts";
import { Driverstatus, RideStatus, type VehicleType } from "../../enum/enum.details.ts";
import type { FareConfigDto } from "../../dto/FareConfig.dto.ts";
interface DriverApprovalRequest {
  isApproval: boolean;
}

class AdminService {
  async AdminService(
    range: "7d" | "30d" | "90d"
  ) {
    const daymap = {
      "7d": 7,
      "30d": 30,
      "90d": 90
    }
    const days = daymap[range]

    const result = Ride
      .createQueryBuilder("ride")
      .select(`DATE("ride"."CreatedAt")`, "date")
      .addSelect(`COUNT("ride"."id")`, "rides")
      .where(
        `"ride"."CreatedAt" >= NOW() - INTERVAL '${days} days'`
      )
      .andWhere(`"ride"."ridestauts" = :status`, {
        status: RideStatus.COMPLETED,
      })
      .groupBy(`DATE("ride"."CreatedAt")`)
      .orderBy(`DATE("ride"."CreatedAt")`, "ASC")
      .getRawMany();

    const chart = (await result).map((item) => ({
      date: item.date,
      rides: Number(item.rides),
    }));

    const totalRides = chart.reduce(
      (sum, item) => sum + item.rides,
      0
    );

    return {
      range,
      totalRides,
      averageRidesPerDay:
        chart.length > 0 ? totalRides / chart.length : 0,
      chart,
    };


  }
  async WeeklyRides() {
    try {
      const now = new Date()

      const StartofWeek = new Date(now)
      StartofWeek.setHours(0, 0, 0, 0)


      const day = StartofWeek.getDay();
      StartofWeek.setDate(StartofWeek.getDate() - day);

      const endOfWeek = new Date(StartofWeek);

      endOfWeek.setDate(
        endOfWeek.getDate() + 7
      );

      const Completed: any = await Ride.createQueryBuilder("ride")
        .where(`"ride"."ridestauts" = :status`, {
          status: RideStatus.COMPLETED,
        })
        .andWhere(`"ride"."CreatedAt" >= :StartofWeek`, {
          StartofWeek,
        })
        .andWhere(`"ride"."CreatedAt" < :endOfWeek`, {
          endOfWeek,
        })
        .getCount();
      console.log("start of week ", StartofWeek)
      console.log("end of week", endOfWeek)

      const target = 50;

      const progress = Math.min(
        Math.round((Completed / target) * 100),
        100
      );

      const remaining = Math.max(
        target - Completed,
        0
      );

      return {
        Completed,
        target,
        progress,
        remaining,
      }
    } catch (err) {
      console.log(err)
    }
  }
  async GetDetails() {
    try {
      //total ride today ane active driver ane avarage ride fare ane new users today
      const day = new Date()

      const ride = await Ride.createQueryBuilder("ride")
        .where("DATE(ride.CreatedAt) = CURRENT_DATE")
        .andWhere(`"ride"."ridestauts" = :status`, {
          status: RideStatus.COMPLETED,
        })
        .getCount()

      const active = await Driver.createQueryBuilder("driver")
        .where(`"driver"."status" = :status `, {
          status: Driverstatus.ONLINE
        })
        .getCount()

      const averageFare = await Ride.createQueryBuilder("ride")
        .select("AVG(ride.estimatedFare)", "averageFare")
        .where("DATE(ride.CreatedAt) = CURRENT_DATE")
        .andWhere(`ride.ridestauts = :status`, {
          status: RideStatus.COMPLETED,
        })
        .getRawOne();

      const newuser = await User.createQueryBuilder("user")
        .where("DATE(user.CreatedAt) = CURRENT_DATE")
        .getCount();

      return {
        ride,
        active,
        averageFare: Number(averageFare.averageFare) || 0,
        newuser
      }


    } catch (err) {
      console.log(err)
    }
  }
  async GetDriverData() {
    try {
      const driver = await Driver.find({
        relations: {
          ridesasDriver: true,
          user: true,
          vechicles: true
        },

      })

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const driverData = driver.map((d) => {

        const todayride = d.ridesasDriver.filter((ride) => {
          const ridedata = new Date(ride.CreatedAt)
          return ridedata >= today
        });


        //today earning
        const earning = todayride.reduce((total, ride) => {
          return total + Number(ride.estimatedFare || 0)

        }, 0)
        // Total earning - all rides
        const totalEarning = d.ridesasDriver.reduce((total, ride) => {
          return total + Number(ride.estimatedFare || 0);
        }, 0);
        return {
          id: d.id,
          name: d.user.FullName,
          ridetoday: todayride.length,
          totalEarning: totalEarning,
          earning: earning,
          status: d.status,
          approve: String(d.isApproped),
          vehicles: d.vechicles ? {
            id: d.vechicles.id,
            type: d.vechicles.type,
            number: d.vechicles.plateNumber,
            model: d.vechicles.model
          } : null
        }
      })
      return driverData;

    } catch (err) {
      console.log(err)
    }
  }
  async driverapproval(
    id: string,
    isApproval: boolean
  ) {
    const existance = await Driver.findOne({
      where: {
        id: id
      }
    })
    if (!existance) {
      throw new Error("driver doesn't exist ")
    }

    existance.isApproped = isApproval
    const updated = await existance.save()
    return updated

  }
 async GetUsers() {
  const users = await User.find();

  const result = await Ride
    .createQueryBuilder("ride")
    .select("ride.riderId", "userId")
     .addSelect("COUNT(ride.id)", "totalRides")
    .addSelect(
      "COALESCE(SUM(ride.estimatedFare), 0)",
      "totalSpent"
    )
    .where("ride.ridestauts = :status", {
      status: "COMPLETED"
    })
    .groupBy("ride.riderId")
    .getRawMany();

  const spendingMap = new Map(
    result.map((item) => [
      item.userId,
      Number(item.totalSpent)
    ])
  );

  const usersWithSpending = users.map((user) => ({
    ...user,
    totalSpent: spendingMap.get(user.id) ?? 0
  }));

  return {
    user: usersWithSpending
  };
}
async FareConfig(){
  try{
  const fare = await FareConfig.find()
  return fare
  }catch(err){
    console.log(err)
  }
}
async UpdateFareConfig(
  id: string,
  body: FareConfigDto
){
  try{
    const fare = await FareConfig.findOne({
      where:{
        id
      }
    })
    if(!fare){
      throw new Error("fare is not configured ")
    }
    fare.vechicleType = body.vechicleType,
    fare.baseFare = body.baseFare,
    fare.perKmRate = body.perKmRate,
    fare.perMinRate = body.perMinRate,
    fare.minimumFare = body.minimumFare,
    fare.platformFee = body.platformFee,
    fare.isActive = body.isActive,
    fare.NightRide = body.NightRide,
    fare.RainRide = body.RainRide
   const updated = await fare.save()

   return updated

   }catch(err){
    console.log(err)
  }

}
}
export default new AdminService();