import { User } from "../entity/User.entities.ts";
import { UserRole } from "../enum/enum.details.ts";
import bcrypt from "bcrypt"
const SeedData=[
{
    FullName: "Adminboy",
    Email: "Admin@gmail.com",
    password: "12345",
    Role: UserRole.ADMIN,

}
]

export async function SeedAdmin(){
    try{
       for (const admin of SeedData ){
        const existance = await User.findOne({
            where :{
                Email: admin.Email! 
            }
        })
        if(existance){
            console.log("admin already existance")
            continue;
        }
        const hash = await bcrypt.hash(admin.password!, 10)
        const newAdmin = new User()
        newAdmin.FullName = admin.FullName,
        newAdmin.Email = admin.Email,
        newAdmin.password = admin.password,
        newAdmin.Role = admin.Role

        await newAdmin.save()

         console.log("Admin seeded!!!!!")
       }
       

    }catch(err){
        console.log('the errror is ',err)
    }
}