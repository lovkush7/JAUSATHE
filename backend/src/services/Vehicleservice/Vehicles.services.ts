import { Vechicles } from "../../entity/Vechiles.entity.ts"

class VehiclesService{
    async getVehicles(){
    try{
        const vehicle = await Vechicles.find({
            relations:{
                driver: {
                    user: true
                }
            }
        })
        return vehicle;

    }catch(err){
        console.log("the errror is ",err)
    }
    }

    async VehiclesApproval(
        id: string,
        isapproved: boolean
    ){
        const existance = await Vechicles.findOne({
            where:{
                id
            }
        })
        if(!existance){
            throw new Error("vehicle doesnot exist ")
        }
        existance.isDefault = isapproved;
       const saved =  await existance.save()

       return saved.isDefault;

    }
}
export default new VehiclesService()