import { Vechicles } from "../../entity/Vechiles.entity.ts"

class VehiclesService{
    async getVehicles(){
    try{
        const vehicle = await Vechicles.find({
            relations:{
                driver: true
            }
        })
        return vehicle;

    }catch(err){
        console.log("the errror is ",err)
    }
    }
}
export default new VehiclesService()