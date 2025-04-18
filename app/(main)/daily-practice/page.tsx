'use client';
import { Button } from '@/app/components/ui/button';
import { useState, type JSX } from 'react';
import {
  Calendar,
  CheckCircle,
  BookOpen,
  Play,
  Mic,
  Award,
  Trophy,
  Loader2,
  ChevronDown,
  ChevronRight,
  CheckCheck,
  CircleCheck,
  Lamp,
  Lightbulb,
} from 'lucide-react';
import { useMutation, useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { Idiom } from '@/app/components/features/daily-practice/Idiom';
import { PracticeReading } from '@/app/components/features/daily-practice/PracticeReading';
import { SpellingBee } from '@/app/components/features/daily-practice/SpellingBee';
import { api } from '@/convex/_generated/api';
import { useStoreUserEffect } from '@/lib/useStoreUserEffect';

interface DailyTask {
  id: string;
  title: string;
  completed: boolean;
  icon: JSX.Element;
}

export default function DailyPractice() {
  const { isLoading, isAuthenticated } = useStoreUserEffect();
  const progress = useQuery(api.progress.getUserProgress);
  const updateProgress = useMutation(api.progress.updateDailyProgress);
  const router = useRouter();

  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showPracticeMore, setShowPracticeMore] = useState(false);

  const tasks: DailyTask[] = [
    {
      id: 'reading',
      title: 'Тексти',
      completed: progress?.todayProgress?.readingCompleted ?? false,
      icon: <BookOpen className="size-5" />,
    },
    // {
    //   id: 'video',
    //   title: 'Watch Daily Video',
    //   completed: progress?.todayProgress?.videoCompleted ?? false,
    //   icon: <Play className="size-5" />,
    // },
    {
      id: 'spelling',
      title: 'Spelling Bee',
      completed: (progress?.todayProgress?.spellingScore ?? 0) > 5,
      icon: <img src="/bee.svg" className="size-5 text-yellow-400" />,
    },
    {
      id: 'idiom',
      title: 'Ідіоми',
      completed: progress?.todayProgress?.idiomCompleted ?? false,
      icon: <Lightbulb className="size-5" />,
    },
  ];

  const handleTaskSelect = (taskId: string) => {
    setSelectedTask(taskId);
  };

  const handleBackToTasks = () => {
    setSelectedTask(null);
  };

  const handleTaskComplete = async (taskId: string) => {
    try {
      await updateProgress({
        taskId,
        completed: true,
      });
    } catch (error) {
      console.error('Failed to update task progress:', error);
    }
  };

  const renderTaskContent = () => {
    switch (selectedTask) {
      case 'spelling':
        return (
          <>
            <Button
              onClick={handleBackToTasks}
              variant="outline"
              className="mb-4"
            >
              ← Повернутись до завдань
            </Button>
            <SpellingBee />
          </>
        );
      case 'reading':
        return (
          <>
            <Button
              onClick={handleBackToTasks}
              variant="outline"
              className="mb-4"
            >
              ← Повернутись до завдань
            </Button>
            <PracticeReading />
          </>
        );
      case 'idiom':
        return (
          <>
            <Button
              onClick={handleBackToTasks}
              variant="outline"
              className="mb-4"
            >
              ← Повернутись до завдань
            </Button>
            <Idiom />
          </>
        );
      default:
        return null;
    }
  };

  if (selectedTask) {
    return (
      <div className="max-w-4xl mx-auto p-6 mb-20">{renderTaskContent()}</div>
    );
  }

  if (!progress) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const allTasksCompleted = tasks.every((task) => task.completed);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Daily English Practice</h1>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Calendar className="w-5 h-5" />
          <span className="font-semibold">
            Current Streak: {progress.streak || 0} days
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-6 rounded-lg border ${
              task.completed
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {task.icon}
                <h3 className="text-lg font-semibold">{task.title}</h3>
              </div>
              <Button
                className="bg-green-700 hover:bg-green-800 cursor-pointer"
                onClick={() => handleTaskSelect(task.id)}
              >
                {task.completed ? (
                  <>
                    Review
                    <CircleCheck className="size-6 " />
                  </>
                ) : (
                  'Start'
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {allTasksCompleted && (
        <div className="mt-8 text-center space-y-4">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => router.push('/progress')}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Done for Today
          </Button>
        </div>
      )}

      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Today's Progress</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-500" />
            <span>Streak: {progress.streak || 0} days</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span>
              Tasks Completed: {tasks.filter((t) => t.completed).length}/
              {tasks.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span>Total Practice: {progress.totalPractice || 0} days</span>
          </div>
        </div>

        {progress.achievements && progress.achievements.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Recent Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {progress.achievements.map((achievement: any) => (
                <div
                  key={achievement._id}
                  className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  {achievement.type}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
