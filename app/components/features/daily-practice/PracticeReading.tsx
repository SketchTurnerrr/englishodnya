import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Loader2, BookOpen, ChevronRight } from 'lucide-react';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {
  Difficulty,
  DifficultySelector,
} from '@/app/components/difficulty-selector';

export function PracticeReading() {
  const [cacheBuster, rerunQuery] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const progress = useQuery(api.progress.getUserProgress);
  const markAsRead = useMutation(api.texts.markTextAsRead);

  const randomText = useQuery(api.texts.getRandomText, {
    cacheBuster,
    difficulty,
  });
  const [readTexts, setReadTexts] = useState<string[]>([]);

  if (!randomText) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const handleNextText = async () => {
    if (!progress?.todayProgress?.readingCompleted) {
      try {
        await markAsRead();
      } catch (error) {
        console.error('Failed to mark text as read:', error);
      }
    }

    rerunQuery(Math.random());
    setReadTexts((prev) => [...prev, randomText._id]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <DifficultySelector
        currentDifficulty={difficulty}
        onChange={(newDifficulty) => {
          setDifficulty(newDifficulty);
        }}
      />
      <h2 className="text-2xl font-bold mb-4">{randomText.title}</h2>
      <div className="prose prose-blue max-w-none mb-8 space-y-4  ">
        {randomText.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="flex justify-center">
        <Button onClick={handleNextText} size="lg">
          {progress?.todayProgress?.readingCompleted ? 'Читати ще' : 'Готово'}
        </Button>
      </div>

      {readTexts.length > 0 && (
        <p className="text-sm text-gray-500 text-center mt-4">
          Ти прочитав{' '}
          {readTexts.length === 1
            ? `${readTexts.length} текст `
            : `${readTexts.length} тексти `}
          за сьогодні!
        </p>
      )}
    </div>
  );
}
