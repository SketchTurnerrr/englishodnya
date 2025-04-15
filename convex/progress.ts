import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import type { Id } from './_generated/dataModel'
import { getAuthUserId } from '@convex-dev/auth/server'

export const recordSpellingAttempt = mutation({
  args: {
    word: v.string(),
    correct: v.boolean(),
    difficulty: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) {
      throw new Error('Not unauthorized')
    }

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('_id'), userId))
      .first()

    if (!user) {
      throw new Error('User not found')
    }

    // Record the spelling attempt
    await ctx.db.insert('spellingAttempts', {
      userId: user._id,
      word: args.word,
      correct: args.correct,
      difficulty: args.difficulty,
      attemptedAt: new Date().toISOString(),
    })

    // Update daily progress
    const today = new Date().toISOString().split('T')[0]
    const dailyProgress = await ctx.db
      .query('dailyProgress')
      .filter((q) =>
        q.and(q.eq(q.field('userId'), user._id), q.eq(q.field('date'), today)),
      )
      .first()

    if (dailyProgress) {
      await ctx.db.patch(dailyProgress._id, {
        spellingScore:
          (dailyProgress.spellingScore || 0) + (args.correct ? 1 : 0),
      })
    } else {
      await ctx.db.insert('dailyProgress', {
        userId: user._id,
        date: today,
        tasksCompleted: ['spelling'],
        spellingScore: args.correct ? 1 : 0,
        readingCompleted: false,
        videoCompleted: false,
        idiomCompleted: false,
      })
    }

    return { success: true }
  },
})

export const updateDailyProgress = mutation({
  args: {
    taskId: v.string(),
    completed: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    console.log('userId :', userId)
    if (!userId) {
      throw new Error('Not unauthorized')
    }

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('_id'), userId))
      .first()

    console.log('user :', user)
    if (!user) {
      throw new Error('User not found')
    }

    const today = new Date().toISOString().split('T')[0]
    const dailyProgress = await ctx.db
      .query('dailyProgress')
      .filter((q) =>
        q.and(q.eq(q.field('userId'), user._id), q.eq(q.field('date'), today)),
      )
      .first()

    if (dailyProgress) {
      const updates: any = {}
      switch (args.taskId) {
        case 'reading':
          updates.readingCompleted = args.completed
          break
        case 'video':
          updates.videoCompleted = args.completed
          break
        case 'idiom':
          updates.idiomCompleted = args.completed
          break
      }

      await ctx.db.patch(dailyProgress._id, updates)

      // Update user streak if all tasks are completed
      const updatedProgress = await ctx.db.get(dailyProgress._id)
      if (
        updatedProgress?.readingCompleted &&
        updatedProgress?.videoCompleted &&
        updatedProgress?.idiomCompleted &&
        updatedProgress?.spellingScore
      ) {
        await updateStreak(ctx, user._id)
      }
    } else {
      const newProgress: any = {
        userId: user._id,
        date: today,
        tasksCompleted: args.completed ? [args.taskId] : [],
        spellingScore: 0,
        readingCompleted: args.taskId === 'reading' && args.completed,
        videoCompleted: args.taskId === 'video' && args.completed,
        idiomCompleted: args.taskId === 'idiom' && args.completed,
      }
      await ctx.db.insert('dailyProgress', newProgress)
    }

    return { success: true }
  },
})

async function updateStreak(ctx: any, userId: Id<'users'>) {
  const user = await ctx.db.get(userId)
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  // Check if user practiced yesterday
  const yesterdayProgress = await ctx.db
    .query('dailyProgress')
    .filter((q: any) =>
      q.and(q.eq(q.field('userId'), userId), q.eq(q.field('date'), yesterday)),
    )
    .first()

  // Update streak based on yesterday's practice
  let newStreak = 1
  if (yesterdayProgress && user.lastPracticeDate === yesterday) {
    newStreak = user.currentStreak + 1
  }

  // Update user streak and practice date
  await ctx.db.patch(userId, {
    currentStreak: newStreak,
    lastPracticeDate: today,
    totalPracticeCount: (user.totalPracticeCount || 0) + 1,
  })

  // Check and award streak achievements
  if (newStreak === 7) {
    await ctx.db.insert('achievements', {
      userId,
      type: '7-day-streak',
      earnedAt: today,
      description: 'Practiced English for 7 days in a row',
    })
  } else if (newStreak === 30) {
    await ctx.db.insert('achievements', {
      userId,
      type: '30-day-streak',
      earnedAt: today,
      description: 'Maintained practice for a full month',
    })
  }
}

export const getUserProgress = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    console.log('userId :', userId)
    if (!userId) {
      throw new Error('Not unauthorized')
    }

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('_id'), userId))
      .first()
    console.log('user :', user)

    if (!user) {
      throw new Error('User not found')
    }

    const today = new Date().toISOString().split('T')[0]
    const dailyProgress = await ctx.db
      .query('dailyProgress')
      .filter((q) =>
        q.and(q.eq(q.field('userId'), user._id), q.eq(q.field('date'), today)),
      )
      .first()

    const achievements = await ctx.db
      .query('achievements')
      .filter((q) => q.eq(q.field('userId'), user._id))
      .collect()

    return {
      streak: user.currentStreak,
      totalPractice: user.totalPracticeCount,
      todayProgress: dailyProgress,
      achievements,
    }
  },
})
