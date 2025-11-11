import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowRight } from 'lucide-react';
import { getArticles } from '@/lib/markdown';

export default async function LatestArticles() {
  const articles = await getArticles();
  const latest = articles.slice(0, 5);

  if (latest.length === 0) {
    return (
      <Card className="border-0 shadow-soft bg-white hover:shadow-large transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary-600" />
            Artikel Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Belum ada artikel.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-soft bg-white hover:shadow-large transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary-600" />
          Artikel Terbaru
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {latest.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/articles/${article.slug}`}
                className="group flex items-start gap-2 text-sm text-gray-700 hover:text-primary-700 font-medium transition-colors"
              >
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                <span className="line-clamp-2">{article.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
