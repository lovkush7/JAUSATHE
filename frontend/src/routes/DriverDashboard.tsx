import { createFileRoute, redirect } from '@tanstack/react-router'
import { checkauth } from '../utils/Checkauth'
import DriverDashboard from '../UI/DriverDashboard/DriverDashboard'

export const Route = createFileRoute('/DriverDashboard')({
   beforeLoad:async ()=>{
     try{
    const user =await checkauth()
    console.log( "the user is ",user)

  
    if(!user && user.Role !== "DRIVER"){
      throw redirect({to: "/Splash"})
    }
     }catch(err){
     throw redirect({to: "/Splash"})
     }
   },
  component: DriverDashboard,
})


