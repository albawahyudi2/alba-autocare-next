-- Seed data for maintenance_types
INSERT INTO public.maintenance_types (name, description, estimated_cost) VALUES
  ('Ganti Oli Mesin', 'Penggantian oli mesin dan filter oli', 250000),
  ('Servis Berkala', 'Servis rutin sesuai km atau waktu', 500000),
  ('Ganti Ban', 'Penggantian ban kendaraan', 1500000),
  ('Tune Up', 'Tune up mesin dan pembersihan injector', 750000),
  ('Ganti Kampas Rem', 'Penggantian kampas rem depan/belakang', 600000),
  ('Spooring Balancing', 'Penyetelan geometri roda', 200000),
  ('AC Service', 'Servis dan isi freon AC', 400000),
  ('Ganti Aki', 'Penggantian aki/battery kendaraan', 800000),
  ('Perbaikan Body', 'Perbaikan body dan cat', 2000000),
  ('Ganti Timing Belt', 'Penggantian timing belt', 1200000)
ON CONFLICT DO NOTHING;

-- Seed data for spare_parts
INSERT INTO public.spare_parts (code, name, price, stock, description) VALUES
  ('SP-001', 'Oli Mesin 5W-30', 85000, 50, 'Oli mesin synthetic 5W-30 1 liter'),
  ('SP-002', 'Filter Oli', 45000, 100, 'Filter oli standar untuk mobil'),
  ('SP-003', 'Ban R15', 650000, 20, 'Ban radial ukuran R15'),
  ('SP-004', 'Kampas Rem Depan', 250000, 30, 'Kampas rem depan original'),
  ('SP-005', 'Kampas Rem Belakang', 200000, 30, 'Kampas rem belakang original'),
  ('SP-006', 'Aki 12V 45Ah', 750000, 15, 'Aki kering maintenance free'),
  ('SP-007', 'Filter Udara', 75000, 40, 'Filter udara mesin'),
  ('SP-008', 'Busi', 35000, 80, 'Busi platinum standar'),
  ('SP-009', 'Air Radiator', 25000, 60, 'Coolant radiator 1 liter'),
  ('SP-010', 'Freon AC R134a', 150000, 25, 'Freon AC R134a 1 kaleng'),
  ('SP-011', 'Filter AC', 55000, 50, 'Filter kabin AC'),
  ('SP-012', 'Wiper Blade', 85000, 40, 'Wiper blade sepasang'),
  ('SP-013', 'Lampu Halogen H4', 45000, 60, 'Lampu halogen H4 55W'),
  ('SP-014', 'Oli Transmisi ATF', 125000, 30, 'Oli transmisi matic ATF'),
  ('SP-015', 'Kanvas Kopling', 450000, 10, 'Set kanvas kopling')
ON CONFLICT DO NOTHING;
