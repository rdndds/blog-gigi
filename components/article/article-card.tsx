import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Article } from "@/lib/markdown";
import { format } from "date-fns";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = format(new Date(article.date), "MMM d, yyyy");

  return (
    <Card className="group overflow-hidden border-0 shadow-soft hover:shadow-large transition-all duration-300 bg-white">
      {/* Article Image */}
      <div className="relative h-48 overflow-hidden">
        {article.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center">
              <span className="text-2xl">🦷</span>
            </div>
          </div>
        )}

        {/* Tags on image */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {article.tags.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-white/95 text-gray-900 shadow-sm"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <CardContent className="p-6 space-y-3">
        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-heading font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Link href={`/articles/${article.slug}`} className="w-full">
          <Button className="w-full group/btn">
            Baca Selengkapnya
            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
