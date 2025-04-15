import { convexAuth } from '@convex-dev/auth/server'
import { Password } from '@convex-dev/auth/providers/Password'

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
  callbacks: {
    async createOrUpdateUser(ctx, args) {
      if (args.existingUserId) {
        // Handle existing user case
        return args.existingUserId
      }

      // Create new user with default values
      return ctx.db.insert('users', {
        ...args.profile,
        currentStreak: 0,
        level: 0,
        lastPracticeDate: new Date().toISOString(),
        totalPracticeCount: 0,
      })
    },
  },
})
