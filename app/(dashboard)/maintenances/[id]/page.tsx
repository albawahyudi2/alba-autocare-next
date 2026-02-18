import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { DeleteButton } from '../../components/DeleteButton';

export default async function MaintenanceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Get maintenance details with related data
  const { data: maintenance, error } = await supabase
    .from('maintenances')
    .select(`
      *,
      vehicles(license_plate, brand, model, year, color, mileage),
      maintenance_types(name, description, estimated_cost)
    `)
    .eq('id', id)
    .single();

  if (error || !maintenance) {
    notFound();
  }

  // Delete action
  async function deleteMaintenance(formData: FormData) {
    'use server';
    const supabase = await createClient();
    await supabase.from('maintenances').delete().eq('id', id);
    revalidatePath('/maintenances');
    redirect('/maintenances?success=Perawatan berhasil dihapus');
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
              <h1 className="text-3xl font-bold text-white mb-2">Detail Perawatan</h1>
              <p className="text-neutral-400">Informasi lengkap perawatan kendaraan</p>
            </div>
            <Link
              href="/maintenances"
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium transition-colors"
            >
              ← Kembali
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Maintenance Info Card */}
            <div className="glass rounded-xl p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">Informasi Perawatan</h2>
                <div className="flex space-x-3">
                  <Link
                    href={`/maintenances/${id}/edit`}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    deleteAction={deleteMaintenance}
                    itemId={id}
                    confirmMessage="Yakin ingin menghapus perawatan ini?"
                    className=""
                    buttonText="Hapus"
                    buttonClassName="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-1">Tanggal Perawatan</label>
                  <p className="text-lg font-semibold text-white">
                    {new Date(maintenance.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-1">Status</label>
                  <span className={`px-4 py-2 inline-flex text-sm font-semibold rounded-full border ${getStatusBadge(maintenance.status)}`}>
                    {getStatusText(maintenance.status)}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-1">Kilometer</label>
                  <p className="text-lg font-semibold text-white">{maintenance.mileage?.toLocaleString('id-ID')} km</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-1">Biaya Total</label>
                  <p className="text-2xl font-bold text-red-500">Rp {maintenance.cost?.toLocaleString('id-ID') || 0}</p>
                </div>

                {maintenance.notes && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-500 mb-1">Keterangan</label>
                    <p className="text-white">{maintenance.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Info Card */}
            <div className="glass rounded-xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Informasi Kendaraan</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-1">Plat Nomor</label>
                  <p className="text-xl font-bold text-red-500 font-mono">{maintenance.vehicles?.license_plate}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-1">Merk / Model</label>
                  <p className="text-lg font-semibold text-white">
                    {maintenance.vehicles?.brand} {maintenance.vehicles?.model}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-1">Tahun</label>
                  <p className="text-lg font-semibold text-white">{maintenance.vehicles?.year}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-1">Warna</label>
                  <p className="text-lg font-semibold text-white">{maintenance.vehicles?.color}</p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={`/vehicles/${maintenance.vehicle_id}`}
                  className="text-red-500 hover:text-red-400 text-sm font-medium"
                >
                  Lihat Detail Kendaraan →
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Maintenance Type Card */}
            <div className="glass rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Jenis Perawatan</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-1">Nama</label>
                  <p className="text-lg font-semibold text-white">{maintenance.maintenance_types?.name}</p>
                </div>

                {maintenance.maintenance_types?.description && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 mb-1">Deskripsi</label>
                    <p className="text-sm text-neutral-300">{maintenance.maintenance_types?.description}</p>
                  </div>
                )}

                {maintenance.maintenance_types?.estimated_cost && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 mb-1">Estimasi Biaya</label>
                    <p className="text-lg font-semibold text-white">
                      Rp {maintenance.maintenance_types?.estimated_cost.toLocaleString('id-ID')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Cost Comparison */}
            {maintenance.maintenance_types?.estimated_cost && (
              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Perbandingan Biaya</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-400">Estimasi</span>
                    <span className="text-sm font-semibold text-neutral-300">
                      Rp {maintenance.maintenance_types?.estimated_cost.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-400">Aktual</span>
                    <span className="text-sm font-semibold text-white">
                      Rp {maintenance.cost?.toLocaleString('id-ID') || 0}
                    </span>
                  </div>
                  <div className="border-t border-neutral-700 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-neutral-400">Selisih</span>
                      <span className={`text-sm font-bold ${
                        (maintenance.cost || 0) > maintenance.maintenance_types?.estimated_cost 
                          ? 'text-red-500' 
                          : 'text-green-500'
                      }`}>
                        Rp {Math.abs((maintenance.cost || 0) - maintenance.maintenance_types?.estimated_cost).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
