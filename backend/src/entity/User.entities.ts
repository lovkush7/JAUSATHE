import { BeforeInsert, Column, Entity, OneToMany, OneToOne } from "typeorm";
import { CommonEntity } from "./commonentity.ts";
import { UserRole, Userstatus } from "../enum/enum.details.ts";
import bcrypt from "bcrypt"
import { Ride } from "./Ride.entities.ts";
import { Driver } from "./Driver.entities.ts";
@Entity("user")
export class User extends CommonEntity {

    @Column({type: "text"})
    FullName!: string;

    @Column({type: "text", unique: true})
    Email!: string;

    @Column({type: "text"})
    password: string;

    @Column({type: "text"})
    Phone!: string;

    @Column({type: "text" , nullable: true})
    profile: string;

    @Column({type: "enum", enum: Userstatus, default: Userstatus.ACTIVE})
    status: Userstatus;

    @Column("simple-array", {nullable: true})
    address:  string[]

    @Column({type:"enum", enum: UserRole, default: UserRole.PASSENGERS})
    Role: UserRole;

    @OneToMany(()=>Ride, (ride)=>ride.rider)
    rides: Ride[];

    @OneToOne(()=>Driver, (profile)=>profile.user)
    Driver: Driver;



@BeforeInsert()
_(){
    this.password = bcrypt.hashSync(this.password, 10)
}
    


}