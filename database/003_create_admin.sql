-- Script untuk membuat/update user menjadi admin
-- Ganti 'admin@example.com' dengan email yang Anda inginkan

DO $$
DECLARE
  admin_email TEXT := 'admin@albautocare.com'; -- GANTI EMAIL INI sesuai email yang Anda inginkan
  user_id UUID;
BEGIN
  -- Cari user berdasarkan email di auth.users
  SELECT id INTO user_id
  FROM auth.users
  WHERE email = admin_email
  LIMIT 1;

  -- Jika user ditemukan, update profile menjadi admin
  IF user_id IS NOT NULL THEN
    -- Update role di profiles table
    UPDATE public.profiles
    SET role = 'admin'
    WHERE id = user_id;
    
    RAISE NOTICE 'User % berhasil diupdate menjadi admin', admin_email;
  ELSE
    RAISE NOTICE 'User dengan email % tidak ditemukan. Silakan register terlebih dahulu di aplikasi.', admin_email;
  END IF;
END $$;

-- Atau jika ingin update user yang sudah pernah register (ambil user pertama yang register):
-- Uncomment 3 baris di bawah untuk set user pertama jadi admin
-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE id = (SELECT id FROM public.profiles ORDER BY created_at ASC LIMIT 1);
