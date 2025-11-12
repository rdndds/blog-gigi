'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  title: string;
  caption?: string;
}

export default function OptimizedImage({ src, alt, title, caption }: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
  };

  const imageSrc = imageError
    ? `https://via.placeholder.com/800x450/f97316/white?text=${encodeURIComponent(title)}`
    : src;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="relative aspect-video bg-gray-100">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          onError={handleError}
        />
      </div>
      {caption && (
        <div className="p-4 bg-gradient-to-br from-primary-50 to-white">
          <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
          <p className="text-sm text-gray-600">{caption}</p>
        </div>
      )}
    </div>
  );
}