"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Search, FileQuestion, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SearchWidgetClient from "@/components/widgets/search-widget-client";
import { useEffect, useState } from "react";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
}

export default function NotFound() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles");
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  const quickLinks = [
    { name: "Beranda", href: "/", icon: Home },
    { name: "Artikel", href: "/articles", icon: FileQuestion },
    { name: "Kesehatan Gigi", href: "/dental-health", icon: Sparkles },
    { name: "Tentang", href: "/about", icon: FileQuestion },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* Animated 404 */}
        <div className="mb-8 relative text-center">
          <div className="text-[150px] md:text-[200px] font-black leading-none bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 bg-clip-text text-transparent animate-pulse">
            404
          </div>
          <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Oops! Halaman Tidak Ditemukan
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau
            tidak pernah ada.
          </p>
          <p className="text-md text-gray-500">
            Jangan khawatir, kami akan membantu Anda menemukan jalan kembali! 😊
          </p>
        </div>

        {/* Search Widget */}
        <div className="mb-8 max-w-2xl mx-auto text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <Search className="w-5 h-5 text-primary-600" />
            Coba Cari Artikel
          </h3>
          <SearchWidgetClient articles={articles} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="border-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
            >
              <Home className="w-4 h-4 mr-2" />
              Ke Beranda
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="border-0 shadow-medium hover:shadow-large transition-all transform hover:scale-105 bg-white hover:bg-gradient-to-br hover:from-primary-50 hover:to-white cursor-pointer">
                <CardContent className="p-6 text-center">
                  <link.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                  <p className="font-medium text-gray-900">{link.name}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Fun Fact */}
        <Card className="mt-8 border-0 shadow-medium bg-gradient-to-r from-primary-100 to-accent-100">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">💡 Tahukah Anda?</span> Sementara
              Anda di sini, jangan lupa untuk menyikat gigi 2 kali sehari dan
              flossing secara teratur! 🪥
            </p>
          </CardContent>
        </Card>

        {/* Decorative Blobs */}
        <div className="fixed top-10 left-10 w-32 h-32 bg-primary-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="fixed bottom-10 right-10 w-40 h-40 bg-accent-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
}
