import { Controller, Get, Query, Route } from "tsoa";
import type { VehicleType } from "../../enum/enum.details.ts";
import RideServices from "../../services/RideService/Ride.Services.ts";

@Route("ride")
export class RideController extends Controller{

    @Get("estimatefare")
    async estimatefare(
        @Query() pickuplat: number,
        @Query() pickuplong: number,
        @Query() dropofflat: number,
        @Query() dropofflong: number,    
        @Query() vehicleType: VehicleType
    
    ){
        return await RideServices.estimateFare(pickuplat, pickuplong, dropofflat, dropofflong, vehicleType)
    

    }

}