import { useAuthActions } from '@convex-dev/auth/react'
import { useState } from 'react'
import { ConvexError } from 'convex/values'
import { INVALID_PASSWORD } from 'convex/errors'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { AuthForm } from './AuthForm'

export function SignIn() {
  const { signIn } = useAuthActions()
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    const formData = new FormData(event.currentTarget)

    try {
      await signIn('password', formData)
      navigate({ to: '/' })
    } catch (error) {
      console.error(error)
      let toastTitle: string
      if (error instanceof ConvexError && error.data === INVALID_PASSWORD) {
        toastTitle = 'Invalid password - please try again.'
      } else {
        toastTitle = 'Could not sign in, did you mean to sign up?'
      }
      toast.error(toastTitle)
      setSubmitting(false)
    }
  }

  const handleFlowChange = () => {
    navigate({ to: '/sign-up' })
  }

  return (
    <div className="max-w-[384px] mx-auto flex flex-col gap-4">
      <h2 className="font-semibold text-2xl tracking-tight">Sign in</h2>
      <AuthForm
        onSubmit={handleSubmit}
        flow="signIn"
        submitting={submitting}
        onFlowChange={handleFlowChange}
      />
    </div>
  )
}
