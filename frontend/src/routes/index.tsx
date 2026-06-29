import Home from '@/UI/home/Home'
// import Authguard from '@/utils/Authguard'
// import authguard from '@/utils/Authguard'
import { checkauth } from '@/utils/Checkauth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
   beforeLoad: async () => {
    try {
      const user = await checkauth();

      if (!user) {
        throw redirect({ to: "/boarding/page1" });
      }

      if (user.Role === "PASSENGERS") {
        return;
      }

      if (user.Role === "DRIVER") {
        throw redirect({ to: "/Driver/auth" });
      }
    } catch (err) {
      console.log(err);

      throw redirect({
        to: "/boarding/page1",
      });
    }
  }, 
  component: Home,
})


