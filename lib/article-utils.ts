import { TableOfContentsItem } from "@/types/article";

// Generate table of contents from article content
export function generateTableOfContents(
  content: string,
): TableOfContentsItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: TableOfContentsItem[] = [];
  const stack: TableOfContentsItem[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = generateHeadingId(title);

    const heading: TableOfContentsItem = {
      id,
      title,
      level,
      children: [],
    };

    // Find parent in stack
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      headings.push(heading);
    } else {
      if (!stack[stack.length - 1].children) {
        stack[stack.length - 1].children = [];
      }
      stack[stack.length - 1].children!.push(heading);
    }

    stack.push(heading);
  }

  return headings;
}

// Generate heading ID from title
export function generateHeadingId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .trim();
}

// Calculate enhanced reading time for Indonesian content
export function calculateEnhancedReadTime(
  content: string,
  difficulty: "beginner" | "intermediate" | "advanced" = "intermediate",
): number {
  // Indonesian reading speeds (words per minute)
  const readingSpeeds = {
    beginner: 150, // Slower for complex medical content
    intermediate: 200, // Average Indonesian reading speed
    advanced: 250, // Faster for medical professionals
  };

  const wordCount = content.split(/\s+/).length;
  const wordsPerMinute = readingSpeeds[difficulty];
  const baseMinutes = wordCount / wordsPerMinute;

  // Add extra time for complex medical terms and visual content
  const medicalTerms = (
    content.match(
      /\b(karies|gigi|mulut|kesehatan|pengobatan|diagnosis|terapi)\b/gi,
    ) || []
  ).length;
  const extraTime = medicalTerms * 0.1; // 6 seconds per medical term

  // Add time for images (assuming 30 seconds per significant image)
  const images = (content.match(/!\[.*?\]\(.*?\)/g) || []).length;
  const imageTime = images * 0.5;

  return Math.ceil(baseMinutes + extraTime + imageTime);
}

// Detect article content type
export function detectContentType(
  title: string,
  content: string,
  tags: string[],
): "news" | "educational" | "research" | "tutorial" {
  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();
  const lowerTags = tags.map((tag) => tag.toLowerCase());

  // News indicators
  const newsKeywords = ["berita", "terbaru", "kabar", "update", "pengumuman"];
  if (
    newsKeywords.some(
      (keyword) => lowerTitle.includes(keyword) || lowerTags.includes(keyword),
    )
  ) {
    return "news";
  }

  // Tutorial indicators
  const tutorialKeywords = [
    "tutorial",
    "panduan",
    "cara",
    "langkah",
    "petunjuk",
  ];
  if (
    tutorialKeywords.some(
      (keyword) => lowerTitle.includes(keyword) || lowerTags.includes(keyword),
    )
  ) {
    return "tutorial";
  }

  // Research indicators
  const researchKeywords = [
    "penelitian",
    "studi",
    "jurnal",
    "analisis",
    "laporan",
  ];
  if (
    researchKeywords.some(
      (keyword) => lowerTitle.includes(keyword) || lowerTags.includes(keyword),
    )
  ) {
    return "research";
  }

  // Default to educational for dental health content
  return "educational";
}

// Detect article difficulty level
export function detectDifficulty(
  content: string,
  tags: string[],
): "beginner" | "intermediate" | "advanced" {
  const medicalComplexity =
    content.match(
      /\b(karies|periodontitis|endodontik|prostodonsia|ortodonti)\b/gi,
    )?.length || 0;
  const hasProcedureSteps =
    content.match(/\b(langkah|tahap|prosedur|metode)\b/gi)?.length || 0;
  const hasTechnicalTerms = (
    content.match(/\b(diagnosis|terapi|intervensi|implementasi)\b/gi) || []
  ).length;

  // Advanced content indicators
  if (medicalComplexity > 5 || hasTechnicalTerms > 3) {
    return "advanced";
  }

  // Beginner content indicators
  if (medicalComplexity <= 2 && hasProcedureSteps === 0) {
    return "beginner";
  }

  return "intermediate";
}

// Extract medical terms for highlighting
export function extractMedicalTerms(content: string): string[] {
  const medicalTermRegex =
    /\b(karies|gigi|mulut|kesehatan|pengobatan|diagnosis|terapi|periodontitis|endodontik|prostodonsia|ortodonti|plak|tartar|scaling|bleaching|implan|gigitan|anjur|puskesmas|ukgs)\b/gi;
  const matches = content.match(medicalTermRegex) || [];
  return [...new Set(matches.map((term) => term.toLowerCase()))];
}

// Format reading time in Indonesian
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) {
    return "Kurang dari 1 menit";
  }
  return `${minutes} menit`;
}

// Calculate word count
export function calculateWordCount(content: string): number {
  // Remove markdown syntax and count words
  const cleanContent = content
    .replace(/[#*_~`]/g, "") // Remove markdown symbols
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Convert links to text
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, "") // Remove images
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .trim();

  return cleanContent.split(/\s+/).filter((word) => word.length > 0).length;
}
