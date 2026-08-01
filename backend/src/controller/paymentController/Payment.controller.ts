import { Body, Controller,  Post,  Route } from "tsoa";
import PaymentServices from "../../services/payment/Payment.Services.ts";
import type { Payment } from "../../enum/enum.details.ts";

@Route("Payment")
export class PaymentController  extends Controller{
    @Post("/CreatePayment")
    async CreatePayment(
        @Body() body: {
            rideId:string
            PaymentType: Payment, 
            payment:string, 
            }
    ){
       return await PaymentServices.CreatePayment(body.PaymentType,body.payment,body.rideId)
    }
}