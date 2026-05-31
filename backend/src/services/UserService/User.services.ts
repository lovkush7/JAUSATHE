import { User } from "../../entity/User.entities.ts";
import { Userstatus, type UserRole } from "../../enum/enum.details.ts";

class UserService {
    async getallusers(
        Role:  UserRole | undefined,
        page: number = 1,
        limit: number = 10
    ){
        try{
         const qb =  User.createQueryBuilder("u")
            if(Role){
                qb.where("u.Role = :Role",
                    {
                        Role: Role
                    }
                )
            }
          const [data , total] =  await qb
            .skip((page -1) * limit)
            .take(limit)
            .orderBy("u.createdAt", "DESC")
              .getManyAndCount();
            return {
                data,
                total,
                page,
                limit,
                totalpages: Math.ceil(total / limit)
            }

        }catch(err){
            throw err;
        }
    }

    async DeleteUser(
        id: string
    ){
    try{
       const user = await User.findOne({
        where:{
            id: id
        }
       })
       if(!user){
        throw new Error("user not found")
       }
       user.status = Userstatus.INACTIVE;
       await user.save();


    }catch(err){
        throw  err;
    }
    }
}
export default new UserService();