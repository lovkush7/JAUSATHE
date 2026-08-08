import Payments from "../../entity/Payment.entities.ts";
import { Ride } from "../../entity/Ride.entities.ts";
import { RideStatus, type Payment } from "../../enum/enum.details.ts";

class PaymentServices {
    async CreatePayment(
        PaymentType: Payment,
        payment: number,
        rideId: string
    ) {
        try {
            const ride = await Ride.findOne({
                where: {
                    id: rideId
                }
            });
            if (!ride) {
                throw new Error("ride not found")
            }
            const newpayment = new Payments();
            newpayment.PaymentType = PaymentType as Payment;
            newpayment.payment = payment;
            newpayment.Ride = ride;
            await newpayment.save();

            return {
                message: "payment created successfully",
                payment: newpayment
            }

        } catch (err) {
            console.log(err)
        }
    }

    async gettotalPayment(
        userId: string,
        year: number
    ) {
        try {
            const result = await Ride.createQueryBuilder("ride")
                .select("EXTRACT(MONTH FROM ride.CreatedAt)", "month")
                .addSelect("SUM(ride.estimatedFare)", "earnings")
                .leftJoin("ride.driver", "driver")
                .leftJoin("driver.user", "user")
                .where("user.id = :userId", { userId })
                .andWhere("ride.ridestauts = :status", {
                    status: RideStatus.COMPLETED,
                })
                .andWhere("EXTRACT(YEAR FROM ride.CreatedAt) = :year", {
                    year,
                })
                .groupBy("EXTRACT(MONTH FROM ride.CreatedAt)")
                .orderBy("EXTRACT(MONTH FROM ride.CreatedAt)", "ASC")
                .getRawMany();
            console.log("the result is ", result)
            const months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];
            const monthlyData = months.map((month, index) => {
                const data = result.find(
                    (item) => Number(item.month) === index + 1
                );

                return {
                    month,
                    earnings: data ? Number(data.earnings) : 0,
                };
            });

            return monthlyData;

        } catch (err) {
            console.log(err)
        }
    }
}
export default new PaymentServices();