import { Article } from "@/lib/markdown";

export interface EnhancedArticle extends Article {
  readingProgress?: number;
  estimatedReadingTime?: number;
  wordCount?: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  contentType?: "news" | "educational" | "research" | "tutorial";
  series?: {
    name: string;
    part: number;
    totalParts: number;
    previousSlug?: string;
    nextSlug?: string;
  };
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  children?: TableOfContentsItem[];
}

export interface ReadingProgress {
  articleSlug: string;
  position: number;
  sectionId?: string;
  timeSpent: number;
  completed: boolean;
  lastRead: Date;
}

export interface ArticleSettings {
  fontSize: "small" | "medium" | "large" | "extra-large";
  theme: "light" | "dark" | "sepia";
  fontFamily: "default" | "serif" | "sans-serif";
  lineHeight: "compact" | "normal" | "relaxed";
  showProgress: boolean;
  autoBookmark: boolean;
}

export interface ArticleAnalytics {
  totalViews: number;
  averageReadTime: number;
  completionRate: number;
  shareCount: number;
  bookmarkCount: number;
  rating: number;
}

export interface EnhancedGalleryImage {
  src: string;
  title?: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  hotspot?: Array<{
    x: number;
    y: number;
    title: string;
    description: string;
  }>;
}

export interface VideoContent {
  src: string;
  title: string;
  duration: number;
  thumbnail: string;
  subtitles?: Array<{
    language: string;
    src: string;
  }>;
  chapters?: Array<{
    time: number;
    title: string;
  }>;
}
