import { createFileRoute } from '@tanstack/react-router'
import AdminDashboard from '../UI/Admin/AdminDashboard'

export const Route = createFileRoute('/AdminDashboard')({
  component: AdminDashboard,
})


