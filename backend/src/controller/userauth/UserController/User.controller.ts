import { Controller, Delete, Get, Middlewares, Path, Query, Route } from "tsoa";
import { Adminmiddleware } from "../../../Middlewares/AdminMiddleware.ts";
import type { UserRole } from "../../../enum/enum.details.ts";
import UserServices from "../../../services/UserService/User.services.ts";
import path from "node:path";

@Route("users")
export class UserController extends Controller {

    @Get("getusers") //only for admin ko lage
    @Middlewares(Adminmiddleware)
    
    async getuser (
        @Query() Role: UserRole,
        @Query() page: number,
        @Query() limit: number
    ){
      try{
     return await UserServices.getallusers(Role, page, limit)
      }catch(err){
        throw err;
      }
    }

    @Delete("deleteuser/{id}")
    @Middlewares(Adminmiddleware)
    async deleteUser (
        @Path() id: string
    ){
        return await UserServices.DeleteUser(id)
    }

    @Get("getprofile/{userId}")
    async Getprofile(
        @Path() userId: string
    ){
         try{
        return await UserServices.Getprofile(userId)
         }catch(err){
            console.log("th eerror is ",err)
         }
    }
}