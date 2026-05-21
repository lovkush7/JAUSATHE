import { Body, Controller, Get, Post, Request, Route, Security } from "tsoa";
import authenticationService from "../../services/auth/authentication.service.tsx";
import type SignupDto from "../../dto/Signup.dto.ts";
import type LoginDto from "../../dto/Login.dto.ts";
import Envconfig from "../../config/Envconfig.ts";

const jwttokenbuild = (token: string)=>{

  const isproduction = (Envconfig.NODE_ENV === "production")

  return `jwt=${token}; HttpOnly; HttpOnly; Max-Age=604800; Path=/; SameSite=${isproduction ? "None" : "Lax"}; ${isproduction ? "Secure;" : ""}  `
}

@Route("auth")
 export class Authentication extends Controller{
    @Post("login")
async login(
  @Body() body: LoginDto
){
  const {token, existinguser} = await authenticationService.login(body)

  this.setHeader(
    "Set-Cookie",
     jwttokenbuild(token))

  return existinguser;
}

@Post("signup")
async signup(
  @Body() body: SignupDto
){

  const  {token, newUser}= await authenticationService.register (body);

  this.setHeader(
    "Set-Cookie",
     jwttokenbuild(token))

  return newUser;

}

@Get("checkauth")
@Security("jwt")
async checkauth(
  @Request() request: any
){
  try{

    return request.user;

  }catch(err){
    throw err;
  
  }

}

}