import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@/auth/components/SignIn'

export const Route = createFileRoute('/sign-in')({
  component: SignIn,
})
