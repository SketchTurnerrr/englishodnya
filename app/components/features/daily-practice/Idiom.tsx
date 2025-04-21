import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import {
  Loader2,
  BookOpen,
  Quote,
  RefreshCw,
  Check,
  ArrowLeft,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';

export function Idiom() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showingExtra, setShowingExtra] = useState(false);
  const [learnedExtraIds, setLearnedExtraIds] = useState<string[]>([]); // Track learned extra idioms
  const learnedIdiomsForToday = useQuery(
    api.idioms.getUserIdiomsLearnedForToday
  );
  console.log('learnedIdiomsForToday :', learnedIdiomsForToday);
  const dailyIdiom = useQuery(api.idioms.getDailyIdiom);
  const extraIdiom = useQuery(api.idioms.getRandomIdiom, {
    excludeId: dailyIdiom?._id,
    excludeIds: learnedExtraIds, // Add this to the query args
  });
  const recordExtraIdiomLearned = useMutation(
    api.idioms.recordExtraIdiomLearned
  );

  const markAsLearned = useMutation(api.idioms.markIdiomAsLearned);
  const progress = useQuery(api.progress.getUserProgress);
  const updateProgress = useMutation(api.progress.updateDailyProgress);

  if (!dailyIdiom) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const handleComplete = async () => {
    if (progress?.todayProgress?.idiomCompleted) {
      return;
    }
    try {
      await updateProgress({ taskId: 'idiom', completed: true });
      await markAsLearned({ idiomId: dailyIdiom._id });
    } catch (error) {
      console.error('Failed to mark idiom as learned:', error);
    }
  };

  const handleNextIdiom = () => {
    if (extraIdiom?._id) {
      setLearnedExtraIds((prev) => [...prev, extraIdiom._id]);
      recordExtraIdiomLearned({ idiomId: extraIdiom._id });
    }
    setIsRevealed(false);
  };

  const currentIdiom = showingExtra ? extraIdiom : dailyIdiom;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Mode Switch */}
        <div className="flex justify-between items-center">
          {showingExtra && (
            <Button
              variant="ghost"
              onClick={() => {
                setShowingExtra(false);
                setIsRevealed(false);
              }}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Повернутися до ідіоми дня
            </Button>
          )}
        </div>

        {/* Stats (for extra mode) */}
        {showingExtra && (
          <div className="flex justify-end">
            <Badge variant="secondary" className="text-sm">
              Вивчено сьогодні: {learnedIdiomsForToday ?? 0}
            </Badge>
          </div>
        )}

        {/* Main Idiom Card */}
        <Card className="border-1 shadow-lg pb-0">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-primary">
                {currentIdiom?.content}
              </CardTitle>
              <Badge
                variant="outline"
                className={`ml-2 ${
                  showingExtra ? 'bg-purple-50' : 'bg-blue-50'
                }`}
              >
                {showingExtra ? 'Додаткові' : 'Ідіома дня'}
              </Badge>
            </div>
            <CardDescription className="flex items-center pt-2">
              <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
              Визначення
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onClick={() => setIsRevealed(true)}
              className={`text-lg transition-all duration-300 ${
                isRevealed
                  ? 'cursor-default'
                  : 'cursor-pointer filter blur-sm select-none bg-muted/30 hover:bg-muted/50'
              }`}
            >
              {isRevealed ? (
                <p>{currentIdiom?.definition}</p>
              ) : (
                <p>Натисніть, щоб побачити визначення</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start border-t bg-muted/50 py-5">
            <div className="flex items-center mb-2">
              <Quote className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm font-medium">Приклад</span>
            </div>
            <p className="italic">{currentIdiom?.example}</p>
          </CardFooter>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          {/* Complete Daily Button */}
          {!showingExtra && (
            <Button
              onClick={handleComplete}
              variant="default"
              disabled={progress?.todayProgress?.idiomCompleted}
              className="flex gap-2"
            >
              {progress?.todayProgress?.idiomCompleted ? (
                <>
                  <Check className="w-4 h-4" />
                  Виконано
                </>
              ) : (
                'Позначити як виконане'
              )}
            </Button>
          )}

          {/* Next Idiom Button (Extra Mode) */}
          {showingExtra && isRevealed && (
            <Button
              onClick={handleNextIdiom}
              variant="default"
              className="flex gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Наступна ідіома
            </Button>
          )}

          {progress?.todayProgress?.idiomCompleted && !showingExtra && (
            <Button
              variant="outline"
              onClick={() => {
                setShowingExtra(true);
                setIsRevealed(false);
              }}
              className="ml-auto"
            >
              Вчити більше
            </Button>
          )}
        </div>

        {/* Progress Messages */}
        {!showingExtra && !progress?.todayProgress?.idiomCompleted && (
          <div className="text-sm text-muted-foreground text-center">
            Вивчіть ідіом дня, щоб отримати доступ до додаткових ідіомів
          </div>
        )}
      </div>
    </div>
  );
}
