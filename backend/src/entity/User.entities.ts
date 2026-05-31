import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { CommonEntity } from "./commonentity.ts";
import { UserRole, Userstatus } from "../enum/enum.details.ts";
import bcrypt from "bcrypt"
import { Ride } from "./Ride.entities.ts";
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


    @Column({type:"enum", enum: UserRole, default: UserRole.PASSENGERS})
    Role: UserRole;

    @OneToMany(()=>Ride, (ride)=>ride.rider)
    rides: Ride[];




@BeforeInsert()
_(){
    this.password = bcrypt.hashSync(this.password, 10)
}
    


}