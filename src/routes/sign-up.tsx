import { createFileRoute } from '@tanstack/react-router'
import { SignUp } from '@/auth/components/SignUp'

export const Route = createFileRoute('/sign-up')({
  component: SignUp,
})

function RouteComponent() {
  return <div>Hello "/sign-up"!</div>
}
