import { Button } from '@/components/ui/button';

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
            currentDifficulty === 'easy'
              ? 'bg-blue-100 text-blue-900 hover:bg-blue-200'
              : 'hover:bg-muted '
          }`}
          onClick={() => onChange('easy')}
        >
          Проста
        </Button>
        <Button
          type="button"
          variant={currentDifficulty === 'medium' ? 'default' : 'ghost'}
          className={`cursor-pointer rounded-none px-4 py-2 h-9 ${
            currentDifficulty === 'medium'
              ? 'bg-blue-100 text-blue-900 hover:bg-blue-200'
              : 'hover:bg-muted'
          }`}
          onClick={() => onChange('medium')}
        >
          Середня
        </Button>
        <Button
          type="button"
          variant={currentDifficulty === 'hard' ? 'default' : 'ghost'}
          className={`cursor-pointer rounded-none px-4 py-2 h-9 ${
            currentDifficulty === 'hard'
              ? 'bg-blue-100 text-blue-900 hover:bg-blue-200'
              : 'hover:bg-muted'
          }`}
          onClick={() => onChange('hard')}
        >
          Важка
        </Button>
      </div>
    </div>
  );
}
