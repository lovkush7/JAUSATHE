import { IsArray, IsEmail, IsOptional, IsString } from "class-validator";

 class UpdateProfileDto{
    @IsString()
    @IsOptional()
    FullName: string

    @IsString()
    @IsEmail()
    @IsOptional()
    Email: string

    @IsString()
    @IsOptional()
    Phone: string

    @IsString()
    @IsOptional()
    @IsArray()
    address: string[];

   @IsString()
   @IsOptional()
   profile: string
}
export default UpdateProfileDto