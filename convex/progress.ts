import { v } from 'convex/values';
import { mutation, MutationCtx, query } from './_generated/server';
import type { Id } from './_generated/dataModel';
import { getLocalISODate, getYesterdayLocalISODate } from '@/lib/utils';

export const recordSpellingAttempt = mutation({
  args: {
    word: v.string(),
    correct: v.boolean(),
    difficulty: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Unauthenticated call to mutation');
    }
    const user = await ctx.db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique();
    if (!user) {
      throw new Error('Unauthenticated call to mutation');
    }

    // Record the spelling attempt
    const attempt = await ctx.db.insert('spellingAttempts', {
      userId: user._id,
      word: args.word,
      correct: args.correct,
      difficulty: args.difficulty,
      attemptedAt: new Date().toISOString(),
    });

    // Update daily progress
    const today = new Date().toISOString().split('T')[0];
    const dailyProgress = await ctx.db
      .query('dailyProgress')
      .filter((q) =>
        q.and(q.eq(q.field('userId'), user._id), q.eq(q.field('date'), today))
      )
      .first();

    if (dailyProgress) {
      await ctx.db.patch(dailyProgress._id, {
        spellingScore:
          (dailyProgress.spellingScore || 0) + (args.correct ? 1 : 0),
      });
    } else {
      await ctx.db.insert('dailyProgress', {
        userId: user._id,
        date: today,
        tasksCompleted: ['spelling'],
        spellingScore: args.correct ? 1 : 0,
        readingCompleted: false,
        idiomCompleted: false,
      });
    }

    return args.correct;
  },
});

export const updateDailyProgress = mutation({
  args: {
    taskId: v.string(),
    completed: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Unauthenticated call to mutation');
    }
    const user = await ctx.db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique();
    if (!user) {
      throw new Error('Unauthenticated call to mutation');
    }

    const today = new Date().toISOString().split('T')[0];
    const dailyProgress = await ctx.db
      .query('dailyProgress')
      .filter((q) =>
        q.and(q.eq(q.field('userId'), user._id), q.eq(q.field('date'), today))
      )
      .first();

    if (dailyProgress) {
      const updates: {
        readingCompleted?: boolean;
        idiomCompleted?: boolean;
      } = {};
      switch (args.taskId) {
        case 'reading':
          updates.readingCompleted = args.completed;
          break;
        case 'idiom':
          updates.idiomCompleted = args.completed;
          break;
      }

      await ctx.db.patch(dailyProgress._id, updates);

      // Update user streak if all tasks are completed
      const updatedProgress = await ctx.db.get(dailyProgress._id);

      const allTasksCompleted =
        updatedProgress?.readingCompleted &&
        updatedProgress?.idiomCompleted &&
        (updatedProgress?.spellingScore ?? 0) > 0;

      if (allTasksCompleted) {
        console.log('update streak :');
        await updateStreak(ctx, user._id);
      }
    } else {
      const newProgress = {
        userId: user._id,
        date: today,
        tasksCompleted: args.completed ? [args.taskId] : [],
        spellingScore: 0,
        readingCompleted: args.taskId === 'reading' && args.completed,
        idiomCompleted: args.taskId === 'idiom' && args.completed,
      };
      await ctx.db.insert('dailyProgress', newProgress);
    }

    return { success: true };
  },
});

async function updateStreak(ctx: MutationCtx, userId: Id<'users'>) {
  const user = await ctx.db.get(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const today = getLocalISODate();
  const yesterday = getYesterdayLocalISODate();

  // Check if user practiced yesterday
  const yesterdayProgress = await ctx.db
    .query('dailyProgress')
    .filter((q) =>
      q.and(q.eq(q.field('userId'), userId), q.eq(q.field('date'), yesterday))
    )
    .first();

  console.log('yesterdayProgress :', yesterdayProgress);
  // Check if yesterday's tasks were all completed
  const yesterdayCompleted =
    yesterdayProgress?.readingCompleted &&
    yesterdayProgress?.idiomCompleted &&
    (yesterdayProgress?.spellingScore ?? 0) > 0;

  // Update streak based on yesterday's practice
  let newStreak = 1; // Default to 1 for completing today
  if (yesterdayCompleted && user.lastPracticeDate === yesterday) {
    newStreak = (user.currentStreak ?? 0) + 1;
  }

  // Update user streak and practice date
  await ctx.db.patch(userId, {
    currentStreak: newStreak,
    lastPracticeDate: today,
    totalPracticeCount: (user.totalPracticeCount ?? 0) + 1,
  });

  // Check and award streak achievements
  if (newStreak === 7) {
    await ctx.db.insert('achievements', {
      userId,
      type: '7-day-streak',
      earnedAt: today,
      description: 'Practiced English for 7 days in a row',
    });
  } else if (newStreak === 30) {
    await ctx.db.insert('achievements', {
      userId,
      type: '30-day-streak',
      earnedAt: today,
      description: 'Maintained practice for a full month',
    });
  }

  return newStreak;
}

export const getUserProgress = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Unauthenticated call to mutation');
    }
    const user = await ctx.db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique();
    if (!user) {
      throw new Error('Unauthenticated call to mutation');
    }

    const today = new Date().toISOString().split('T')[0];
    const dailyProgress = await ctx.db
      .query('dailyProgress')
      .filter((q) =>
        q.and(q.eq(q.field('userId'), user._id), q.eq(q.field('date'), today))
      )
      .first();

    const achievements = await ctx.db
      .query('achievements')
      .filter((q) => q.eq(q.field('userId'), user._id))
      .collect();

    const learnedIdioms = await ctx.db
      .query('learnedIdioms')
      .filter((q) => q.eq(q.field('userId'), user._id))
      .collect();

    return {
      streak: user.currentStreak,
      totalPractice: user.totalPracticeCount,
      totalIdiomsLearned:
        learnedIdioms.length + (dailyProgress?.idiomCompleted ? 1 : 0),
      todayProgress: dailyProgress,
      achievements,
    };
  },
});

export const getMonthlyProgress = query({
  args: {
    year: v.number(),
    month: v.number(), // 0-11 (JavaScript months)
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthenticated');

    const user = await ctx.db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique();
    if (!user) throw new Error('User not found');

    // Calculate start and end dates for the month
    const startDate = new Date(args.year, args.month, 1);
    const endDate = new Date(args.year, args.month + 1, 0);

    const startDateString = getLocalISODate(startDate);
    const endDateString = getLocalISODate(endDate);

    const monthlyProgress = await ctx.db
      .query('dailyProgress')
      .withIndex('by_user_date', (q) => q.eq('userId', user._id))
      .filter((q) =>
        q.and(
          q.gte(q.field('date'), startDateString),
          q.lte(q.field('date'), endDateString)
        )
      )
      .collect();

    // Convert to a map of dates to completion status
    const progressMap = new Map(
      monthlyProgress.map((progress) => [
        progress.date,
        {
          isCompleted:
            progress.readingCompleted &&
            progress.idiomCompleted &&
            (progress.spellingScore ?? 0) > 0,
          tasks: {
            reading: progress.readingCompleted,
            idiom: progress.idiomCompleted,
            spelling: (progress.spellingScore ?? 0) > 0,
          },
        },
      ])
    );

    return {
      progressMap: Object.fromEntries(progressMap),
      currentStreak: user.currentStreak ?? 0,
      lastPracticeDate: user.lastPracticeDate,
    };
  },
});
