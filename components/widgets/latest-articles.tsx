"use client";

import Link from "next/link";
import {
  FileText,
  ArrowRight,
  Calendar,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Article } from "@/lib/markdown";
import { format } from "date-fns";

// Mock data for development - replace with actual data fetching
const mockArticles: Article[] = [
  {
    slug: "artikel-1",
    title: "Panduan Lengkap Kesehatan Gigi Anak di Era Digital",
    excerpt:
      "Tips dan trik menjaga kesehatan gigi anak dengan teknologi modern",
    date: new Date().toISOString(),
    author: "Erdinta Ovielia",
    readTime: "5 menit",
    tags: ["edukasi", "anak", "digital"],
    content: "",
    image: "",
  },
  {
    slug: "artikel-2",
    title: "Inovasi 3D dalam Edukasi Kesehatan Gigi",
    excerpt: "Bagaimana teknologi 3D mengubah cara kita belajar kesehatan gigi",
    date: new Date(Date.now() - 86400000).toISOString(),
    author: "Dr. Sarah",
    readTime: "7 menit",
    tags: ["3D", "teknologi", "edukasi"],
    content: "",
    image: "",
  },
  {
    slug: "artikel-3",
    title: "Makanan Sehat untuk Gigi Kuat",
    excerpt: "Nutrisi terbaik untuk kesehatan gigi dan gusi anak",
    date: new Date(Date.now() - 172800000).toISOString(),
    author: "Nutritionist Team",
    readTime: "4 menit",
    tags: ["nutrisi", "makanan", "kesehatan"],
    content: "",
    image: "",
  },
];

export default function LatestArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchArticles = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setArticles(mockArticles);
      setLoading(false);
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="widget-base">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2 text-neutral-700 mb-2">
            <div className="p-1.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <div className="skeleton w-4 h-4" />
            </div>
            <div className="skeleton h-4 w-24 rounded" />
          </div>

          {/* Article skeletons */}
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-3 w-3/4 rounded" />
                <div className="flex gap-2">
                  <div className="skeleton h-3 w-12 rounded" />
                  <div className="skeleton h-3 w-8 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="widget-base">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2 text-neutral-700 mb-2">
            <div className="p-1.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold">Artikel Terbaru</span>
          </div>

          {/* Empty state */}
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-neutral-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <FileText className="w-6 h-6 text-neutral-400" />
            </div>
            <p className="text-sm text-neutral-500">
              Belum ada artikel tersedia
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="widget-base">
      <div className="space-y-4">
        {/* Header with trending indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-neutral-800">
              Artikel Terbaru
            </span>
          </div>
          <div className="flex items-center gap-1 text-primary-600">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs font-medium">Hot</span>
          </div>
        </div>

        {/* Article List */}
        <div className="space-y-4">
          {articles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group block p-3 bg-white/60 rounded-lg border border-neutral-100 hover:bg-white hover:border-primary-200 hover:shadow-sm transition-all duration-200"
            >
              <div className="space-y-2">
                {/* Article title */}
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                  {article.title}
                </h4>

                {/* Article excerpt */}
                <p className="text-xs text-neutral-600 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Meta information */}
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(article.date), "MMM d")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-3 h-3" />
                    <span className="text-primary-600 font-medium">Baca</span>
                  </div>
                </div>

                {/* Tags */}
                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-neutral-50">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-primary-50 text-primary-600 rounded-full text-[10px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="pt-3 border-t border-neutral-100">
          <Link
            href="/articles"
            className="flex items-center justify-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium py-2 px-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
          >
            Lihat Semua Artikel
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
