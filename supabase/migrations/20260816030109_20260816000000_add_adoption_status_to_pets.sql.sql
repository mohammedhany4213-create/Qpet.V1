/*
# Add adoption status column to pets table

1. Modified Tables
- `pets` — adds a new column:
  - `is_available_for_adoption` (boolean, default false) — marks a pet as
    available for adoption so it appears on the Adoption page.

2. Security
- No policy changes. The table already has anon+authenticated CRUD policies
  from the initial migration. The new column inherits those policies.
- The new column is nullable-safe with a sensible default so existing rows
  remain valid (existing pets default to NOT available for adoption).

3. Important Notes
- This is a non-destructive ADD COLUMN operation.
- Only pets where is_available_for_adoption = true appear on the Adoption page.
- The Create Pet form gains a checkbox to toggle this field.
*/

ALTER TABLE pets
  ADD COLUMN IF NOT EXISTS is_available_for_adoption boolean NOT NULL DEFAULT false;
