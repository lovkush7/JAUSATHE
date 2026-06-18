import Home from '@/UI/home/Home'
// import Authguard from '@/utils/Authguard'
// import authguard from '@/utils/Authguard'
import { checkauth } from '@/utils/Checkauth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
 beforeLoad:async ()=>{
   try{
  const user =await checkauth()
  console.log( "the user is ",user)

  if(user && user.Role === "DRIVER"){
    throw redirect({to: "/Driver/auth"})
  }
  if(user && user.Role === "PASSENGER"){
    throw redirect({to: "/"})
  }

  if(!user){
    throw redirect({to: "/Splash"})
  }
   }catch(err){
   throw redirect({to: "/Splash"})
   }
 },
  component: Home,
})


