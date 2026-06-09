import { Controller, Get, Query, Route } from "tsoa";
import type { VehicleType } from "../../enum/enum.details.ts";
import RideServices from "../../services/RideService/Ride.Services.ts";

@Route("ride")
export class RideController extends Controller{

    @Get("estimatefare")
    async estimatefare(
        @Query() pickuplat: number,
        @Query() pickuplng: number,
        @Query() dropofflat: number,
        @Query() dropofflng: number,    
        @Query() vehicleType: VehicleType
    
    ){
        return await RideServices.estimateFare(pickuplat, pickuplng, dropofflat, dropofflng, vehicleType)
    

    }

}