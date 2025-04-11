/*
  # Database Schema Update

  1. Enums
    - event_type: REGISTRATION, PLANNING
    - event_status: DRAFT, ACTIVE, COMPLETED, CANCELLED
    - registration_status: PENDING, APPROVED, WAITLIST, REJECTED
    - preference_type: AVAILABLE, MAYBE, UNAVAILABLE

  2. Tables
    - events
    - registrations
    - time_preferences

  3. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
*/

-- Create enums if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'event_type') THEN
        CREATE TYPE event_type AS ENUM ('REGISTRATION', 'PLANNING');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'event_status') THEN
        CREATE TYPE event_status AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'registration_status') THEN
        CREATE TYPE registration_status AS ENUM ('PENDING', 'APPROVED', 'WAITLIST', 'REJECTED');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'preference_type') THEN
        CREATE TYPE preference_type AS ENUM ('AVAILABLE', 'MAYBE', 'UNAVAILABLE');
    END IF;
END$$;

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
DROP TRIGGER IF EXISTS registrations_updated_at ON registrations;
CREATE TRIGGER registrations_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_preferences ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can create events" ON events;
DROP POLICY IF EXISTS "Users can delete their own events" ON events;
DROP POLICY IF EXISTS "Users can update their own events" ON events;
DROP POLICY IF EXISTS "Users can view events" ON events;
DROP POLICY IF EXISTS "Users can register for events" ON registrations;
DROP POLICY IF EXISTS "Users can delete their registrations" ON registrations;
DROP POLICY IF EXISTS "Users can update their registrations" ON registrations;
DROP POLICY IF EXISTS "Users can view their registrations" ON registrations;
DROP POLICY IF EXISTS "Users can create time preferences" ON time_preferences;
DROP POLICY IF EXISTS "Users can delete their time preferences" ON time_preferences;
DROP POLICY IF EXISTS "Users can update their time preferences" ON time_preferences;
DROP POLICY IF EXISTS "Users can view event time preferences" ON time_preferences;

-- Recreate policies for events
CREATE POLICY "Users can create events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own events"
  ON events FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can update their own events"
  ON events FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can view events"
  ON events FOR SELECT
  TO authenticated
  USING (true);

-- Recreate policies for registrations
CREATE POLICY "Users can register for events"
  ON registrations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their registrations"
  ON registrations FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their registrations"
  ON registrations FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view their registrations"
  ON registrations FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Recreate policies for time_preferences
CREATE POLICY "Users can create time preferences"
  ON time_preferences FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their time preferences"
  ON time_preferences FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their time preferences"
  ON time_preferences FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view event time preferences"
  ON time_preferences FOR SELECT
  TO authenticated
  USING (true);