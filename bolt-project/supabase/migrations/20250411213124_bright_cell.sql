/*
  # Event Planning System Schema

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text, optional)
      - `type` (event_type enum)
      - `status` (event_status enum)
      - `max_participants` (integer, optional)
      - `is_recurring` (boolean)
      - `recurring_pattern` (text, optional)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `registrations`
      - `id` (uuid, primary key)
      - `event_id` (uuid, references events)
      - `user_id` (uuid, references auth.users)
      - `status` (registration_status enum)
      - `registered_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `time_preferences`
      - `id` (uuid, primary key)
      - `event_id` (uuid, references events)
      - `user_id` (uuid, references auth.users)
      - `proposed_date` (timestamp)
      - `preference` (preference_type enum)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create enums
CREATE TYPE event_type AS ENUM ('REGISTRATION', 'PLANNING');
CREATE TYPE event_status AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED');
CREATE TYPE registration_status AS ENUM ('PENDING', 'APPROVED', 'WAITLIST', 'REJECTED');
CREATE TYPE preference_type AS ENUM ('AVAILABLE', 'MAYBE', 'UNAVAILABLE');

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type event_type NOT NULL,
  status event_status NOT NULL DEFAULT 'DRAFT',
  max_participants integer CHECK (max_participants IS NULL OR max_participants > 0),
  is_recurring boolean NOT NULL DEFAULT false,
  recurring_pattern text,
  created_by uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  status registration_status NOT NULL DEFAULT 'PENDING',
  registered_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Create time_preferences table
CREATE TABLE IF NOT EXISTS time_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  proposed_date timestamptz NOT NULL,
  preference preference_type NOT NULL DEFAULT 'MAYBE',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id, proposed_date)
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER registrations_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_preferences ENABLE ROW LEVEL SECURITY;

-- Policies for events
CREATE POLICY "Users can create events"
  ON events FOR INSERT
  TO public
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their own events"
  ON events FOR DELETE
  TO public
  USING (created_by = auth.uid());

CREATE POLICY "Users can update their own events"
  ON events FOR UPDATE
  TO public
  USING (created_by = auth.uid());

CREATE POLICY "Users can view active events"
  ON events FOR SELECT
  TO public
  USING ((status = 'ACTIVE' OR created_by = auth.uid()));

-- Policies for registrations
CREATE POLICY "Users can register for events"
  ON registrations FOR INSERT
  TO public
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their registrations"
  ON registrations FOR DELETE
  TO public
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their registrations"
  ON registrations FOR UPDATE
  TO public
  USING (user_id = auth.uid());

CREATE POLICY "Users can view their registrations"
  ON registrations FOR SELECT
  TO public
  USING (user_id = auth.uid());

-- Policies for time_preferences
CREATE POLICY "Users can create time preferences"
  ON time_preferences FOR INSERT
  TO public
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their time preferences"
  ON time_preferences FOR DELETE
  TO public
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their time preferences"
  ON time_preferences FOR UPDATE
  TO public
  USING (user_id = auth.uid());

CREATE POLICY "Users can view event time preferences"
  ON time_preferences FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = time_preferences.event_id
      AND (events.status = 'ACTIVE' OR events.created_by = auth.uid())
    )
  );