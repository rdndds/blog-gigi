import { getArticles } from '@/lib/markdown';
import ArticleCard from '@/components/article/article-card';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SearchWidget from '@/components/widgets/search-widget';

const ARTICLES_PER_PAGE = 6;

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; tag?: string; page?: string; date?: string }>;
}) {
  const params = await searchParams;
  const allArticles = await getArticles();
  
  // Filter articles based on search and tag
  let filteredArticles = allArticles;
  
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredArticles = filteredArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }
  
  if (params.tag) {
    const tagLower = params.tag.toLowerCase();
    filteredArticles = filteredArticles.filter((article) =>
      article.tags.some((tag) => tag.toLowerCase() === tagLower)
    );
  }

  if (params.date) {
    const targetDate = new Date(params.date);
    filteredArticles = filteredArticles.filter((article) => {
      const articleDate = new Date(article.date);
      return (
        articleDate.getFullYear() === targetDate.getFullYear() &&
        articleDate.getMonth() === targetDate.getMonth() &&
        articleDate.getDate() === targetDate.getDate()
      );
    });
  }

  // Pagination
  const currentPage = parseInt(params.page || '1', 10);
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  // Generate pagination URL
  const getPaginationUrl = (page: number) => {
    const searchParamsObj = new URLSearchParams();
    if (params.search) searchParamsObj.set('search', params.search);
    if (params.tag) searchParamsObj.set('tag', params.tag);
    if (params.date) searchParamsObj.set('date', params.date);
    if (page > 1) searchParamsObj.set('page', page.toString());
    const queryString = searchParamsObj.toString();
    return `/articles${queryString ? `?${queryString}` : ''}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-heading font-bold text-gray-900 mb-4">
            Artikel Kesehatan Gigi
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Informasi terkini dan tips seputar kesehatan gigi dan mulut
          </p>

          {/* Search Widget */}
          <div className="max-w-2xl mx-auto mb-6">
            <SearchWidget />
          </div>
          
          {/* Search/Filter Info */}
          {(params.search || params.tag || params.date) && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {params.search && (
                <span className="text-sm text-gray-600">
                  Pencarian: <strong className="text-primary-600">{params.search}</strong>
                </span>
              )}
              {params.tag && (
                <span className="text-sm text-gray-600">
                  Tag: <strong className="text-primary-600">{params.tag}</strong>
                </span>
              )}
              {params.date && (
                <span className="text-sm text-gray-600">
                  Tanggal: <strong className="text-primary-600">{new Date(params.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
                </span>
              )}
              <a
                href="/articles"
                className="text-sm text-primary-600 hover:text-primary-700 underline"
              >
                Hapus filter
              </a>
            </div>
          )}
        </div>

        {/* Articles Grid */}
        {paginatedArticles.length > 0 ? (
          <>
            <p className="text-gray-600 mb-6">
              Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)} dari {filteredArticles.length} artikel
              {params.search || params.tag ? ' yang sesuai' : ''}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                {/* Previous Button */}
                {currentPage > 1 ? (
                  <Link
                    href={getPaginationUrl(currentPage - 1)}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Sebelumnya</span>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Sebelumnya</span>
                  </button>
                )}

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Link
                          key={page}
                          href={getPaginationUrl(page)}
                          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                            page === currentPage
                              ? 'bg-primary-600 text-white font-semibold'
                              : 'border border-gray-300 bg-white hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </Link>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="px-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Next Button */}
                {currentPage < totalPages ? (
                  <Link
                    href={getPaginationUrl(currentPage + 1)}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="hidden sm:inline">Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                  >
                    <span className="hidden sm:inline">Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-soft">
            <p className="text-gray-500 text-lg mb-2">
              {params.search || params.tag || params.date
                ? 'Tidak ada artikel yang sesuai dengan pencarian Anda.'
                : 'Belum ada artikel tersedia. Periksa kembali nanti untuk konten menarik!'}
            </p>
            {(params.search || params.tag || params.date) && (
              <a
                href="/articles"
                className="inline-block mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Lihat Semua Artikel
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
