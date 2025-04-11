import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Calendar, Clock, MapPin, Trash2, Users } from 'lucide-react';
import { format } from 'date-fns';
import type { Database } from '../../lib/types';

type Event = Database['public']['Tables']['events']['Row'];

interface EventListProps {
  onEventSelect: (eventId: string) => void;
}

export function EventList({ onEventSelect }: EventListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(events || []);
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
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (events.length === 0) {
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Twoje wydarzenia</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onEventSelect(event.id)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEvent(event.id);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
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
                    {event.max_participants 
                      ? `Limit: ${event.max_participants} uczestników`
                      : 'Bez limitu uczestników'}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${event.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : ''}
                  ${event.status === 'DRAFT' ? 'bg-gray-100 text-gray-800' : ''}
                  ${event.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' : ''}
                  ${event.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : ''}
                `}>
                  {event.status}
                </span>
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {event.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}