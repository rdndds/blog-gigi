"use client";

import { useState, useEffect } from "react";
import CalendarWidget from "./calendar-widget";
import { Article } from "@/lib/markdown";

// Mock articles data to avoid server-side imports
const mockArticles: Article[] = [
  {
    slug: "panduan-kesehatan-gigi",
    title: "Panduan Lengkap Kesehatan Gigi Anak",
    excerpt: "Tips lengkap menjaga kesehatan gigi anak",
    date: "2025-01-15",
    author: "Erdinta Ovielia",
    readTime: "5 menit",
    tags: ["edukasi", "anak"],
    content: "",
    image: "",
  },
  {
    slug: "teknologi-3d-kedokteran",
    title: "Teknologi 3D dalam Kedokteran Gigi",
    excerpt: "Inovasi teknologi 3D untuk kedokteran gigi modern",
    date: "2025-01-20",
    author: "Dr. Sarah",
    readTime: "7 menit",
    tags: ["teknologi", "3D"],
    content: "",
    image: "",
  },
];

export default function CalendarWidgetWrapper() {
  const [calendarArticles, setCalendarArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchCalendarData = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Map mock articles to calendar format
      const articles = mockArticles.map((article) => ({
        date: article.date,
        slug: article.slug,
        title: article.title,
      }));

      setCalendarArticles(articles);
      setLoading(false);
    };

    fetchCalendarData();
  }, []);

  if (loading) {
    return (
      <div className="widget-base">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2 text-neutral-700 mb-2">
            <div className="p-1.5 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg">
              <div className="skeleton w-4 h-4" />
            </div>
            <div className="skeleton h-4 w-24 rounded" />
          </div>

          {/* Calendar skeleton */}
          <div className="skeleton h-48 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return <CalendarWidget articles={calendarArticles} />;
}
