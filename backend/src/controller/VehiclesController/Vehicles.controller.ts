import { Controller, Get,  Route } from "tsoa";
import VehiclesServices from "../../services/Vehicleservice/Vehicles.services.ts";

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


}