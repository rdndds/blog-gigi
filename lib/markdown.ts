import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Custom remark plugin to group consecutive image-only paragraphs
export function groupConsecutiveImages() {
  return (tree: any) => {
    const children = tree.children;
    const indicesToRemove: number[] = [];

    for (let i = 0; i < children.length; i++) {
      const node = children[i];

      // Check if this is an image-only paragraph (or link wrapping an image)
      const isImageParagraph =
        node.type === "paragraph" &&
        node.children?.length === 1 &&
        (node.children[0].type === "image" ||
          (node.children[0].type === "link" &&
            node.children[0].children?.length === 1 &&
            node.children[0].children[0].type === "image"));

      if (isImageParagraph) {
        // Start collecting consecutive image paragraphs
        const imageGroup: any[] = [node.children[0]];
        let j = i + 1;

        while (j < children.length) {
          const nextNode = children[j];
          const isNextImageParagraph =
            nextNode.type === "paragraph" &&
            nextNode.children?.length === 1 &&
            (nextNode.children[0].type === "image" ||
              (nextNode.children[0].type === "link" &&
                nextNode.children[0].children?.length === 1 &&
                nextNode.children[0].children[0].type === "image"));

          if (isNextImageParagraph) {
            imageGroup.push(nextNode.children[0]);
            indicesToRemove.push(j);
            j++;
          } else {
            break;
          }
        }

        // If we found multiple consecutive images, group them
        if (imageGroup.length > 1) {
          node.children = imageGroup;
          node.data = node.data || {};
          node.data.isImageGrid = true;
        }

        // Skip ahead past the grouped images
        i = j - 1;
      }
    }

    // Remove the merged paragraphs (in reverse order to maintain indices)
    for (let i = indicesToRemove.length - 1; i >= 0; i--) {
      children.splice(indicesToRemove[i], 1);
    }
  };
}

// Custom remark plugin to convert single line breaks to <br> tags
export function remarkBreaks() {
  return (tree: any) => {
    function visit(node: any) {
      if (node.type === "paragraph" && node.children) {
        const newChildren: any[] = [];

        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];

          if (child.type === "text") {
            // Split text on single newlines
            const parts = child.value.split("\n");

            for (let j = 0; j < parts.length; j++) {
              if (parts[j]) {
                newChildren.push({
                  type: "text",
                  value: parts[j],
                });
              }

              // Add break between parts (but not after the last one)
              if (j < parts.length - 1) {
                newChildren.push({
                  type: "break",
                });
              }
            }
          } else {
            newChildren.push(child);
          }
        }

        node.children = newChildren;
      }

      // Recursively visit children
      if (node.children) {
        node.children.forEach(visit);
      }
    }

    tree.children.forEach(visit);
  };
}

const articlesDirectory = path.join(process.cwd(), "content/articles");

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  readTime: string;
  gallery?: Array<{ image: string; title?: string }>;
  relatedLinks?: Array<{ title: string; url: string }>;
}

// Fetch page title from URL
async function fetchPageTitle(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Senyum Cerdas 2025 Bot/1.0)",
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const html = await response.text();

    // Try to extract title from HTML
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      return titleMatch[1].trim();
    }

    // Fallback to og:title
    const ogTitleMatch = html.match(
      /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i,
    );
    if (ogTitleMatch && ogTitleMatch[1]) {
      return ogTitleMatch[1].trim();
    }

    // If no title found, return domain name
    return new URL(url).hostname.replace("www.", "");
  } catch (error) {
    // On error, return domain name
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return "External Link";
    }
  }
}

// Process related links and fetch missing titles
async function processRelatedLinks(
  links: Array<{ title?: string; url: string }>,
): Promise<Array<{ title: string; url: string }>> {
  if (!links || links.length === 0) return [];

  const processed = await Promise.all(
    links.map(async (link) => {
      if (link.title && link.title.trim()) {
        return { title: link.title, url: link.url };
      }

      // Fetch title if missing
      const title = await fetchPageTitle(link.url);
      return { title, url: link.url };
    }),
  );

  return processed;
}

export async function getArticles(): Promise<Article[]> {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);

  const articles = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        excerpt:
          data.excerpt && data.excerpt.trim().length > 10
            ? data.excerpt
            : generateExcerpt(content),
        content,
        date: data.date || new Date().toISOString(),
        author: data.author || "Anonymous",
        image: data.image || "/images/articles/default.jpg",
        tags: data.tags || [],
        readTime: calculateReadTime(content),
        gallery: data.gallery || [],
        relatedLinks: data.relatedLinks || [],
      };
    });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Process related links and fetch missing titles
    const relatedLinks = await processRelatedLinks(data.relatedLinks || []);

    return {
      slug,
      title: data.title || "Untitled",
      excerpt: data.excerpt || generateExcerpt(content),
      content,
      date: data.date || new Date().toISOString(),
      author: data.author || "Anonymous",
      image: data.image || "/images/articles/default.jpg",
      tags: data.tags || [],
      readTime: calculateReadTime(content),
      gallery: data.gallery || [],
      relatedLinks,
    };
  } catch {
    return null;
  }
}

function generateExcerpt(content: string): string {
  const paragraphs = content.split(/\n\n+/).filter((p) => p.trim());
  let excerpt = "";

  for (const para of paragraphs) {
    // Skip headings
    if (para.trim().startsWith("#")) continue;

    // Strip basic markdown
    let clean = para
      .replace(/\*\*(.*?)\*\*/g, "$1") // bold
      .replace(/\*(.*?)\*/g, "$1") // italic
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // links
      .replace(/^#+\s*/, "") // headings
      .trim();

    excerpt += clean + " ";
    if (excerpt.length > 120) break;
  }

  excerpt = excerpt.trim();
  if (excerpt.length > 150) {
    excerpt = excerpt.substring(0, 150) + "...";
  }

  return excerpt;
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export async function getRelatedArticles(
  currentSlug: string,
  tags: string[],
  limit: number = 2,
): Promise<Article[]> {
  const allArticles = await getArticles();

  // Filter out current article
  const otherArticles = allArticles.filter(
    (article) => article.slug !== currentSlug,
  );

  if (otherArticles.length === 0) {
    return [];
  }

  // Calculate relevance score based on matching tags
  const scoredArticles = otherArticles.map((article) => {
    const matchingTags = article.tags.filter((tag) =>
      tags.includes(tag),
    ).length;
    return {
      article,
      score: matchingTags,
    };
  });

  // Sort by score (most matching tags first), then by date
  scoredArticles.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return (
      new Date(b.article.date).getTime() - new Date(a.article.date).getTime()
    );
  });

  // Return top articles
  return scoredArticles.slice(0, limit).map((item) => item.article);
}
