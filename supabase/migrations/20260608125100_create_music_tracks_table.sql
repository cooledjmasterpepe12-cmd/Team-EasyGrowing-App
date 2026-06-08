/*
# Create music_tracks table for dynamic playlist management

1. New Tables
- `music_tracks`
  - id (uuid, primary key)
  - title (text, not null)
  - artist (text)
  - duration_seconds (integer)
  - file_url (text, not null)
  - admin_added_by (uuid, references admin_users)
  - created_at (timestamptz)

2. Security
- Enable RLS
- Public read for all (anyone can see playlist)
- Only admin users can insert/update/delete
*/

CREATE TABLE IF NOT EXISTS music_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text,
  duration_seconds integer,
  file_url text NOT NULL,
  admin_added_by uuid REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE music_tracks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_tracks" ON music_tracks;
CREATE POLICY "public_read_tracks" ON music_tracks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_manage_tracks" ON music_tracks;
CREATE POLICY "admin_manage_tracks" ON music_tracks FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users WHERE id = auth.uid() AND email IN ('admin@easygrowing.de')
    )
  );

INSERT INTO music_tracks (title, artist, duration_seconds, file_url) 
VALUES 
  ('Akapella', 'Team EasyGrowing', 180, '/music/akapella.mpeg'),
  ('Hit From The Bong (Dobby & Pepe Remix)', 'Team EasyGrowing', 210, '/music/hit from the bong dobby und pepe remix.mpeg'),
  ('Keimei Rap', 'Team EasyGrowing', 160, '/music/keimei rap.mpeg')
ON CONFLICT DO NOTHING;
