import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: LayoutProps) {
  // No authentication needed - single admin app

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Navigation */}
      <nav className="bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/dashboard" className="flex items-center space-x-3">
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
                  <span className="text-xl font-bold">
                    <span className="text-white">Alba</span>
                    <span className="text-red-600">Auto</span>
                    <span className="text-white">Care</span>
                  </span>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden sm:ml-8 sm:flex sm:space-x-1">
                <Link
                  href="/dashboard"
                  className="border-transparent text-neutral-400 hover:text-white hover:bg-neutral-800/50 inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium transition-all rounded-t-lg"
                >
                  Dashboard
                </Link>
                <Link
                  href="/vehicles"
                  className="border-transparent text-neutral-400 hover:text-white hover:bg-neutral-800/50 inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium transition-all rounded-t-lg"
                >
                  Kendaraan
                </Link>
                <Link
                  href="/maintenances"
                  className="border-transparent text-neutral-400 hover:text-white hover:bg-neutral-800/50 inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium transition-all rounded-t-lg"
                >
                  Perawatan
                </Link>
                <Link
                  href="/spare-parts"
                  className="border-transparent text-neutral-400 hover:text-white hover:bg-neutral-800/50 inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium transition-all rounded-t-lg"
                >
                  Suku Cadang
                </Link>
                <Link
                  href="/maintenance-types"
                  className="border-transparent text-neutral-400 hover:text-white hover:bg-neutral-800/50 inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium transition-all rounded-t-lg"
                >
                  Jenis Perawatan
                </Link>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-neutral-400">Admin</span>
                <span className="text-xs px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-600/30">
                  👑 Admin
                </span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-neutral-950/80 backdrop-blur-xl border-t border-neutral-800 mt-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-neutral-500">
                &copy; {new Date().getFullYear()} Alba AutoCare. All rights reserved.
              </p>
              <p className="text-sm text-neutral-600">
                Powered by <span className="text-red-600 font-semibold">Next.js</span>
              </p>
            </div>
          </div>
        </footer>

      </div>
  );
}
