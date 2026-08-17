import { createFileRoute } from '@tanstack/react-router'
import AdminDriver from '../../UI/Admin/AdminDriver'

export const Route = createFileRoute('/admin/Drivers')({
  component: AdminDriver,
})

