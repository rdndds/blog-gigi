"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface CalendarWidgetProps {
  articles: Array<{
    date: string;
    slug: string;
    title: string;
  }>;
}

export default function CalendarWidget({ articles }: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Indonesian day names
  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  // Indonesian month names
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Get article counts per date
  const articlesByDate = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach((article) => {
      const date = new Date(article.date);
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, [articles]);

  // Get articles for a specific date
  const getArticlesForDate = (date: Date) => {
    return articles.filter((article) => {
      const articleDate = new Date(article.date);
      return (
        articleDate.getFullYear() === date.getFullYear() &&
        articleDate.getMonth() === date.getMonth() &&
        articleDate.getDate() === date.getDate()
      );
    });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Previous month's trailing days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevMonthLastDay - i),
      });
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        fullDate: new Date(year, month, i),
      });
    }

    // Next month's leading days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, i),
      });
    }

    return days;
  };

  const days = generateCalendarDays();
  const today = new Date();

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getArticleCount = (date: Date) => {
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return articlesByDate[key] || 0;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <Card className="border-0 shadow-soft bg-white hover:shadow-large transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-primary-600" />
            Kalender
          </div>
          <button
            onClick={goToToday}
            className="text-xs text-primary-600 hover:text-primary-700 font-medium"
          >
            Hari Ini
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-1 hover:bg-primary-50 rounded transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <span className="text-sm font-semibold text-gray-900">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={goToNextMonth}
            className="p-1 hover:bg-primary-50 rounded transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const articleCount = getArticleCount(day.fullDate);
            const dayArticles = getArticlesForDate(day.fullDate);
            const hasArticles = articleCount > 0;

            return (
              <div key={index} className="relative">
                {hasArticles ? (
                  <Link
                    href={`/articles?date=${day.fullDate.toISOString().split("T")[0]}`}
                    className={`
                      aspect-square flex flex-col items-center justify-center text-xs rounded-md transition-all
                      ${
                        isToday(day.fullDate)
                          ? "bg-primary-600 text-white font-bold shadow-md"
                          : day.isCurrentMonth
                            ? "text-gray-900 hover:bg-primary-100 font-medium"
                            : "text-gray-400"
                      }
                      ${hasArticles && !isToday(day.fullDate) ? "ring-2 ring-primary-300" : ""}
                    `}
                    title={`${articleCount} artikel${dayArticles.length > 0 ? ": " + dayArticles.map((a) => a.title).join(", ") : ""}`}
                  >
                    <span>{day.date}</span>
                    {hasArticles && (
                      <span
                        className={`text-[8px] ${isToday(day.fullDate) ? "text-white" : "text-primary-600"}`}
                      >
                        •{articleCount}
                      </span>
                    )}
                  </Link>
                ) : (
                  <div
                    className={`
                      aspect-square flex items-center justify-center text-xs rounded-md
                      ${
                        isToday(day.fullDate)
                          ? "bg-primary-600 text-white font-bold shadow-md"
                          : day.isCurrentMonth
                            ? "text-gray-700"
                            : "text-gray-300"
                      }
                    `}
                  >
                    {day.date}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary-600 rounded"></div>
            <span>Hari ini</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-primary-300 rounded"></div>
            <span>Ada artikel</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
