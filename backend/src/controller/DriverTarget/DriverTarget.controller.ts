import { Body, Controller, Get, Path, Post, Route } from "tsoa";
// import DriverTargetService from "../../services/Targetservice/Driver.Service.ts";
import DriverTargetService from "../../services/Targetservice/Driver.services.ts"
interface CreateRideTargetDto{
    DriverId: string;
    targetRides: number;
}

@Route("DriverTarget")
export class DriverTargetController extends Controller {

    @Post("/CreateTarget")
    async CreateTarget(
        @Body() body: CreateRideTargetDto
    ){
        try{
    return await   DriverTargetService.createDriverTarget(body.DriverId, body.targetRides)
        }catch(err){
            console.log(err)
        }

    }
    @Get("{driverId}/today")
    async GetTodayTarget(
        @Path() driverId: string
    ){
        return await DriverTargetService.GetTodaytarget(driverId)

    }
}