import { IsBoolean, IsEnum, IsNumber } from "class-validator";
import { VehicleType } from "../enum/enum.details.ts";

export class FareConfigDto {
@IsNumber()
baseFare: number


@IsNumber()
perKmRate: number

@IsNumber()
perMinRate: number


@IsNumber()
minimumFare: number

@IsNumber()
platformFee: number

@IsNumber()
NightRide: number

@IsBoolean()
isActive: boolean

@IsNumber()
RainRide: number

@IsEnum(VehicleType)
vechicleType: VehicleType
}


