import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    email: v.string(),
    tokenIdentifier: v.string(),
    currentStreak: v.optional(v.number()),
    lastPracticeDate: v.optional(v.string()), // ISO date string
    totalPracticeCount: v.optional(v.number()),
    level: v.optional(v.number()), // Current level of the user
  }).index('by_token', ['tokenIdentifier']),

  idioms: defineTable({
    content: v.string(),
    definition: v.string(),
    example: v.string(),
  }),

  learnedIdioms: defineTable({
    userId: v.id('users'),
    idiomId: v.id('idioms'),
  }).index('by_user_id', ['userId']),

  learnedWords: defineTable({
    userId: v.id('users'),
    word: v.string(),
  }).index('by_user_id', ['userId']),

  texts: defineTable({
    title: v.string(),
    content: v.string(),
    category: v.string(),
    difficulty: v.string(),
  }).index('by_category', ['category']),

  dailyProgress: defineTable({
    userId: v.id('users'),
    date: v.string(), // ISO date string
    tasksCompleted: v.array(v.string()), // Array of completed task IDs
    spellingScore: v.optional(v.number()),
    readingCompleted: v.boolean(),
    idiomCompleted: v.boolean(),
  }).index('by_user_date', ['userId', 'date']),

  spellingAttempts: defineTable({
    userId: v.id('users'),
    word: v.string(),
    correct: v.boolean(),
    difficulty: v.string(),
    attemptedAt: v.string(), // ISO date string
  }),

  achievements: defineTable({
    userId: v.id('users'),
    type: v.string(), // e.g., "7-day-streak", "spelling-master"
    earnedAt: v.string(), // ISO date string
    description: v.string(),
  }),
});
