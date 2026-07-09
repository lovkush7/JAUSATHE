import { createFileRoute, redirect } from '@tanstack/react-router'
import { checkauth } from '../utils/Checkauth'
import DriverDashboard from '../UI/DriverDashboard/DriverDashboard'
import useScoket from '../zustand/socket.config'

export const Route = createFileRoute('/DriverDashboard')({
    beforeLoad:async ()=>{
     try{
      // const {checkauth} = useScoket()
    const user =await checkauth()
    console.log( "the user is ")

  
    if(!user && user.Role !== "DRIVER"){
      throw redirect({to: "/Splash"})
    }
     }catch(err){
     throw redirect({to: "/Splash"})
     }
   },
  component: DriverDashboard,
})


