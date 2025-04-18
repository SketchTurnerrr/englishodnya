import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { BookOpen, Award, Mic } from 'lucide-react';
import { PracticeReading } from './PracticeReading';
import { SpellingBee } from './SpellingBee';
import { Idiom } from './Idiom';

type ActivityType = 'reading' | 'spelling' | 'idiom' | null;

export function PracticeMore() {
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>(null);

  const activities = [
    {
      id: 'reading',
      title: 'Practice Reading',
      description: 'Read more texts to improve your comprehension',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'spelling',
      title: 'Spelling Challenge',
      description: 'Test your spelling skills with more words',
      icon: <Award className="w-6 h-6" />,
      color: 'bg-green-50 text-green-700 border-green-200',
    },
    {
      id: 'idiom',
      title: 'Learn More Idioms',
      description: 'Master more English idioms and their usage',
      icon: <Mic className="w-6 h-6" />,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  const renderActivity = () => {
    switch (selectedActivity) {
      case 'reading':
        return (
          <>
            <Button
              onClick={() => setSelectedActivity(null)}
              variant="outline"
              className="mb-4"
            >
              ← Back to Activities
            </Button>
            <PracticeReading />
          </>
        );
      case 'spelling':
        return (
          <>
            <Button
              onClick={() => setSelectedActivity(null)}
              variant="outline"
              className="mb-4"
            >
              ← Back to Activities
            </Button>
            <SpellingBee />
          </>
        );
      case 'idiom':
        return (
          <>
            <Button
              onClick={() => setSelectedActivity(null)}
              variant="outline"
              className="mb-4"
            >
              ← Back to Activities
            </Button>
            <Idiom />
          </>
        );
      default:
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Practice More</h2>
              <p className="text-gray-600">
                Want to learn more? Choose an activity to continue practicing!
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {activities.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() =>
                    setSelectedActivity(activity.id as ActivityType)
                  }
                  className={`p-6 rounded-lg border text-left transition-all hover:scale-105 ${activity.color}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {activity.icon}
                    <h3 className="text-lg font-semibold">{activity.title}</h3>
                  </div>
                  <p className="text-sm opacity-90">{activity.description}</p>
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return <div className="container mx-auto px-4 py-8">{renderActivity()}</div>;
}
