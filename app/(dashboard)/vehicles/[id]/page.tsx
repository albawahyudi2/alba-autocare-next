import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { DeleteButton } from '../../components/DeleteButton';

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Get vehicle details
  const { data: vehicle, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !vehicle) {
    notFound();
  }

  // Get maintenance history for this vehicle
  const { data: maintenances } = await supabase
    .from('maintenances')
    .select(`
      *,
      maintenance_types(name)
    `)
    .eq('vehicle_id', id)
    .order('date', { ascending: false });

  // Delete action
  async function deleteVehicle(formData: FormData) {
    'use server';
    const supabase = await createClient();
    await supabase.from('vehicles').delete().eq('id', id);
    revalidatePath('/vehicles');
    redirect('/vehicles?success=Kendaraan berhasil dihapus');
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
              <h1 className="text-3xl font-bold text-white mb-2">Detail Kendaraan</h1>
              <p className="text-neutral-400">Informasi lengkap kendaraan</p>
            </div>
            <Link
              href="/vehicles"
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium transition-colors"
            >
              ← Kembali
            </Link>
          </div>
        </div>

        {/* Vehicle Details Card */}
        <div className="glass rounded-xl p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-white">Informasi Kendaraan</h2>
            <div className="flex space-x-3">
              <Link
                href={`/vehicles/${id}/edit`}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
              >
                Edit
              </Link>
              <DeleteButton
                deleteAction={deleteVehicle}
                itemId={id}
                confirmMessage="Yakin ingin menghapus kendaraan ini? Semua data perawatan terkait akan ikut terhapus."
                className=""
                buttonText="Hapus"
                buttonClassName="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-1">Plat Nomor</label>
              <p className="text-xl font-bold text-red-500 font-mono">{vehicle.license_plate}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-1">Merk</label>
              <p className="text-lg font-semibold text-white">{vehicle.brand}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-1">Model</label>
              <p className="text-lg font-semibold text-white">{vehicle.model}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-1">Tahun</label>
              <p className="text-lg font-semibold text-white">{vehicle.year}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-1">Warna</label>
              <p className="text-lg font-semibold text-white">{vehicle.color}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-1">Kilometer Terakhir</label>
              <p className="text-lg font-semibold text-white">{vehicle.mileage?.toLocaleString('id-ID')} km</p>
            </div>
          </div>
        </div>

        {/* Maintenance History */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Riwayat Perawatan</h2>
            <Link
              href={`/maintenances/new?vehicle=${id}`}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-red-600/20"
            >
              + Tambah Perawatan
            </Link>
          </div>

          <div className="glass rounded-xl overflow-hidden">
            <table className="min-w-full divide-y divide-neutral-800">
              <thead className="bg-neutral-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Jenis Perawatan
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {new Date(maintenance.date).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {maintenance.maintenance_types?.name}
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
                          className="text-blue-500 hover:text-blue-400"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">
                      Belum ada riwayat perawatan untuk kendaraan ini
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
