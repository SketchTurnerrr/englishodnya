import { createFileRoute } from '@tanstack/react-router'
import { PracticeReading } from '@/components/features/daily-practice/PracticeReading'

export const Route = createFileRoute('/practice/reading')({
  component: ReadingPage,
})

function ReadingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center">Reading Practice</h1>
        <p className="text-gray-600 text-center mt-2">
          Improve your English reading comprehension with various texts
        </p>
      </div>
      <PracticeReading />
    </div>
  )
}
