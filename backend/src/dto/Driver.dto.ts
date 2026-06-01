import { IsDate, IsEnum, IsString } from "class-validator";
import { Driverstatus } from "../enum/enum.details.ts";

export class Driverdto {

    @IsString()  
    licenseNumber: string;

    @IsDate()
    licenseExpery: Date;

    @IsString()
    citizenshipNumber: string;

    @IsEnum(Driverstatus)
    status: Driverstatus;


}