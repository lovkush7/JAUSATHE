import { Body, Controller, Get, Middlewares, Patch, Path, Post, Queries, Request, Route, Security } from "tsoa";
import { Adminmiddleware, Drivermiddleware } from "../../Middlewares/AdminMiddleware.ts";
import type { Driverdto } from "../../dto/Driver.dto.ts";
import DriverService from "../../services/Driver/DriverService.ts";
import type { LocationInfoDto } from "../../dto/loc.info.dto.ts";
import { Driver } from "../../entity/Driver.entities.ts";

@Route("driver")
export class DriverController extends Controller{

    @Post("registerdriver")
    @Middlewares(Drivermiddleware)
    @Security("jwt")
    async registerDriver(
        @Request() request: any,
        @Body() body: Driverdto
    ) {
        try {
            return await DriverService.createDriver(request.user.id, body);
        } catch (err) {
            throw err;
        }
    }

    @Get("myprofile")
    @Security("jwt")
    @Middlewares(Drivermiddleware)
    async getDriverProfile(
        @Request() request: any
    ) {
        try {
            return await DriverService.getDriverprofile(request.user.id);
        } catch (err) {
            throw err;
        }
    }

    @Post("/location")
    @Security("jwt")
    @Middlewares(Drivermiddleware)
    async DriverLocation(
        @Body() body: {
            lat: number;
            lng: number;
            bearing: number;
        },
        @Request() request: any
    ){
        try{

            if(body.lat == null || body.lng == null){
                throw new Error("latitude and longitude are required")
            }
            return  await DriverService.updateDriverLocation(request.user.id, body.lat, body.lng, body.bearing)
        }catch(err){
            throw err;
        }

    }

    @Patch("/updateStauts")
    @Security("jwt")
    @Middlewares(Drivermiddleware)
    async updateDriverStatus(
        @Body()  body: Driverdto,
        @Request() request: any
    ){
        try{
          if(body.status == null){
            throw new Error("status is required")
          }
            return await DriverService.updateDriverStatus(body.status,request.user.id)
        }catch(err){
            throw err;
        }
    }
   
    // @Get("nearby")
    // async getNearbyDrivers(
    //   @Queries() body:  LocationInfoDto
        
    // ){
    //     try{
    //         if(body.lat == null || body.lng == null){
    //             throw new Error("latitude and longitude are required")
    //         }

    //         await DriverService.getNearbyDrivers(body.lat, body.lng, body.vehicleType , body.radious ? body.radious : 5000)

    //     }catch(err){
    //         throw err;
    //     }
    // }
    @Get("getapprovedDriver")
    @Middlewares(Adminmiddleware)
    async getApprovedDriver(){
        try{
            const pending =  await Driver.find({
                where:{
                    isApproped: false
                },
                relations:{
                    user: true
                }
            })
            return pending;
        }catch(err){

        }
    }
    @Patch("approved/{id}")
    @Middlewares(Adminmiddleware)
    async ApprovedDriver(
        @Path() id: string
    ){

        return await DriverService.ApproveDriver(id)
    }
}