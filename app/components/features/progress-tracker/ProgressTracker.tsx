'use client';
import React, { useState, type JSX } from 'react';
import { Calendar, Trophy, Star, Target, Activity } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api'; // Adjust path if needed
import { conjugateDay } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Define the structure expected by the component for an achievement
interface DisplayAchievement {
  id: string; // Use type for unearned, _id for earned
  title: string;
  description: string;
  earned: boolean;
  icon: JSX.Element;
}

// --- Define ALL possible achievements here ---
// This map now serves as the single source of truth for achievement definitions.
const achievementDefinitions: Record<
  string, // The achievement 'type' string used in the DB
  { title: string; description: string; icon: (earned: boolean) => JSX.Element } // Icon function takes 'earned' status
> = {
  '7-day-streak': {
    title: '7 Day Streak',
    description: 'Practiced English for 7 days in a row',
    icon: (earned) => (
      <Star
        className={`w-6 h-6 ${earned ? 'text-yellow-500' : 'text-gray-400'}`}
      />
    ),
  },
  '30-day-streak': {
    title: '30 Day Streak',
    description: 'Maintained practice for a full month',
    icon: (earned) => (
      <Trophy
        className={`w-6 h-6 ${earned ? 'text-blue-500' : 'text-gray-400'}`}
      />
    ),
  },
  'task-master-daily': {
    // Example: Add a potential new achievement type
    title: 'Daily Task Master',
    description: 'Completed all daily tasks in a single day',
    icon: (earned) => (
      <Target
        className={`w-6 h-6 ${earned ? 'text-green-500' : 'text-gray-400'}`}
      />
    ),
  },
  // Add all other potential achievement types here
};
// --- End Achievement Definitions ---

export function ProgressTracker() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthlyProgress = useQuery(api.progress.getMonthlyProgress, {
    year: currentYear,
    month: currentMonth,
  });

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDateString = (day: number) => {
    return new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const daysList = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const progressData = useQuery(api.progress.getUserProgress);

  if (progressData === undefined) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading progress...</p>
      </div>
    );
  }

  const {
    streak = 0,
    totalPractice = 0,
    achievements: earnedDbAchievements = [], // Rename to avoid confusion
  } = progressData || {};

  // --- Process Achievements ---
  const earnedAchievementTypes = new Set(
    earnedDbAchievements.map((ach) => ach.type)
  );

  const allAchievements: DisplayAchievement[] = Object.entries(
    achievementDefinitions
  )
    .map(([type, details]) => {
      const earned = earnedAchievementTypes.has(type);
      // Find the corresponding DB document if earned, mainly for the _id
      const dbAch = earned
        ? earnedDbAchievements.find((a) => a.type === type)
        : null;
      return {
        id: earned ? dbAch!._id : type, // Use DB _id if earned, type string if not
        title: details.title,
        description: details.description,
        earned: earned,
        icon: details.icon(earned), // Pass earned status to icon function
      };
    })
    .sort((a, b) => {
      // Optional: Sort earned achievements first
      if (a.earned && !b.earned) return -1;
      if (!a.earned && b.earned) return 1;
      return a.title.localeCompare(b.title); // Then sort alphabetically
    });

  const earnedDisplayAchievements = allAchievements.filter((a) => a.earned);
  const unearnedDisplayAchievements = allAchievements.filter((a) => !a.earned);
  // --- End Process Achievements ---

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Огляд прогресу
      </h2>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Streak */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-4">
          <Star className="w-8 h-8 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Днів поспіль</p>
            <p className="text-2xl font-semibold">
              {streak} {conjugateDay(streak)}
            </p>
          </div>
        </div>
        {/* Total Practice */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-4">
          <Activity className="size-8 text-indigo-500" />
          <div>
            <p className="text-sm text-gray-500">Усього днів практики</p>
            <p className="text-2xl font-semibold">{totalPractice}</p>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="size-5" />
            Practice Calendar
          </h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11);
                  setCurrentYear(currentYear - 1);
                } else {
                  setCurrentMonth(currentMonth - 1);
                }
              }}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0);
                  setCurrentYear(currentYear + 1);
                } else {
                  setCurrentMonth(currentMonth + 1);
                }
              }}
            >
              Next
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {/* Week day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="text-start text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}

          {/* Empty cells for proper day alignment */}
          {Array.from({
            length: new Date(currentYear, currentMonth, 1).getDay(),
          }).map((_, i) => (
            <div key={`empty-${i}`} className="h-10" />
          ))}

          {/* Calendar days */}
          {daysList.map((day) => {
            const dateString = getDateString(day + 1);
            const dayProgress = monthlyProgress?.progressMap[dateString];
            const isToday =
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear();

            return (
              <div
                key={day}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isToday
                      ? 'ring-2 ring-blue-500'
                      : dayProgress?.isCompleted
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-400'
                  }
                `}
                title={
                  dayProgress
                    ? `Completed tasks: ${Object.entries(dayProgress.tasks)
                        .filter(([, completed]) => completed)
                        .map(([task]) => task)
                        .join(', ')}`
                    : 'No practice this day'
                }
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-gray-700" />
          Досягнення
        </h3>

        {/* Earned Achievements */}
        {earnedDisplayAchievements.length > 0 && (
          <>
            <h4 className="text-md font-semibold mb-3 text-green-700">
              Зароблені
            </h4>
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              {earnedDisplayAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="p-4 rounded-lg border border-green-200 bg-green-50"
                >
                  <div className="flex items-center gap-3">
                    {achievement.icon}
                    <div>
                      <h4 className="font-semibold text-green-800">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Unearned Achievements */}
        {unearnedDisplayAchievements.length > 0 && (
          <>
            <h4 className="text-md font-semibold mb-3 text-gray-600">
              Ще попереду!
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              {unearnedDisplayAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="p-4 rounded-lg border border-gray-200 bg-gray-50 opacity-70" // Grayed out style
                >
                  <div className="flex items-center gap-3">
                    {achievement.icon}
                    <div>
                      <h4 className="font-semibold text-gray-700">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Message if all achievements are earned */}
        {earnedDisplayAchievements.length > 0 &&
          unearnedDisplayAchievements.length === 0 && (
            <p className="text-center text-green-600 font-medium mt-4">
              Congratulations! You've earned all available achievements!
            </p>
          )}

        {/* Message if no achievements exist at all (unlikely but possible) */}
        {earnedDisplayAchievements.length === 0 &&
          unearnedDisplayAchievements.length === 0 && (
            <p className="text-gray-500">No achievements defined yet.</p>
          )}
      </div>
    </div>
  );
}
