import Signuppage from '@/UI/auth/signup/Signuppage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/Signup/')({
  component: Signuppage,
})

