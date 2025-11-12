'use client';

import { useState, useEffect } from 'react';
import { Clock, Calendar, Sun, Moon } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function TimeWidget() {
  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsClient(true);
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isNightTime = time ? time.getHours() >= 18 || time.getHours() < 6 : false;
  const isDayTime = time ? time.getHours() >= 6 && time.getHours() < 18 : false;

  // Loading state
  if (!mounted || !time || !isClient) {
    return (
      <div className="widget-base">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2 text-neutral-700 mb-2">
            <div className="p-1.5 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold">Waktu Digital</span>
          </div>

          {/* Clock skeleton */}
          <div className="flex justify-center py-6">
            <div className="relative">
              <div className="skeleton w-32 h-32 rounded-full" />
              <div className="skeleton h-1 w-36 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              <div className="skeleton h-1 w-28 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Time skeleton */}
          <div className="text-center space-y-2">
            <div className="skeleton h-8 w-40 mx-auto rounded" />
            <div className="skeleton h-4 w-32 mx-auto rounded" />
          </div>
        </div>
      </div>
    );
  }

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate angles for analog clock hands
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  return (
    <div className="widget-base bg-gradient-to-br from-secondary-50 to-white">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-neutral-800">Waktu Digital</span>
          </div>
          <div className="flex items-center gap-1">
            {isDayTime ? (
              <Sun className="w-4 h-4 text-yellow-500" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </div>
        </div>

        {/* Analog Clock */}
        <div className="flex justify-center py-4">
          <div className="relative w-32 h-32">
            {/* Clock face */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-100 to-secondary-50 rounded-full border-2 border-secondary-200 shadow-inner">
              {/* Hour markers */}
              {[12, 3, 6, 9].map((hour, index) => (
                <div
                  key={hour}
                  className="absolute text-xs font-semibold text-secondary-600"
                  style={{
                    top: hour === 12 ? '8px' : hour === 6 ? 'auto' : '50%',
                    bottom: hour === 6 ? '8px' : 'auto',
                    left: hour === 9 ? '8px' : hour === 3 ? 'auto' : '50%',
                    right: hour === 3 ? '8px' : 'auto',
                    transform: `translate(${hour === 9 || hour === 3 ? '0' : '-50%'}, ${hour === 12 || hour === 6 ? '0' : '-50%'})`
                  }}
                >
                  {hour}
                </div>
              ))}
            </div>

            {/* Clock hands */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Hour hand */}
              <div
                className="absolute w-1 h-8 bg-secondary-700 rounded-full origin-bottom"
                style={{
                  transform: `rotate(${hourAngle}deg) translateY(-16px)`,
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />

              {/* Minute hand */}
              <div
                className="absolute w-0.5 h-12 bg-secondary-600 rounded-full origin-bottom"
                style={{
                  transform: `rotate(${minuteAngle}deg) translateY(-24px)`,
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />

              {/* Second hand */}
              <div
                className="absolute w-0.5 h-14 bg-red-500 rounded-full origin-bottom"
                style={{
                  transform: `rotate(${secondAngle}deg) translateY(-28px)`,
                  transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />

              {/* Center dot */}
              <div className="absolute w-2 h-2 bg-secondary-800 rounded-full z-10" />
            </div>
          </div>
        </div>

        {/* Digital Time */}
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-secondary-700 font-mono tracking-wider tabular-nums">
            {format(time, 'HH:mm:ss')}
          </div>

          {/* Date */}
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-600">
            <Calendar className="w-3 h-3" />
            <span className="font-medium">
              {format(time, 'EEEE, d MMMM yyyy', { locale: id })}
            </span>
          </div>

          {/* Time period indicator */}
          <div className="flex justify-center gap-2 mt-3">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              isDayTime
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-indigo-100 text-indigo-700'
            }`}>
              {isDayTime ? '🌞 Siang Hari' : '🌙 Malam Hari'}
            </div>
            <div className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium">
              {format(time, 'zzz')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
