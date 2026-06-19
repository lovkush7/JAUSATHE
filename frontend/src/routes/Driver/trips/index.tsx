import { createFileRoute } from '@tanstack/react-router'
import DriverNavbar from '../../../lib/DriverNavbar'
import DriverTrips from '../../../atoms/Driver/DriverTrips/DriverTrips'

export const Route = createFileRoute('/Driver/trips/')({
  component: DriverTrips
})

