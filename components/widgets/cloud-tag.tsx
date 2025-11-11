import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';
import Link from 'next/link';
import { getArticles } from '@/lib/markdown';

export default async function CloudTag() {
  const articles = await getArticles();
  
  // Extract and count tags from all articles
  const tagCounts: Record<string, number> = {};
  articles.forEach((article) => {
    article.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // Convert to array and sort by count (descending)
  const tags = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Show top 10 tags

  if (tags.length === 0) {
    return null; // Don't show widget if no tags
  }

  return (
    <Card className="border-0 shadow-soft bg-white hover:shadow-large transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Tag className="w-4 h-4 text-primary-600" />
          Tag Populer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag.name} href={`/articles?tag=${encodeURIComponent(tag.name)}`}>
              <Badge
                variant="outline"
                className="text-sm hover:bg-primary-100 hover:text-primary-800 hover:border-primary-400 transition-colors cursor-pointer"
              >
                {tag.name} ({tag.count})
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
