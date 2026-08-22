import { Controller, Get, Query, Route } from "tsoa";
import AdminServices from "../../services/AdminService/Admin.services.ts";

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

}