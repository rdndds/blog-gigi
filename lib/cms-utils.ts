import ImageGallery from '@/components/article/image-gallery';
import React from 'react';

/**
 * Parse and render custom components from markdown content
 * Supports: ImageGallery, InfoBox, etc.
 */
export function parseCustomComponents(content: string): React.ReactNode {
  // Pattern to match ImageGallery component
  const galleryPattern = /<ImageGallery\s+images=\{(\[[\s\S]*?\])\}\s+columns=\{(\d+)\}(?:\s+caption="([^"]*)")?\s*\/>/g;
  
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = galleryPattern.exec(content)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(content.substring(lastIndex, match.index));
    }

    // Parse the component
    try {
      const images = JSON.parse(match[1]);
      const columns = parseInt(match[2]);
      const caption = match[3] || undefined;

      parts.push(
        React.createElement(ImageGallery, {
          key: `gallery-${match.index}`,
          images,
          columns,
          caption,
        })
      );
    } catch (e) {
      // If parsing fails, keep the original text
      parts.push(match[0]);
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex));
  }

  return parts.length > 0 ? parts : content;
}

/**
 * Check if content has custom components
 */
export function hasCustomComponents(content: string): boolean {
  return /<ImageGallery/.test(content);
}
