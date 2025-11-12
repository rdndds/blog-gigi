"use client";

import React, { useState, useEffect } from "react";
import { List, ChevronRight, ChevronDown, Menu, X } from "lucide-react";
import { TableOfContentsItem } from "@/types/article";
import { Button } from "@/components/ui/button";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  activeSection?: string;
  className?: string;
}

interface TocItemProps {
  item: TableOfContentsItem;
  isActive: boolean;
  onItemClick: (id: string) => void;
  level: number;
}

const TocItem: React.FC<TocItemProps> = ({
  item,
  isActive,
  onItemClick,
  level,
}) => {
  const paddingLeft = (level - 1) * 16;

  return (
    <li>
      <div
        className={`group flex items-center py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-primary-50 ${
          isActive
            ? "bg-primary-100 text-primary-700 border-l-4 border-primary-500"
            : "text-gray-600 hover:text-gray-900"
        }`}
        style={{ paddingLeft: `${paddingLeft + 12}px` }}
        onClick={() => onItemClick(item.id)}
      >
        <span className="flex-1 text-sm font-medium leading-tight">
          {item.title}
        </span>
        <ChevronRight
          className={`w-3 h-3 transition-transform duration-200 ${
            isActive
              ? "text-primary-600 rotate-90"
              : "text-gray-400 group-hover:text-gray-600"
          }`}
        />
      </div>
      {item.children && item.children.length > 0 && (
        <ul className="mt-1">
          {item.children.map((child) => (
            <TocItem
              key={child.id}
              item={child}
              isActive={isActive}
              onItemClick={onItemClick}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default function TableOfContents({
  items,
  activeSection,
  className = "",
}: TableOfContentsProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentActiveSection, setCurrentActiveSection] = useState(
    activeSection || "",
  );

  useEffect(() => {
    setCurrentActiveSection(activeSection || "");
  }, [activeSection]);

  const handleItemClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setCurrentActiveSection(id);

      // Close mobile TOC after selection
      if (window.innerWidth < 768) {
        setIsMobileOpen(false);
      }
    }
  };

  // Desktop sticky sidebar version
  const DesktopTOC = () => (
    <div className={`hidden lg:block ${className}`}>
      <div className="sticky top-24 w-64 max-w-toc">
        <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <List className="w-5 h-5 text-primary-600" />
            <h3 className="font-semibold text-gray-900">Daftar Isi</h3>
          </div>
          {items.length > 0 ? (
            <nav>
              <ul className="space-y-1">
                {items.map((item) => (
                  <TocItem
                    key={item.id}
                    item={item}
                    isActive={currentActiveSection === item.id}
                    onItemClick={handleItemClick}
                    level={1}
                  />
                ))}
              </ul>
            </nav>
          ) : (
            <p className="text-sm text-gray-500 italic">
              Tidak ada heading ditemukan
            </p>
          )}
        </div>
      </div>
    </div>
  );

  // Mobile floating button and bottom sheet version
  const MobileTOC = () => (
    <div className="lg:hidden">
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-toc">
        <Button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-large bg-primary-600 hover:bg-primary-700 transition-all duration-200 hover:scale-110"
          aria-label="Toggle table of contents"
        >
          {isMobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <List className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Bottom Sheet Overlay */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 lg:hidden max-h-[70vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <List className="w-5 h-5 text-primary-600" />
                  <h3 className="font-semibold text-gray-900">Daftar Isi</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              {items.length > 0 ? (
                <nav>
                  <ul className="space-y-1">
                    {items.map((item) => (
                      <TocItem
                        key={item.id}
                        item={item}
                        isActive={currentActiveSection === item.id}
                        onItemClick={handleItemClick}
                        level={1}
                      />
                    ))}
                  </ul>
                </nav>
              ) : (
                <p className="text-sm text-gray-500 italic text-center py-8">
                  Tidak ada heading ditemukan
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      <DesktopTOC />
      <MobileTOC />
    </>
  );
}
