/*
# Add mating status + extra profile fields to pets table

1. Modified Tables
- `pets` — adds new columns:
  - `is_available_for_mating` (boolean, default false) — marks a pet as
    available for mating so it appears on the Pet Mating page.
  - `weight` (text, nullable) — optional pet weight for mating profiles.
  - `vaccination_status` (text, nullable) — optional vaccination info for
    mating profiles.
  These columns are additive and non-destructive. Existing rows default
  `is_available_for_mating` to false and the optional fields stay null.

2. Security
- No policy changes. The table already has anon+authenticated CRUD policies.
- The new columns inherit those existing policies.

3. Important Notes
- This is a non-destructive ADD COLUMN operation.
- Only pets where is_available_for_mating = true appear on the Mating page.
- The Create Pet form gains a toggle for the mating field.
- weight and vaccination_status are optional and only surface on the profile.
*/

ALTER TABLE pets
  ADD COLUMN IF NOT EXISTS is_available_for_mating boolean NOT NULL DEFAULT false;

ALTER TABLE pets
  ADD COLUMN IF NOT EXISTS weight text;

ALTER TABLE pets
  ADD COLUMN IF NOT EXISTS vaccination_status text;
