import { v } from 'convex/values'
import { query, mutation } from './_generated/server'
import { getAuthUserId } from '@convex-dev/auth/server'

export const getDailyIdiom = query({
  args: {},
  handler: async (ctx) => {
    const today = new Date().toISOString().split('T')[0]

    // Get a random idiom for today
    const idioms = await ctx.db.query('idioms').collect()
    if (idioms.length === 0) return null

    // Use the date as a seed to get the same idiom for all users on the same day
    const dayNumber = parseInt(today.replace(/-/g, ''))
    const idiomIndex = dayNumber % idioms.length
    return idioms[idiomIndex]
  },
})

export const getRandomIdiom = query({
  args: {
    excludeId: v.optional(v.id('idioms')), // Optionally exclude the daily idiom
  },
  handler: async (ctx, { excludeId }) => {
    let idioms = await ctx.db.query('idioms').collect()
    if (idioms.length === 0) return null

    // Exclude the specified idiom if provided
    if (excludeId) {
      idioms = idioms.filter((idiom) => idiom._id !== excludeId)
    }

    // Get a random idiom
    const randomIndex = Math.floor(Math.random() * idioms.length)
    return idioms[randomIndex]
  },
})

export const markIdiomAsLearned = mutation({
  args: {
    idiomId: v.id('idioms'),
  },
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
        idiomCompleted: true,
        tasksCompleted: [
          ...new Set([...existingProgress.tasksCompleted, 'idiom']),
        ],
      })
    } else {
      await ctx.db.insert('dailyProgress', {
        userId: user._id,
        date: today,
        tasksCompleted: ['idiom'],
        readingCompleted: false,
        videoCompleted: false,
        idiomCompleted: true,
      })
    }
  },
})
