import { v } from 'convex/values';
import { query, mutation } from './_generated/server';

export const getDailyIdiom = query({
  args: {},
  handler: async (ctx) => {
    const today = new Date().toISOString().split('T')[0];

    // Get a random idiom for today
    const idioms = await ctx.db.query('idioms').collect();
    if (idioms.length === 0) return null;

    // Use the date as a seed to get the same idiom for all users on the same day
    const dayNumber = parseInt(today.replace(/-/g, ''));
    const idiomIndex = dayNumber % idioms.length;
    return idioms[idiomIndex];
  },
});

export const getRandomIdiom = query({
  args: {
    excludeId: v.optional(v.id('idioms')),
    excludeIds: v.optional(v.array(v.string())), // Add this
  },
  handler: async (ctx, { excludeId, excludeIds }) => {
    let idioms = await ctx.db.query('idioms').collect();
    if (idioms.length === 0) return null;

    // Exclude the specified idioms
    if (excludeId) {
      idioms = idioms.filter((idiom) => idiom._id !== excludeId);
    }
    if (excludeIds && excludeIds.length > 0) {
      idioms = idioms.filter((idiom) => !excludeIds.includes(idiom._id));
    }

    // If we've run out of new idioms, return null or reset the list
    if (idioms.length === 0) {
      return null; // Or return a message indicating all idioms have been learned
    }

    // Get a random idiom from the filtered list
    const randomIndex = Math.floor(Math.random() * idioms.length);
    return idioms[randomIndex];
  },
});

export const markIdiomAsLearned = mutation({
  args: {
    idiomId: v.id('idioms'),
  },
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

    // Update or create daily progress
    const existingProgress = await ctx.db
      .query('dailyProgress')
      .filter((q) => q.eq(q.field('userId'), user._id))
      .filter((q) => q.eq(q.field('date'), today))
      .first();

    if (existingProgress) {
      await ctx.db.patch(existingProgress._id, {
        idiomCompleted: true,
        tasksCompleted: [
          ...new Set([...existingProgress.tasksCompleted, 'idiom']),
        ],
      });
    } else {
      await ctx.db.insert('dailyProgress', {
        userId: user._id,
        date: today,
        tasksCompleted: ['idiom'],
        readingCompleted: false,
        idiomCompleted: true,
      });
    }
  },
});

export const recordExtraIdiomLearned = mutation({
  args: {
    idiomId: v.id('idioms'),
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

    await ctx.db.insert('learnedIdioms', {
      userId: user._id,
      idiomId: args.idiomId,
    });
  },
});

export const getUserIdiomsLearnedForToday = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthenticated');

    const user = await ctx.db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique();
    if (!user) throw new Error('User not found');

    // Get start and end of today in milliseconds
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
    const endOfToday = startOfToday + 24 * 60 * 60 * 1000 - 1;

    const learnedIdioms = await ctx.db
      .query('learnedIdioms')
      .filter((q) =>
        q.and(
          q.eq(q.field('userId'), user._id),
          q.gte(q.field('_creationTime'), startOfToday),
          q.lte(q.field('_creationTime'), endOfToday)
        )
      )
      .collect();

    return learnedIdioms.length;
  },
});
