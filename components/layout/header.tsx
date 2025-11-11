'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (mobileMenuOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Artikel', href: '/articles' },
    { name: 'Kesehatan Gigi', href: '/dental-health' },
    { name: 'Tentang Saya', href: '/about' },
    { name: 'Hobi', href: '/hobbies' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-pink-100 bg-white">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="p-2 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg group-hover:scale-110 transition-transform shadow-medium">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-heading font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
            Senyum Sehat
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive(item.href)
                  ? 'bg-pink-100 text-pink-700 font-semibold'
                  : 'text-gray-700 hover:text-pink-700 hover:bg-pink-50'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-pink-50 hover:text-pink-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
              isAnimating ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Slide-out Menu */}
          <div className={`fixed top-0 right-0 bottom-0 w-[280px] bg-white shadow-xl z-50 md:hidden transition-transform duration-300 ease-in-out ${
            isAnimating ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-pink-100">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-medium">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-heading font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
                  Menu
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-pink-50 hover:text-pink-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Navigation Links */}
            <nav className="p-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-medium'
                      : 'text-gray-700 hover:bg-pink-50 hover:text-pink-700 hover:translate-x-1'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
