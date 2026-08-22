import { Driver } from "../../entity/Driver.entities.ts";
import { FareConfig } from "../../entity/FareConfig.entities.ts";
import { Ride } from "../../entity/Ride.entities.ts";
import { User } from "../../entity/User.entities.ts";
import { Driverstatus, RideStatus } from "../../enum/enum.details.ts";

class AdminService {
    async AdminService(
        range: "7d"|"30d"| "90d"
    ){
        const daymap ={
            "7d":7,
            "30d":30,
            "90d":90
        }
        const days = daymap[range]

        const result =  Ride
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

     const chart =  (await result).map((item) => ({
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
    async WeeklyRides(){
      try{
        const  now = new Date()

        const StartofWeek = new Date(now)
        StartofWeek.setHours(0, 0, 0, 0)


         const day = StartofWeek.getDay();
    StartofWeek.setDate(StartofWeek.getDate() - day);

  const endOfWeek = new Date(StartofWeek);

endOfWeek.setDate(
  endOfWeek.getDate() + 7
);

    const Completed: any =  await Ride .createQueryBuilder("ride")
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
      }catch(err){
        console.log(err)
      }
    }
  async GetDetails(){
    try{
      //total ride today ane active driver ane avarage ride fare ane new users today
        const day = new Date()

      const ride = await Ride.createQueryBuilder("ride")
              .where("DATE(ride.CreatedAt) = CURRENT_DATE")
                   .andWhere(`"ride"."ridestauts" = :status`, {
        status: RideStatus.COMPLETED,
      })
      .getCount()
        
     const active = await  Driver.createQueryBuilder("driver")
        .where(`"driver"."status" = :status `,{
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
        

    }catch(err){
      console.log(err)
    }
  }
  async GetDriverData(){
     try{
      const drivertable = await Driver.find({
        relations:{
          ridesasDriver: true,
          user: true,
        },
      
      })
        return {
          
        }
     }catch(err){
      console.log(err)
     }
  }
}
export default new AdminService();