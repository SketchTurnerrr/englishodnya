import { createFileRoute } from '@tanstack/react-router'
import { BookOpen, Award, Mic } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/practice/')({
  component: PracticePage,
})

function PracticePage() {
  const activities = [
    {
      id: 'reading',
      title: 'Practice Reading',
      description: 'Read more texts to improve your comprehension',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
      href: '/practice/reading',
    },
    {
      id: 'spelling',
      title: 'Spelling Challenge',
      description: 'Test your spelling skills with more words',
      icon: <Award className="w-6 h-6" />,
      color: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
      href: '/practice/spelling',
    },
    {
      id: 'idioms',
      title: 'Learn More Idioms',
      description: 'Master more English idioms and their usage',
      icon: <Mic className="w-6 h-6" />,
      color:
        'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
      href: '/practice/idioms',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Practice Activities</h1>
          <p className="text-gray-600">
            Choose an activity to practice and improve your English skills
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {activities.map((activity) => (
            <Link
              key={activity.id}
              to={activity.href}
              className={`p-6 rounded-lg border text-left transition-all hover:scale-105 ${activity.color}`}
            >
              <div className="flex items-center gap-3 mb-3">
                {activity.icon}
                <h3 className="text-lg font-semibold">{activity.title}</h3>
              </div>
              <p className="text-sm opacity-90">{activity.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
