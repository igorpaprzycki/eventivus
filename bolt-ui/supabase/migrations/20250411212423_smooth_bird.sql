/*
  # Initial Schema Setup for Event Planning System

  1. New Tables
    - `events`: Stores event details
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `location` (text)
      - `created_by` (uuid, references auth.users)
      - `planning_mode` (boolean)
      - `created_at` (timestamp)
    
    - `event_dates`: Stores proposed dates for events
      - `id` (uuid, primary key)
      - `event_id` (uuid, references events)
      - `proposed_date` (timestamp)
      - `created_at` (timestamp)
    
    - `votes`: Stores user votes for proposed dates
      - `id` (uuid, primary key)
      - `event_date_id` (uuid, references event_dates)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  location text NOT NULL,
  created_by uuid REFERENCES auth.users NOT NULL,
  planning_mode boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create event_dates table
CREATE TABLE IF NOT EXISTS event_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events ON DELETE CASCADE NOT NULL,
  proposed_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create votes table
CREATE TABLE IF NOT EXISTS votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_date_id uuid REFERENCES event_dates ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_date_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policies for events
CREATE POLICY "Users can read all events"
  ON events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own events"
  ON events FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create policies for event_dates
CREATE POLICY "Users can read all event dates"
  ON event_dates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Event creators can manage dates"
  ON event_dates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_dates.event_id
      AND events.created_by = auth.uid()
    )
  );

-- Create policies for votes
CREATE POLICY "Users can read all votes"
  ON votes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own votes"
  ON votes FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);