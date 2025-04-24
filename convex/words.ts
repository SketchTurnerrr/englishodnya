import { v } from 'convex/values';
import { mutation } from './_generated/server';

export const markWordAsLearned = mutation({
  args: {
    word: v.string(),
  },
  handler: async (ctx, { word }) => {
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

    await ctx.db.insert('learnedWords', {
      userId: user._id,
      word,
    });
  },
});
