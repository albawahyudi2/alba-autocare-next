'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Navbar */}
      <nav className="px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            {/* Audi-style Logo */}
            <svg width="48" height="20" viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* First Ring */}
              <circle cx="7" cy="10" r="6.5" stroke="white" strokeWidth="1.5" fill="none"/>
              {/* Second Ring */}
              <circle cx="17" cy="10" r="6.5" stroke="white" strokeWidth="1.5" fill="none"/>
              {/* Third Ring */}
              <circle cx="27" cy="10" r="6.5" stroke="white" strokeWidth="1.5" fill="none"/>
              {/* Fourth Ring */}
              <circle cx="37" cy="10" r="6.5" stroke="white" strokeWidth="1.5" fill="none"/>
            </svg>
            <span className="text-white text-xl font-semibold">Alba AutoCare</span>
          </div>

          {/* Dashboard Button */}
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg font-medium transition-all shadow-lg"
          >
            Dashboard
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold mb-6">
            <span className="text-white">Alba </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">AutoCare</span>
          </h1>
          <p className="text-neutral-300 text-xl mb-10">
            Sistem Manajemen Perawatan Kendaraan yang Modern dan Profesional
          </p>
          
          {/* Main CTA Button */}
          <button
            onClick={() => router.push('/dashboard')}
            className="px-10 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-lg font-semibold rounded-xl transition-all shadow-2xl shadow-orange-600/50 hover:scale-105 transform"
          >
            Buka Dashboard
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full px-4">
          {/* Card 1 - Manajemen Kendaraan */}
          <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Manajemen Kendaraan</h3>
            <p className="text-neutral-400 text-sm">
              Kelola dan kendaraan dengan mudah dan terorganisir
            </p>
          </div>

          {/* Card 2 - Jadwal Perawatan */}
          <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Jadwal Perawatan</h3>
            <p className="text-neutral-400 text-sm">
              Atur jadwal perawatan kendaraan secara sistematis
            </p>
          </div>

          {/* Card 3 - Spare Parts */}
          <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Spare Parts</h3>
            <p className="text-neutral-400 text-sm">
              Manajemen suku cadang dan inventori yang lengkap
            </p>
          </div>

          {/* Card 4 - Laporan & Statistik */}
          <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Laporan & Statistik</h3>
            <p className="text-neutral-400 text-sm">
              Dashboard dengan visualisasi data yang lengkap
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
