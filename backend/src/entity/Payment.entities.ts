import { Column, Entity, OneToOne } from "typeorm";
import { CommonEntity } from "./commonentity.ts";
import { Payment } from "../enum/enum.details.ts";
import { Ride } from "./Ride.entities.ts";

@Entity("payment")
class Payments extends CommonEntity{

    @Column({type:"enum",enum:Payment,default:Payment.CASH})
    PaymentType:Payment

    @Column({type:"text",nullable:true})
    payment: string;

    @OneToOne(()=>Ride,(r)=>r.payment)
     Ride: Ride;
}
export default Payments;