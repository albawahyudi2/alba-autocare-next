import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { DeleteButton } from '../components/DeleteButton';

export default async function MaintenancesPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;

  // Get maintenances with related data
  const { data: maintenances } = await supabase
    .from('maintenances')
    .select(`
      *,
      vehicles(license_plate, brand, model),
      maintenance_types(name)
    `)
    .order('date', { ascending: false });

  // Calculate stats
  const stats = {
    total: maintenances?.length || 0,
    pending: maintenances?.filter((m: any) => m.status === 'pending').length || 0,
    in_progress: maintenances?.filter((m: any) => m.status === 'in_progress').length || 0,
    completed: maintenances?.filter((m: any) => m.status === 'completed').length || 0,
  };

  // Delete action
  async function deleteMaintenance(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const supabase = await createClient();
    
    await supabase.from('maintenances').delete().eq('id', id);
    revalidatePath('/maintenances');
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'Menunggu',
      in_progress: 'Sedang Proses',
      completed: 'Selesai',
      cancelled: 'Dibatalkan',
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Data Perawatan</h1>
              <p className="text-neutral-400">Kelola data perawatan kendaraan</p>
            </div>
            <Link
              href="/maintenances/new"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-red-600/20"
            >
              + Tambah Perawatan
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-neutral-500 truncate">Total Perawatan</dt>
                  <dd className="text-3xl font-bold text-white">{stats.total}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-neutral-500 truncate">Menunggu</dt>
                  <dd className="text-3xl font-bold text-white">{stats.pending}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-neutral-500 truncate">Sedang Proses</dt>
                  <dd className="text-3xl font-bold text-white">{stats.in_progress}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-neutral-500 truncate">Selesai</dt>
                  <dd className="text-3xl font-bold text-white">{stats.completed}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenances Table */}
        <div className="glass rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-neutral-800">
            <thead className="bg-neutral-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Kendaraan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Jenis Perawatan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Kilometer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Biaya
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {maintenances && maintenances.length > 0 ? (
                maintenances.map((maintenance: any) => (
                  <tr key={maintenance.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-bold text-red-500 font-mono">
                          {maintenance.vehicles?.license_plate}
                        </div>
                        <div className="text-sm text-neutral-400">
                          {maintenance.vehicles?.brand} {maintenance.vehicles?.model}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {maintenance.maintenance_types?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {new Date(maintenance.date).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {maintenance.mileage?.toLocaleString('id-ID')} km
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                      Rp {maintenance.cost?.toLocaleString('id-ID') || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadge(maintenance.status)}`}>
                        {getStatusText(maintenance.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/maintenances/${maintenance.id}`}
                        className="text-blue-500 hover:text-blue-400 mr-3"
                      >
                        Detail
                      </Link>
                      <Link
                        href={`/maintenances/${maintenance.id}/edit`}
                        className="text-yellow-500 hover:text-yellow-400 mr-3"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        deleteAction={deleteMaintenance}
                        itemId={maintenance.id}
                        confirmMessage="Yakin ingin menghapus perawatan ini?"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-neutral-500">
                    Belum ada data perawatan. <Link href="/maintenances/new" className="text-red-500 hover:text-red-400">Tambah perawatan baru</Link>
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
