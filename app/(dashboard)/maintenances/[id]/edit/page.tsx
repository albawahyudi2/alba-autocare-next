import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditMaintenancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Get maintenance details
  const { data: maintenance, error } = await supabase
    .from('maintenances')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !maintenance) {
    notFound();
  }

  // Get all vehicles
  const { data: vehicles } = await supabase
    .from('vehicles')
    .select('*')
    .order('license_plate');

  // Get maintenance types
  const { data: maintenanceTypes } = await supabase
    .from('maintenance_types')
    .select('*')
    .order('name');

  async function updateMaintenance(formData: FormData) {
    'use server';
    
    const supabase = await createClient();

    const maintenanceData = {
      vehicle_id: formData.get('vehicle_id') as string,
      maintenance_type_id: formData.get('maintenance_type_id') as string,
      date: formData.get('date') as string,
      mileage: parseInt(formData.get('mileage') as string),
      cost: parseFloat(formData.get('cost') as string),
      status: formData.get('status') as string,
      notes: formData.get('notes') as string,
    };

    const { error } = await supabase
      .from('maintenances')
      .update(maintenanceData)
      .eq('id', id);

    if (error) {
      console.error('Error updating maintenance:', error);
      return;
    }

    revalidatePath('/maintenances');
    revalidatePath(`/maintenances/${id}`);
    redirect(`/maintenances/${id}?success=Perawatan berhasil diperbarui`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Edit Perawatan</h1>
          <p className="text-neutral-400">Perbarui informasi perawatan</p>
        </div>

        {/* Form Card */}
        <div className="glass rounded-xl p-8">
          <form action={updateMaintenance} className="space-y-6">
            {/* Vehicle */}
            <div>
              <label htmlFor="vehicle_id" className="block text-sm font-medium text-neutral-300 mb-2">
                Kendaraan <span className="text-red-500">*</span>
              </label>
              <select
                id="vehicle_id"
                name="vehicle_id"
                required
                defaultValue={maintenance.vehicle_id}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
              >
                <option value="">Pilih Kendaraan</option>
                {vehicles?.map((vehicle: any) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.license_plate} - {vehicle.brand} {vehicle.model}
                  </option>
                ))}
              </select>
            </div>

            {/* Maintenance Type */}
            <div>
              <label htmlFor="maintenance_type_id" className="block text-sm font-medium text-neutral-300 mb-2">
                Jenis Perawatan <span className="text-red-500">*</span>
              </label>
              <select
                id="maintenance_type_id"
                name="maintenance_type_id"
                required
                defaultValue={maintenance.maintenance_type_id}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
              >
                <option value="">Pilih Jenis Perawatan</option>
                {maintenanceTypes?.map((type: any) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-neutral-300 mb-2">
                Tanggal Perawatan <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                defaultValue={maintenance.date}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            {/* Mileage */}
            <div>
              <label htmlFor="mileage" className="block text-sm font-medium text-neutral-300 mb-2">
                Kilometer <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="mileage"
                name="mileage"
                required
                min="0"
                defaultValue={maintenance.mileage}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                placeholder="50000"
              />
            </div>

            {/* Cost */}
            <div>
              <label htmlFor="cost" className="block text-sm font-medium text-neutral-300 mb-2">
                Biaya Total <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="cost"
                name="cost"
                required
                min="0"
                step="0.01"
                defaultValue={maintenance.cost}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                placeholder="500000"
              />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-neutral-300 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                required
                defaultValue={maintenance.status}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
              >
                <option value="pending">Menunggu</option>
                <option value="in_progress">Sedang Proses</option>
                <option value="completed">Selesai</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-neutral-300 mb-2">
                Keterangan
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                defaultValue={maintenance.notes || ''}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                placeholder="Catatan tambahan..."
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-red-600/20"
              >
                Simpan Perubahan
              </button>
              <Link
                href={`/maintenances/${id}`}
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
