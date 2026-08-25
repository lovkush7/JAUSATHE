import { Body, Controller, Get, Patch, Path, Put, Query, Route } from "tsoa";
import AdminServices from "../../services/AdminService/Admin.services.ts";
import path from "node:path";
import type { VehicleType } from "../../enum/enum.details.ts";
interface DriverApprovalRequest {
  isApproval: boolean;
}
interface FareConfig {
  vechicleType: VehicleType,
  baseFare: Number
  perKmRate: Number
  perMinRate: Number
  minimumFare: Number
  platformFee: Number
  isActive: boolean
  NightRide: Number
  RainRide: Number
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
@Get("fare-config")
async FareConfig(){
    return await AdminServices.FareConfig()
}

@Patch("fare-config/{id}")
async updateFare(
    @Path() id: string,
    @Body() body: FareConfig
){
    try{
        return await AdminServices.UpdateFareConfig(id, body)

    }catch(err){
        console.log(err)
    }

}


}