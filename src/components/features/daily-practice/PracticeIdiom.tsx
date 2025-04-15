import { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '~/_generated/api'
import { Button } from '@/components/ui/button'
import { Loader2, Mic, ChevronRight } from 'lucide-react'

export function PracticeIdiom() {
  const dailyIdiom = useQuery(api.idioms.getDailyIdiom)
  const idiom = useQuery(api.idioms.getRandomIdiom, {
    excludeId: dailyIdiom?._id,
  })
  const [step, setStep] = useState<'content' | 'definition' | 'example'>(
    'content',
  )
  const [learnedIdioms, setLearnedIdioms] = useState<string[]>([])

  if (!idiom) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  const handleNextIdiom = () => {
    setLearnedIdioms((prev) => [...prev, idiom._id])
    setStep('content')
  }

  const renderStep = () => {
    switch (step) {
      case 'content':
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">The Idiom</h3>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <p className="text-2xl font-bold text-blue-700">
                {idiom.content}
              </p>
            </div>
            <Button onClick={() => setStep('definition')} size="lg">
              Show Meaning <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )

      case 'definition':
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Meaning</h3>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <p className="text-lg text-green-700">{idiom.definition}</p>
            </div>
            <Button onClick={() => setStep('example')} size="lg">
              See Example <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )

      case 'example':
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Example Usage</h3>
            <div className="bg-purple-50 p-6 rounded-lg mb-6">
              <p className="text-lg text-purple-700 italic">
                "{idiom.example}"
              </p>
            </div>
            <Button onClick={handleNextIdiom} size="lg">
              Learn Another Idiom <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg p-8 shadow-sm">
        {renderStep()}
        {learnedIdioms.length > 0 && (
          <p className="text-sm text-gray-500 text-center mt-4">
            You've learned {learnedIdioms.length} additional idiom
            {learnedIdioms.length !== 1 ? 's' : ''} today!
          </p>
        )}
      </div>
    </div>
  )
}
