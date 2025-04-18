import { ProgressTracker } from '@/app/components/features/progress-tracker/ProgressTracker';

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
