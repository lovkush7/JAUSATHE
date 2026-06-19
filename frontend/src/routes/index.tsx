import Home from '@/UI/home/Home'
// import Authguard from '@/utils/Authguard'
// import authguard from '@/utils/Authguard'
import { checkauth } from '@/utils/Checkauth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
 beforeLoad:async ()=>{

  const user =await checkauth()
  console.log( "the user is is",user)
   if(!user){
    throw redirect({to: "/boarding/page1"})
  }
 if(user && user.Role === "PASSENGERS"){
    return
  }

  if(user && user.Role === "DRIVER"){
    throw redirect({to: "/Driver/auth"})
  }
  
 
 },
  component: Home,
})


