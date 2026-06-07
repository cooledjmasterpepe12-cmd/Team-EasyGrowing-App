/*
# Create plants, diary_logs, and plant_photos tables

1. New Tables
- `plants` — user's grow plants with strain, phase, start date, notes
  - id (uuid, primary key)
  - user_id (uuid, not null, defaults to auth.uid(), references auth.users)
  - strain (text, not null)
  - phase (text, default 'seedling')
  - start_date (date)
  - notes (text)
  - created_at (timestamptz)
- `diary_logs` — individual log entries per plant
  - id (uuid, primary key)
  - plant_id (uuid, not null, references plants on delete cascade)
  - user_id (uuid, not null, defaults to auth.uid())
  - log_type (text, not null)
  - amount (text)
  - notes (text)
  - created_at (timestamptz)
- `plant_photos` — photo entries with daily/weekly cadence
  - id (uuid, primary key)
  - plant_id (uuid, not null, references plants on delete cascade)
  - user_id (uuid, not null, defaults to auth.uid())
  - photo_url (text, not null)
  - caption (text)
  - cadence (text, default 'daily')
  - day_number (integer)
  - created_at (timestamptz)

2. Security
- Enable RLS on all 3 tables.
- Owner-scoped CRUD: each authenticated user can only access rows they own.
- Plant_photos scoped through plant ownership via user_id.

3. Indexes
- plants: index on user_id
- diary_logs: index on plant_id and user_id
- plant_photos: index on plant_id and user_id
*/

CREATE TABLE IF NOT EXISTS plants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  strain text NOT NULL,
  phase text NOT NULL DEFAULT 'seedling',
  start_date date,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE plants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_plants" ON plants;
CREATE POLICY "select_own_plants" ON plants FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_plants" ON plants;
CREATE POLICY "insert_own_plants" ON plants FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_plants" ON plants;
CREATE POLICY "update_own_plants" ON plants FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_plants" ON plants;
CREATE POLICY "delete_own_plants" ON plants FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_plants_user_id ON plants(user_id);

CREATE TABLE IF NOT EXISTS diary_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id uuid NOT NULL REFERENCES plants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  log_type text NOT NULL,
  amount text,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE diary_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_diary_logs" ON diary_logs;
CREATE POLICY "select_own_diary_logs" ON diary_logs FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_diary_logs" ON diary_logs;
CREATE POLICY "insert_own_diary_logs" ON diary_logs FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_diary_logs" ON diary_logs;
CREATE POLICY "update_own_diary_logs" ON diary_logs FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_diary_logs" ON diary_logs;
CREATE POLICY "delete_own_diary_logs" ON diary_logs FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_diary_logs_plant_id ON diary_logs(plant_id);
CREATE INDEX IF NOT EXISTS idx_diary_logs_user_id ON diary_logs(user_id);

CREATE TABLE IF NOT EXISTS plant_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id uuid NOT NULL REFERENCES plants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  photo_url text NOT NULL,
  caption text,
  cadence text NOT NULL DEFAULT 'daily',
  day_number integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE plant_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_plant_photos" ON plant_photos;
CREATE POLICY "select_own_plant_photos" ON plant_photos FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_plant_photos" ON plant_photos;
CREATE POLICY "insert_own_plant_photos" ON plant_photos FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_plant_photos" ON plant_photos;
CREATE POLICY "update_own_plant_photos" ON plant_photos FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_plant_photos" ON plant_photos;
CREATE POLICY "delete_own_plant_photos" ON plant_photos FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_plant_photos_plant_id ON plant_photos(plant_id);
CREATE INDEX IF NOT EXISTS idx_plant_photos_user_id ON plant_photos(user_id);
