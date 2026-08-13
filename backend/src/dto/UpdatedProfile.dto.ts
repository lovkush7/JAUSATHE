import { IsArray, IsEmail, IsOptional, IsString } from "class-validator";

class UpdateProfileDto {
  @IsString()
  @IsOptional()
  FullName?: string;

  @IsEmail()
  @IsOptional()
  Email?: string;

  @IsString()
  @IsOptional()
  Phone?: string;

  @IsArray()
  @IsOptional()
  address?: string[];


}

export default UpdateProfileDto;