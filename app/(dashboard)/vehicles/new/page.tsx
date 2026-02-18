import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function NewVehiclePage() {
  async function createVehicle(formData: FormData) {
    'use server';
    
    const supabase = await createClient();

    const vehicleData = {
      license_plate: formData.get('license_plate') as string,
      brand: formData.get('brand') as string,
      model: formData.get('model') as string,
      year: parseInt(formData.get('year') as string),
      color: formData.get('color') as string,
      mileage: parseInt(formData.get('mileage') as string),
    };

    const { error } = await supabase.from('vehicles').insert(vehicleData);

    if (error) {
      console.error('Error creating vehicle:', error);
      return;
    }

    revalidatePath('/vehicles');
    redirect('/vehicles?success=Kendaraan berhasil ditambahkan');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Tambah Kendaraan Baru</h1>
          <p className="text-neutral-400">Isi form di bawah untuk menambah kendaraan</p>
        </div>

        {/* Form Card */}
        <div className="glass rounded-xl p-8">
          <form action={createVehicle} className="space-y-6">
            {/* License Plate */}
            <div>
              <label htmlFor="license_plate" className="block text-sm font-medium text-neutral-300 mb-2">
                Plat Nomor <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="license_plate"
                name="license_plate"
                required
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors uppercase"
                placeholder="B 1234 XYZ"
              />
            </div>

            {/* Brand */}
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-neutral-300 mb-2">
                Merk <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                required
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                placeholder="Toyota"
              />
            </div>

            {/* Model */}
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-neutral-300 mb-2">
                Model <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="model"
                name="model"
                required
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                placeholder="Avanza"
              />
            </div>

            {/* Year */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-neutral-300 mb-2">
                Tahun <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="year"
                name="year"
                required
                min="1900"
                max={new Date().getFullYear() + 1}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                placeholder="2020"
              />
            </div>

            {/* Color */}
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-neutral-300 mb-2">
                Warna <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="color"
                name="color"
                required
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                placeholder="Hitam"
              />
            </div>

            {/* Mileage */}
            <div>
              <label htmlFor="mileage" className="block text-sm font-medium text-neutral-300 mb-2">
                Kilometer Terakhir <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="mileage"
                name="mileage"
                required
                min="0"
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                placeholder="50000"
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-red-600/20"
              >
                Simpan
              </button>
              <Link
                href="/vehicles"
                className="flex-1 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium transition-colors text-center"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
