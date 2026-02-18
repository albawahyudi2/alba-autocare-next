# Alba Autocare - Next.js + Supabase

Vehicle Maintenance Management System built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Quick Start

### 1. Setup Database (IMPORTANT - Do this first!)

Before running the app, you need to setup the database:

1. Login to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select project: **niwlzhfznxyhrirbfodo**
3. Go to **SQL Editor** from sidebar
4. Run migrations in order:
   - Open `supabase/migrations/001_initial_schema.sql`
   - Copy ALL content and paste in SQL Editor
   - Click **Run** to execute
   - Wait for "Success" message
   - Repeat for `supabase/migrations/002_seed_data.sql`

### 2. Run Development Server

```bash
cd C:\xampp\alba\alba-autocare-nextjs
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### 3. Create Your First Account

1. Navigate to `/register` page
2. Fill in your details
3. Click Register
4. Login with your credentials

### 4. (Optional) Make Yourself Admin

Run this SQL in Supabase SQL Editor:
```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'your-email@example.com';
```

## 📋 Features Implemented

✅ User Authentication (Login/Register)  
✅ Protected Dashboard  
✅ Database Schema with RLS  
✅ Landing Page  
⏳ Vehicle Management (Coming next)  
⏳ Maintenance Records (Coming next)  
⏳ Spare Parts Inventory (Coming next)  

## 📁 Project Structure

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
