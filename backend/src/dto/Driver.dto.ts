import { IsDate, IsString } from "class-validator";

export class Driverdto {

    @IsString()  
    licenseNumber: string;

    @IsDate()
    licenseExpery: Date;

    @IsString()
    citizenshipNumber: string;


}