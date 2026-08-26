import { createFileRoute } from '@tanstack/react-router'
import RideDashboard from '../../UI/Admin/RideDashboard'

export const Route = createFileRoute('/admin/Ride')({
  component: RideDashboard,
})

