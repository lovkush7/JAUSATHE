import { Column, Entity, Index, type Point } from "typeorm";
import { CommonEntity } from "./commonentity.ts";
import { Driverstatus } from "../enum/enum.details.ts";

@Entity("driver")
export class Driver extends  CommonEntity{

    @Column({type: "text", nullable: true, unique: true})
    licenseNumber: string;

    @Column({type: "enum", enum: Driverstatus, default: Driverstatus.OFFLINE})
    status: Driverstatus;

    @Column({type: "integer", default: 0})
    totaltrip: number;

    @Column({type: "decimal", precision: 3 , scale:2 , default: 0})
    rating: number;

    @Index({spatial: true})
    @Column({
        type: "geometry",
        spatialFeatureType: "point",
        srid: 4326,
        nullable: true,
    })
    CurrentLocation: Point;



}