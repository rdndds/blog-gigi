"use client";

import React, { useState, useEffect } from "react";
import { EnhancedArticle } from "@/types/article";
import {
  generateTableOfContents,
  calculateEnhancedReadTime,
  detectContentType,
  detectDifficulty,
  calculateWordCount,
} from "@/lib/article-utils";
import ArticleHeader from "./article-header";
import TableOfContents from "./table-of-contents";
import ReadingProgress from "./reading-progress";
import ArticleContent from "./article-content";
import ShareSection from "@/components/article/share-section";
import RelatedArticles from "@/components/article/related-articles";
import LightboxGallery from "@/components/article/lightbox-gallery";
import RelatedLinks from "@/components/article/related-links";

interface EnhancedArticleLayoutProps {
  article: EnhancedArticle;
  relatedArticles?: EnhancedArticle[];
  className?: string;
}

export default function EnhancedArticleLayout({
  article,
  relatedArticles = [],
  className = "",
}: EnhancedArticleLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [tableOfContents, setTableOfContents] = useState<any[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [completedSections, setCompletedSections] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [enhancedArticle, setEnhancedArticle] =
    useState<EnhancedArticle>(article);

  // Process article content and generate metadata
  useEffect(() => {
    const toc = generateTableOfContents(article.content);
    setTableOfContents(toc);

    // Extract section headings
    const headings = article.content.match(/^#{1,6}\s+(.+)$/gm) || [];
    const sectionList = headings.map((heading) =>
      heading.replace(/^#{1,6}\s+/, "").trim(),
    );
    setSections(sectionList);

    // Calculate enhanced reading time
    const difficulty = detectDifficulty(article.content, article.tags);
    const readingTime = calculateEnhancedReadTime(article.content, difficulty);
    setEstimatedTime(readingTime);

    // Detect content type
    const contentType = detectContentType(
      article.title,
      article.content,
      article.tags,
    );
    const wordCount = calculateWordCount(article.content);

    // Update article with enhanced metadata
    setEnhancedArticle({
      ...article,
      contentType,
      difficulty,
      wordCount,
      estimatedReadingTime: readingTime,
    });
  }, [article]);

  // Track section completion
  useEffect(() => {
    if (activeSection && sections.includes(activeSection)) {
      const currentIndex = sections.indexOf(activeSection);
      setCompletedSections(currentIndex + 1);
    }
  }, [activeSection, sections]);

  // Handle section change for TOC
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Reading Progress Bar */}
      <ReadingProgress
        totalSections={sections.length}
        completedSections={completedSections}
        estimatedTime={estimatedTime}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 max-w-article-wide mx-auto">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <article className="bg-white rounded-2xl shadow-soft overflow-hidden">
              {/* Article Header */}
              <div className="p-6 md:p-8">
                <ArticleHeader article={enhancedArticle} />
              </div>

              {/* Article Content */}
              <div className="px-6 md:px-8 pb-8">
                <ArticleContent
                  content={enhancedArticle.content}
                  onSectionChange={handleSectionChange}
                />
              </div>

              {/* Article Footer */}
              <div className="px-6 md:px-8 pb-8">
                {/* Share Section */}
                <div className="border-t border-gray-200 pt-8 mb-8">
                  <ShareSection
                    title={enhancedArticle.title}
                    url={`/articles/${enhancedArticle.slug}`}
                  />
                </div>

                {/* Image Gallery */}
                {enhancedArticle.gallery &&
                  enhancedArticle.gallery.length > 0 && (
                    <div className="mb-8">
                      <LightboxGallery
                        images={enhancedArticle.gallery}
                        columns={enhancedArticle.gallery.length === 2 ? 2 : 3}
                      />
                    </div>
                  )}

                {/* Related Links */}
                {enhancedArticle.relatedLinks &&
                  enhancedArticle.relatedLinks.length > 0 && (
                    <div className="mb-8">
                      <RelatedLinks links={enhancedArticle.relatedLinks} />
                    </div>
                  )}
              </div>
            </article>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-8">
                <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
                  <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                    Artikel Terkait
                  </h2>
                  <RelatedArticles articles={relatedArticles} />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <TableOfContents
              items={tableOfContents}
              activeSection={activeSection}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
