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
    <div className="flex items-center justify-center gap-2 ">
      <span className="text-sm font-medium mr-2">Складність:</span>
      <div className="flex rounded-md overflow-hidden border">
        <Button
          type="button"
          variant={currentDifficulty === 'easy' ? 'default' : 'ghost'}
          className={`cursor-pointer rounded-none px-4 py-2 h-9 ${
            currentDifficulty === 'easy' ? '' : 'hover:bg-muted'
          }`}
          onClick={() => onChange('easy')}
        >
          Проста
        </Button>
        <Button
          type="button"
          variant={currentDifficulty === 'medium' ? 'default' : 'ghost'}
          className={`cursor-pointer rounded-none px-4 py-2 h-9 ${
            currentDifficulty === 'medium' ? '' : 'hover:bg-muted'
          }`}
          onClick={() => onChange('medium')}
        >
          Середня
        </Button>
        <Button
          type="button"
          variant={currentDifficulty === 'hard' ? 'default' : 'ghost'}
          className={`cursor-pointer rounded-none px-4 py-2 h-9 ${
            currentDifficulty === 'hard' ? '' : 'hover:bg-muted'
          }`}
          onClick={() => onChange('hard')}
        >
          Важка
        </Button>
      </div>
    </div>
  );
}
