"use client";

interface ImageGalleryProps {
  images: string[];
  columns?: number;
  caption?: string;
}

export default function ImageGallery({
  images,
  columns = 2,
  caption,
}: ImageGalleryProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  const colClass = gridCols[columns as keyof typeof gridCols] || gridCols[2];

  return (
    <div className="my-8">
      <div className={`grid ${colClass} gap-4`}>
        {images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
      {caption && (
        <p className="text-center text-sm text-gray-600 italic mt-3">
          {caption}
        </p>
      )}
    </div>
  );
}
