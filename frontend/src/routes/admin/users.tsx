import { createFileRoute } from '@tanstack/react-router'
import AdminUsers from '../../UI/Admin/adminUsers'

export const Route = createFileRoute('/admin/users')({
  component: AdminUsers,
})
