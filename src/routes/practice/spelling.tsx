import { createFileRoute } from '@tanstack/react-router'
import { SpellingBee } from '@/components/features/daily-practice/SpellingBee'

export const Route = createFileRoute('/practice/spelling')({
  component: SpellingPage,
})

function SpellingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center">Spelling Practice</h1>
        <p className="text-gray-600 text-center mt-2">
          Test and improve your English spelling skills
        </p>
      </div>
      <SpellingBee />
    </div>
  )
}
