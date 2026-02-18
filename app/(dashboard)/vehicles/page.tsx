import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { DeleteButton } from '../components/DeleteButton';

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;

  // Get all vehicles
  const { data: vehicles } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false });

  // Delete action
  async function deleteVehicle(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const supabase = await createClient();
    
    await supabase.from('vehicles').delete().eq('id', id);
    revalidatePath('/vehicles');
  }

  // Update mileage action
  async function updateMileage(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const mileage = parseInt(formData.get('mileage') as string);
    
    const supabase = await createClient();
    await supabase.from('vehicles').update({ mileage }).eq('id', id);
    
    revalidatePath('/vehicles');
    redirect('/vehicles?success=Kilometer berhasil diperbarui');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Data Kendaraan</h1>
              <p className="text-neutral-400">Kelola data kendaraan Anda</p>
            </div>
            <Link
              href="/vehicles/new"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-red-600/20"
            >
              + Tambah Kendaraan
            </Link>
          </div>
        </div>

        {/* Success Message */}
        {params.success && (
          <div className="mb-6 glass rounded-xl p-4 bg-green-600/10 border border-green-600/30">
            <p className="text-green-400">{params.success}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-xl p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-neutral-500 truncate">Total Kendaraan</dt>
                  <dd className="text-3xl font-bold text-white">{vehicles?.length || 0}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicles Table */}
        <div className="glass rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-neutral-800">
            <thead className="bg-neutral-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Plat Nomor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Merk / Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Tahun
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Warna
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  KM Terakhir
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {vehicles && vehicles.length > 0 ? (
                vehicles.map((vehicle: any) => (
                  <tr key={vehicle.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-red-500 font-mono">
                        {vehicle.license_plate}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-white">{vehicle.brand}</div>
                      <div className="text-sm text-neutral-400">{vehicle.model}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {vehicle.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {vehicle.color}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <form action={updateMileage} className="inline-flex items-center space-x-2">
                        <input type="hidden" name="id" value={vehicle.id} />
                        <input
                          type="number"
                          name="mileage"
                          defaultValue={vehicle.mileage}
                          className="w-24 px-2 py-1 bg-neutral-800 text-white border border-neutral-700 rounded text-sm focus:outline-none focus:border-red-500"
                        />
                        <button
                          type="submit"
                          className="text-xs text-red-500 hover:text-red-400"
                        >
                          Update
                        </button>
                      </form>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/vehicles/${vehicle.id}`}
                        className="text-blue-500 hover:text-blue-400 mr-3"
                      >
                        Detail
                      </Link>
                      <Link
                        href={`/vehicles/${vehicle.id}/edit`}
                        className="text-yellow-500 hover:text-yellow-400 mr-3"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        deleteAction={deleteVehicle}
                        itemId={vehicle.id}
                        confirmMessage="Yakin ingin menghapus kendaraan ini?"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">
                    Belum ada data kendaraan. <Link href="/vehicles/new" className="text-red-500 hover:text-red-400">Tambah kendaraan baru</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
