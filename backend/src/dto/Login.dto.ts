import { IsString } from "class-validator";

class LoginDto {
    @IsString()
    Email!: string;

    @IsString()
    password: string;

}
export default LoginDto;