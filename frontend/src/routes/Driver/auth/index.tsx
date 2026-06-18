import { createFileRoute } from '@tanstack/react-router'
import DriverAuth from '../../../atoms/Driver/DriverAtuh/DriverAuth'

export const Route = createFileRoute('/Driver/auth/')({
  component: DriverAuth,
})

