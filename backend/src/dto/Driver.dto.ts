import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
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

    
    // @IsOptional()
    // @IsEnum(Driverstatus)
    // status: Driverstatus;

    @IsString()
    Vechiclemodel: string;

    @IsString()
    plateNumber: string;

    @IsString()
    seatCapacity: string;

    // @IsString()
    // color: string;




}