import React from 'react';
import { getArticleBySlug, getArticles, getRelatedArticles, remarkBreaks } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { groupConsecutiveImages } from '@/lib/markdown';
import ShareSection from '@/components/article/share-section';
import RelatedArticles from '@/components/article/related-articles';
import PageNavigation from '@/components/article/page-navigation';
import LightboxGallery from '@/components/article/lightbox-gallery';
import RelatedLinks from '@/components/article/related-links';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const formattedDate = format(new Date(article.date), 'MMMM d, yyyy');
  const relatedArticles = await getRelatedArticles(slug, article.tags, 2);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/articles" 
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Artikel
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link key={tag} href={`/articles?tag=${encodeURIComponent(tag)}`}>
                  <Badge 
                    variant="secondary" 
                    className="bg-primary-100 text-primary-800 border-primary-200 hover:bg-primary-200 hover:text-primary-900 transition-colors cursor-pointer"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="markdown-content mb-8">
          <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>
          {article.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.image}
              alt={article.title}
              className="rounded-lg shadow-medium my-6 w-full max-w-3xl mx-auto"
            />
          )}
           <ReactMarkdown
             remarkPlugins={[remarkGfm, groupConsecutiveImages, remarkBreaks]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-4xl font-heading font-bold text-gray-900 mt-8 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-3xl font-heading font-semibold text-gray-900 mt-6 mb-3" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-2xl font-heading font-semibold text-gray-900 mt-4 mb-2" {...props} />,
              h4: ({node, ...props}) => <h4 className="text-xl font-heading font-medium text-gray-900 mt-3 mb-2" {...props} />,
               p: ({node, children, ...props}) => {
                 // Check if this paragraph is marked as an image grid by our plugin
                 const isImageGrid = (node as any)?.data?.isImageGrid;

                 if (isImageGrid) {
                   return (
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
                       {children}
                     </div>
                   );
                 }

                 return <p className="text-gray-700 leading-relaxed mb-4" {...props}>{children}</p>;
               },
              ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2" {...props} />,
              li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
              strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
              em: ({node, ...props}) => <em className="italic" {...props} />,
              br: () => <br className="my-1" />,
              a: ({node, children, ...props}) => {
                // Check if link contains only an image
                const childArray = React.Children.toArray(children);
                const hasOnlyImage = childArray.length === 1 && 
                                    childArray[0] &&
                                    typeof childArray[0] === 'object' &&
                                    (childArray[0] as any).type === 'img';
                
                if (hasOnlyImage) {
                  return <a {...props} className="block w-full">{children}</a>;
                }
                
                return <a className="text-primary-600 hover:text-primary-700 underline" {...props}>{children}</a>;
              },
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-700 my-4" {...props} />,
              code: ({node, ...props}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800" {...props} />,
               img: ({node, ...props}) => (
                 // eslint-disable-next-line @next/next/no-img-element
                 <img
                   className="rounded-lg shadow-medium w-full h-auto object-cover"
                   alt={props.alt || 'Article image'}
                   {...props}
                 />
               ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* Image Gallery */}
        {article.gallery && article.gallery.length > 0 && (
          <LightboxGallery 
            images={article.gallery} 
            columns={article.gallery.length === 2 ? 2 : 3}
          />
        )}

        {/* Related Links */}
        {article.relatedLinks && article.relatedLinks.length > 0 && (
          <RelatedLinks links={article.relatedLinks} />
        )}

        {/* Share Section */}
        <ShareSection 
          title={article.title}
          url={`/articles/${article.slug}`}
        />

        {/* Page Navigation */}
        <PageNavigation />

        {/* Related Articles */}
        <RelatedArticles articles={relatedArticles} />
      </div>
    </div>
  );
}
