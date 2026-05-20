import { BeforeInsert, Column, Entity } from "typeorm";
import { CommonEntity } from "./commonentity.ts";
import { UserRole } from "../enum/enum.details.ts";
import bcrypt from "bcrypt"
@Entity("user")
export class User extends CommonEntity {

    @Column({type: "text"})
    FullName!: string;

    @Column({type: "text", unique: true})
    Email!: string;

    @Column({type: "text", select: false})
    password: string;

    @Column({type: "text"})
    Phone!: string;

    @Column({type: "text" , nullable: true})
    profile: string;


    @Column({type:"enum", enum: UserRole, default: UserRole.PASSENGERS})
    Role: UserRole;




@BeforeInsert()
_(){
    this.password = bcrypt.hashSync(this.password, 10)
}
    


}