import { Suspense } from 'react';
import HeroSection from '@/components/home/hero-section';
import FeaturedArticles from '@/components/home/featured-articles';
import Sidebar from '@/components/layout/sidebar';
import { getArticles } from '@/lib/markdown';

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
                  Menggabungkan teknologi 3D dan AI untuk pengalaman belajar kesehatan gigi yang interaktif dan mudah dipahami.
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
                  Solusi kesehatan gigi modern untuk generasi emas Indonesia dengan pendekatan yang ramah anak.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge-secondary">Innovation</span>
                  <span className="badge-primary">Child-Friendly</span>
                  <span className="badge-secondary">Modern</span>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <section className="glass-morphism rounded-2xl p-8 lg:p-12">
              <h3 className="text-3xl font-heading font-bold text-center mb-12 gradient-text">
                Dampak Senyum Cerdas
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">10K+</div>
                  <div className="text-sm text-neutral-600">Anak Teredukasi</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-secondary-600 mb-2">50+</div>
                  <div className="text-sm text-neutral-600">Sekolah Mitra</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-600 mb-2">95%</div>
                  <div className="text-sm text-neutral-600">Kepuasan Orang Tua</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
                  <div className="text-sm text-neutral-600">Ahli Gigi</div>
                </div>
              </div>
            </section>
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

      {/* Bottom CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
            Siap Membuat Senyum Lebih Sehat?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan kami dalam misi edukasi kesehatan gigi untuk generasi emas Indonesia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary bg-white text-primary-600 hover:bg-white/90">
              Mulai Sekarang
            </button>
            <button className="btn-secondary border-white text-white hover:bg-white/10">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
