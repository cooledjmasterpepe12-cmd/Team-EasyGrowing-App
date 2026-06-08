/*
# Create admin users table

1. New Tables
- `admin_users`
  - id (uuid, primary key)
  - email (text, unique, not null)
  - created_at (timestamptz)

2. Security
- Enable RLS (anon-only can view list, not write)
- Public read policy for listing admins (to verify during login)
- Anyone can insert initially to bootstrap, then disable

3. Initial Data
- Insert default admin user (admin@easygrowing.de with hardcoded password check in frontend)
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_admins" ON admin_users;
CREATE POLICY "public_read_admins" ON admin_users FOR SELECT
  TO anon, authenticated USING (true);

INSERT INTO admin_users (email) VALUES ('admin@easygrowing.de') ON CONFLICT DO NOTHING;
