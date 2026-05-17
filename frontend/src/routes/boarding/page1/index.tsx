import OnboardingLandingpage from '@/molecules/boarding/OnboardingLandingpage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/boarding/page1/')({
  component: OnboardingLandingpage,
})


