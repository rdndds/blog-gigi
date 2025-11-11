import { getArticles } from '@/lib/markdown';
import CalendarWidget from './calendar-widget';

export default async function CalendarWidgetWrapper() {
  const articles = await getArticles();
  
  // Map articles to calendar format
  const calendarArticles = articles.map((article) => ({
    date: article.date,
    slug: article.slug,
    title: article.title,
  }));

  return <CalendarWidget articles={calendarArticles} />;
}
