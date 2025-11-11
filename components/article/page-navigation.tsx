import Link from 'next/link';
import { ArrowRight, User, Home } from 'lucide-react';

export default function PageNavigation() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
          Jelajahi Halaman Lainnya
        </h3>
        
        <Link
          href="/about"
          className="flex items-start gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all duration-300 group"
        >
          <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors">
            <User className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              Tentang Saya
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Kunjungi halaman Tentang Saya untuk mengenal penulis blog ini lebih dekat.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
        </Link>

        <Link
          href="/"
          className="flex items-start gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all duration-300 group"
        >
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <Home className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              Beranda
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Kembali ke halaman utama untuk melihat konten menarik lainnya.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
        </Link>
      </div>
    </div>
  );
}
