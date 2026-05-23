import { Button } from '@/components/ui/button'
import Login from '@/UI/auth/login/Loginpage'
import { checkauth } from '@/utils/Checkauth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login/')({
  beforeLoad: async () => {
    
      const user = await checkauth()
      console.log("the log user ",user)
      
      if(user){
        throw redirect({to: "/"})
      }

    
      // throw redirect({to: "/auth/login"})
    
  },
  component: Login,
})

