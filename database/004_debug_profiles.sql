-- Script untuk debug dan cek profile users
-- Jalankan ini untuk melihat semua user dan role mereka

SELECT 
  p.id,
  u.email,
  p.full_name,
  p.role,
  p.created_at,
  p.updated_at
FROM public.profiles p
LEFT JOIN auth.users u ON u.id = p.id
ORDER BY p.created_at DESC;

-- Jika tidak ada hasil, cek apakah ada data di auth.users tapi tidak di profiles
SELECT 
  u.id,
  u.email,
  u.created_at,
  'MISSING PROFILE' as status
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL;

-- Script untuk fix: Buat profile untuk user yang belum punya profile
INSERT INTO public.profiles (id, full_name, role)
SELECT 
  u.id,
  COALESCE(u.raw_user_meta_data->>'full_name', u.email),
  'user'
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Kemudian update user pertama jadi admin
UPDATE public.profiles
SET role = 'admin'
WHERE id = (SELECT id FROM public.profiles ORDER BY created_at ASC LIMIT 1);

SELECT 'User pertama berhasil diupdate menjadi admin' as status;
