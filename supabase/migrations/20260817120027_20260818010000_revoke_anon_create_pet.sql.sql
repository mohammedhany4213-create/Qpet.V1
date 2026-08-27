-- Ensure the SECURITY DEFINER create_pet function is NOT callable by anon.
-- The function checks auth.uid() internally, but defense-in-depth: revoke EXECUTE.
REVOKE EXECUTE ON FUNCTION create_pet(pets) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION create_pet(pets) TO authenticated;
