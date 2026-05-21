import Signuppage from '@/UI/auth/signup/Signuppage'
import { checkauth } from '@/utils/Checkauth';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/Signup/')({
  beforeLoad: async()=>{
    try{
      const user = await checkauth()

      if(user){
        throw redirect({to: "/"})
      }
    }catch(err){
      throw err;
    }
  },
  component: Signuppage,
})

