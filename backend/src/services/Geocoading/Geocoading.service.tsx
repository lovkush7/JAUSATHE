import axios from "axios"
import { format } from "node:path"

class GeocoadingService {
    async GeocoadingAddress(
        address: string
    ){

        const res = await axios.get( "https://nominatim.openstreetmap.org/search",
            {
                params:{
                    q: address,
                    format: "json",
                    limit: 1
                },
                headers:{
                    "User-Agent": "jausathe"
                }
            }

        );
        if(!res.data.length){
            throw new Error("locatons not found")
        }
        return{
            lat: Number(res.data[0].lat),
            lng: Number(res.data[0].lon),
            displayName: res.data[0].display_name
        }
    }

    async RevesrseGeoAddress(
        lat: number,
        lng: number
    ){
        try{
            const res = await axios.get( "https://nominatim.openstreetmap.org/reverse",
                {
                    params:{
                        lat: lat,
                        lon: lng,
                        format: "json",
                        limit: 1,
                        addressdetails: 1
                    },
                    headers:{
                        "User-Agent": "jausathe"
                    }
                }
            );
            // console.log(res.data.address. city_district)
            return res.data.address.city_district;

        }catch(err){
            throw err
        }

    }
}
export default new GeocoadingService()