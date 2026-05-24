import { Column, Entity } from "typeorm";
import { CommonEntity } from "./commonentity.ts";
import { VehicleType } from "../enum/enum.details.ts";

@Entity("vechicles")
export class Vechicles extends CommonEntity {

    @Column({ type: "text" })
    model: string;

    @Column({ type: "text", unique: true })
    plateNumber: string;

    @Column({ type: "text" })
    color: string;

    @Column({
        type: "enum",
        enum: VehicleType,
    })
    type: VehicleType;

   
    

}
