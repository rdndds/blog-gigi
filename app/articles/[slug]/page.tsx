import React from "react";
import {
  getArticleBySlug,
  getArticles,
  getRelatedArticles,
} from "@/lib/markdown";
import { notFound } from "next/navigation";
import EnhancedArticleLayout from "@/components/article/enhanced/enhanced-article-layout";
import { EnhancedArticle } from "@/types/article";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Get related articles
  const relatedArticles = await getRelatedArticles(slug, article.tags, 3);

  // Transform to EnhancedArticle format
  const enhancedArticle: EnhancedArticle = {
    ...article,
    // Additional enhanced fields will be processed in the client component
  };

  const enhancedRelatedArticles: EnhancedArticle[] = relatedArticles.map(
    (article) => ({
      ...article,
      // Additional enhanced fields will be processed in the client component
    }),
  );

  return (
    <EnhancedArticleLayout
      article={enhancedArticle}
      relatedArticles={enhancedRelatedArticles}
    />
  );
}
