'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Import types only
import type { LightGallery as ILightGallery } from 'lightgallery/lightgallery';

interface LightboxGalleryProps {
  images: Array<{ image: string; title?: string }>;
  columns?: number;
}

function LightboxGallery({ images, columns = 3 }: LightboxGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const lgInstance = useRef<ILightGallery | null>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import('lightgallery').then((lgModule) => {
      import('lg-thumbnail').then(() => {
        import('lg-zoom').then(() => {
          // Import CSS
          import('lightgallery/css/lightgallery.css');
          import('lightgallery/css/lg-thumbnail.css');
          import('lightgallery/css/lg-zoom.css');

          if (galleryRef.current && !lgInstance.current) {
            lgInstance.current = lgModule.default(galleryRef.current, {
              speed: 500,
              thumbnail: true,
              download: false,
              mobileSettings: {
                controls: true,
                showCloseIcon: true,
              },
            });
          }
        });
      });
    });

    return () => {
      if (lgInstance.current) {
        lgInstance.current.destroy();
        lgInstance.current = null;
      }
    };
  }, []);

  if (!images || images.length === 0) return null;

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  const colClass = gridCols[columns as keyof typeof gridCols] || gridCols[3];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
        Galeri Gambar
      </h2>
      <div ref={galleryRef} className={`grid ${colClass} gap-4`}>
        {images.map((item, index) => (
          <a
            key={index}
            href={item.image}
            data-lg-size="1280-720"
            data-sub-html={item.title ? `<h4>${item.title}</h4>` : ''}
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.title || `Gallery image ${index + 1}`}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {item.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">{item.title}</p>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

export default LightboxGallery;

