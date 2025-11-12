import { Article } from '@/lib/markdown';
import ModernArticleCard from '@/components/article/modern-article-card';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedArticlesProps {
  articles: Article[];
}

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  if (articles.length === 0) {
    return (
      <section id="featured-articles" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-neutral-100 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-neutral-600" />
              <span className="text-sm font-medium text-neutral-700">Artikel Terbaru</span>
            </div>
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-8">
              Artikel Pilihan
            </h2>
            <div className="bg-white rounded-2xl p-16 shadow-card border border-neutral-100">
              <div className="w-16 h-16 bg-neutral-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🦷</span>
              </div>
              <p className="text-neutral-500">Belum ada artikel tersedia. Periksa kembali nanti!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Separate featured article (first) and grid articles (rest)
  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1, 7); // Show max 6 additional articles

  return (
    <section id="featured-articles" className="py-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-neutral-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-neutral-600" />
            <span className="text-sm font-medium text-neutral-700">Artikel Terbaru</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Artikel Pilihan
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
            Temukan insight terbaru tentang kesehatan gigi anak di era digital dan inovasi edukasi 3D
          </p>
          <a
            href="/articles"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold group"
          >
            Lihat Semua Artikel
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Featured Article (Large) */}
        {featuredArticle && (
          <div className="mb-12 animate-slide-up">
            <ModernArticleCard article={featuredArticle} featured={true} />
          </div>
        )}

        {/* Grid Articles */}
        {gridArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridArticles.map((article, index) => (
              <div
                key={article.slug}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ModernArticleCard article={article} featured={false} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
