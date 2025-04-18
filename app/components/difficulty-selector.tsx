import { Button } from '@/app/components/ui/button';

export type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

export function DifficultySelector({
  currentDifficulty,
  onChange,
}: DifficultySelectorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      <span className="text-sm font-medium mr-2">Difficulty:</span>
      <div className="flex rounded-md overflow-hidden border">
        <Button
          type="button"
          variant={currentDifficulty === 'easy' ? 'default' : 'ghost'}
          className={`rounded-none px-4 py-2 h-9 ${
            currentDifficulty === 'easy' ? '' : 'hover:bg-muted'
          }`}
          onClick={() => onChange('easy')}
        >
          Easy
        </Button>
        <Button
          type="button"
          variant={currentDifficulty === 'medium' ? 'default' : 'ghost'}
          className={`rounded-none px-4 py-2 h-9 ${
            currentDifficulty === 'medium' ? '' : 'hover:bg-muted'
          }`}
          onClick={() => onChange('medium')}
        >
          Medium
        </Button>
        <Button
          type="button"
          variant={currentDifficulty === 'hard' ? 'default' : 'ghost'}
          className={`rounded-none px-4 py-2 h-9 ${
            currentDifficulty === 'hard' ? '' : 'hover:bg-muted'
          }`}
          onClick={() => onChange('hard')}
        >
          Hard
        </Button>
      </div>
    </div>
  );
}
