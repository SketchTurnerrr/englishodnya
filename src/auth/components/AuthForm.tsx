import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { FormEvent } from 'react'

interface AuthFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  flow: 'signIn' | 'signUp'
  submitting: boolean
  onFlowChange: () => void
  handlePasswordReset?: () => void
  passwordRequirements?: string
}

export function AuthForm({
  onSubmit,
  flow,
  submitting,
  onFlowChange,
  handlePasswordReset,
  passwordRequirements,
}: AuthFormProps) {
  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <label htmlFor="email">Email</label>
      <Input name="email" id="email" className="mb-4" autoComplete="email" />

      <div className="flex items-center justify-between">
        <label htmlFor="password">Password</label>
        {handlePasswordReset && flow === 'signIn' ? (
          <Button
            className="p-0 h-auto"
            type="button"
            variant="link"
            onClick={handlePasswordReset}
          >
            Forgot your password?
          </Button>
        ) : null}
      </div>

      <Input
        type="password"
        name="password"
        id="password"
        autoComplete={flow === 'signIn' ? 'current-password' : 'new-password'}
      />

      {flow === 'signUp' && passwordRequirements && (
        <span className="text-gray-500 font-thin text-sm mt-1">
          {passwordRequirements}
        </span>
      )}

      <input name="flow" value={flow} type="hidden" />

      <Button type="submit" disabled={submitting} className="mt-4">
        {flow === 'signIn' ? 'Sign in' : 'Sign up'}
      </Button>

      <Button variant="link" type="button" onClick={onFlowChange}>
        {flow === 'signIn'
          ? "Don't have an account? Sign up"
          : 'Already have an account? Sign in'}
      </Button>
    </form>
  )
}
