import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, BookOpen, ChevronRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { randomTextQuery } from '@/queries'

export function PracticeReading() {
  const [cacheBuster, rerunQuery] = useState(0)

  const { data: randomText } = useQuery(randomTextQuery.list(cacheBuster))
  const [isReading, setIsReading] = useState(false)
  const [readTexts, setReadTexts] = useState<string[]>([])

  if (!randomText) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  const handleNextText = () => {
    rerunQuery(Math.random())
    setReadTexts((prev) => [...prev, randomText._id])
    setIsReading(false)
  }

  if (!isReading) {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-500" />
        <h2 className="text-2xl font-bold mb-4">{randomText.title}</h2>
        <p className="text-gray-600 mb-6">
          This text is about {randomText.category.toLowerCase()}. Take your time
          to read and understand it.
        </p>
        <Button onClick={() => setIsReading(true)} size="lg">
          Start Reading
        </Button>
        {readTexts.length > 0 && (
          <p className="text-sm text-gray-500 mt-4">
            You've read {readTexts.length} additional text
            {readTexts.length !== 1 ? 's' : ''} today!
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{randomText.title}</h2>
      <div className="prose prose-blue max-w-none mb-8 space-y-4  ">
        {randomText.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="flex justify-center">
        <Button onClick={handleNextText} size="lg">
          Read Another Text <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {readTexts.length > 0 && (
        <p className="text-sm text-gray-500 text-center mt-4">
          You've read {readTexts.length} additional text
          {readTexts.length !== 1 ? 's' : ''} today!
        </p>
      )}
    </div>
  )
}
