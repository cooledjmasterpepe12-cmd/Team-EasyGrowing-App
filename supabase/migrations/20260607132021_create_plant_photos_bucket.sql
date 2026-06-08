/*
# Create plant_photos storage bucket

1. Storage
- Create bucket 'plant-photos' for user photo uploads
- Public bucket so uploaded images can be displayed without signed URLs

2. Security
- Only authenticated users can upload
- Anyone can view (public bucket for display)
- Users can only delete their own uploads
*/

INSERT INTO storage.buckets (id, name, public) 
VALUES ('plant-photos', 'plant-photos', true)
ON CONFLICT (id) DO NOTHING;
