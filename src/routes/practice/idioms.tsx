import { createFileRoute } from '@tanstack/react-router'
import { PracticeIdiom } from '@/components/features/daily-practice/PracticeIdiom'

export const Route = createFileRoute('/practice/idioms')({
  component: IdiomsPage,
})

function IdiomsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center">Idiom Practice</h1>
        <p className="text-gray-600 text-center mt-2">
          Master English idioms and their usage in context
        </p>
      </div>
      <PracticeIdiom />
    </div>
  )
}
