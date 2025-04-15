import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'
import { authTables } from '@convex-dev/auth/server'

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    // Custom field.
    currentStreak: v.optional(v.number()),
    lastPracticeDate: v.optional(v.string()), // ISO date string
    totalPracticeCount: v.optional(v.number()),
    level: v.optional(v.number()), // Current level of the user
  }).index('by_email', ['email']),

  idioms: defineTable({
    content: v.string(),
    definition: v.string(),
    example: v.string(),
  }),

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
    videoCompleted: v.boolean(),
    idiomCompleted: v.boolean(),
  }),

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
})
