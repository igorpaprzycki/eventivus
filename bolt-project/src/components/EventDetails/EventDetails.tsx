import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import type { Database } from '../../lib/types';

type Event = Database['public']['Tables']['events']['Row'];
type EventDate = Database['public']['Tables']['event_dates']['Row'];
type TimePreference = Database['public']['Tables']['time_preferences']['Row'];

interface EventDetailsProps {
  eventId: string;
  onBack: () => void;
}

export function EventDetails({ eventId, onBack }: EventDetailsProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [eventDates, setEventDates] = useState<EventDate[]>([]);
  const [timePreferences, setTimePreferences] = useState<TimePreference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      // Fetch event details
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (eventError) throw eventError;
      setEvent(eventData);

      // Fetch event dates
      const { data: dates, error: datesError } = await supabase
        .from('event_dates')
        .select('*')
        .eq('event_id', eventId)
        .order('proposed_date', { ascending: true });

      if (datesError) throw datesError;
      setEventDates(dates || []);

      // Fetch user's time preferences
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: preferences, error: preferencesError } = await supabase
        .from('time_preferences')
        .select('*')
        .eq('event_id', eventId)
        .eq('user_id', user.id);

      if (preferencesError) throw preferencesError;
      setTimePreferences(preferences || []);
    } catch (error) {
      console.error('Error fetching event details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceChange = async (date: EventDate, preference: 'AVAILABLE' | 'MAYBE' | 'UNAVAILABLE') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const existingPreference = timePreferences.find(
        p => p.proposed_date === date.proposed_date && p.user_id === user.id
      );

      if (existingPreference) {
        if (existingPreference.preference === preference) {
          // Remove preference if clicking the same option
          const { error } = await supabase
            .from('time_preferences')
            .delete()
            .eq('id', existingPreference.id);

          if (error) throw error;
          setTimePreferences(timePreferences.filter(p => p.id !== existingPreference.id));
        } else {
          // Update existing preference
          const { data, error } = await supabase
            .from('time_preferences')
            .update({ preference })
            .eq('id', existingPreference.id)
            .select()
            .single();

          if (error) throw error;
          setTimePreferences(timePreferences.map(p => 
            p.id === existingPreference.id ? data : p
          ));
        }
      } else {
        // Create new preference
        const { data, error } = await supabase
          .from('time_preferences')
          .insert({
            event_id: eventId,
            user_id: user.id,
            proposed_date: date.proposed_date,
            preference
          })
          .select()
          .single();

        if (error) throw error;
        setTimePreferences([...timePreferences, data]);
      }
    } catch (error) {
      console.error('Error updating time preference:', error);
    }
  };

  if (loading || !event) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Powrót
        </button>
        <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {event.description && (
          <p className="text-gray-600 mb-6">{event.description}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>
                Utworzono: {format(new Date(event.created_at), 'dd.MM.yyyy')}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Wybierz preferowane terminy
            </h3>
            <div className="space-y-3">
              {eventDates.map((date) => {
                const preference = timePreferences.find(p => 
                  p.proposed_date === date.proposed_date
                );
                return (
                  <div
                    key={date.id}
                    className="p-4 bg-gray-50 rounded-lg space-y-2"
                  >
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>
                        {format(new Date(date.proposed_date), 'dd.MM.yyyy HH:mm')}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePreferenceChange(date, 'AVAILABLE')}
                        className={`px-3 py-1 rounded-md text-sm ${
                          preference?.preference === 'AVAILABLE'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Dostępny
                      </button>
                      <button
                        onClick={() => handlePreferenceChange(date, 'MAYBE')}
                        className={`px-3 py-1 rounded-md text-sm ${
                          preference?.preference === 'MAYBE'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Może
                      </button>
                      <button
                        onClick={() => handlePreferenceChange(date, 'UNAVAILABLE')}
                        className={`px-3 py-1 rounded-md text-sm ${
                          preference?.preference === 'UNAVAILABLE'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Niedostępny
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}