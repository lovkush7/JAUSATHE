import { Body, Controller, Get, Middlewares, Patch, Path, Post, Query, Request, Route, Security } from "tsoa";
import { Driverstatus, UserRole, type VehicleType } from "../../enum/enum.details.ts";
import RideServices from "../../services/RideService/Ride.Services.ts";
import type CreateRideDto from "../../dto/Ridecreate.dto.ts";
import { Drivermiddleware } from "../../Middlewares/AdminMiddleware.ts";

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
    @Get("active")
    @Security("jwt")
    async GetActiveRide(
        @Request() req: any
    ){
     try{
     const role = req.user!.Role === UserRole.DRIVER ? UserRole.DRIVER: UserRole.PASSENGERS
     const userid = req.user!.id;

     return await RideServices.GetActiveRide(role,userid)

     }catch(err){
        throw err;
     }

    }
    @Patch("{id}/accept")
    @Security("jwt")
    @Middlewares(Drivermiddleware)
    async AcceptRides(
        @Body()  vechicleId: string,
        @Request() req: any,
        @Path() rideid: string
    ){
      return await RideServices.AcceptRide(vechicleId, req.user!.id, rideid)

    }

}