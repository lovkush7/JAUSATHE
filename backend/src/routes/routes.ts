/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Authentication } from './../controller/userauth/Auth.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controller/userauth/UserController/User.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RideController } from './../controller/RideController/Ride.Controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Geocoading } from './../controller/Geocoading/Geocoading.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DriverController } from './../controller/DriverController/Driver.controller';
import { expressAuthentication } from './../Middlewares/ExpressAuthentication';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "LoginDto": {
        "dataType": "refObject",
        "properties": {
            "Email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserRole": {
        "dataType": "refEnum",
        "enums": ["ADMIN","PASSENGERS","DRIVER"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SignupDto": {
        "dataType": "refObject",
        "properties": {
            "FullName": {"dataType":"string","required":true},
            "Email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "Phone": {"dataType":"string","required":true},
            "Role": {"ref":"UserRole","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Userstatus": {
        "dataType": "refEnum",
        "enums": ["ACTIVE","INACTIVE","BLOCKED"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Position": {
        "dataType": "refAlias",
        "type": {"dataType":"array","array":{"dataType":"double"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Point": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"coordinates":{"ref":"Position","required":true},"type":{"dataType":"enum","enums":["Point"],"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LineString": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"coordinates":{"dataType":"array","array":{"dataType":"refAlias","ref":"Position"},"required":true},"type":{"dataType":"enum","enums":["LineString"],"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "VehicleType": {
        "dataType": "refEnum",
        "enums": ["BIKE","CAR","ELECTRIC","AUTO"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RideStatus": {
        "dataType": "refEnum",
        "enums": ["REQUESTED","SEARCHING","ACCEPTED","ARRIVING","STARTED","COMPLETED","CANCELED","DRIVERNOTFOUND"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Cancledby": {
        "dataType": "refEnum",
        "enums": ["DRIVER","PASSENGERS","SYSTEM"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "DeletedAt": {"dataType":"datetime","required":true},
            "UpdatedAt": {"dataType":"datetime","required":true},
            "CreatedAt": {"dataType":"datetime","required":true},
            "FullName": {"dataType":"string","required":true},
            "Email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "Phone": {"dataType":"string","required":true},
            "profile": {"dataType":"string","required":true},
            "status": {"ref":"Userstatus","required":true},
            "Role": {"ref":"UserRole","required":true},
            "rides": {"dataType":"array","array":{"dataType":"refObject","ref":"Ride"},"required":true},
            "Driver": {"ref":"Driver","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Driverstatus": {
        "dataType": "refEnum",
        "enums": ["ONLINE","OFFLINE","BUSY"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Ride": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "DeletedAt": {"dataType":"datetime","required":true},
            "UpdatedAt": {"dataType":"datetime","required":true},
            "CreatedAt": {"dataType":"datetime","required":true},
            "pickupAddress": {"dataType":"string","required":true},
            "pickupLocation": {"ref":"Point","required":true},
            "DropoffAddress": {"dataType":"string","required":true},
            "DropoffLocation": {"ref":"Point","required":true},
            "routepath": {"ref":"LineString","required":true},
            "estimatedFare": {"dataType":"double","required":true},
            "FinalFare": {"dataType":"double","required":true},
            "estimatedDistance": {"dataType":"double","required":true},
            "ActualDistance": {"dataType":"double","required":true},
            "DurationMinutes": {"dataType":"double","required":true},
            "reqVehicleType": {"ref":"VehicleType","required":true},
            "ridestauts": {"ref":"RideStatus","required":true},
            "cancledby": {"ref":"Cancledby","required":true},
            "cancellationResion": {"dataType":"string","required":true},
            "cancelAt": {"dataType":"datetime","required":true},
            "driverAcceptedAt": {"dataType":"datetime","required":true},
            "driverArrivedAt": {"dataType":"datetime","required":true},
            "tripStartAt": {"dataType":"datetime","required":true},
            "tripEndAt": {"dataType":"datetime","required":true},
            "promoCode": {"dataType":"string"},
            "isScheduled": {"dataType":"boolean"},
            "ScheduledAt": {"dataType":"datetime"},
            "specialInstruction": {"dataType":"string"},
            "rider": {"ref":"User","required":true},
            "vechicle": {"ref":"Vechicles","required":true},
            "driver": {"ref":"Driver","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Vechicles": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "DeletedAt": {"dataType":"datetime","required":true},
            "UpdatedAt": {"dataType":"datetime","required":true},
            "CreatedAt": {"dataType":"datetime","required":true},
            "model": {"dataType":"string","required":true},
            "plateNumber": {"dataType":"string","required":true},
            "isDefault": {"dataType":"boolean","required":true},
            "type": {"ref":"VehicleType","required":true},
            "seatCapacity": {"dataType":"string","required":true},
            "driver": {"ref":"Driver","required":true},
            "rides": {"dataType":"array","array":{"dataType":"refObject","ref":"Ride"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Driver": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "DeletedAt": {"dataType":"datetime","required":true},
            "UpdatedAt": {"dataType":"datetime","required":true},
            "CreatedAt": {"dataType":"datetime","required":true},
            "licenseNumber": {"dataType":"string","required":true},
            "licenseExpery": {"dataType":"datetime","required":true},
            "citizenshipNumber": {"dataType":"string","required":true},
            "currentBearing": {"dataType":"double","required":true},
            "lastLocationUpdate": {"dataType":"datetime","required":true},
            "status": {"ref":"Driverstatus","required":true},
            "totaltrip": {"dataType":"double","required":true},
            "rating": {"dataType":"double","required":true},
            "isApproped": {"dataType":"boolean","required":true},
            "CurrentLocation": {"ref":"Point","required":true},
            "ridesasDriver": {"dataType":"array","array":{"dataType":"refObject","ref":"Ride"},"required":true},
            "vechicles": {"ref":"Vechicles","required":true},
            "user": {"ref":"User","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateRideDto": {
        "dataType": "refObject",
        "properties": {
            "PickupAddress": {"dataType":"string","required":true},
            "pickuplat": {"dataType":"double","required":true},
            "pickuplng": {"dataType":"double","required":true},
            "DropoffAddress": {"dataType":"string","required":true},
            "dropofflat": {"dataType":"double","required":true},
            "dropofflng": {"dataType":"double","required":true},
            "vehicleType": {"ref":"VehicleType","required":true},
            "PromoCode": {"dataType":"string"},
            "SpecialInstruction": {"dataType":"string"},
            "isScheduled": {"dataType":"boolean"},
            "ScheduledAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Driverdto": {
        "dataType": "refObject",
        "properties": {
            "licenseNumber": {"dataType":"string","required":true},
            "licenseExpery": {"dataType":"datetime","required":true},
            "citizenshipNumber": {"dataType":"string","required":true},
            "vehicleType": {"ref":"VehicleType","required":true},
            "Vechiclemodel": {"dataType":"string","required":true},
            "plateNumber": {"dataType":"string","required":true},
            "seatCapacity": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsAuthentication_login: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"LoginDto"},
        };
        app.post('/auth/login',
            ...(fetchMiddlewares<RequestHandler>(Authentication)),
            ...(fetchMiddlewares<RequestHandler>(Authentication.prototype.login)),

            async function Authentication_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthentication_login, request, response });

                const controller = new Authentication();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthentication_signup: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"SignupDto"},
        };
        app.post('/auth/signup',
            ...(fetchMiddlewares<RequestHandler>(Authentication)),
            ...(fetchMiddlewares<RequestHandler>(Authentication.prototype.signup)),

            async function Authentication_signup(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthentication_signup, request, response });

                const controller = new Authentication();

              await templateService.apiHandler({
                methodName: 'signup',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthentication_logout: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.post('/auth/logout',
            ...(fetchMiddlewares<RequestHandler>(Authentication)),
            ...(fetchMiddlewares<RequestHandler>(Authentication.prototype.logout)),

            async function Authentication_logout(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthentication_logout, request, response });

                const controller = new Authentication();

              await templateService.apiHandler({
                methodName: 'logout',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthentication_checkauth: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.get('/auth/checkauth',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(Authentication)),
            ...(fetchMiddlewares<RequestHandler>(Authentication.prototype.checkauth)),

            async function Authentication_checkauth(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthentication_checkauth, request, response });

                const controller = new Authentication();

              await templateService.apiHandler({
                methodName: 'checkauth',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getuser: Record<string, TsoaRoute.ParameterSchema> = {
                Role: {"in":"query","name":"Role","required":true,"ref":"UserRole"},
                page: {"in":"query","name":"page","required":true,"dataType":"double"},
                limit: {"in":"query","name":"limit","required":true,"dataType":"double"},
        };
        app.get('/users/getusers',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getuser)),

            async function UserController_getuser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getuser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getuser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_deleteUser: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/users/deleteuser/:id',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.deleteUser)),

            async function UserController_deleteUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_deleteUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'deleteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRideController_estimatefare: Record<string, TsoaRoute.ParameterSchema> = {
                pickuplat: {"in":"query","name":"pickuplat","required":true,"dataType":"double"},
                pickuplng: {"in":"query","name":"pickuplng","required":true,"dataType":"double"},
                dropofflat: {"in":"query","name":"dropofflat","required":true,"dataType":"double"},
                dropofflng: {"in":"query","name":"dropofflng","required":true,"dataType":"double"},
                vehicleType: {"in":"query","name":"vehicleType","required":true,"ref":"VehicleType"},
        };
        app.get('/ride/estimatefare',
            ...(fetchMiddlewares<RequestHandler>(RideController)),
            ...(fetchMiddlewares<RequestHandler>(RideController.prototype.estimatefare)),

            async function RideController_estimatefare(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRideController_estimatefare, request, response });

                const controller = new RideController();

              await templateService.apiHandler({
                methodName: 'estimatefare',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRideController_CreateRide: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateRideDto"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/ride/createride',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(RideController)),
            ...(fetchMiddlewares<RequestHandler>(RideController.prototype.CreateRide)),

            async function RideController_CreateRide(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRideController_CreateRide, request, response });

                const controller = new RideController();

              await templateService.apiHandler({
                methodName: 'CreateRide',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRideController_GetAvailableRides: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","required":true,"dataType":"double"},
                limit: {"in":"query","name":"limit","required":true,"dataType":"double"},
        };
        app.get('/ride/availableRides',
            ...(fetchMiddlewares<RequestHandler>(RideController)),
            ...(fetchMiddlewares<RequestHandler>(RideController.prototype.GetAvailableRides)),

            async function RideController_GetAvailableRides(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRideController_GetAvailableRides, request, response });

                const controller = new RideController();

              await templateService.apiHandler({
                methodName: 'GetAvailableRides',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRideController_GetActiveRide: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/ride/active',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(RideController)),
            ...(fetchMiddlewares<RequestHandler>(RideController.prototype.GetActiveRide)),

            async function RideController_GetActiveRide(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRideController_GetActiveRide, request, response });

                const controller = new RideController();

              await templateService.apiHandler({
                methodName: 'GetActiveRide',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRideController_AcceptRides: Record<string, TsoaRoute.ParameterSchema> = {
                vechicleId: {"in":"body","name":"vechicleId","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.patch('/ride/:id/accept',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(RideController)),
            ...(fetchMiddlewares<RequestHandler>(RideController.prototype.AcceptRides)),

            async function RideController_AcceptRides(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRideController_AcceptRides, request, response });

                const controller = new RideController();

              await templateService.apiHandler({
                methodName: 'AcceptRides',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRideController_getacceptRide: Record<string, TsoaRoute.ParameterSchema> = {
                rideId: {"in":"query","name":"rideId","required":true,"dataType":"string"},
        };
        app.get('/ride/getacceptRide',
            ...(fetchMiddlewares<RequestHandler>(RideController)),
            ...(fetchMiddlewares<RequestHandler>(RideController.prototype.getacceptRide)),

            async function RideController_getacceptRide(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRideController_getacceptRide, request, response });

                const controller = new RideController();

              await templateService.apiHandler({
                methodName: 'getacceptRide',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGeocoading_GeocoadeAddress: Record<string, TsoaRoute.ParameterSchema> = {
                address: {"in":"query","name":"address","required":true,"dataType":"string"},
        };
        app.get('/geocoading/geocode',
            ...(fetchMiddlewares<RequestHandler>(Geocoading)),
            ...(fetchMiddlewares<RequestHandler>(Geocoading.prototype.GeocoadeAddress)),

            async function Geocoading_GeocoadeAddress(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGeocoading_GeocoadeAddress, request, response });

                const controller = new Geocoading();

              await templateService.apiHandler({
                methodName: 'GeocoadeAddress',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGeocoading_reversegeoAddress: Record<string, TsoaRoute.ParameterSchema> = {
                lat: {"in":"query","name":"lat","required":true,"dataType":"string"},
                lng: {"in":"query","name":"lng","required":true,"dataType":"string"},
        };
        app.get('/geocoading/reversecode',
            ...(fetchMiddlewares<RequestHandler>(Geocoading)),
            ...(fetchMiddlewares<RequestHandler>(Geocoading.prototype.reversegeoAddress)),

            async function Geocoading_reversegeoAddress(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGeocoading_reversegeoAddress, request, response });

                const controller = new Geocoading();

              await templateService.apiHandler({
                methodName: 'reversegeoAddress',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDriverController_registerDriver: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
                body: {"in":"body","name":"body","required":true,"ref":"Driverdto"},
        };
        app.post('/driver/registerdriver',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(DriverController)),
            ...(fetchMiddlewares<RequestHandler>(DriverController.prototype.registerDriver)),

            async function DriverController_registerDriver(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDriverController_registerDriver, request, response });

                const controller = new DriverController();

              await templateService.apiHandler({
                methodName: 'registerDriver',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDriverController_getDriverProfile: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.get('/driver/myprofile',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(DriverController)),
            ...(fetchMiddlewares<RequestHandler>(DriverController.prototype.getDriverProfile)),

            async function DriverController_getDriverProfile(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDriverController_getDriverProfile, request, response });

                const controller = new DriverController();

              await templateService.apiHandler({
                methodName: 'getDriverProfile',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDriverController_DriverLocation: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"bearing":{"dataType":"double","required":true},"lng":{"dataType":"double","required":true},"lat":{"dataType":"double","required":true}}},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.post('/driver/location',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(DriverController)),
            ...(fetchMiddlewares<RequestHandler>(DriverController.prototype.DriverLocation)),

            async function DriverController_DriverLocation(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDriverController_DriverLocation, request, response });

                const controller = new DriverController();

              await templateService.apiHandler({
                methodName: 'DriverLocation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDriverController_getApprovedDriver: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/driver/getapprovedDriver',
            ...(fetchMiddlewares<RequestHandler>(DriverController)),
            ...(fetchMiddlewares<RequestHandler>(DriverController.prototype.getApprovedDriver)),

            async function DriverController_getApprovedDriver(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDriverController_getApprovedDriver, request, response });

                const controller = new DriverController();

              await templateService.apiHandler({
                methodName: 'getApprovedDriver',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDriverController_ApprovedDriver: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.patch('/driver/approved/:id',
            ...(fetchMiddlewares<RequestHandler>(DriverController)),
            ...(fetchMiddlewares<RequestHandler>(DriverController.prototype.ApprovedDriver)),

            async function DriverController_ApprovedDriver(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDriverController_ApprovedDriver, request, response });

                const controller = new DriverController();

              await templateService.apiHandler({
                methodName: 'ApprovedDriver',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
