'use client';

import { useState } from 'react';
import { ExternalLink, Link2 } from 'lucide-react';

interface RelatedLinksProps {
  links: Array<{ title: string; url: string }>;
}

function FaviconImage({ url }: { url: string }) {
  const [error, setError] = useState(false);
  
  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).origin;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  const faviconUrl = getFaviconUrl(url);

  if (error || !faviconUrl) {
    return <ExternalLink className="w-5 h-5 text-primary-600" />;
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={faviconUrl}
        alt=""
        className="w-5 h-5"
        onError={() => setError(true)}
      />
    </>
  );
}

export default function RelatedLinks({ links }: RelatedLinksProps) {
  if (!links || links.length === 0) return null;

  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return 'Link';
    }
  };

  return (
    <div className="mb-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
      <div className="flex items-center gap-2 mb-4">
        <Link2 className="w-5 h-5 text-primary-600" />
        <h3 className="text-xl font-heading font-semibold text-gray-900">
          Lihat Juga
        </h3>
      </div>
      
      <div className="space-y-3">
        {links.map((link, index) => {
          const domain = getDomain(link.url);
          
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 p-4 bg-white rounded-lg border border-primary-200 hover:border-primary-400 hover:shadow-md transition-all duration-200"
            >
              {/* Favicon or Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <FaviconImage url={link.url} />
              </div>

              {/* Link Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2">
                      {link.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 truncate">
                      {domain}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors flex-shrink-0 mt-1" />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
