import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function NewMaintenanceTypePage() {
  const supabase = await createClient();

  async function createMaintenanceType(formData: FormData) {
    'use server';
    
    const supabase = await createClient();

    const maintenanceTypeData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      estimated_cost: parseFloat(formData.get('estimated_cost') as string),
    };

    const { error } = await supabase.from('maintenance_types').insert(maintenanceTypeData);

    if (error) {
      console.error('Error creating maintenance type:', error);
      return;
    }

    revalidatePath('/maintenance-types');
    redirect('/maintenance-types?success=Jenis perawatan berhasil ditambahkan');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Tambah Jenis Perawatan Baru</h1>
          <p className="text-neutral-400">Isi form di bawah untuk menambah jenis perawatan</p>
        </div>

        {/* Form Card */}
        <div className="glass rounded-xl p-8">
          <form action={createMaintenanceType} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                Nama <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                placeholder="Service Berkala"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-2">
                Deskripsi
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                placeholder="Deskripsi jenis perawatan..."
              ></textarea>
            </div>

            {/* Estimated Cost */}
            <div>
              <label htmlFor="estimated_cost" className="block text-sm font-medium text-neutral-300 mb-2">
                Estimasi Biaya <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="estimated_cost"
                name="estimated_cost"
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                placeholder="500000"
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
                href="/maintenance-types"
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
