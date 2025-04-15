import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '~/_generated/api'
import { Button } from '@/components/ui/button'
import { Loader2, Mic, CheckCircle, ChevronRight } from 'lucide-react'

export function Idiom() {
  const dailyIdiom = useQuery(api.idioms.getDailyIdiom)
  const markAsLearned = useMutation(api.idioms.markIdiomAsLearned)
  const progress = useQuery(api.progress.getUserProgress)
  const [step, setStep] = useState<
    'intro' | 'content' | 'definition' | 'example'
  >('intro')

  if (!dailyIdiom) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  const handleComplete = async () => {
    try {
      await markAsLearned({ idiomId: dailyIdiom._id })
    } catch (error) {
      console.error('Failed to mark idiom as learned:', error)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 'intro':
        return (
          <div className="text-center max-w-lg mx-auto">
            <Mic className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h2 className="text-2xl font-bold mb-4">Today's Idiom</h2>
            <p className="text-gray-600 mb-6">
              Learn a new English idiom and understand its meaning and usage.
            </p>
            <Button onClick={() => setStep('content')} size="lg">
              Start Learning
            </Button>
          </div>
        )

      case 'content':
        return (
          <div className="text-center max-w-lg mx-auto">
            <h3 className="text-xl font-semibold mb-2">The Idiom</h3>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <p className="text-2xl font-bold text-blue-700">
                {dailyIdiom.content}
              </p>
            </div>
            <Button onClick={() => setStep('definition')} size="lg">
              Show Meaning <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )

      case 'definition':
        return (
          <div className="text-center max-w-lg mx-auto">
            <h3 className="text-xl font-semibold mb-2">Meaning</h3>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <p className="text-lg text-green-700">{dailyIdiom.definition}</p>
            </div>
            <Button onClick={() => setStep('example')} size="lg">
              See Example <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )

      case 'example':
        return (
          <div className="text-center max-w-lg mx-auto">
            <h3 className="text-xl font-semibold mb-2">Example Usage</h3>
            <div className="bg-purple-50 p-6 rounded-lg mb-6">
              <p className="text-lg text-purple-700 italic">
                "{dailyIdiom.example}"
              </p>
            </div>
            {!progress?.todayProgress?.idiomCompleted && (
              <Button onClick={handleComplete} size="lg">
                Mark as Learned
              </Button>
            )}
          </div>
        )
    }
  }

  if (progress?.todayProgress?.idiomCompleted) {
    return (
      <div className="text-center max-w-lg mx-auto">
        <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
        <h2 className="text-2xl font-bold mb-2">Great Job!</h2>
        <p className="text-gray-600 mb-6">
          You've learned today's idiom: <strong>{dailyIdiom.content}</strong>
        </p>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold mb-1">Meaning:</h3>
            <p>{dailyIdiom.definition}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold mb-1">Example:</h3>
            <p className="italic">"{dailyIdiom.example}"</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg p-8 shadow-sm">{renderStep()}</div>
    </div>
  )
}
