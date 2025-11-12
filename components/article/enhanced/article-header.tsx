"use client";

import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Calendar,
  Clock,
  User,
  BookOpen,
  Tag,
  ChevronLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { EnhancedArticle } from "@/types/article";

interface ArticleHeaderProps {
  article: EnhancedArticle;
  onBackClick?: () => void;
}

export default function ArticleHeader({
  article,
  onBackClick,
}: ArticleHeaderProps) {
  const formattedDate = format(new Date(article.date), "d MMMM yyyy", {
    locale: id,
  });

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case "news":
        return "Berita";
      case "educational":
        return "Edukasi";
      case "research":
        return "Penelitian";
      case "tutorial":
        return "Tutorial";
      default:
        return "Artikel";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "Pemula";
      case "intermediate":
        return "Menengah";
      case "advanced":
        return "Lanjutan";
      default:
        return "Umum";
    }
  };

  return (
    <header className="article-header mb-8 animate-fade-in">
      {/* Back Navigation */}
      {onBackClick ? (
        <button
          onClick={onBackClick}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Artikel</span>
        </button>
      ) : (
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Artikel</span>
        </Link>
      )}

      {/* Article Meta Tags */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Badge
          variant="outline"
          className="bg-primary-50 text-primary-700 border-primary-200"
        >
          <BookOpen className="w-3 h-3 mr-1" />
          {getContentTypeLabel(article.contentType || "educational")}
        </Badge>

        {article.difficulty && (
          <Badge
            variant="outline"
            className={getDifficultyColor(article.difficulty)}
          >
            {getDifficultyLabel(article.difficulty)}
          </Badge>
        )}

        {article.series && (
          <Badge
            variant="outline"
            className="bg-accent-50 text-accent-700 border-accent-200"
          >
            Seri: {article.series.name} ({article.series.part}/
            {article.series.totalParts})
          </Badge>
        )}
      </div>

      {/* Article Title */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-6 leading-tight">
        {article.title}
      </h1>

      {/* Article Excerpt */}
      <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl">
        {article.excerpt}
      </p>

      {/* Featured Image */}
      {article.image && (
        <div className="mb-8 rounded-2xl overflow-hidden shadow-medium group">
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      )}

      {/* Author and Meta Information */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-6 text-gray-600">
          {/* Author */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{article.author}</p>
              <p className="text-sm text-gray-500">Penulis</p>
            </div>
          </div>

          {/* Publication Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{formattedDate}</span>
          </div>

          {/* Reading Time */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{article.readTime}</span>
          </div>

          {/* Word Count */}
          {article.wordCount && (
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-400" />
              <span>{article.wordCount.toLocaleString("id-ID")} kata</span>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Topik:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link key={tag} href={`/articles?tag=${encodeURIComponent(tag)}`}>
                <Badge
                  variant="secondary"
                  className="bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100 hover:text-primary-800 transition-colors cursor-pointer"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
