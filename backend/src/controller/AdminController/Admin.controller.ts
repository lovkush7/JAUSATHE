import { Body, Controller, Get, Patch, Path, Put, Query, Route } from "tsoa";
import AdminServices from "../../services/AdminService/Admin.services.ts";
import path from "node:path";
interface DriverApprovalRequest {
  isApproval: boolean;
}
@Route("admin")
export class AdminController extends Controller{
@Get("/getRides")
async GetAllRides(
    @Query() range: "7d" | "30d"| "90d" = "7d"
){
try{
    return await AdminServices.AdminService(range);

}catch(err){
    console.log(err)
}
}
@Get("weekly-rides")
async WeeklyRides(){
    try{
        return await AdminServices.WeeklyRides()

    }catch(err){
        console.log(err)
    }
}
@Get("/details")
async GetDetails (){
    try{
      return await AdminServices.GetDetails()
    }catch(err){
        console.log(err)
    }
}

@Get("getdrivers")
async GetDriverDetails (){
 return await AdminServices.GetDriverData()
}

@Patch("driverapproval/{id}")
async driverapproval(
    @Path() id: string,
    @Body()  body: DriverApprovalRequest
){
 try{
     return await AdminServices.driverapproval(id, body.isApproval)
 }catch(err){
    console.log(err)
 }
}
@Get("GetUsers")
async GetUsers (){
  try{
     return await AdminServices.GetUsers()
  }catch(err){
    console.log(err)
  }
}

}