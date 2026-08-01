import Payments from "../../entity/Payment.entities.ts";
import { Ride } from "../../entity/Ride.entities.ts";
import type { Payment } from "../../enum/enum.details.ts";

class PaymentServices{
    async CreatePayment(
        PaymentType:Payment,
         payment:string,
          rideId:string
    ){
      try{
        const ride = await Ride.findOne({
            where:{
                id: rideId
            }
        });
        if(!ride){
            throw new Error("ride not found")
        }
        const newpayment = new Payments();
        newpayment.PaymentType = PaymentType as Payment;
        newpayment.payment = payment;
        newpayment.Ride = ride;
        await newpayment.save();

        return{
            message: "payment created successfully",
            payment: newpayment
        }

      }catch(err){
        console.log(err)
      }
    }
}
export default new PaymentServices();