import { IsDate, IsEnum, IsString } from "class-validator";
import { Driverstatus, VehicleType } from "../enum/enum.details.ts";

export class Driverdto {

    @IsString()  
    licenseNumber: string;

    @IsDate()
    licenseExpery: Date;

    @IsString()
    citizenshipNumber: string;

    @IsEnum(VehicleType)
    vehicleType: VehicleType;

    

    @IsEnum(Driverstatus)
    status: Driverstatus;


}