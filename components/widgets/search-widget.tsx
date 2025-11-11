import { getArticles } from '@/lib/markdown';
import SearchWidgetClient from './search-widget-client';

export default async function SearchWidget() {
  const articles = await getArticles();
  
  // Prepare article data for client-side search
  const searchData = articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    tags: article.tags,
    date: article.date,
  }));

  return <SearchWidgetClient articles={searchData} />;
}
