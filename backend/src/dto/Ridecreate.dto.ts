import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { VehicleType } from "../enum/enum.details.ts";

class CreateRideDto {
    @IsString()
    PickupAddress: string;

    @IsNumber()
    pickuplat: number;

    @IsNumber()
    pickuplng: number;

    @IsString()
    DropoffAddress: string;

    @IsNumber()
    dropofflat: number;

    @IsNumber()
    dropofflng: number;

    @IsEnum(VehicleType)
    vehicleType: VehicleType;

    @IsOptional()
    @IsString()
    PromoCode?: string;
     
      @IsOptional()
    @IsString()
    SpecialInstruction?: string;

    @IsOptional()
    @IsBoolean()
    isScheduled?: boolean;
    
  @IsOptional()
    @IsDate()
    ScheduledAt?: Date;

}
export default CreateRideDto;