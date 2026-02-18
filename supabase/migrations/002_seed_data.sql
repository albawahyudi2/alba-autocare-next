-- Seed data for Alba Autocare

-- Insert default maintenance types
INSERT INTO public.maintenance_types (name, description, estimated_cost) VALUES
  ('Oil Change', 'Regular engine oil and filter replacement', 300000),
  ('Tire Rotation', 'Rotate tires for even wear', 150000),
  ('Brake Service', 'Brake pad inspection and replacement', 500000),
  ('Battery Check', 'Battery health inspection and replacement', 800000),
  ('Air Filter Replacement', 'Engine air filter replacement', 100000),
  ('Transmission Service', 'Transmission fluid and filter service', 1000000),
  ('Coolant Flush', 'Engine coolant system flush and refill', 400000),
  ('Spark Plug Replacement', 'Replace spark plugs', 350000),
  ('Wheel Alignment', 'Front and rear wheel alignment', 250000),
  ('General Inspection', 'Complete vehicle inspection', 200000)
ON CONFLICT (name) DO NOTHING;

-- Insert sample spare parts
INSERT INTO public.spare_parts (name, code, price, stock, description) VALUES
  ('Engine Oil 5W-30', 'OIL-5W30-4L', 250000, 50, '4 liter synthetic engine oil'),
  ('Oil Filter', 'FILTER-OIL-001', 50000, 100, 'Standard oil filter'),
  ('Air Filter', 'FILTER-AIR-001', 75000, 80, 'Engine air filter'),
  ('Brake Pad Set', 'BRAKE-PAD-001', 400000, 30, 'Front brake pad set'),
  ('Spark Plug (set of 4)', 'SPARK-PLUG-4', 300000, 40, 'Iridium spark plugs'),
  ('Car Battery 12V', 'BATTERY-12V-65AH', 1200000, 20, '12V 65Ah maintenance-free battery'),
  ('Wiper Blade Pair', 'WIPER-BLADE-PR', 150000, 60, 'Front windshield wiper blades'),
  ('Tire 185/65R15', 'TIRE-185-65-R15', 800000, 40, 'Standard passenger car tire'),
  ('Coolant 5L', 'COOLANT-5L', 180000, 45, '5 liter radiator coolant'),
  ('Transmission Fluid', 'ATF-FLUID-4L', 350000, 30, '4 liter automatic transmission fluid')
ON CONFLICT (code) DO NOTHING;

-- Create admin user (you'll need to create this user through Supabase Auth first)
-- Then update their role to admin
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@alba-autocare.com';
