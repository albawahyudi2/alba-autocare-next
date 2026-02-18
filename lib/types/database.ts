// Type definitions for database tables
export interface Profile {
  id: string;
  full_name: string | null;
  role: 'admin' | 'user';
  email: string;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: string;
  license_plate: string;
  brand: string;
  model: string;
  year: number;
  color: string | null;
  mileage: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceType {
  id: string;
  name: string;
  description: string | null;
  estimated_cost: number | null;
  created_at: string;
  updated_at: string;
}

export interface SparePart {
  id: string;
  name: string;
  code: string;
  price: number;
  stock: number;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Maintenance {
  id: string;
  vehicle_id: string;
  maintenance_type_id: string;
  date: string;
  mileage: number;
  cost: number;
  notes: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  // Relations
  vehicle?: Vehicle;
  maintenance_type?: MaintenanceType;
  spare_parts?: MaintenanceSparePart[];
}

export interface MaintenanceSparePart {
  id: string;
  maintenance_id: string;
  spare_part_id: string;
  quantity: number;
  price: number;
  created_at: string;
  // Relations
  spare_part?: SparePart;
}

// Database schema type for Supabase
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
      vehicles: {
        Row: Vehicle;
        Insert: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>>;
      };
      maintenance_types: {
        Row: MaintenanceType;
        Insert: Omit<MaintenanceType, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<MaintenanceType, 'id' | 'created_at' | 'updated_at'>>;
      };
      spare_parts: {
        Row: SparePart;
        Insert: Omit<SparePart, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SparePart, 'id' | 'created_at' | 'updated_at'>>;
      };
      maintenances: {
        Row: Maintenance;
        Insert: Omit<Maintenance, 'id' | 'created_at' | 'updated_at' | 'vehicle' | 'maintenance_type' | 'spare_parts'>;
        Update: Partial<Omit<Maintenance, 'id' | 'created_at' | 'updated_at' | 'vehicle' | 'maintenance_type' | 'spare_parts'>>;
      };
      maintenance_spare_parts: {
        Row: MaintenanceSparePart;
        Insert: Omit<MaintenanceSparePart, 'id' | 'created_at' | 'spare_part'>;
        Update: Partial<Omit<MaintenanceSparePart, 'id' | 'created_at' | 'spare_part'>>;
      };
    };
  };
}
