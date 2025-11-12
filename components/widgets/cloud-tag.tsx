'use client';

import { useState, useEffect } from 'react';
import { Tag, TrendingUp, Hash } from 'lucide-react';
import Link from 'next/link';

interface TagData {
  name: string;
  count: number;
  weight: number;
}

// Mock data for development - replace with actual data fetching
const mockTags: TagData[] = [
  { name: 'karies', count: 15, weight: 1.0 },
  { name: 'edukasi', count: 12, weight: 0.85 },
  { name: 'anak', count: 10, weight: 0.75 },
  { name: '3D', count: 8, weight: 0.65 },
  { name: 'digital', count: 7, weight: 0.6 },
  { name: 'preventif', count: 6, weight: 0.55 },
  { name: 'gigi', count: 5, weight: 0.5 },
  { name: 'kesehatan', count: 4, weight: 0.45 },
  { name: 'teknologi', count: 3, weight: 0.4 },
  { name: 'inovasi', count: 2, weight: 0.35 },
];

export default function CloudTag() {
  const [tags, setTags] = useState<TagData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchTags = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setTags(mockTags);
      setLoading(false);
    };

    fetchTags();
  }, []);

  if (loading) {
    return (
      <div className="widget-base">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2 text-neutral-700 mb-2">
            <div className="p-1.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <Tag className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold">Tag Populer</span>
          </div>

          {/* Tag cloud skeleton */}
          <div className="flex flex-wrap gap-2 justify-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="skeleton h-6 rounded-full"
                style={{ width: `${60 + Math.random() * 40}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (tags.length === 0) {
    return (
      <div className="widget-base">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2 text-neutral-700 mb-2">
            <div className="p-1.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <Tag className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold">Tag Populer</span>
          </div>

          {/* Empty state */}
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-neutral-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <Hash className="w-6 h-6 text-neutral-400" />
            </div>
            <p className="text-sm text-neutral-500">Belum ada tag tersedia</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate font sizes based on weight
  const getFontSize = (weight: number) => {
    const baseSize = 0.75; // 12px
    const maxSize = 1.5;   // 24px
    return baseSize + (maxSize - baseSize) * weight;
  };

  const getColorIntensity = (weight: number) => {
    if (weight >= 0.8) return 'text-primary-700 bg-primary-100';
    if (weight >= 0.6) return 'text-primary-600 bg-primary-50';
    if (weight >= 0.4) return 'text-neutral-600 bg-neutral-50';
    return 'text-neutral-500 bg-neutral-100';
  };

  return (
    <div className="widget-base">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <Tag className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-neutral-800">Tag Populer</span>
          </div>
          <div className="flex items-center gap-1 text-primary-600">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs font-medium">{tags.length} tags</span>
          </div>
        </div>

        {/* Tag Cloud */}
        <div className="flex flex-wrap gap-2 justify-center items-center py-4 min-h-[120px]">
          {tags.map((tag, index) => {
            const fontSize = getFontSize(tag.weight);
            const colorClass = getColorIntensity(tag.weight);
            const isHovered = hoveredTag === tag.name;

            return (
              <Link
                key={tag.name}
                href={`/articles?tag=${encodeURIComponent(tag.name)}`}
                className={`
                  relative px-3 py-1.5 rounded-full transition-all duration-300 ease-out
                  ${colorClass}
                  ${isHovered ? 'scale-110 shadow-lg z-10' : 'hover:scale-105 hover:shadow-md'}
                  font-medium
                `}
                style={{
                  fontSize: `${fontSize}rem`,
                  animationDelay: `${index * 100}ms`
                }}
                onMouseEnter={() => setHoveredTag(tag.name)}
                onMouseLeave={() => setHoveredTag(null)}
              >
                <span className="relative z-10">{tag.name}</span>

                {/* Animated background effect */}
                <div
                  className={`
                    absolute inset-0 rounded-full transition-opacity duration-300
                    ${isHovered ? 'opacity-100' : 'opacity-0'}
                  `}
                  style={{
                    background: 'radial-gradient(circle, rgba(255,112,67,0.1) 0%, transparent 70%)',
                    transform: 'scale(1.2)'
                  }}
                />

                {/* Count indicator */}
                <span className="ml-1 text-xs opacity-70">
                  {tag.count}
                </span>

                {/* Hover tooltip */}
                {isHovered && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20">
                    {tag.count} artikel
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer with view all link */}
        <div className="pt-3 border-t border-neutral-100">
          <Link
            href="/tags"
            className="flex items-center justify-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium py-2 px-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
          >
            Lihat Semua Tags
            <TrendingUp className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
