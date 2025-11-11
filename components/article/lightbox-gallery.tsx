'use client';

import { useEffect, useRef } from 'react';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

// Import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

interface LightboxGalleryProps {
  images: Array<{ image: string; title?: string }>;
  columns?: number;
}

export default function LightboxGallery({ images, columns = 3 }: LightboxGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!galleryRef.current) return;

    const lg = lightGallery(galleryRef.current, {
      plugins: [lgThumbnail, lgZoom],
      speed: 500,
      licenseKey: '0000-0000-000-0000'
    });

    return () => {
      lg.destroy();
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
            data-src={item.image}
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
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-6 h-6 text-gray-800"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

