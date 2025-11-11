import { getArticles } from '@/lib/markdown';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const articles = await getArticles();
    const searchData = articles.map((article) => ({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      tags: article.tags,
      date: article.date,
    }));

    return NextResponse.json(searchData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}