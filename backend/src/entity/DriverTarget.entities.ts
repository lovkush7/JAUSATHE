import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CommonEntity } from "./commonentity.ts";
import { User } from "./User.entities.ts";
import { Driver } from "./Driver.entities.ts";

@Entity("Driver_target")
export class DriverTarget extends CommonEntity{

    @ManyToOne(()=>Driver, (driver)=> driver.driverTarget, {onDelete:"CASCADE"})
    @JoinColumn({name: "driverId"})
    driver: Driver;

    @Column({type:"string", nullable: true})
    driverId: string;

    @Column({type:"int" , default:10})
    targetRides: number;

     @Column({type: "int", default: 0})
     CompleteRides: number

     @Column({type: 'date' })
     targetDate: Date;

     @Column({type: "boolean", default: false})
     isComplete: boolean

}