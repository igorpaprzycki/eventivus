import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/types';
import { format } from 'date-fns';

type EventDate = Database['public']['Tables']['event_dates']['Row'];
type Vote = Database['public']['Tables']['votes']['Row'];

interface VoteListProps {
  eventId: string;
}

export function VoteList({ eventId }: VoteListProps) {
  const [dates, setDates] = useState<EventDate[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDates = async () => {
      const { data: eventDates } = await supabase
        .from('event_dates')
        .select('*')
        .eq('event_id', eventId);

      if (eventDates) {
        setDates(eventDates);
        
        // Only fetch votes if we have dates
        if (eventDates.length > 0) {
          const { data: voteData } = await supabase
            .from('votes')
            .select('*')
            .in('event_date_id', eventDates.map(d => d.id));

          if (voteData) setVotes(voteData);
        }
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };

    fetchDates();
  }, [eventId]);

  const handleVote = async (dateId: string) => {
    if (!userId) return;

    const existingVote = votes.find(
      v => v.event_date_id === dateId && v.user_id === userId
    );

    if (existingVote) {
      await supabase
        .from('votes')
        .delete()
        .eq('id', existingVote.id);

      setVotes(votes.filter(v => v.id !== existingVote.id));
    } else {
      const { data: newVote } = await supabase
        .from('votes')
        .insert({
          event_date_id: dateId,
          user_id: userId
        })
        .select()
        .single();

      if (newVote) setVotes([...votes, newVote]);
    }
  };

  return (
    <div className="space-y-4">
      {dates.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No dates have been proposed yet.</p>
      ) : (
        dates.map(date => {
          const voteCount = votes.filter(v => v.event_date_id === date.id).length;
          const hasVoted = votes.some(
            v => v.event_date_id === date.id && v.user_id === userId
          );

          return (
            <div
              key={date.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
            >
              <div>
                <p className="font-medium">
                  {format(new Date(date.proposed_date), 'PPP')}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(date.proposed_date), 'p')}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {voteCount} vote{voteCount !== 1 ? 's' : ''}
                </span>
                <button
                  onClick={() => handleVote(date.id)}
                  className={`px-4 py-2 rounded-md ${
                    hasVoted
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {hasVoted ? 'Voted' : 'Vote'}
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}