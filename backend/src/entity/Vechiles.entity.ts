import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { CommonEntity } from "./commonentity.ts";
import { VehicleType } from "../enum/enum.details.ts";
import { Driver } from "./Driver.entities.ts";
import { Ride } from "./Ride.entities.ts";

@Entity("vechicles")
export class Vechicles extends CommonEntity {

    @Column({ type: "text" })
    model: string;

    @Column({ type: "text", unique: true })
    plateNumber: string;

    @Column({
        type:"boolean",
    default: false
})
isDefault: boolean;
    // @Column({ type: "text" })
    // color: string;

    @Column({
        type: "enum",
        enum: VehicleType,
    })
    type: VehicleType;

    @Column({type: "text" })
    seatCapacity: string;

    @OneToOne(()=>Driver, (driver)=>driver.vechicles)
    @JoinColumn()
    driver: Driver;

    @OneToMany(()=>Ride, (ride)=>ride.vechicle)
    rides: Ride[];

   
    

}
