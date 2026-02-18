-- Alba Autocare Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- 1. Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create vehicles table
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_plate TEXT NOT NULL,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    color TEXT NOT NULL,
    mileage INTEGER NOT NULL DEFAULT 0,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create maintenance_types table
CREATE TABLE IF NOT EXISTS public.maintenance_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    estimated_cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create maintenances table
CREATE TABLE IF NOT EXISTS public.maintenances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
    maintenance_type_id UUID NOT NULL REFERENCES public.maintenance_types(id) ON DELETE RESTRICT,
    date DATE NOT NULL,
    mileage INTEGER NOT NULL,
    cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create spare_parts table
CREATE TABLE IF NOT EXISTS public.spare_parts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    stock INTEGER NOT NULL DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vehicles_user_id ON public.vehicles(user_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_license_plate ON public.vehicles(license_plate);
CREATE INDEX IF NOT EXISTS idx_maintenances_vehicle_id ON public.maintenances(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_maintenances_date ON public.maintenances(date);
CREATE INDEX IF NOT EXISTS idx_maintenances_status ON public.maintenances(status);

-- 8. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spare_parts ENABLE ROW LEVEL SECURITY;

-- 9. Create RLS Policies for profiles
-- Users can only view and update their own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
    ON public.profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 10. Create RLS Policies for vehicles
-- Users can only view their own vehicles
CREATE POLICY "Users can view own vehicles"
    ON public.vehicles FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own vehicles
CREATE POLICY "Users can insert own vehicles"
    ON public.vehicles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own vehicles
CREATE POLICY "Users can update own vehicles"
    ON public.vehicles FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own vehicles
CREATE POLICY "Users can delete own vehicles"
    ON public.vehicles FOR DELETE
    USING (auth.uid() = user_id);

-- Admins can view all vehicles
CREATE POLICY "Admins can view all vehicles"
    ON public.vehicles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can manage all vehicles
CREATE POLICY "Admins can manage all vehicles"
    ON public.vehicles FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 11. Create RLS Policies for maintenances
-- Users can view maintenances for their own vehicles
CREATE POLICY "Users can view own maintenances"
    ON public.maintenances FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.vehicles
            WHERE vehicles.id = maintenances.vehicle_id
            AND vehicles.user_id = auth.uid()
        )
    );

-- Users can insert maintenances for their own vehicles
CREATE POLICY "Users can insert own maintenances"
    ON public.maintenances FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.vehicles
            WHERE vehicles.id = vehicle_id
            AND vehicles.user_id = auth.uid()
        )
    );

-- Users can update maintenances for their own vehicles
CREATE POLICY "Users can update own maintenances"
    ON public.maintenances FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.vehicles
            WHERE vehicles.id = maintenances.vehicle_id
            AND vehicles.user_id = auth.uid()
        )
    );

-- Users can delete maintenances for their own vehicles
CREATE POLICY "Users can delete own maintenances"
    ON public.maintenances FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.vehicles
            WHERE vehicles.id = maintenances.vehicle_id
            AND vehicles.user_id = auth.uid()
        )
    );

-- Admins can view all maintenances
CREATE POLICY "Admins can view all maintenances"
    ON public.maintenances FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can manage all maintenances
CREATE POLICY "Admins can manage all maintenances"
    ON public.maintenances FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 12. Create RLS Policies for maintenance_types
-- Everyone can view maintenance types
CREATE POLICY "Everyone can view maintenance types"
    ON public.maintenance_types FOR SELECT
    TO authenticated
    USING (true);

-- Only admins can manage maintenance types
CREATE POLICY "Admins can manage maintenance types"
    ON public.maintenance_types FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 13. Create RLS Policies for spare_parts
-- Everyone can view spare parts
CREATE POLICY "Everyone can view spare parts"
    ON public.spare_parts FOR SELECT
    TO authenticated
    USING (true);

-- Only admins can manage spare parts
CREATE POLICY "Admins can manage spare parts"
    ON public.spare_parts FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 14. Create trigger function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        'user'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 15. Create trigger to call the function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- 16. Insert sample maintenance types (optional)
INSERT INTO public.maintenance_types (name, description, estimated_cost) VALUES
    ('Service Berkala', 'Perawatan rutin sesuai jadwal kilometer', 500000),
    ('Ganti Oli Mesin', 'Penggantian oli mesin dan filter oli', 300000),
    ('Tune Up', 'Penyetelan mesin untuk performa optimal', 750000),
    ('Ganti Ban', 'Penggantian ban yang sudah aus', 2000000),
    ('Perbaikan Rem', 'Service sistem pengereman kendaraan', 600000),
    ('Ganti Aki', 'Penggantian aki/battery kendaraan', 800000),
    ('Service AC', 'Pembersihan dan pengisian freon AC', 400000),
    ('Spooring & Balancing', 'Penyetelan roda dan keseimbangan ban', 200000)
ON CONFLICT DO NOTHING;

-- 17. Insert sample spare parts (optional)
INSERT INTO public.spare_parts (code, name, price, stock, description) VALUES
    ('SP-001', 'Oli Mesin 10W-40', 150000, 50, 'Oli mesin berkualitas tinggi untuk mesin bensin'),
    ('SP-002', 'Filter Oli', 50000, 100, 'Filter oli standar untuk berbagai jenis mobil'),
    ('SP-003', 'Busi', 75000, 80, 'Busi standar untuk mesin bensin'),
    ('SP-004', 'Kampas Rem Depan', 250000, 30, 'Kampas rem depan untuk sedan dan city car'),
    ('SP-005', 'Aki 45Ah', 850000, 15, 'Aki maintenance free 45Ah'),
    ('SP-006', 'Ban 185/60 R15', 650000, 40, 'Ban radial untuk mobil sedan'),
    ('SP-007', 'Freon R134a', 120000, 25, 'Freon AC untuk sistem pendingin mobil'),
    ('SP-008', 'Filter Udara', 80000, 60, 'Filter udara untuk sistem intake mesin')
ON CONFLICT (code) DO NOTHING;

-- 18. Grant permissions (if needed)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Database schema created successfully!';
    RAISE NOTICE 'You can now use the Alba Autocare Next.js application.';
    RAISE NOTICE 'Default admin user needs to be set manually by updating the role in profiles table.';
END $$;
