import { createFileRoute } from '@tanstack/react-router'
import Reviews from '../../UI/Admin/Reviews'

export const Route = createFileRoute('/admin/Reviews')({
  component: Reviews,
})

