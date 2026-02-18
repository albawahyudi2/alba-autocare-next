# 🚀 Alba Autocare Next.js - Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- Supabase account (free tier is fine)
- Git (optional)

## Step 1: Database Setup

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `DATABASE_SETUP.sql`
4. Click **Run** to execute all migrations
5. Verify tables are created in **Table Editor**

## Step 2: Environment Variables

Make sure your `.env.local` file has these variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from: **Supabase Dashboard → Project Settings → API**

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 5: Create Your First Admin User

1. Register a new account at `/register`
2. Go to Supabase Dashboard → **Table Editor**
3. Open the `profiles` table
4. Find your newly created profile
5. Change the `role` column from `user` to `admin`
6. Save changes
7. Refresh your app - you now have admin access!

## Step 6: Add Sample Data (Optional)

The `DATABASE_SETUP.sql` already includes:
- 8 sample maintenance types
- 8 sample spare parts

To add sample vehicles:

1. Login to your app
2. Go to **Kendaraan** (Vehicles)
3. Click **+ Tambah Kendaraan**
4. Fill in the form:
   - Plat Nomor: `B 1234 ABC`
   - Merk: `Toyota`
   - Model: `Avanza`
   - Tahun: `2020`
   - Warna: `Hitam`
   - KM Terakhir: `50000`
5. Click **Simpan**

## 📱 Application Routes

### Public Routes
- `/login` - Login page
- `/register` - Registration page

### Protected Routes (Authenticated Users)
- `/dashboard` - Main dashboard
- `/vehicles` - Vehicle list
- `/vehicles/new` - Add new vehicle
- `/vehicles/[id]` - Vehicle details
- `/vehicles/[id]/edit` - Edit vehicle
- `/maintenances` - Maintenance list
- `/maintenances/new` - Add new maintenance
- `/maintenances/[id]` - Maintenance details
- `/maintenances/[id]/edit` - Edit maintenance

### Admin Only Routes
- `/spare-parts` - Spare parts management
- `/spare-parts/new` - Add spare part
- `/spare-parts/[id]/edit` - Edit spare part
- `/maintenance-types` - Maintenance types management
- `/maintenance-types/new` - Add maintenance type
- `/maintenance-types/[id]/edit` - Edit maintenance type

## 🔐 User Roles

### Regular User (`role: 'user'`)
- Can manage their own vehicles
- Can add/edit/delete maintenances for their vehicles
- Can view spare parts and maintenance types (read-only)
- Cannot access admin pages

### Admin User (`role: 'admin'`)
- Can view ALL vehicles and maintenances
- Can manage spare parts
- Can manage maintenance types
- Full access to all features

## 🎨 Design Features

### Dark Theme
- Gradient background: `from-neutral-950 via-neutral-900 to-neutral-950`
- Glass morphism cards with blur effects
- Red accent color (#EF4444)

### Typography
- License plates: RED, BOLD, MONOSPACE
- Data: WHITE, BOLD
- Labels: NEUTRAL-400/500
- Success messages: GREEN
- Error messages: RED

### Status Badges
- **Pending** → Yellow background
- **In Progress** → Blue background
- **Completed** → Green background
- **Cancelled** → Red background

## 🔧 Common Tasks

### Update Mileage
1. Go to **Kendaraan** (Vehicles)
2. Find your vehicle in the table
3. Edit the KM number directly in the table
4. Click **Update**

### Add Maintenance
1. Go to **Perawatan** (Maintenances)
2. Click **+ Tambah Perawatan**
3. Select vehicle, maintenance type, date, etc.
4. Click **Simpan**

Or from vehicle detail page:
1. Go to vehicle details
2. Click **+ Tambah Perawatan** in the maintenance history section

### Check Maintenance History
1. Go to **Kendaraan**
2. Click **Detail** on any vehicle
3. Scroll down to see maintenance history table

### Manage Spare Parts (Admin Only)
1. Login as admin
2. Go to **Suku Cadang**
3. Add/Edit/Delete spare parts
4. Monitor low stock items (< 10 units)

## 📊 Data Relationships

```
users (Supabase Auth)
  └── profiles (role, full_name)
       └── vehicles
            └── maintenances
                 └── maintenance_types

spare_parts (standalone)
maintenance_types (standalone)
```

## ⚡ Performance Tips

1. **Server Components**: All pages are server components for best performance
2. **Caching**: Data is automatically cached by Next.js
3. **Revalidation**: Pages auto-revalidate after mutations
4. **Indexes**: Database has proper indexes for fast queries

## 🐛 Troubleshooting

### "No vehicles found"
- Make sure you're logged in
- Regular users only see their own vehicles
- Add a vehicle first

### "Not authorized" or redirect to dashboard
- You're trying to access an admin-only page
- Check your role in Supabase profiles table
- Change role to 'admin' if needed

### Form submission not working
- Check browser console for errors
- Verify Supabase connection
- Check RLS policies are enabled

### Maintenance not showing up
- Make sure the vehicle belongs to you
- Check if you filtered by status
- Admin can see all, users see only their own

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **New Project**
4. Import your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **Deploy**

Your app will be live at `https://your-app.vercel.app`

### Deploy to Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables in Netlify dashboard

## 📚 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Styling**: Tailwind CSS
- **Deployment**: Vercel/Netlify

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## ✅ Checklist

After setup, verify:
- [ ] Database tables created
- [ ] RLS policies enabled
- [ ] Environment variables set
- [ ] Dev server running
- [ ] Can register new user
- [ ] Can login
- [ ] Dashboard loads
- [ ] Can add vehicle
- [ ] Can add maintenance
- [ ] Admin pages work (if admin)

## 🎉 You're All Set!

Your Alba Autocare Next.js application is now ready to use. Start by adding your first vehicle and tracking its maintenance history!

For issues or questions, check the `IMPLEMENTATION_SUMMARY.md` file for detailed technical documentation.

**Happy coding!** 🚗✨
