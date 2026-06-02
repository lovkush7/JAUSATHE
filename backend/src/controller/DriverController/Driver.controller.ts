import { Body, Controller, Get, Middlewares, Patch, Post, Request, Route, Security } from "tsoa";
import { Drivermiddleware } from "../../Middlewares/AdminMiddleware.ts";
import type { Driverdto } from "../../dto/Driver.dto.ts";
import DriverService from "../../services/Driver/DriverService.ts";
import type { LocationInfoDto } from "../../dto/loc.info.dto.ts";

@Route("driver")
export class DriverController extends Controller{

    @Post("register-driver")
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
   
    @Get("/nearby")
    async getNearbyDrivers(
        @Body() body: LocationInfoDto,
        
    ){
        try{
            if(body.lat == null || body.lng == null){
                throw new Error("latitude and longitude are required")
            }

            await DriverService.getNearbyDrivers(body.lat, body.lng, body.vehicleType , body.radious ? body.radious : 5000)

        }catch(err){
            throw err;
        }
    }
}