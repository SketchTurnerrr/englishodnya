import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Volume2,
  Check,
  X,
  Trophy,
  SkipForward,
  Quote,
  Book,
} from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

// Import JSON files (adjust paths as needed)
import easyWords from '@/lib/easy_words.json';
import mediumWords from '@/lib/medium_words.json';
import hardWords from '@/lib/hard_words.json';
import { Input } from '@/components/ui/input';

// Type for words in the JSON files
type WordsEntry = { word: string; definition: string; example: string };

// Type for a spelling word
type SpellingWord = { word: string; difficulty: 'easy' | 'medium' | 'hard' };

// Create a type for the combined words map
type AllWordsMap = Record<string, { definition: string; example: string }>;

export function SpellingBee() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'easy' | 'medium' | 'hard'
  >('easy');
  const [currentWord, setCurrentWord] = useState<SpellingWord | null>(null);
  const [userInput, setUserInput] = useState('');
  console.log('userInput :', userInput);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [audioError, setAudioError] = useState<string | null>(null);
  const [wordsMap, setWordsMap] = useState<AllWordsMap>({});
  const [showWord, setShowWord] = useState(false);

  const recordAttempt = useMutation(api.progress.recordSpellingAttempt);
  const updateProgress = useMutation(api.progress.updateDailyProgress);
  const markAsLearned = useMutation(api.words.markWordAsLearned);

  useEffect(() => {
    // Function to create a word map from a list of WordsEntry
    const createWordsMap = (words: WordsEntry[]): AllWordsMap => {
      return words.reduce((map: AllWordsMap, entry) => {
        map[entry.word.toLowerCase()] = {
          definition: entry.definition,
          example: entry.example,
        };
        return map;
      }, {});
    };

    // Set the words map based on the selected difficulty
    switch (selectedDifficulty) {
      case 'easy':
        setWordsMap(createWordsMap(easyWords));
        break;
      case 'medium':
        setWordsMap(createWordsMap(mediumWords));
        break;
      case 'hard':
        setWordsMap(createWordsMap(hardWords));
        break;
      default:
        setWordsMap({}); // Default to empty map
        break;
    }
  }, [selectedDifficulty]); // Update when selectedDifficulty changes

  const getRandomWord = (difficulty: 'easy' | 'medium' | 'hard') => {
    const availableWords = Object.keys(wordsMap);

    if (availableWords.length === 0) {
      console.warn(`No words found for difficulty: ${difficulty}`);
      return null;
    }

    const randomWord =
      availableWords[Math.floor(Math.random() * availableWords.length)];

    return { word: randomWord, difficulty: difficulty }; // Include difficulty
  };

  const startNewWord = () => {
    const word = getRandomWord(selectedDifficulty);
    if (word) {
      setCurrentWord(word);
      setUserInput('');
      setShowResult(false);
      setAudioError(null);
      setShowWord(false);
    }
  };

  useEffect(() => {
    // Start a new word when the component mounts or when difficulty changes
    startNewWord();
  }, [wordsMap]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentWord) {
      console.log('currentWord :', currentWord);
      const correct =
        userInput.toLowerCase() === currentWord.word.toLowerCase();
      setIsCorrect(correct);
      setShowResult(true);
      setShowWord(true);

      // Record the attempt in Convex
      const attemptIsCorrect = await recordAttempt({
        word: currentWord.word,
        correct,
        difficulty: selectedDifficulty,
      });

      if (attemptIsCorrect) {
        setScore((prev) => ({
          correct: prev.correct + (correct ? 1 : 0),
          total: prev.total + 1,
        }));
      } else {
        setScore((prev) => ({
          correct: prev.correct,
          total: prev.total + 1,
        }));
      }

      // If they've completed at least 5 words, mark the spelling task as complete
      if (score.total >= 4) {
        await updateProgress({
          taskId: 'spelling',
          completed: true,
        });
      }
    }
  };

  const speakWord = () => {
    if (!currentWord) return;
    const difficulty = selectedDifficulty;
    const word = currentWord.word;
    const audioSrc = `/audio_${difficulty}/${word}_${difficulty}.ogg`;

    const audio = new Audio(audioSrc);

    audio
      .play()
      .then(() => {
        setAudioError(null);
      })
      .catch((err) => {
        console.error('Audio playback error:', err);
        setAudioError(
          'Audio playback failed. Ensure your browser supports the format.'
        );
      });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Spelling Bee</h2>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-medium">
            Score: {score.correct}/{score.total}
          </span>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((score.correct / 5) * 100, 100)}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Для проходження щоденної норми відгадайте 5 слів
        </p>
      </div>

      {/* Difficulty Selection */}
      <div className="flex gap-2 mb-6">
        {[
          { label: 'Легкий', value: 'easy' },
          { label: 'Середній', value: 'medium' },
          { label: 'Складний', value: 'hard' },
        ].map((difficulty) => (
          <Button
            key={difficulty.value}
            onClick={() => {
              setSelectedDifficulty(
                difficulty.value as 'easy' | 'medium' | 'hard'
              );
              setScore({ correct: 0, total: 0 });
            }}
            variant={
              selectedDifficulty === difficulty.value ? 'default' : 'outline'
            }
            className={`hover:bg-muted hover:text-black cursor-pointer ${
              selectedDifficulty === difficulty.value
                ? getDifficultyColor(difficulty.value)
                : ''
            }`}
          >
            {difficulty.label}
          </Button>
        ))}
      </div>

      {/* Game Area */}
      {!currentWord ? (
        <div className="text-center">
          <p className="mb-4 text-gray-600">Оберіть рівень складності</p>
          <Button onClick={startNewWord} className="w-full max-w-md mx-auto">
            Грати
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Word Information */}
          {showWord && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="capitalize text-lg font-medium">
                  {currentWord.word}
                </p>
              </div>

              <>
                <p className="flex gap-2 items-center text-gray-600 ">
                  <Book className=" size-8" />{' '}
                  {wordsMap[currentWord.word.toLowerCase()]?.definition ??
                    'Definition not available'}
                </p>
                {wordsMap[currentWord.word.toLowerCase()]?.example && (
                  <p className="flex gap-2 items-center text-gray-500 italic mt-1">
                    <Quote className=" size-10" />{' '}
                    {wordsMap[currentWord.word.toLowerCase()]!.example}
                  </p>
                )}
              </>
              {audioError && <p className="text-red-500">{audioError}</p>}
            </div>
          )}

          <div className="lg:flex lg:justify-between ">
            {/* Spelling Input */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-4 lg:mb-0">
              <>
                <Button
                  type="button"
                  onClick={speakWord}
                  variant="outline"
                  className="flex items-center gap-2 cursor-pointer mb-4"
                >
                  <Volume2 className="size-4" />
                  Слухати
                </Button>

                {!showResult && (
                  <Button
                    type="button"
                    onClick={startNewWord}
                    variant="secondary"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <SkipForward className="size-4" />
                    Пропустити
                  </Button>
                )}
              </>

              <Input
                value={userInput}
                onChange={(e) =>
                  setUserInput(e.target.value.trim().toLocaleLowerCase())
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ваша відповідь..."
                disabled={showResult}
                spellCheck={false}
                autoFocus
              />

              {!showResult && (
                <Button type="submit" className="w-full">
                  Ввести
                </Button>
              )}
            </form>

            {showResult && (
              <Button
                onClick={() => markAsLearned({ word: currentWord.word })}
                className=""
              >
                Позначити як вивчене
              </Button>
            )}
          </div>

          {/* Result */}
          {showResult && (
            <div
              className={`p-4 rounded-lg ${
                isCorrect ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <X className="w-5 h-5 text-red-500" />
                )}
                <p className="font-medium">
                  {isCorrect
                    ? 'Correct! Well done!'
                    : `Incorrect. The word was "${currentWord.word}"`}
                </p>
              </div>
              <Button onClick={startNewWord} className="mt-4 w-full">
                Наступне слово
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
