import { Suspense } from "react";
import HeroSection from "@/components/home/hero-section";
import FeaturedArticles from "@/components/home/featured-articles";
import Sidebar from "@/components/layout/sidebar";
import { getArticles } from "@/lib/markdown";

export default async function HomePage() {
  const articles = await getArticles();
  const featuredArticles = articles.slice(0, 7); // Get one more for featured grid

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section - Full Width */}
      <HeroSection />

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Content Area */}
          <main className="xl:col-span-8 space-y-16">
            {/* Featured Articles Section */}
            <section className="animate-fade-in-up">
              <FeaturedArticles articles={featuredArticles} />
            </section>

            {/* Additional Content Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Educational Focus Card */}
              <div className="glass-morphism rounded-2xl p-8 hover-lift">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-gray-900">
                    Edukasi Digital
                  </h3>
                </div>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  Menggabungkan teknologi 3D dan AI untuk pengalaman belajar
                  kesehatan gigi yang interaktif dan mudah dipahami.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge-primary">3D Education</span>
                  <span className="badge-secondary">AI Integration</span>
                  <span className="badge-primary">Interactive</span>
                </div>
              </div>

              {/* Innovation Focus Card */}
              <div className="glass-morphism rounded-2xl p-8 hover-lift">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-gray-900">
                    Inovasi Kesehatan
                  </h3>
                </div>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  Solusi kesehatan gigi modern untuk generasi emas Indonesia
                  dengan pendekatan yang ramah anak.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge-secondary">Innovation</span>
                  <span className="badge-primary">Child-Friendly</span>
                  <span className="badge-secondary">Modern</span>
                </div>
              </div>
            </div>
          </main>

          {/* Sidebar with Widgets */}
          <aside className="xl:col-span-4">
            <div className="sticky top-24 space-y-8">
              <Suspense
                fallback={
                  <div className="widget-base">
                    <div className="space-y-4">
                      <div className="skeleton h-4 w-24 rounded"></div>
                      <div className="skeleton h-32 rounded-lg"></div>
                    </div>
                  </div>
                }
              >
                <Sidebar />
              </Suspense>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
