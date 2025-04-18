import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { Loader2, BookOpen, Quote, CircleCheck } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { api } from '@/convex/_generated/api';

export function Idiom() {
  const dailyIdiom = useQuery(api.idioms.getDailyIdiom);
  const markAsLearned = useMutation(api.idioms.markIdiomAsLearned);
  const progress = useQuery(api.progress.getUserProgress);
  const updateProgress = useMutation(api.progress.updateDailyProgress);
  const [isRevealed, setIsRevealed] = useState(false);

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
      console.log('marked as learned');
    } catch (error) {
      console.error('Failed to mark idiom as learned:', error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="border-1 shadow-lg pb-0">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-primary">
                {dailyIdiom.content}
              </CardTitle>
              <Badge variant="outline" className="ml-2">
                badge
              </Badge>
            </div>
            <CardDescription className="flex items-center pt-2">
              <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
              Визначення
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            {/* Add state to track if definition is revealed */}
            <div
              onClick={() => setIsRevealed(true)}
              className={`text-lg transition-all duration-300 ${
                isRevealed
                  ? 'cursor-default'
                  : 'cursor-pointer filter blur-sm select-none bg-muted/30 hover:bg-muted/50'
              }`}
            >
              {isRevealed ? (
                <p>{dailyIdiom.definition}</p>
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
            <p className="italic">{dailyIdiom.example}</p>
          </CardFooter>
        </Card>
        <Button onClick={handleComplete} variant="default" className="mt-4">
          {progress?.todayProgress?.idiomCompleted ? (
            <>
              Виконано <CircleCheck className="size-6" />
            </>
          ) : (
            'Позначити як виконане'
          )}
        </Button>
      </div>
    </div>
  );
}
