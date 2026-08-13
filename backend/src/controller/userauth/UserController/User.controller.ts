import { Body, Controller, Delete, Get, Middlewares, Patch, Path, Put, Query, Route, UploadedFile } from "tsoa";
import { Adminmiddleware } from "../../../Middlewares/AdminMiddleware.ts";
import type { UserRole } from "../../../enum/enum.details.ts";
import UserServices from "../../../services/UserService/User.services.ts";
import path from "node:path";
import type UpdateProfileDto from "../../../dto/UpdatedProfile.dto.ts";




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
    @Patch("update/{id}")
    async UpdateProfile(
        @Path() id: string,
        @Body() body: UpdateProfileDto,
        // @UploadedFile() image?: Express.Multer.File
    ){
       try{

    return await UserServices.UpdateUserProfile(id,body)
       }catch(err){
        console.log("the error is ",err)
       }
    }
    @Patch("updateprofile/{id}")
    async Updateprofilepic(
          
    ){

    }
}