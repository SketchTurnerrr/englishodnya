import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';

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

import nlp from 'compromise';

const PARTS_TO_EXCLUDE = ['NumericValue', 'ProperNoun', 'Person'];

type Token = {
  text: string;
  pre: string;
  post: string;
  normal: string;
  tags: Record<string, boolean>;
  index: [number | undefined, number | undefined];
  id: string;
  chunk?: string;
  dirty?: boolean;
  syllables?: string[];
};

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
  const paragraphs = randomText?.content?.split('\n');

  const tokenizedParagraphs = paragraphs?.map((para) =>
    nlp(para)
      .terms()
      .document.map((sentence) =>
        sentence.map(
          (t): Token => ({
            text: t.text,
            pre: t.pre,
            post: t.post,
            normal: t.normal,
            //@ts-expect-error type is not defined
            tags: t.tags,
            index: [t.index?.[0], t.index?.[1]],
            //@ts-expect-error type is not defined
            id: t.id,
            chunk: t.chunk,
            dirty: t.dirty,
            syllables: t.syllables,
          })
        )
      )
  );

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
    const results = definitions.get(cleanWord);

    if (loading.has(cleanWord)) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent" />
        </div>
      );
    }

    if (!results?.length) {
      return (
        <p className="text-sm text-muted-foreground">
          No definition found for "{cleanWord}"
        </p>
      );
    }

    // Find the first available audio URL
    const audioUrl = results
      .flatMap((result) => result.phonetics || [])
      .find((phonetic) => phonetic.audio)?.audio;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold capitalize">{cleanWord}</h4>
            {results[0].phonetics?.[0]?.text && (
              <span className="text-sm text-muted-foreground">
                {results[0].phonetics[0].text}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {audioUrl && (
              <button
                onClick={() => playAudio(audioUrl)}
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

        {/* Show all definitions from all results */}
        {results.map((result, resultIndex) => (
          <div key={resultIndex} className="space-y-3">
            {result.meanings?.map((meaning, meaningIndex) => (
              <div key={`${resultIndex}-${meaningIndex}`} className="space-y-2">
                {meaning.partOfSpeech && (
                  <span className="text-xs font-medium text-blue-600 capitalize">
                    {meaning.partOfSpeech}
                  </span>
                )}
                <div className="space-y-2">
                  {meaning.definitions?.map((def, defIndex) => (
                    <div
                      key={defIndex}
                      className="pl-2 border-l-2 border-gray-200 space-y-1"
                    >
                      <p className="text-sm">
                        {meaning.definitions &&
                          meaning.definitions.length > 1 &&
                          `${defIndex + 1}. `}
                        {def.definition}
                      </p>
                      {def.example && (
                        <p className="text-sm text-muted-foreground italic">
                          "{def.example}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                {meaning.synonyms && meaning.synonyms.length > 0 && (
                  <p className="text-sm text-gray-500">
                    Synonyms: {meaning?.synonyms?.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderWord = useCallback(
    (word: Token, index: number, pIndex: number) => {
      if (
        !word.normal ||
        stopWords.has(word.normal) ||
        !definitionMode ||
        // @ts-expect-error type is not defined
        word.tags.values().some((tag) => PARTS_TO_EXCLUDE.includes(tag))
      ) {
        return (
          <span className="" key={`${word}-${index}`}>
            {word.pre}
            {word.text}
            {word.post}
          </span>
        );
      }

      const popoverId = `${pIndex}-${word.normal}-${index}`;

      return (
        <Popover
          key={popoverId}
          open={openPopoverId === popoverId}
          onOpenChange={(open) => {
            if (open) {
              // If there's already an open popover, close it first
              if (openPopoverId && openPopoverId !== popoverId) {
                setOpenPopoverId(null);
              } else {
                setOpenPopoverId(popoverId);
                fetchDefinition(word.normal);
              }
            } else {
              setOpenPopoverId(null);
            }
          }}
        >
          <PopoverTrigger asChild>
            <span className="whitespace-break-spaces">
              {word.pre && <span>{word.pre}</span>}
              <span className="cursor-pointer border-b border-dotted border-blue-400 touch-manipulation ">
                {word.text}
              </span>
              {word.post}
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-80 h-[300px] overflow-y-scroll p-4">
            {renderDefinitionContent(word.normal)}
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

      {definitionMode && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            натисніть на слово, щоб побачити його визначення або прослухати
          </p>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{randomText.title}</h1>

      <div className="prose prose-blue max-w-none mb-8 space-y-4">
        {tokenizedParagraphs?.map((paragraph, pIndex) => (
          <p key={pIndex}>
            {paragraph.map((sentense, sIndex) => (
              <span key={sIndex}>
                {sentense.map((word, wIndex) =>
                  renderWord(word, wIndex, pIndex)
                )}
              </span>
            ))}
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
