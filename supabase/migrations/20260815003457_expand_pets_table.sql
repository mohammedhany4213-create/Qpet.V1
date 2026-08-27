/*
# Expand pets table with pet details and owner contact info

1. Modified Tables
- `pets` — adds columns for richer pet profiles and lost-and-found contact:
  - `gender` (text, nullable) — "Male", "Female", or null
  - `age` (text, nullable) — free-text age (e.g. "3 years", "6 months") so owners can describe it naturally
  - `color` (text, nullable) — pet's color/markings
  - `personality` (text, nullable) — personality traits / characteristics
  - `owner_name` (text, nullable) — name of the pet's owner/human
  - `owner_phone` (text, nullable) — phone number for the "Call Owner" action
  - `owner_whatsapp` (text, nullable) — WhatsApp number for the "WhatsApp" action

2. Security
- No policy changes. The table already has anon+authenticated CRUD policies
  from the initial migration. The new columns inherit those policies.
- All new columns are nullable so existing rows and partial submissions
  remain valid. The only required fields stay: name, species, image_url.

3. Important Notes
- Owner contact fields are optional but recommended — the public pet page
  shows "Call Owner" and "WhatsApp" buttons when these are provided.
- Phone numbers are stored as free text so international formats work.
- No destructive operations — only ADD COLUMN.
*/

ALTER TABLE pets
  ADD COLUMN IF NOT EXISTS gender text,
  ADD COLUMN IF NOT EXISTS age text,
  ADD COLUMN IF NOT EXISTS color text,
  ADD COLUMN IF NOT EXISTS personality text,
  ADD COLUMN IF NOT EXISTS owner_name text,
  ADD COLUMN IF NOT EXISTS owner_phone text,
  ADD COLUMN IF NOT EXISTS owner_whatsapp text;
