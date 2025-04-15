import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '~/_generated/api'
import { Button } from '@/components/ui/button'
import { Loader2, BookOpen, CheckCircle } from 'lucide-react'

export function Reading() {
  const dailyText = useQuery(api.texts.getDailyText)
  const markAsRead = useMutation(api.texts.markTextAsRead)
  const [isReading, setIsReading] = useState(false)
  const progress = useQuery(api.progress.getUserProgress)

  if (!dailyText) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  const handleMarkAsRead = async () => {
    try {
      await markAsRead({ textId: dailyText._id })
    } catch (error) {
      console.error('Failed to mark text as read:', error)
    }
  }

  if (!isReading && !progress?.todayProgress?.readingCompleted) {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-500" />
        <h2 className="text-2xl font-bold mb-4">{dailyText.title}</h2>
        <p className="text-gray-600 mb-6">
          Today's reading is about {dailyText.category.toLowerCase()}. Take your
          time to read and understand the text.
        </p>
        <Button onClick={() => setIsReading(true)} size="lg">
          Start Reading
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{dailyText.title}</h2>
      <div className="space-y-4 prose prose-blue max-w-none mb-8">
        {dailyText.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {!progress?.todayProgress?.readingCompleted && (
        <div className="flex justify-center">
          <Button onClick={handleMarkAsRead} size="lg">
            {progress?.todayProgress?.readingCompleted ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Completed
              </>
            ) : (
              'Mark as Read'
            )}
          </Button>
        </div>
      )}

      {progress?.todayProgress?.readingCompleted && (
        <div className="text-center text-green-600 mt-4">
          <CheckCircle className="w-6 h-6 mx-auto mb-2" />
          <p className="font-medium">You've completed today's reading!</p>
        </div>
      )}
    </div>
  )
}
