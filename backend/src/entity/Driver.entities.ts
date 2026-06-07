import { Column, Entity, Index, JoinColumn, OneToOne, type Point } from "typeorm";
import { CommonEntity } from "./commonentity.ts";
import { Driverstatus } from "../enum/enum.details.ts";
import { Vechicles } from "./Vechiles.entity.ts";
import { User } from "./User.entities.ts";

@Entity("driver")
export class Driver extends CommonEntity {

    @Column({ type: "text", nullable: true, unique: true })
    licenseNumber: string;

    @Column({ type: 'date', nullable: true })
    licenseExpery: Date;

    @Column({ type: "text", nullable: true })
    citizenshipNumber: string;
         
    @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
    currentBearing: number;

    @Column({ type: "timestamp", nullable: true })
    lastLocationUpdate: Date;

    @Column({ type: "enum", enum: Driverstatus, default: Driverstatus.OFFLINE })
    status: Driverstatus;

    @Column({ type: "integer", default: 0 })
    totaltrip: number;

    @Column({ type: "decimal", precision: 3, scale: 2, default: 0 })
    rating: number;

    @Column({type: "boolean", default: false})
    isApproped: boolean;


    @Index({ spatial: true })
    @Column({
        type: "geometry",
        spatialFeatureType: "point",
        srid: 4326,
        nullable: true,
    })
    CurrentLocation: Point;

    @OneToOne(() => Vechicles, (vechicles) => vechicles.driver)
    vechicles: Vechicles;

    @OneToOne(() => User, (user) => user.Driver)
    @JoinColumn({ name: "userId" })
    user: User;
}