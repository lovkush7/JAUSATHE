import { Body, Controller, Get,  Patch,  Path,  Route } from "tsoa";
import VehiclesServices from "../../services/Vehicleservice/Vehicles.services.ts";
interface vehiclesapproval{
    isapproved: boolean
}
@Route("/vehicles")
export class VehiclesController extends Controller {

    @Get("/getVehicles")
    async Getvehicles(){
    try{
    return await VehiclesServices.getVehicles()
    }catch(err){
        console.log("the error is ", err)
    }

    }
    @Patch("approve/{id}")
    async approvalvehicles(
        @Path() id: string,
        @Body() body: vehiclesapproval
    ){
        return await VehiclesServices.VehiclesApproval(id, body.isapproved)

    }


}