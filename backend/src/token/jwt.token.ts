import jwt from "jsonwebtoken"
import type { User } from "../entity/User.entities.ts"
import Envconfig from "../config/Envconfig.ts";

const GenerateToken = async(
    user: User
)=>{
try{
    const Token =  jwt.sign(
        {
         id: user.id,
         role: user.Role,
         email: user.Email,
    },
    Envconfig.JWT_SECRET!,
    {
   expiresIn: "7d"
    }
)
return Token;

}catch(err){
    throw err;
}
}
export default GenerateToken;