import { ProgressTracker } from '@/app/components/features/progress-tracker/ProgressTracker';

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-600">EnglishOdnya</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="/"
                className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent"
              >
                Daily Practice
              </a>
              <a
                href="/progress"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-blue-500"
              >
                Progress
              </a>
              <a
                href="/community"
                className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent"
              >
                Community
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <ProgressTracker />
      </main>

      <footer className="bg-white mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            "Learn English a Little Every Day" - Consistency Over Intensity
          </p>
        </div>
      </footer>
    </div>
  );
}
