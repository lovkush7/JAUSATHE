import { Between } from "typeorm";
import { DriverTarget } from "../../entity/DriverTarget.entities.ts";

class DriverTargetService {
    async createDriverTarget(
        DriverId: string,
        TargetRides: number
    ) {
        try {
          
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);

          
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

    
            const existence = await DriverTarget.findOne({
                where: {
                    driverId: DriverId,
                    targetDate: Between(startOfDay, endOfDay),
                },
            });

            if (existence) {
                return {
                    message: "Today's target already exists",
                    target: existence,
                };
            }

    
            const target = new DriverTarget();

            target.driverId = DriverId;
            target.targetRides = TargetRides;
            target.CompleteRides = 0;
            target.targetDate = new Date();
            target.isComplete = false;

            await target.save();

            return {
                message: "Today's target created successfully",
                target,
            };

        } catch (err) {
            console.error("Driver target error:", err);
            throw err;
        }
    }
    async GetTodaytarget( 
        driverId: string
    ){
        const Today = new Date()
        try{
            const Target = await DriverTarget.findOne({
                where:{
                    driverId: driverId,
                    targetDate: Today
                }
            })
            if(!Target){
                return "no target found for Today"
            }
            return Target;

        }catch(err){
            console.log(err)
        }
        
    }

      async incrementCompletedRide(driverId: string) {

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const target = await DriverTarget.findOne({
            where: {
                driverId,
                targetDate: Between(startOfDay, endOfDay),
                isComplete: false,
            },
        });

        // Driver ko aaja target chaina
        if (!target) {
            return null;
        }

        // Completed ride increase
        target.CompleteRides += 1;

        // Target complete bhayo ki check
        if (target.CompleteRides >= target.targetRides) {
            target.CompleteRides = target.targetRides;
            target.isComplete = true;
        }

        await target.save();

        return target;
    }
}




 

export default new DriverTargetService();