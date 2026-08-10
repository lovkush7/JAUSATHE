import type { UpdateProfileDto } from "../../dto/UpdatedProfile.dto.tsx";
import { User } from "../../entity/User.entities.ts";
import { Userstatus, type UserRole } from "../../enum/enum.details.ts";

class UserService {
    async getallusers(
        Role: UserRole | undefined,
        page: number = 1,
        limit: number = 10
    ) {
        try {
            const qb = User.createQueryBuilder("u")
            if (Role) {
                qb.where("u.Role = :Role",
                    {
                        Role: Role
                    }
                )
            }
            const [data, total] = await qb
                .skip((page - 1) * limit)
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

        } catch (err) {
            throw err;
        }
    }

    async DeleteUser(
        id: string
    ) {
        try {
            const user = await User.findOne({
                where: {
                    id: id
                }
            })
            if (!user) {
                throw new Error("user not found")
            }
            user.status = Userstatus.INACTIVE;
            await user.save();


        } catch (err) {
            throw err;
        }
    }
    async Getprofile(
        userId: string
    ) {
        try {
            const existance = await User.findOne({
                where: {
                    id: userId
                },
                relations: {
                    Driver: {
                        vechicles: true
                    },
                    rides: true,


                }

            })
            if (!existance) {
                throw new Error("user never exist")
            }
            return existance;
        } catch (err) {
            console.log(err)
        }
    }
    async UpdateUserProfile(
        id: string,
        body: UpdateProfileDto,
    ) {
        try {
            const existance = await User.findOne(
                {
                    where: {
                        id
                    }
                }
            )
            if (!existance) {
                throw new Error("the user does not exist")
            }
            if (body.FullName !== undefined) {
                existance.FullName = body.FullName
            }
            if (body.Email !== undefined) {
                existance.Email = body.Email
            }
            if (body.Email !== undefined) {
                existance.Phone = body.Phone
            }
              if(body.profile !== undefined){
                existance.profile = body.profile
              }
              if(body.address !== undefined){
                existance.address = body.address
              }

          const updateduser =   await existance.save()
          return updateduser;
        } catch (err) {
            console.log(err)
        }

    }
}
export default new UserService();