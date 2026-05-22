import { Button } from '@/components/ui/button'
import Login from '@/UI/auth/login/Loginpage'
import { checkauth } from '@/utils/Checkauth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login/')({
  beforeLoad: async () => {
    try{
      const user = await checkauth()
      if(user){
        throw redirect({to: "/"})
      }

    }catch(err){
      // throw redirect({to: "/auth/login"})
      return
    }
  },
  component: Login,
})

