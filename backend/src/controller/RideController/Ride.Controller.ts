import { Body, Controller, Get, Post, Query, Request, Route, Security } from "tsoa";
import type { VehicleType } from "../../enum/enum.details.ts";
import RideServices from "../../services/RideService/Ride.Services.ts";
import type CreateRideDto from "../../dto/Ridecreate.dto.ts";

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
    @Post("createride")
    @Security("jwt")
    async CreateRide(
        @Body() body: CreateRideDto,
        @Request() req: any
    ){
        try{
            const userid = req.user!.id

            return await RideServices.CreateRide(body, userid)
        }catch(err){
            console.log(err)
        }
        
    }

}