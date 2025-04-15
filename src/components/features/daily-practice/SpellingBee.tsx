import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Volume2, Check, X, Trophy } from 'lucide-react'
import { type Word, spellingWords } from '@/data/spelling-words'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export function SpellingBee() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'easy' | 'medium' | 'hard'
  >('easy')
  const [currentWord, setCurrentWord] = useState<Word | null>(null)
  const [userInput, setUserInput] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const recordAttempt = useMutation(api.progress.recordSpellingAttempt)
  const updateProgress = useMutation(api.progress.updateDailyProgress)

  const getRandomWord = (difficulty: 'easy' | 'medium' | 'hard') => {
    const words = spellingWords.filter((word) => word.difficulty === difficulty)
    return words[Math.floor(Math.random() * words.length)]
  }

  const startNewWord = () => {
    const word = getRandomWord(selectedDifficulty)
    setCurrentWord(word)
    setUserInput('')
    setShowResult(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentWord) {
      const correct = userInput.toLowerCase() === currentWord.word.toLowerCase()
      setIsCorrect(correct)
      setShowResult(true)
      setScore((prev) => ({
        correct: prev.correct + (correct ? 1 : 0),
        total: prev.total + 1,
      }))

      // Record the attempt in Convex
      await recordAttempt({
        word: currentWord.word,
        correct,
        difficulty: selectedDifficulty,
      })

      // If they've completed at least 5 words, mark the spelling task as complete
      if (score.total >= 4) {
        await updateProgress({
          taskId: 'spelling',
          completed: true,
        })
      }
    }
  }

  const speakWord = () => {
    if (currentWord) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word)
      utterance.rate = 0.8 // Slightly slower for clarity
      window.speechSynthesis.speak(utterance)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return ''
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Spelling Bee Challenge</h2>
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
            style={{ width: `${Math.min((score.total / 5) * 100, 100)}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Complete 5 words to finish today's practice
        </p>
      </div>

      {/* Difficulty Selection */}
      <div className="flex gap-2 mb-6">
        {['easy', 'medium', 'hard'].map((difficulty) => (
          <Button
            key={difficulty}
            onClick={() => {
              setSelectedDifficulty(difficulty as 'easy' | 'medium' | 'hard')
              setCurrentWord(null)
              setScore({ correct: 0, total: 0 })
            }}
            variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
            className={`capitalize ${
              selectedDifficulty === difficulty
                ? getDifficultyColor(difficulty)
                : ''
            }`}
          >
            {difficulty}
          </Button>
        ))}
      </div>

      {/* Game Area */}
      {!currentWord ? (
        <div className="text-center">
          <p className="mb-4 text-gray-600">
            Select a difficulty level and start practicing your spelling!
          </p>
          <Button onClick={startNewWord} className="w-full max-w-md mx-auto">
            Start New Word
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Word Information */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-medium">Definition:</p>
              <span
                className={`px-2 py-1 rounded-full text-sm ${getDifficultyColor(
                  selectedDifficulty,
                )}`}
              >
                {selectedDifficulty}
              </span>
            </div>
            <p className="text-gray-600">{currentWord.definition}</p>
          </div>

          {/* Spelling Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={speakWord}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                Hear Word
              </Button>
            </div>

            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Type the word here..."
              disabled={showResult}
              autoFocus
            />

            {!showResult && (
              <Button type="submit" className="w-full">
                Check Spelling
              </Button>
            )}
          </form>

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
                Next Word
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
