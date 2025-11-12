import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsAppWidget from "@/components/widgets/whatsapp-widget";
import { getWidgetsData } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: "Senyum Cerdas 2025 - Kesehatan Gigi untuk Generasi Emas Indonesia",
  description:
    "Blog edukasi kesehatan gigi dan inovasi digital kesehatan gigi dan mulut oleh Erdinta Ovielia Putri - Mahasiswa Poltekkes Kemenkes Semarang",
  keywords:
    "kesehatan gigi anak, digital age, karies, anti-gula, edukasi 3D, Semarang, Poltekkes, kesehatan mulut",
  icons: {
    icon: "/images/icon.png",
  },
};

export const viewport = {
  themeColor: "#ffffff",
  colorScheme: "light" as const,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const widgetsData = getWidgetsData();

  return (
    <html lang="id" data-scroll-behavior="smooth" className="light">
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppWidget
          phoneNumber={widgetsData.whatsappWidget.phoneNumber}
          message={widgetsData.whatsappWidget.message}
        />
      </body>
    </html>
  );
}
