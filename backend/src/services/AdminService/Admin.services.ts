import { Ride } from "../../entity/Ride.entities.ts";
import { RideStatus } from "../../enum/enum.details.ts";

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
}
export default new AdminService();