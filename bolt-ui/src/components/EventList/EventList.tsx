import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import type { Database } from '../../lib/types';

type Event = Database['public']['Tables']['events']['Row'];

interface EventListProps {
  onEventSelect: (eventId: string) => void;
}

export function EventList({ onEventSelect }: EventListProps) {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUserAndEvents();
  }, []);

  const fetchUserAndEvents = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }

      const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllEvents(events || []);
      setDisplayedEvents(events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;
      const updatedEvents = allEvents.filter(event => event.id !== eventId);
      setAllEvents(updatedEvents);
      setDisplayedEvents(updatedEvents);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const showAllEvents = () => {
    setDisplayedEvents(allEvents);
  };

  const showMyEvents = () => {
    setDisplayedEvents(allEvents.filter(event => event.created_by === currentUserId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (allEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Brak wydarzeń</h3>
        <p className="mt-1 text-sm text-gray-500">Rozpocznij od utworzenia nowego wydarzenia.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Wydarzenia</h2>
        <div className="flex gap-4">
          <button
            onClick={showAllEvents}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Wszystkie
          </button>
          <button
            onClick={showMyEvents}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Moje wydarzenia
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedEvents.map(event => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onEventSelect(event.id)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                {event.created_by === currentUserId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteEvent(event.id);
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
              
              {event.description && (
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
              )}

              <div className="space-y-2">
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>

                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    {format(new Date(event.created_at), 'dd.MM.yyyy HH:mm')}
                  </span>
                </div>

                <div className="flex items-center text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    {event.created_by === currentUserId ? 'Twoje wydarzenie' : 'Wydarzenie publiczne'}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${event.planning_mode ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}
                `}>
                  {event.planning_mode ? 'W planowaniu' : 'Zaplanowane'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}