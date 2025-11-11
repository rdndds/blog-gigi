import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Card, CardContent } from '@/components/ui/card';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-50 mt-20 py-12">
      <div className="container mx-auto px-4">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Brand Card */}
          <Card className="border-0 shadow-medium bg-gradient-to-br from-primary-100 to-white hover:shadow-large transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-2xl font-heading font-bold text-primary-600 mb-3">
                Senyum Sehat
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Blog edukasi kesehatan gigi dan mulut untuk Indonesia Hebat. 
                Berbagi pengetahuan dari mahasiswa kesehatan gigi.
              </p>
            </CardContent>
          </Card>

          {/* Quick Links Card */}
          <Card className="border-0 shadow-medium bg-white hover:shadow-large transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigasi</h3>
               <div className="grid grid-cols-2 gap-3">
                 <Link
                   href="/"
                   className="text-sm text-gray-700 hover:text-primary-700 font-medium transition-all border-2 border-gray-200 hover:border-primary-500 rounded-lg px-3 py-2 text-center hover:bg-primary-50 hover:shadow-md"
                 >
                   Beranda
                 </Link>
                 <Link
                   href="/articles"
                   className="text-sm text-gray-700 hover:text-primary-700 font-medium transition-all border-2 border-gray-200 hover:border-primary-500 rounded-lg px-3 py-2 text-center hover:bg-primary-50 hover:shadow-md"
                 >
                   Artikel
                 </Link>
                 <Link
                   href="/dental-health"
                   className="text-sm text-gray-700 hover:text-primary-700 font-medium transition-all border-2 border-gray-200 hover:border-primary-500 rounded-lg px-3 py-2 text-center hover:bg-primary-50 hover:shadow-md"
                 >
                   Kesehatan Gigi
                 </Link>
                 <Link
                   href="/about"
                   className="text-sm text-gray-700 hover:text-primary-700 font-medium transition-all border-2 border-gray-200 hover:border-primary-500 rounded-lg px-3 py-2 text-center hover:bg-primary-50 hover:shadow-md"
                 >
                   Tentang
                 </Link>
                 <Link
                   href="/hobbies"
                   className="text-sm text-gray-700 hover:text-primary-700 font-medium transition-all border-2 border-gray-200 hover:border-primary-500 rounded-lg px-3 py-2 text-center hover:bg-primary-50 hover:shadow-md"
                 >
                   Hobi
                 </Link>
               </div>
            </CardContent>
          </Card>

          {/* Social Media Card */}
          <Card className="border-0 shadow-medium bg-gradient-to-br from-primary-100 to-white hover:shadow-large transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ikuti Kami</h3>
              <p className="text-sm text-gray-600 mb-4">
                Kota Semarang, Jawa Tengah
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white hover:shadow-large transition-all transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-600 text-white hover:shadow-large transition-all transform hover:scale-110"
                  aria-label="YouTube"
                >
                  <FontAwesomeIcon icon={faYoutube} className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-500 text-white hover:shadow-large transition-all transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Bar */}
        <div className="text-center pt-8 border-t border-primary-200">
          <p className="text-sm text-gray-600">
            &copy; {currentYear} <span className="font-semibold text-primary-600">Senyum Sehat</span> - Dibuat dengan 💖 oleh Shalsha Billa
          </p>
        </div>
      </div>
    </footer>
  );
}
