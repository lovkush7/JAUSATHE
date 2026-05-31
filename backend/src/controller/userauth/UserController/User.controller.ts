import { Controller, Delete, Get, Middlewares, Path, Query, Route } from "tsoa";
import { Adminmiddleware } from "../../../Middlewares/AdminMiddleware.ts";
import type { UserRole } from "../../../enum/enum.details.ts";
import UserServices from "../../../services/UserService/User.services.ts";

@Route("users")
class UserController extends Controller {

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

    @Delete("deleteuser/:{id}")
    @Middlewares(Adminmiddleware)
    async deleteUser (
        @Path() id: string
    ){
        return await UserServices.DeleteUser(id)
    }
}