import { createFileRoute } from '@tanstack/react-router'
import AdminVehicles from '../../UI/Admin/adminVehicles'

export const Route = createFileRoute('/admin/Vehicles')({
  component: AdminVehicles,
})

