-- HATI-HATI: Script ini akan menghapus SEMUA data!
-- Drop all tables and start fresh

-- Drop tables in correct order (respect foreign keys)
DROP TABLE IF EXISTS public.maintenance_spare_parts CASCADE;
DROP TABLE IF EXISTS public.maintenances CASCADE;
DROP TABLE IF EXISTS public.spare_parts CASCADE;
DROP TABLE IF EXISTS public.maintenance_types CASCADE;
DROP TABLE IF EXISTS public.vehicles CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

SELECT 'All tables dropped successfully' as status;
