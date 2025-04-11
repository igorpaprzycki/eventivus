import React, { useState, useEffect } from 'react';
import { EventForm } from './components/EventCreation/EventForm';
import { EventList } from './components/EventList/EventList';
import { EventDetails } from './components/EventDetails/EventDetails';
import { RecommendationButton } from './components/AIRecommendation/RecommendationButton';
import { AuthForm } from './components/Auth/AuthForm';
import { UserMenu } from './components/Auth/UserMenu';
import { supabase } from './lib/supabase';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';

function App() {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [recommendedDates, setRecommendedDates] = useState<string[]>([]);
  const [session, setSession] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleRecommendation = (dates: string[]) => {
    setRecommendedDates(dates);
  };

  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleBack = () => {
    setSelectedEventId(null);
  };

  if (!session) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              System planowania wydarzeń
            </h1>
            <div className="flex items-center space-x-4">
              {!isCreating && !selectedEventId && (
                <button
                  onClick={() => setIsCreating(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Nowe wydarzenie
                </button>
              )}
              <UserMenu />
            </div>
          </div>

          {isCreating ? (
            <div className="mb-8">
              <EventForm />
              <div className="mt-4 text-right">
                <button
                  onClick={() => setIsCreating(false)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Powrót do listy
                </button>
              </div>
            </div>
          ) : selectedEventId ? (
            <div className="space-y-8">
              <EventDetails eventId={selectedEventId} onBack={handleBack} />
              
              <div className="flex flex-col items-start gap-4">
                <RecommendationButton
                  eventId={selectedEventId}
                  onRecommendation={handleRecommendation}
                />

                {recommendedDates.length > 0 && (
                  <div className="w-full bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Rekomendowany termin{recommendedDates.length > 1 ? 'y' : ''}
                    </h2>
                    <div className="space-y-2">
                      {recommendedDates.map((date, index) => (
                        <p key={index} className="text-lg">
                          {format(new Date(date), 'dd.MM.yyyy HH:mm')}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <EventList onEventSelect={handleEventSelect} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;