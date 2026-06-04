import { createFileRoute } from '@tanstack/react-router'
import Payments from '../../../UI/Payment/Payments'

export const Route = createFileRoute('/Book/Payment/')({
  component: Payments,
})


