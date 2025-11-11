import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import WhatsAppWidget from '@/components/widgets/whatsapp-widget';
import { getWidgetsData } from '@/lib/content';
import './globals.css';

export const metadata: Metadata = {
  title: 'Senyum Sehat untuk Indonesia Hebat - Blog Kesehatan Gigi',
  description: 'Blog edukasi kesehatan gigi dan mulut oleh Shalsha Billa - Mendukung Program CKG Nasional 2025 di Kota Semarang',
  keywords: 'kesehatan gigi, Semarang, CKG, UKGS, Puskesmas, kesehatan mulut',
  icons: {
    icon: '/images/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const widgetsData = getWidgetsData();

  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppWidget phoneNumber={widgetsData.whatsappWidget.phoneNumber} message={widgetsData.whatsappWidget.message} />
      </body>
    </html>
  );
}
