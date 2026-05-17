import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/boarding/page3/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/boarding/page3/"!</div>
}
