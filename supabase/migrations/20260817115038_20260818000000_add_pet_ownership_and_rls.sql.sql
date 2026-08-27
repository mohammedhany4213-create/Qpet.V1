-- Add owner_id to pets and enforce ownership via RLS.
-- Existing pets keep owner_id = NULL and remain publicly readable.
-- Inserts go through a SECURITY DEFINER function so owner_id is derived
-- from the authenticated session, never from the client.

ALTER TABLE pets
  ADD COLUMN IF NOT EXISTS owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Make existing NULL-owner pets read-only from anon/authenticated (public profiles).
-- Owned pets are selectable by owner OR by anyone (public QR/adoption/mating pages).
-- Writes are restricted to the owner.

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

-- Drop the old permissive policies.
DROP POLICY IF EXISTS anon_select_pets ON pets;
DROP POLICY IF EXISTS anon_insert_pets ON pets;
DROP POLICY IF EXISTS anon_update_pets ON pets;
DROP POLICY IF EXISTS anon_delete_pets ON pets;

-- Public read access (pet profiles are meant to be public via QR code / listings).
-- anon can read (so logged-out users can view scanned pet profiles and listings).
CREATE POLICY "pets_select_public" ON pets FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only the owner may update their own pets.
CREATE POLICY "pets_update_own" ON pets FOR UPDATE
  TO authenticated
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

-- Only the owner may delete their own pets.
CREATE POLICY "pets_delete_own" ON pets FOR DELETE
  TO authenticated
  USING (owner_id = auth.uid());

-- Revoke direct INSERT so the only path to create a pet is the SECURITY DEFINER
-- function, which sets owner_id from the session.
REVOKE INSERT ON pets FROM anon, authenticated;

-- Narrow UPDATE to user-editable columns only (owner_id must never be client-writable).
REVOKE UPDATE ON pets FROM authenticated;
GRANT UPDATE (
  name, species, breed, gender, age, color, description, personality,
  location, owner_name, owner_phone, owner_whatsapp, image_url,
  is_available_for_adoption, is_available_for_mating, weight, vaccination_status
) ON pets TO authenticated;

-- Function: create a pet owned by the calling user. owner_id is forced from auth.uid().
CREATE OR REPLACE FUNCTION create_pet(p_row pets)
RETURNS pets
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_id uuid := gen_random_uuid();
  v_new pets;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  INSERT INTO pets (
    id, owner_id, name, species, breed, gender, age, color,
    description, personality, location, owner_name, owner_phone,
    owner_whatsapp, image_url, is_available_for_adoption,
    is_available_for_mating, weight, vaccination_status
  ) VALUES (
    v_id, auth.uid(), p_row.name, p_row.species, p_row.breed, p_row.gender,
    p_row.age, p_row.color, p_row.description, p_row.personality,
    p_row.location, p_row.owner_name, p_row.owner_phone, p_row.owner_whatsapp,
    '', p_row.is_available_for_adoption, p_row.is_available_for_mating,
    p_row.weight, p_row.vaccination_status
  )
  RETURNING * INTO v_new;

  RETURN v_new;
END;
$$;

REVOKE EXECUTE ON FUNCTION create_pet(pets) FROM anon;
GRANT EXECUTE ON FUNCTION create_pet(pets) TO authenticated;
