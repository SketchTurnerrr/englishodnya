import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Calendar, CheckCircle, BookOpen, Play, Mic, Award } from 'lucide-react'
import { SpellingBee } from './SpellingBee'

interface DailyTask {
  id: string
  title: string
  completed: boolean
}

export function DailyPractice() {
  const [tasks, setTasks] = useState<DailyTask[]>([
    { id: 'reading', title: "Read Today's Text", completed: false },
    { id: 'video', title: 'Watch Daily Video', completed: false },
    { id: 'spelling', title: 'Spelling Challenge', completed: false },
    { id: 'idiom', title: "Learn Today's Idiom", completed: false },
  ])

  const [streak, setStreak] = useState(0)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)

  const handleTaskComplete = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task,
      ),
    )

    // Check if all tasks are completed
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task,
    )

    if (updatedTasks.every((task) => task.completed)) {
      setStreak((prev) => prev + 1)
    }
  }

  const handleTaskSelect = (taskId: string) => {
    setSelectedTask(taskId)
  }

  const handleBackToTasks = () => {
    setSelectedTask(null)
  }

  const renderTaskContent = () => {
    switch (selectedTask) {
      case 'spelling':
        return (
          <div>
            <Button
              onClick={handleBackToTasks}
              variant="outline"
              className="mb-4"
            >
              ← Back to Tasks
            </Button>
            <SpellingBee />
          </div>
        )
      // Add other task components here
      default:
        return null
    }
  }

  if (selectedTask) {
    return renderTaskContent()
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Daily English Practice</h1>
        <p className="text-gray-600">Consistency Over Intensity</p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Calendar className="w-5 h-5" />
          <span className="font-semibold">Current Streak: {streak} days</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <Button
                onClick={() => handleTaskSelect(task.id)}
                disabled={task.completed}
                variant={task.completed ? 'ghost' : 'default'}
              >
                {task.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  'Start'
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700"
          disabled={!tasks.every((task) => task.completed)}
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Done for Today
        </Button>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Today's Progress</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-500" />
            <span>Streak: {streak} days</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span>
              Tasks Completed: {tasks.filter((t) => t.completed).length}/
              {tasks.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
