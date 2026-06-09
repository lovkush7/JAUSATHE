import { Controller, Get, Query, Route } from "tsoa";
import GeocoadingService from "../../services/Geocoading/Geocoading.service.tsx";

@Route("geocoading")
export class Geocoading extends Controller{
@Get("/geocode")
async GeocoadeAddress(
    @Query() address: string
){
    return await GeocoadingService.GeocoadingAddress(address);

}

@Get("/reversecode")
async reversegeoAddress(
    @Query() lat: string,
    @Query() lng: string   
){
  return await GeocoadingService.RevesrseGeoAddress(parseFloat(lat),parseFloat(lng) )
}

}

