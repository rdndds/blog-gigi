import Link from "next/link";
import { Calendar, Clock, ArrowRight, User, BookOpen } from "lucide-react";
import { Article } from "@/lib/markdown";
import { format } from "date-fns";
import Image from "next/image";

interface ModernArticleCardProps {
  article?: Article;
  featured?: boolean;
  loading?: boolean;
}

// Skeleton Card Component
function ArticleCardSkeleton({ featured = false }: { featured?: boolean }) {
  if (featured) {
    return (
      <article className="bg-white rounded-2xl shadow-card overflow-hidden border border-neutral-100">
        <div className="relative h-80 lg:h-96">
          <div className="skeleton w-full h-full" />
          <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
            <div className="flex gap-2">
              <div className="skeleton h-6 w-20 rounded-full" />
              <div className="skeleton h-6 w-16 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="skeleton h-10 w-3/4 rounded" />
              <div className="skeleton h-10 w-1/2 rounded" />
            </div>
            <div className="flex gap-4">
              <div className="skeleton h-4 w-24 rounded" />
              <div className="skeleton h-4 w-16 rounded" />
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="space-y-3">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-5/6 rounded" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-xl shadow-card overflow-hidden border border-neutral-100 h-full flex flex-col">
      <div className="relative h-48">
        <div className="skeleton w-full h-full" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <div className="skeleton h-5 w-16 rounded" />
          <div className="skeleton h-5 w-12 rounded" />
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex gap-3 mb-3">
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton h-3 w-3 rounded" />
          <div className="skeleton h-3 w-12 rounded" />
        </div>
        <div className="space-y-2 mb-3 flex-1">
          <div className="skeleton h-6 w-full rounded" />
          <div className="skeleton h-6 w-4/5 rounded" />
        </div>
        <div className="space-y-2 mb-4">
          <div className="skeleton h-3 w-full rounded" />
          <div className="skeleton h-3 w-3/4 rounded" />
          <div className="skeleton h-3 w-5/6 rounded" />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
          <div className="skeleton h-4 w-24 rounded" />
          <div className="skeleton h-4 w-4 rounded" />
        </div>
      </div>
    </article>
  );
}

export default function ModernArticleCard({
  article,
  featured = false,
  loading = false,
}: ModernArticleCardProps) {
  // Show skeleton if loading or no article
  if (loading || !article) {
    return <ArticleCardSkeleton featured={featured} />;
  }

  const formattedDate = format(new Date(article.date), "MMM d, yyyy");

  if (featured) {
    return (
      <Link href={`/articles/${article.slug}`} className="group block">
        <article className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden border border-neutral-100 group-hover:border-primary-200">
          {/* Featured Image Section */}
          <div className="relative h-80 lg:h-96 overflow-hidden">
            {article.image ? (
              <div className="relative w-full h-full">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">🦷</span>
                  </div>
                  <h3 className="text-2xl font-bold">Senyum Cerdas</h3>
                </div>
              </div>
            )}

            {/* Content Overlay on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-3 group-hover:text-primary-200 transition-colors">
                {article.title}
              </h2>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Content Below Image */}
          <div className="p-8">
            <div className="flex items-center justify-between">
              <p className="text-neutral-600 line-clamp-2 flex-1 mr-4">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-2 text-primary-600 group-hover:text-primary-700 font-semibold">
                Baca
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden border border-neutral-100 group-hover:border-primary-200 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {article.image ? (
            <div className="relative w-full h-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center">
                <span className="text-2xl">🦷</span>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-neutral-500 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {article.author}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 flex-1">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-neutral-600 text-sm line-clamp-3 mb-4">
            {article.excerpt}
          </p>

          {/* CTA */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-100">
            <div className="flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:text-primary-700">
              Baca Selengkapnya
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <BookOpen className="w-4 h-4 text-neutral-400" />
          </div>
        </div>
      </article>
    </Link>
  );
}
