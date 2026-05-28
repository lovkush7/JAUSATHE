import { Column, Entity, Index, JoinColumn, ManyToOne, type LineString, type Point } from "typeorm";
import { CommonEntity } from "./commonentity.ts";
import { Cancledby, RideStatus, VehicleType } from "../enum/enum.details.ts";
import { Vechicles } from "./Vechiles.entity.ts";
import { User } from "./User.entities.ts";

@Entity("ride")
export class Ride extends CommonEntity{
    @Column({type: "text"})
    pickupAddress: string;

    @Index({spatial: true})
    @Column({type: "geometry", spatialFeatureType: "point", srid: 4326})
    pickupLocation: Point;

    @Column({type: "text", })
    DropoffAddress: string;

    @Index({spatial: true})
    @Column({type: "geography", spatialFeatureType: "point", srid: 4326 })
    DropoffLocation: Point;

    @Column({type: "geometry",
        spatialFeatureType: "LineString",
        srid: 4326,
        nullable: true,
    })
    routepath: LineString;

    @Column({type: "decimal", precision: 10, scale: 2, nullable: true})
    estimatedFare: number;

    @Column({type: "decimal", precision: 10, scale: 2, nullable: true})
    FinalFare: number;

    @Column({type: "decimal", precision: 8, scale: 3 , nullable: true})
    estimatedDistance: number;

    @Column({type: "decimal", precision: 8, scale: 3 , nullable: true})
    ActualDistance: number;

    @Column({type: "float", nullable: true})
    DurationMinutes: number;

    @Column({type: "enum", enum: VehicleType, default:VehicleType.BIKE})
    reqVehicleType: VehicleType;

    @Column({type: "enum" , enum: RideStatus, default: RideStatus.REQUESTED})
    ridestauts: RideStatus;

    @Column({type: "enum", enum: Cancledby, nullable: true})
    cancledby: Cancledby;

    @Column({type: "text", nullable: true})
    cancellationResion: string;

   @Column({type: "date", nullable: true})
   cancelAt: Date;

   @Column({type: "date", nullable: true})
   driverAcceptedAt: Date;

   @Column({type: "date", nullable: true})
   driverArrivedAt: Date;

   @Column({type:"date", nullable: true})
    tripStartAt: Date;

   @Column({type: "date", nullable: true})
   tripEndAt: Date;

   @ManyToOne(()=>User, (user)=>user.rides, {nullable:true})
   @JoinColumn({name: "riderId"})
   rider: User

   @ManyToOne(()=>Vechicles, (vehicles)=>vehicles.rides, {nullable:true})
   @JoinColumn({name: "vechicleId"})
   vechicle: Vechicles;






}