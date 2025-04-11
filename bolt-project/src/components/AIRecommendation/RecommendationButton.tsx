import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Calendar } from 'lucide-react';
import type { Database } from '../../lib/types';

interface RecommendationButtonProps {
  eventId: string;
  onRecommendation: (dates: string[]) => void;
}

export function RecommendationButton({
  eventId,
  onRecommendation
}: RecommendationButtonProps) {
  const [loading, setLoading] = useState(false);

  const analyzeVotes = async () => {
    setLoading(true);
    try {
      // Get all dates for the event
      const { data: dates } = await supabase
        .from('event_dates')
        .select('id, proposed_date')
        .eq('event_id', eventId);

      if (!dates) return;

      // Get vote counts for each date
      const voteCounts = await Promise.all(
        dates.map(async date => {
          const { count } = await supabase
            .from('votes')
            .select('*', { count: 'exact' })
            .eq('event_date_id', date.id);

          return {
            dateId: date.id,
            date: date.proposed_date,
            votes: count || 0
          };
        })
      );

      // Find dates with maximum votes
      const maxVotes = Math.max(...voteCounts.map(vc => vc.votes));
      const bestDates = voteCounts
        .filter(vc => vc.votes === maxVotes)
        .map(vc => vc.date);

      onRecommendation(bestDates);
    } catch (error) {
      console.error('Error analyzing votes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={analyzeVotes}
      disabled={loading}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
    >
      <Calendar className="h-5 w-5 mr-2" />
      {loading ? 'Analyzing...' : 'Wskaż wspólny termin'}
    </button>
  );
}