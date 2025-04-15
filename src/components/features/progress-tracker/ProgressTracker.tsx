import React, { type JSX } from 'react'
import { Calendar, Trophy, Star, Target } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  earned: boolean
  icon: JSX.Element
}

export function ProgressTracker() {
  const achievements: Achievement[] = [
    {
      id: '7-day-streak',
      title: '7 Day Streak',
      description: 'Practiced English for 7 days in a row',
      earned: true,
      icon: <Star className="w-6 h-6 text-yellow-500" />,
    },
    {
      id: '30-day-streak',
      title: '30 Day Streak',
      description: 'Maintained practice for a full month',
      earned: false,
      icon: <Trophy className="w-6 h-6 text-blue-500" />,
    },
    {
      id: 'all-tasks',
      title: 'Task Master',
      description: 'Completed all daily tasks in one day',
      earned: true,
      icon: <Target className="w-6 h-6 text-green-500" />,
    },
  ]

  // Mock data for the calendar
  const currentMonth = Array.from({ length: 30 }, (_, i) => ({
    date: i + 1,
    completed: Math.random() > 0.3,
  }))

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Progress</h2>

      {/* Calendar View */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Practice Calendar
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {currentMonth.map((day, i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                day.completed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {day.date}
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Achievements</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border ${
                achievement.earned
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {achievement.icon}
                <div>
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
