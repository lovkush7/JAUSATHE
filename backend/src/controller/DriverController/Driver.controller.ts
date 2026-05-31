import { Body, Controller, Middlewares, Post, Request, Route, Security } from "tsoa";
import { Drivermiddleware } from "../../Middlewares/AdminMiddleware.ts";
import type { Driverdto } from "../../dto/Driver.dto.ts";
import DriverService from "../../services/Driver/DriverService.ts";

@Route("driver")
class DriverController extends Controller{

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

    @Get("profile")
    @Security("jwt")
    @Middlewares(Drivermiddleware)
    async getDriverProfile(
        @Request() request: any
    ) {
        try {
            return await DriverServices.getDriverByUserId(request.user.id);
        } catch (err) {
            throw err;
        }
    }

    @Patch("update-status")
    @Security("jwt")
    @Middlewares(Drivermiddleware)
    async updateStatus(
        @Request() request: any,
        @Query() status: Driverstatus
    ) {
        try {
            return await DriverServices.updateDriverStatus(request.user.id, status);
        } catch (err) {
            throw err;
        }
    }

}