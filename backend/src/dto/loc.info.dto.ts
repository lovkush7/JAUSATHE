import  { IsEnum, IsNumber } from "class-validator";
import { VehicleType } from "../enum/enum.details.ts";


 export  class LocationInfoDto {
    @IsNumber()
    lat: number;

    @IsNumber()
    lng: number;

    @IsNumber()
    radious: number;


    @IsEnum(VehicleType)
    vehicleType: VehicleType;

}