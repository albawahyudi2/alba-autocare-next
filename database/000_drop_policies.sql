-- Drop all existing policies
DO $$ 
BEGIN
  -- Drop policies for profiles
  DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.profiles;
  
  -- Drop policies for vehicles
  DROP POLICY IF EXISTS "Users can view own vehicles or admin can view all" ON public.vehicles;
  DROP POLICY IF EXISTS "Users can insert own vehicles" ON public.vehicles;
  DROP POLICY IF EXISTS "Users can update own vehicles or admin can update all" ON public.vehicles;
  DROP POLICY IF EXISTS "Users can delete own vehicles or admin can delete all" ON public.vehicles;
  
  -- Drop policies for maintenance_types
  DROP POLICY IF EXISTS "Everyone can view maintenance types" ON public.maintenance_types;
  DROP POLICY IF EXISTS "Only admins can insert maintenance types" ON public.maintenance_types;
  DROP POLICY IF EXISTS "Only admins can update maintenance types" ON public.maintenance_types;
  DROP POLICY IF EXISTS "Only admins can delete maintenance types" ON public.maintenance_types;
  
  -- Drop policies for spare_parts
  DROP POLICY IF EXISTS "Everyone can view spare parts" ON public.spare_parts;
  DROP POLICY IF EXISTS "Only admins can insert spare parts" ON public.spare_parts;
  DROP POLICY IF EXISTS "Only admins can update spare parts" ON public.spare_parts;
  DROP POLICY IF EXISTS "Only admins can delete spare parts" ON public.spare_parts;
  
  -- Drop policies for maintenances
  DROP POLICY IF EXISTS "Users can view own maintenances or admin can view all" ON public.maintenances;
  DROP POLICY IF EXISTS "Users can insert own maintenances" ON public.maintenances;
  DROP POLICY IF EXISTS "Users can update own maintenances or admin can update all" ON public.maintenances;
  DROP POLICY IF EXISTS "Users can delete own maintenances or admin can delete all" ON public.maintenances;
  
  -- Drop policies for maintenance_spare_parts
  DROP POLICY IF EXISTS "Users can view maintenance spare parts if they own the maintenance" ON public.maintenance_spare_parts;
  DROP POLICY IF EXISTS "Users can insert maintenance spare parts for own maintenances" ON public.maintenance_spare_parts;
  DROP POLICY IF EXISTS "Users can update maintenance spare parts for own maintenances" ON public.maintenance_spare_parts;
  DROP POLICY IF EXISTS "Users can delete maintenance spare parts for own maintenances" ON public.maintenance_spare_parts;
END $$;
