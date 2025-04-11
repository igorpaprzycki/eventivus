/*
  # Add time preferences table

  1. New Tables
    - `time_preferences`
      - `id` (uuid, primary key)
      - `event_id` (uuid, foreign key to events)
      - `user_id` (uuid, foreign key to users)
      - `event_date_id` (uuid, foreign key to event_dates)
      - `preference_type` (preference_type enum)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `time_preferences` table
    - Add policies for:
      - Users can read all time preferences
      - Users can manage their own time preferences
*/

CREATE TABLE IF NOT EXISTS time_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id),
  event_date_id uuid NOT NULL REFERENCES event_dates(id) ON DELETE CASCADE,
  preference_type preference_type NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_date_id, user_id)
);

ALTER TABLE time_preferences ENABLE ROW LEVEL SECURITY;

-- Users can read all time preferences
CREATE POLICY "Users can read all time preferences"
  ON time_preferences
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can manage their own time preferences
CREATE POLICY "Users can manage their own time preferences"
  ON time_preferences
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);