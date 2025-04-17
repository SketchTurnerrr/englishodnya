import { v } from 'convex/values'
import { query, mutation } from './_generated/server'
import { getAuthUserId } from '@convex-dev/auth/server'

export const getDailyText = query({
  args: {},
  handler: async (ctx) => {
    const today = new Date().toISOString().split('T')[0]

    // Get a random text for today
    // In a real app, you might want to implement a more sophisticated selection algorithm
    const texts = await ctx.db.query('texts').collect()
    if (texts.length === 0) return null

    // Use the date as a seed to get the same text for all users on the same day
    const dayNumber = parseInt(today.replace(/-/g, ''))
    const textIndex = dayNumber % texts.length
    return texts[textIndex]
  },
})

export const getRandomText = query({
  args: {
    excludeId: v.optional(v.id('texts')), // Optionally exclude the daily text
    cacheBuster: v.number(),
    difficulty: v.optional(v.string()),
  },
  handler: async (ctx, { excludeId, difficulty }) => {
    let texts = await (
      await ctx.db.query('texts').collect()
    ).filter((text) => text.difficulty === difficulty)
    if (texts.length === 0) return null

    // Exclude the specified text if provided
    if (excludeId) {
      texts = texts.filter((text) => text._id !== excludeId)
    }

    // Get a random text
    const randomIndex = Math.floor(Math.random() * texts.length)
    return texts[randomIndex]
  },
})

export const markTextAsRead = mutation({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('_id'), userId))
      .first()

    if (!user) throw new Error('User not found')

    const today = new Date().toISOString().split('T')[0]

    // Update or create daily progress
    const existingProgress = await ctx.db
      .query('dailyProgress')
      .filter((q) => q.eq(q.field('userId'), user._id))
      .filter((q) => q.eq(q.field('date'), today))
      .first()

    if (existingProgress) {
      await ctx.db.patch(existingProgress._id, {
        readingCompleted: true,
      })
    } else {
      await ctx.db.insert('dailyProgress', {
        userId: user._id,
        date: today,
        tasksCompleted: ['reading'],
        readingCompleted: true,
        videoCompleted: false,
        idiomCompleted: false,
      })
    }
  },
})
