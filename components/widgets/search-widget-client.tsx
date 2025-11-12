"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Calendar, Tag as TagIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
}

interface SearchWidgetClientProps {
  articles: Article[];
}

export default function SearchWidgetClient({
  articles,
}: SearchWidgetClientProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Article[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search and filter articles
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const searchLower = query.toLowerCase();
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
    );

    setSuggestions(filtered.slice(0, 5)); // Show top 5 results
    setShowSuggestions(filtered.length > 0);
    setSelectedIndex(-1);
  }, [query, articles]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/articles?search=${encodeURIComponent(query)}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      window.location.href = `/articles/${suggestions[selectedIndex].slug}`;
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-gray-900 font-semibold">
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <div ref={wrapperRef} className="relative">
      <Card className="border-0 shadow-card bg-gradient-to-br from-white to-primary-50/30 hover:shadow-card-hover transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2 text-neutral-700 mb-2">
              <div className="p-1.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                <Search className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold">Pencarian Artikel</span>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                <Input
                  type="text"
                  placeholder="Cari artikel kesehatan gigi..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() =>
                    query.length >= 2 &&
                    suggestions.length > 0 &&
                    setShowSuggestions(true)
                  }
                  className="pl-12 pr-12 h-12 bg-white/80 backdrop-blur-sm border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-primary-500 hover:bg-primary-600 transition-colors"
                >
                  <Search className="w-4 h-4 text-white" />
                </Button>
              </div>
            </form>

            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-neutral-500">Populer:</span>
              {["karies", "edukasi", "3D", "anak"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-2 py-1 bg-neutral-100 hover:bg-primary-100 text-neutral-600 hover:text-primary-700 text-xs rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2">
          <Card className="border-0 shadow-large bg-white max-h-96 overflow-y-auto">
            <CardContent className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 font-medium">
                {suggestions.length} hasil ditemukan
              </div>
              {suggestions.map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className={`block px-3 py-3 rounded-md transition-colors ${
                    index === selectedIndex
                      ? "bg-primary-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setShowSuggestions(false)}
                >
                  <div className="flex items-start gap-3">
                    <Search className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                        {highlightMatch(article.title, query)}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                        {highlightMatch(article.excerpt, query)}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(article.date), "MMM d, yyyy")}
                        </span>
                        {article.tags.length > 0 && (
                          <div className="flex items-center gap-1">
                            <TagIcon className="w-3 h-3" />
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5 py-0"
                            >
                              {article.tags[0]}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {suggestions.length === 5 && (
                <button
                  onClick={handleSearch}
                  className="w-full px-3 py-2 text-xs text-primary-600 hover:text-primary-700 font-medium text-center hover:bg-primary-50 rounded-md transition-colors"
                >
                  Lihat semua hasil untuk "{query}"
                </button>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* No Results */}
      {showSuggestions && query.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-2">
          <Card className="border-0 shadow-large bg-white">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-500">
                Tidak ada hasil untuk "<strong>{query}</strong>"
              </p>
              <p className="text-xs text-gray-400 mt-1">Coba kata kunci lain</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
