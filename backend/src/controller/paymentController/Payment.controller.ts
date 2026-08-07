import { Body, Controller,  Get,  Post,  Query,  Request,  Route, Security } from "tsoa";
import PaymentServices from "../../services/payment/Payment.Services.ts";
import type { Payment } from "../../enum/enum.details.ts";

@Route("Payment")
export class PaymentController  extends Controller{
    @Post("/CreatePayment")
    async CreatePayment(
        @Body() body: {
            rideId:string
            PaymentType: Payment, 
            payment:number, 
            }
    ){
       return await PaymentServices.CreatePayment(body.PaymentType,body.payment,body.rideId)
    }

    @Get("monthly-earning")
    @Security("jwt")
    async gettotalpayment(
        @Request() request: any,
        @Query() year?: number
    ){
        const driverId =  request.user.id;
        return await PaymentServices.gettotalPayment(driverId,
            year ?? new Date().getFullYear()
        )

    }
}