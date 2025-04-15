import { useAuthActions } from '@convex-dev/auth/react'
import { useState } from 'react'
import { ConvexError } from 'convex/values'
import { INVALID_PASSWORD } from 'convex/errors'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { AuthForm } from './AuthForm'

const PASSWORD_REQUIREMENTS =
  'Password must be at least 8 characters long and contain at least one number.'

export function SignUp() {
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
        toastTitle = 'Invalid password - check the requirements and try again.'
      } else {
        toastTitle = 'Could not sign up, did you mean to sign in?'
      }
      toast.error(toastTitle)
      setSubmitting(false)
    }
  }

  const handleFlowChange = () => {
    navigate({ to: '/sign-in' })
  }

  return (
    <div className="max-w-[384px] mx-auto flex flex-col gap-4">
      <h2 className="font-semibold text-2xl tracking-tight">
        Create an account
      </h2>
      <AuthForm
        onSubmit={handleSubmit}
        flow="signUp"
        submitting={submitting}
        onFlowChange={handleFlowChange}
        passwordRequirements={PASSWORD_REQUIREMENTS}
      />
    </div>
  )
}
