import { createFileRoute } from '@tanstack/react-router'
import DriverProfile from '../../UI/Profile/Driverprofile/DriverProfile'

export const Route = createFileRoute('/Driver/profile')({
  component: DriverProfile,
})


