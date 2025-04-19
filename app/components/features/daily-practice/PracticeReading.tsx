import { useState, useCallback } from 'react';
import { Button } from '@/app/components/ui/button';

import { Loader2, Baseline, Volume2, X } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {
  Difficulty,
  DifficultySelector,
} from '@/app/components/difficulty-selector';
import { DictionaryResponse } from '@/types/dictionary';
import { getWordDefinition, stopWords } from '@/lib/utils';
import { Toggle } from '@/components/ui/toggle';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function PracticeReading() {
  const [cacheBuster, rerunQuery] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [definitionMode, setDefinitionMode] = useState(false);
  const [definitions, setDefinitions] = useState<
    Map<string, DictionaryResponse>
  >(new Map());
  const [loading, setLoading] = useState<Set<string>>(new Set());
  const [readTexts, setReadTexts] = useState<string[]>([]);

  const progress = useQuery(api.progress.getUserProgress);
  const markAsRead = useMutation(api.texts.markTextAsRead);
  const updateProgress = useMutation(api.progress.updateDailyProgress);
  const randomText = useQuery(api.texts.getRandomText, {
    cacheBuster,
    difficulty,
  });
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const fetchDefinition = useCallback(
    async (word: string) => {
      const cleanWord = word
        .toLowerCase()
        .trim()
        .replace(/[^a-z]/g, '');
      if (!cleanWord) return;

      if (loading.has(cleanWord) || definitions.has(cleanWord)) return;

      setLoading((prev) => new Set(prev).add(cleanWord));
      const definition = await getWordDefinition(cleanWord);
      setLoading((prev) => {
        const next = new Set(prev);
        next.delete(cleanWord);
        return next;
      });

      if (definition) {
        setDefinitions((prev) => new Map(prev).set(cleanWord, definition));
      }
    },
    [loading, definitions]
  );

  const playAudio = useCallback((audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play().catch(console.error);
  }, []);

  const handleNextText = async () => {
    if (!progress?.todayProgress?.readingCompleted) {
      try {
        await markAsRead();
        await updateProgress({ taskId: 'reading', completed: true });
      } catch (error) {
        console.error('Failed to mark text as read:', error);
      }
    }

    rerunQuery(Math.random());
    setReadTexts((prev) => [...prev, randomText!._id]);
    // Reset definitions when moving to next text
    setDefinitions(new Map());
  };

  const renderDefinitionContent = (cleanWord: string) => {
    const definition = definitions.get(cleanWord);

    if (loading.has(cleanWord)) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent" />
        </div>
      );
    }

    if (!definition) {
      return (
        <p className="text-sm text-muted-foreground">
          Визначення не знайдено "{cleanWord}"
        </p>
      );
    }

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold">{definition.word}</h4>
            {definition.phonetic && (
              <span className="text-sm text-muted-foreground">
                {definition.phonetic}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {definition.phonetics.some((p) => p.audio) && (
              <button
                onClick={() =>
                  playAudio(
                    definition.phonetics.find((p) => p.audio)?.audio || ''
                  )
                }
                className="p-2 hover:bg-blue-50 rounded-full"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setOpenPopoverId(null)}
              className="p-2 hover:bg-blue-50 rounded-full cursor-pointer shadow border"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        {definition.meanings.map((meaning, i) => (
          <div key={i} className="space-y-1">
            <span className="text-xs font-medium text-blue-600">
              {meaning.partOfSpeech}
            </span>
            <p className="text-sm">{meaning.definitions[0].definition}</p>
            {meaning.definitions[0].example && (
              <p className="text-sm text-muted-foreground italic">
                "{meaning.definitions[0].example}"
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderWord = useCallback(
    (word: string, index: number) => {
      if (/^[\s.,!?;]$/.test(word)) {
        return <span key={`${word}-${index}`}>{word}</span>;
      }

      const cleanWord = word
        .toLowerCase()
        .trim()
        .replace(/[^a-z]/g, '');

      // Don't highlight or fetch definitions for stop words
      if (!cleanWord || stopWords.has(cleanWord) || !definitionMode) {
        return <span key={`${word}-${index}`}>{word}</span>;
      }

      const popoverId = `${cleanWord}-${index}`;

      return (
        <Popover
          key={popoverId}
          open={openPopoverId === popoverId}
          onOpenChange={(open) => {
            if (open) {
              setOpenPopoverId(popoverId);
              fetchDefinition(cleanWord);
            } else {
              setOpenPopoverId(null);
              setTimeout(() => setOpenPopoverId(null), 100);
            }
          }}
        >
          <PopoverTrigger asChild>
            <span className="cursor-pointer border-b border-dotted border-blue-400 touch-manipulation">
              {word}
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            {renderDefinitionContent(cleanWord)}
          </PopoverContent>
        </Popover>
      );
    },
    [
      definitionMode,
      definitions,
      loading,
      fetchDefinition,
      playAudio,
      openPopoverId,
    ]
  );

  if (!randomText) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-6">
        <DifficultySelector
          currentDifficulty={difficulty}
          onChange={(newDifficulty) => {
            setDifficulty(newDifficulty);
          }}
        />
        <Toggle
          pressed={definitionMode}
          onPressedChange={setDefinitionMode}
          aria-label="Toggle definition mode"
          className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-900 cursor-pointer self-start"
        >
          <Baseline className="size-5" />
          Режим словнику
        </Toggle>
      </div>

      <h2 className="text-2xl font-bold mb-4">{randomText.title}</h2>

      {definitionMode && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            наведіть/натисніть на слово, щоб побачити його визначення або
            прослухати
          </p>
        </div>
      )}

      <div className="prose prose-blue max-w-none mb-8 space-y-4">
        {randomText.content.split('\n').map((paragraph, index) => (
          <p key={index}>
            {paragraph
              .split(/(\s+|[.,!?;])/)
              .map((word, wordIndex) => renderWord(word, wordIndex))}
          </p>
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
