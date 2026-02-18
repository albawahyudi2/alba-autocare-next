import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function NewSparePartPage() {
  const supabase = await createClient();

  async function createSparePart(formData: FormData) {
    'use server';
    
    const supabase = await createClient();

    const sparePartData = {
      code: formData.get('code') as string,
      name: formData.get('name') as string,
      price: parseFloat(formData.get('price') as string),
      stock: parseInt(formData.get('stock') as string),
      description: formData.get('description') as string,
    };

    const { error } = await supabase.from('spare_parts').insert(sparePartData);

    if (error) {
      console.error('Error creating spare part:', error);
      return;
    }

    revalidatePath('/spare-parts');
    redirect('/spare-parts?success=Suku cadang berhasil ditambahkan');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Tambah Suku Cadang Baru</h1>
          <p className="text-neutral-400">Isi form di bawah untuk menambah suku cadang</p>
        </div>

        {/* Form Card */}
        <div className="glass rounded-xl p-8">
          <form action={createSparePart} className="space-y-6">
            {/* Code */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-neutral-300 mb-2">
                Kode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="code"
                name="code"
                required
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors uppercase"
                placeholder="SP-001"
              />
            </div>

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
                placeholder="Oli Mesin"
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-neutral-300 mb-2">
                Harga <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                placeholder="150000"
              />
            </div>

            {/* Stock */}
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-neutral-300 mb-2">
                Stok <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                required
                min="0"
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                placeholder="50"
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
                placeholder="Deskripsi suku cadang..."
              ></textarea>
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
                href="/spare-parts"
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
