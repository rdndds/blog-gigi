import { Suspense } from 'react';
import HeroSection from '@/components/home/hero-section';
import FeaturedArticles from '@/components/home/featured-articles';
import Sidebar from '@/components/layout/sidebar';
import { getArticles } from '@/lib/markdown';

export default async function HomePage() {
  const articles = await getArticles();
  const featuredArticles = articles.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <HeroSection />
          <FeaturedArticles articles={featuredArticles} />
        </div>
        
        {/* Sidebar with Widgets */}
        <aside className="lg:col-span-1">
          <Suspense fallback={<div className="text-center py-8">Memuat widget...</div>}>
            <Sidebar />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}
