import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/boarding/page2/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/boarding/page2/"!</div>
}
