-- Harden storage policies for the pet-photos bucket.
--
-- Before this migration, anon could INSERT and DELETE any object in pet-photos.
-- Now only authenticated users can upload, and only the object owner can delete.
-- Public read stays open so scanned QR codes can load images without login.

DROP POLICY IF EXISTS "anon_upload_pet_photos" ON storage.objects;
DROP POLICY IF EXISTS "anon_delete_pet_photos" ON storage.objects;

-- Only authenticated users can upload pet photos.
CREATE POLICY "auth_upload_pet_photos" ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'pet-photos');

-- Only the object owner can delete their pet photo.
CREATE POLICY "owner_delete_pet_photos" ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'pet-photos' AND owner = auth.uid());

-- Public read stays (QR codes must work without login).
-- anon_read_pet_photos already exists and is fine.

-- Revoke unnecessary table-level grants from anon on pets.
-- RLS already blocks anon writes (no policy targets anon for UPDATE/DELETE),
-- but defense-in-depth: remove the table-level grants too.
REVOKE UPDATE, DELETE ON pets FROM anon;
