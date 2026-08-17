import { createFileRoute } from '@tanstack/react-router'
import Fareconfig from '../../UI/Admin/FareConfig'

export const Route = createFileRoute('/admin/FareConfig')({
  component: Fareconfig,
})

