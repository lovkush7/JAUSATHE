import { FareConfig } from "../entity/FareConfig.entities.ts";
import { VehicleType } from "../enum/enum.details.ts";

const seedData: Partial<FareConfig>[] = [
{
    vechicleType: VehicleType.BIKE ,
    baseFare: 30,
    perKmRate: 15,
    perMinRate: 1.5,
    minimumFare: 50,
    platformFee:10,
    NightRide:1.2,
    RainRide: 1.5,
    isActive: true,

},
{
    vechicleType: VehicleType.AUTO,
    baseFare: 30,
    perKmRate: 15,
    perMinRate: 1.5,
    minimumFare: 50,
    platformFee:10,
    NightRide:1.2,
    RainRide: 1.5,
    isActive: true,

},
{
    vechicleType: VehicleType.CAR,
    baseFare: 30,
    perKmRate: 15,
    perMinRate: 1.5,
    minimumFare: 50,
    platformFee:10,
    NightRide:1.2,
    RainRide: 1.5,
    isActive: true,

},
{
    vechicleType: VehicleType.ELECTRIC,
    baseFare: 30,
    perKmRate: 15,
    perMinRate: 1.5,
    minimumFare: 50,
    platformFee:10,
    NightRide:1.2,
    RainRide: 1.5,
    isActive: true,

},

]
export async function seedconfig (){
    for(const data of seedData){
        const existance = await FareConfig.findOne({
            where:{
                vechicleType: data.vechicleType!
            }
        })
        if(existance){
            console.log("the data already exist on the table")
            continue;
        }
        const config = FareConfig.create(data)
        await FareConfig.save(config);
        console.log("successfully done")
    }
}