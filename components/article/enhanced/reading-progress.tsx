"use client";

import React, { useState, useEffect, useRef } from "react";
import { Clock, BookOpen, Target } from "lucide-react";

interface ReadingProgressProps {
  totalSections?: number;
  completedSections?: number;
  estimatedTime?: number;
  className?: string;
}

export default function ReadingProgress({
  totalSections = 0,
  completedSections = 0,
  estimatedTime = 0,
  className = "",
}: ReadingProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(100, (scrollTop / docHeight) * 100);
      setScrollProgress(progress);

      // Detect if user is actively reading
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityRef.current;

      if (timeSinceLastActivity > 1000) {
        // User scrolled after 1 second of inactivity
        setIsReading(true);
        if (!startTimeRef.current) {
          startTimeRef.current = currentTime - 1000; // Account for the scroll time
        }
        lastActivityRef.current = currentTime;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsReading(false);
      } else {
        lastActivityRef.current = Date.now();
      }
    };

    const handleMouseMove = () => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityRef.current;

      if (timeSinceLastActivity > 2000) {
        // User moved mouse after 2 seconds
        setIsReading(true);
        if (!startTimeRef.current) {
          startTimeRef.current = currentTime - 2000;
        }
        lastActivityRef.current = currentTime;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Update time spent
  useEffect(() => {
    const interval = setInterval(() => {
      if (isReading && startTimeRef.current) {
        setTimeSpent(Date.now() - startTimeRef.current);
      } else if (!isReading) {
        startTimeRef.current = null;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isReading]);

  // Format time spent
  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes === 0) {
      return `${remainingSeconds}d`;
    } else if (minutes < 60) {
      return `${minutes}m ${remainingSeconds}d`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}j ${remainingMinutes}m`;
    }
  };

  // Calculate reading speed
  const readingSpeed =
    estimatedTime > 0 ? (timeSpent / (estimatedTime * 60 * 1000)) * 100 : 0;
  const speedLabel =
    readingSpeed < 80 ? "Cepat" : readingSpeed > 120 ? "Lambat" : "Normal";

  // Calculate section progress
  const sectionProgress =
    totalSections > 0 ? (completedSections / totalSections) * 100 : 0;

  // Progress bar color based on speed
  const getProgressColor = () => {
    if (readingSpeed < 80) return "bg-green-500";
    if (readingSpeed > 120) return "bg-orange-500";
    return "bg-primary-600";
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-progress h-1 bg-gray-200">
        <div
          className={`h-full ${getProgressColor()} transition-all duration-300 ease-out`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Reading Stats Panel */}
      <div className="bg-white rounded-lg shadow-soft border border-gray-100 p-4 sticky top-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Overall Progress */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-medium text-gray-500">
                Progress
              </span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {Math.round(scrollProgress)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
              <div
                className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          {/* Time Spent */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-medium text-gray-500">
                Waktu Baca
              </span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {formatTime(timeSpent)}
            </div>
            {estimatedTime > 0 && (
              <div className="text-xs text-gray-500">
                Estimasi: {estimatedTime}m
              </div>
            )}
          </div>

          {/* Reading Speed */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <BookOpen className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-medium text-gray-500">
                Kecepatan
              </span>
            </div>
            <div className="text-lg font-bold text-gray-900">{speedLabel}</div>
            {readingSpeed > 0 && (
              <div className="text-xs text-gray-500">
                {Math.round(readingSpeed)}%
              </div>
            )}
          </div>

          {/* Section Progress */}
          {totalSections > 0 && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <BookOpen className="w-4 h-4 text-primary-600" />
                <span className="text-xs font-medium text-gray-500">
                  Bagian
                </span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {completedSections}/{totalSections}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div
                  className="bg-secondary-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${sectionProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Reading Status Indicator */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${isReading ? "bg-green-500 animate-pulse" : "bg-gray-300"}`}
            />
            <span className="text-xs text-gray-600">
              {isReading ? "Sedang membaca" : "Jeda membaca"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
