import { Button } from '@/components/ui/button'
import Login from '@/UI/auth/login/Loginpage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login/')({
  component: Login,
})

