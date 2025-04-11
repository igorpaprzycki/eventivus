import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Minus, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/types';

type EventFormData = {
  title: string;
  description: string;
  location: string;
};

export function EventForm() {
  const [dates, setDates] = useState<string[]>(['']);
  const [dateError, setDateError] = useState<string>('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EventFormData>();

  const addDateField = () => {
    setDates([...dates, '']);
    setDateError('');
  };

  const removeDateField = (index: number) => {
    const newDates = dates.filter((_, i) => i !== index);
    setDates(newDates.length > 0 ? newDates : ['']);
    setDateError('');
  };

  const updateDate = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
    setDateError('');
  };

  const onSubmit = async (data: EventFormData) => {
    try {
      // Filter out empty dates
      const validDates = dates.filter(date => date.trim() !== '');
      
      if (validDates.length === 0) {
        setDateError('Please add at least one valid date');
        return;
      }

      setDateError('');

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .insert({
          title: data.title,
          description: data.description,
          location: data.location,
          planning_mode: true,
          created_by: user.id
        })
        .select()
        .single();

      if (eventError) throw eventError;

      const datePromises = validDates.map(date => 
        supabase
          .from('event_dates')
          .insert({
            event_id: eventData.id,
            proposed_date: date
          })
      );

      await Promise.all(datePromises);

      // Reset form
      reset();
      setDates(['']);
      setDateError('');
    } catch (error) {
      console.error('Error creating event:', error);
      if (error instanceof Error) {
        setDateError(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </label>
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
          <textarea
            {...register('description')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Location
          <input
            type="text"
            {...register('location', { required: 'Location is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </label>
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Proposed Dates
        </label>
        {dates.map((date, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => updateDate(index, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeDateField(index)}
                className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700"
              >
                <Minus className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
        {dateError && (
          <p className="text-sm text-red-600">{dateError}</p>
        )}
        <button
          type="button"
          onClick={addDateField}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Date
        </button>
      </div>

      <button
        type="submit"
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <Calendar className="h-5 w-5 mr-2" />
        Create Event
      </button>
    </form>
  );
}