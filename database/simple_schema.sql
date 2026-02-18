-- Simple schema for single admin user (no authentication needed)
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create vehicles table (NO user_id)
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  license_plate TEXT UNIQUE NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  color TEXT,
  mileage INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create maintenance_types table
CREATE TABLE IF NOT EXISTS public.maintenance_types (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  estimated_cost DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create spare_parts table
CREATE TABLE IF NOT EXISTS public.spare_parts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price DECIMAL(12, 2) DEFAULT 0,
  stock INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create maintenances table (NO user_id)
CREATE TABLE IF NOT EXISTS public.maintenances (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE NOT NULL,
  maintenance_type_id UUID REFERENCES public.maintenance_types(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  mileage INTEGER NOT NULL,
  cost DECIMAL(12, 2) DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create maintenance_spare_parts junction table
CREATE TABLE IF NOT EXISTS public.maintenance_spare_parts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  maintenance_id UUID REFERENCES public.maintenances(id) ON DELETE CASCADE NOT NULL,
  spare_part_id UUID REFERENCES public.spare_parts(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER DEFAULT 1 NOT NULL,
  price_at_time DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vehicles_license_plate ON public.vehicles(license_plate);
CREATE INDEX IF NOT EXISTS idx_maintenances_vehicle_id ON public.maintenances(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_maintenances_date ON public.maintenances(date);
CREATE INDEX IF NOT EXISTS idx_maintenance_spare_parts_maintenance_id ON public.maintenance_spare_parts(maintenance_id);

-- Disable RLS (no authentication needed)
ALTER TABLE public.vehicles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_types DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.spare_parts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenances DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_spare_parts DISABLE ROW LEVEL SECURITY;

SELECT 'Schema created successfully - No authentication required' as status;
