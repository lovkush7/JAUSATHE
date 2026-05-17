import type LoginDto from "../../dto/Login.dto.ts";
import type SignupDto from "../../dto/Signup.dto.ts";
import { User } from "../../entity/User.entities.ts";
import bcrypt from "bcrypt"
import GenerateToken from "../../token/jwt.token.ts";

class Authentication {
    async login(
        body: LoginDto
    ){
        const existinguser = await User.findOne({
            where: {
                Email: body.Email
            }
        })
        if(!existinguser){
            throw new Error("user dosent exist")
        }
       const ispasscheck = await bcrypt.compare(body.password, existinguser.password);
       
       if(!ispasscheck){
        throw new Error("invalid password")
       }
       const token = await GenerateToken(existinguser as any)

       return {
        token,
        existinguser
       }
 

    }

    async register(
        body: SignupDto
    ){
        try{
            const existingUser = await User.findOne({
                where:{
                    Email: body.Email
                }
            });
            if(existingUser){
                throw new Error("User already exists you can login");

            }
            const newUser = new User();
            newUser.FullName = body.FullName;
            newUser.Email= body.Email;
            newUser.password= body.password;
            newUser.Phone = body.Phone;
            newUser.Role = body.Role;
            await newUser.save();

            const token = await GenerateToken(newUser as any)


            return {
                token,
                newUser
            };

        }catch(err){
            throw err;
        }

    }
}
export default new Authentication();