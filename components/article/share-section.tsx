'use client';

import { useState } from 'react';
import { Share2, Copy, Facebook, Twitter, Linkedin, MessageCircle, X } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

interface ShareSectionProps {
  title: string;
  url: string;
}

export default function ShareSection({ title, url }: ShareSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : url;
  const shareText = encodeURIComponent(`${title} - Senyum Sehat`);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setShowModal(false);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Gagal menyalin link');
    }
  };

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    const width = 600;
    const height = 500;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    window.open(
      shareLinks[platform],
      '_blank',
      `width=${width},height=${height},left=${left},top=${top},toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1`
    );
    setShowModal(false);
  };

  return (
    <>
      <Card className="border-0 shadow-soft bg-gradient-to-r from-primary-50 to-secondary-50 hover:shadow-large transition-shadow">
        <CardContent className="p-6 text-center">
          <p className="text-gray-700 mb-4">
            Artikel ini bermanfaat? Bagikan ke teman-teman Anda!
          </p>
          
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Bagikan
            </button>
            <Link href="/articles">
              <button className="px-6 py-2 bg-white text-primary-600 font-medium rounded-lg border border-primary-200 hover:border-primary-300 transition-colors">
                Baca Artikel Lainnya
              </button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Share Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Bagikan Artikel</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6 line-clamp-2">
              {title}
            </p>

            <div className="space-y-3">
              {/* Copy Link Button */}
              <button
                onClick={handleCopyLink}
                className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors inline-flex items-center gap-3 font-medium"
              >
                <Copy className="w-5 h-5" />
                Salin Link
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => handleShare('whatsapp')}
                className="w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors inline-flex items-center gap-3 font-medium"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleShare('facebook')}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center gap-3 font-medium"
              >
                <Facebook className="w-5 h-5" />
                Facebook
              </button>

              {/* Twitter */}
              <button
                onClick={() => handleShare('twitter')}
                className="w-full px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors inline-flex items-center gap-3 font-medium"
              >
                <Twitter className="w-5 h-5" />
                Twitter
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => handleShare('linkedin')}
                className="w-full px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors inline-flex items-center gap-3 font-medium"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <Copy className="w-5 h-5" />
            <span className="font-medium">Link berhasil disalin!</span>
          </div>
        </div>
      )}
    </>
  );
}
