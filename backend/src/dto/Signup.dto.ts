import { IsEnum, IsString } from "class-validator";
import { UserRole } from "../enum/enum.details.ts";

class SignupDto {
    @IsString()
    FullName!: string;

    @IsString()
    Email!: string;

    @IsString()
    password: string;

    @IsString()
    Phone!: string;


    @IsEnum(UserRole)
    @IsString()
    Role: UserRole;
}
export default SignupDto;