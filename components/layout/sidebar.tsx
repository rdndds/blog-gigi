'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Settings, Grid3x3 } from 'lucide-react';
import VisitorCounter from '@/components/widgets/visitor-counter';
import SearchWidgetClient from '@/components/widgets/search-widget-client';
import TimeWidget from '@/components/widgets/time-widget';
import CloudTag from '@/components/widgets/cloud-tag';
import BlogRoll from '@/components/widgets/blog-roll';
import LatestArticles from '@/components/widgets/latest-articles';
import MapsWidget from '@/components/widgets/maps-widget';
import CalendarWidgetWrapper from '@/components/widgets/calendar-widget-wrapper';

// Mock articles for search widget
const mockArticles = [
  {
    slug: 'panduan-kesehatan-gigi',
    title: 'Panduan Lengkap Kesehatan Gigi Anak',
    excerpt: 'Tips lengkap menjaga kesehatan gigi anak',
    date: '2025-01-15',
    tags: ['edukasi', 'anak']
  },
  {
    slug: 'teknologi-3d-kedokteran',
    title: 'Teknologi 3D dalam Kedokteran Gigi',
    excerpt: 'Inovasi teknologi 3D untuk kedokteran gigi modern',
    date: '2025-01-20',
    tags: ['teknologi', '3D']
  }
];

interface WidgetSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  defaultExpanded: boolean;
  priority: 'high' | 'medium' | 'low';
}

export default function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [visibleWidgets, setVisibleWidgets] = useState<Set<string>>(new Set());

  // Define widget sections with organization
  const widgetSections: WidgetSection[] = [
    {
      id: 'search',
      title: 'Pencarian',
      icon: <Grid3x3 className="w-4 h-4" />,
      component: <SearchWidgetClient articles={mockArticles} />,
      defaultExpanded: true,
      priority: 'high'
    },
    {
      id: 'visitor-counter',
      title: 'Statistik',
      icon: <Settings className="w-4 h-4" />,
      component: <VisitorCounter />,
      defaultExpanded: true,
      priority: 'high'
    },
    {
      id: 'calendar',
      title: 'Kalender',
      icon: <Settings className="w-4 h-4" />,
      component: <CalendarWidgetWrapper />,
      defaultExpanded: true,
      priority: 'medium'
    },
    {
      id: 'time',
      title: 'Waktu',
      icon: <Settings className="w-4 h-4" />,
      component: <TimeWidget />,
      defaultExpanded: true,
      priority: 'medium'
    },
    {
      id: 'articles',
      title: 'Artikel Terbaru',
      icon: <Settings className="w-4 h-4" />,
      component: <LatestArticles />,
      defaultExpanded: false,
      priority: 'high'
    },
    {
      id: 'tags',
      title: 'Tag Populer',
      icon: <Settings className="w-4 h-4" />,
      component: <CloudTag />,
      defaultExpanded: false,
      priority: 'low'
    },
    {
      id: 'maps',
      title: 'Lokasi',
      icon: <Settings className="w-4 h-4" />,
      component: <MapsWidget />,
      defaultExpanded: false,
      priority: 'low'
    },
    {
      id: 'blog-roll',
      title: 'Blog Roll',
      icon: <Settings className="w-4 h-4" />,
      component: <BlogRoll />,
      defaultExpanded: false,
      priority: 'low'
    }
  ];

  // Initialize expanded sections
  useEffect(() => {
    const defaultExpanded = new Set(
      widgetSections
        .filter(section => section.defaultExpanded)
        .map(section => section.id)
    );
    setExpandedSections(defaultExpanded);
  }, []);

  // Progressive loading for widgets
  useEffect(() => {
    const priorities = ['high', 'medium', 'low'];
    let delay = 0;

    priorities.forEach(priority => {
      const widgets = widgetSections.filter(section => section.priority === priority);

      widgets.forEach(widget => {
        setTimeout(() => {
          setVisibleWidgets(prev => new Set([...prev, widget.id]));
        }, delay);
        delay += 200; // Stagger loading
      });
    });
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      {/* Sidebar Header */}
      <div className="glass-morphism rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">
          Widget Interaktif
        </h3>
        <p className="text-sm text-neutral-600">
          Jelajahi konten dan fitur menarik
        </p>
      </div>

      {/* Widget Sections */}
      <div className="space-y-3">
        {widgetSections.map((section) => {
          const isExpanded = expandedSections.has(section.id);
          const isVisible = visibleWidgets.has(section.id);

          return (
            <div
              key={section.id}
              className={`glass-morphism rounded-xl overflow-hidden transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/30 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    {section.icon}
                  </div>
                  <span className="font-semibold text-gray-900">
                    {section.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {section.priority === 'high' && (
                    <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500 transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500 transition-transform duration-200" />
                  )}
                </div>
              </button>

              {/* Section Content */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                  {isVisible ? (
                    <div className="animate-fade-in-up">
                      {section.component}
                    </div>
                  ) : (
                    <div className="widget-base">
                      <div className="space-y-3">
                        <div className="skeleton h-4 w-24 rounded"></div>
                        <div className="skeleton h-20 rounded-lg"></div>
                        <div className="skeleton h-12 rounded-lg"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="glass-morphism rounded-xl p-4 mt-6">
        <div className="grid grid-cols-2 gap-2">
          <button className="p-3 bg-primary-100 hover:bg-primary-200 rounded-lg transition-colors duration-200 text-xs font-medium text-primary-700">
            Expand All
          </button>
          <button className="p-3 bg-secondary-100 hover:bg-secondary-200 rounded-lg transition-colors duration-200 text-xs font-medium text-secondary-700">
            Collapse All
          </button>
        </div>
      </div>
    </div>
  );
}
