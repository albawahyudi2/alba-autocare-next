# Database Migrations

Folder ini berisi SQL migrations untuk Alba Autocare Supabase database.

## How to Run Migrations

### Option 1: Using Supabase Dashboard (Recommended)

1. Login ke [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project: **niwlzhfznxyhrirbfodo**
3. Buka **SQL Editor** dari sidebar
4. Buat **New Query**
5. Copy paste isi file `001_initial_schema.sql`
6. Klik **Run** untuk execute
7. Ulangi untuk `002_seed_data.sql`

### Option 2: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref niwlzhfznxyhrirbfodo

# Apply migrations
supabase db push
```

## Migration Files

### 001_initial_schema.sql
- Creates all tables: profiles, vehicles, maintenance_types, spare_parts, maintenances, maintenance_spare_parts
- Sets up Row Level Security (RLS) policies
- Creates indexes for performance
- Adds triggers for automatic profile creation and updated_at timestamps

### 002_seed_data.sql
- Inserts default maintenance types (10 types)
- Inserts sample spare parts (10 items)
- Prepares admin user setup

## Database Schema

```
profiles (users)
├── id (UUID, references auth.users)
├── full_name
├── email (unique)
├── role (admin/user)
├── phone
└── avatar_url

vehicles
├── id (UUID)
├── license_plate (unique)
├── brand
├── model
├── year
├── color
├── mileage
└── user_id → profiles.id

maintenance_types
├── id (UUID)
├── name (unique)
├── description
└── estimated_cost

spare_parts
├── id (UUID)
├── name
├── code (unique)
├── price
├── stock
└── description

maintenances
├── id (UUID)
├── vehicle_id → vehicles.id
├── maintenance_type_id → maintenance_types.id
├── date
├── mileage
├── cost
├── notes
└── status (pending/in_progress/completed/cancelled)

maintenance_spare_parts (junction)
├── id (UUID)
├── maintenance_id → maintenances.id
├── spare_part_id → spare_parts.id
├── quantity
└── price
```

## Row Level Security (RLS)

All tables have RLS enabled:

- **Profiles**: Users can only view/update their own profile
- **Vehicles**: Users can only manage their own vehicles; admins can view all
- **Maintenances**: Users can only manage maintenances for their vehicles; admins can view all
- **Maintenance Types & Spare Parts**: All authenticated users can read; only admins can write
- **Maintenance Spare Parts**: Follows maintenance access rules

## Creating Admin User

After running migrations:

1. Create user through Supabase Auth UI or signup page
2. Run this SQL in Supabase SQL Editor:

```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'your-admin-email@example.com';
```

## Verify Installation

Run this query to check if all tables are created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Expected tables:
- maintenance_spare_parts
- maintenance_types
- maintenances
- profiles
- spare_parts
- vehicles
