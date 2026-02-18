import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { DeleteButton } from '../components/DeleteButton';

export default async function MaintenanceTypesPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;

  // Get maintenance types
  const { data: maintenanceTypes } = await supabase
    .from('maintenance_types')
    .select('*')
    .order('name');

  // Delete action
  async function deleteMaintenanceType(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const supabase = await createClient();
    
    await supabase.from('maintenance_types').delete().eq('id', id);
    revalidatePath('/maintenance-types');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Jenis Perawatan</h1>
              <p className="text-neutral-400">Kelola jenis perawatan (Admin Only)</p>
            </div>
            <Link
              href="/maintenance-types/new"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-red-600/20"
            >
              + Tambah Jenis Perawatan
            </Link>
          </div>
        </div>

        {/* Success Message */}
        {params.success && (
          <div className="mb-6 glass rounded-xl p-4 bg-green-600/10 border border-green-600/30">
            <p className="text-green-400">{params.success}</p>
          </div>
        )}

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass rounded-xl p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-neutral-500 truncate">Total Jenis Perawatan</dt>
                  <dd className="text-3xl font-bold text-white">{maintenanceTypes?.length || 0}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Types Table */}
        <div className="glass rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-neutral-800">
            <thead className="bg-neutral-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Estimasi Biaya
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {maintenanceTypes && maintenanceTypes.length > 0 ? (
                maintenanceTypes.map((type: any) => (
                  <tr key={type.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-white">{type.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-neutral-400 max-w-md">
                        {type.description || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                      Rp {type.estimated_cost?.toLocaleString('id-ID') || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/maintenance-types/${type.id}/edit`}
                        className="text-yellow-500 hover:text-yellow-400 mr-3"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        deleteAction={deleteMaintenanceType}
                        itemId={type.id}
                        confirmMessage="Yakin ingin menghapus jenis perawatan ini?"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                    Belum ada data jenis perawatan. <Link href="/maintenance-types/new" className="text-red-500 hover:text-red-400">Tambah jenis perawatan baru</Link>
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
