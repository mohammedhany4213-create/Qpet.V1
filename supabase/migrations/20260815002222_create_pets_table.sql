/*
# Create pets table and pet-photos storage bucket (single-tenant, no auth)

1. New Tables
- `pets`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null)
  - `species` (text, not null)
  - `breed` (text, nullable)
  - `description` (text, nullable)
  - `location` (text, nullable)
  - `image_url` (text, not null — URL of the uploaded image in Supabase Storage)
  - `created_at` (timestamptz, defaults to now())

2. New Storage
- Public bucket `pet-photos` for pet image uploads.
- Public read policy so anyone scanning a QR code can see the image.
- Authenticated+anon write policy so the frontend can upload without sign-in.

3. Security
- Enable RLS on `pets`.
- Allow anon + authenticated CRUD because the data is intentionally public/shared
  (no-auth MVP: anyone who creates a profile or scans a QR code can read/write).
- Storage: public bucket with a permissive insert policy for uploads.

4. Important Notes
- This is a single-tenant MVP with no user accounts, so `USING (true)` is
  acceptable and documented — the data is intentionally public.
- The image file itself is NOT stored in the database; only its Storage URL is.
*/

CREATE TABLE IF NOT EXISTS pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  species text NOT NULL,
  breed text,
  description text,
  location text,
  image_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_pets" ON pets;
CREATE POLICY "anon_select_pets" ON pets FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_pets" ON pets;
CREATE POLICY "anon_insert_pets" ON pets FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_pets" ON pets;
CREATE POLICY "anon_update_pets" ON pets FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_pets" ON pets;
CREATE POLICY "anon_delete_pets" ON pets FOR DELETE
TO anon, authenticated USING (true);

-- Storage bucket for pet photos (public so scanned QR codes can load images)
INSERT INTO storage.buckets (id, name, public)
VALUES ('pet-photos', 'pet-photos', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "anon_upload_pet_photos" ON storage.objects;
CREATE POLICY "anon_upload_pet_photos" ON storage.objects FOR INSERT
TO anon, authenticated WITH CHECK (bucket_id = 'pet-photos');

DROP POLICY IF EXISTS "anon_read_pet_photos" ON storage.objects;
CREATE POLICY "anon_read_pet_photos" ON storage.objects FOR SELECT
TO anon, authenticated USING (bucket_id = 'pet-photos');

DROP POLICY IF EXISTS "anon_delete_pet_photos" ON storage.objects;
CREATE POLICY "anon_delete_pet_photos" ON storage.objects FOR DELETE
TO anon, authenticated USING (bucket_id = 'pet-photos');
