import { Column, Entity } from "typeorm";
import { CommonEntity } from "./commonentity.ts";
import { VehicleType } from "../enum/enum.details.ts";

@Entity("fareconfig")
export class FareConfig extends CommonEntity {

    @Column({type: "enum", enum: VehicleType })
    vechicleType: VehicleType;

    @Column({type: "decimal", precision: 8, scale: 2})
    baseFare: number;

    @Column({type: "decimal", precision:8, scale:2})
    perKmRate: number;

    @Column({type: "decimal", precision: 8, scale: 2})
    perMinRate: number;

    @Column({type: "decimal", precision: 8, scale: 2})
    minimumFare: number;

    @Column({type:"decimal", precision: 5 , scale: 2 , default: 0.8})
    platformFee: number;
   
    @Column({type: "boolean", default: true})
    isActive: boolean;

    @Column({type:"decimal", precision: 5, scale: 2 , default: 0.1})
    NightRide: number;

    @Column({type: "decimal", precision: 5, scale: 2, default:0.5})
    RainRide: number;
    
    
}