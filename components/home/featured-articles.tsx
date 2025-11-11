import { Article } from '@/lib/markdown';
import ArticleCard from '@/components/article/article-card';

interface FeaturedArticlesProps {
  articles: Article[];
}

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  if (articles.length === 0) {
    return (
      <section id="featured-articles">
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">
          Artikel Pilihan
        </h2>
        <div className="bg-white rounded-lg p-12 text-center shadow-soft">
          <p className="text-gray-500">Belum ada artikel tersedia. Periksa kembali nanti!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="featured-articles">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">
          Artikel Pilihan
        </h2>
        <a 
          href="/articles" 
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          Lihat Semua →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
