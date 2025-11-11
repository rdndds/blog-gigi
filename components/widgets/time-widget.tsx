'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function TimeWidget() {
  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted || !time) {
    return (
      <Card className="border-0 shadow-soft bg-gradient-to-br from-secondary-50 to-white hover:shadow-large transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-secondary-600" />
            Waktu Sekarang
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-3xl font-bold text-secondary-600 font-mono">
              --:--:--
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Memuat...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-soft bg-gradient-to-br from-secondary-50 to-white hover:shadow-large transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Clock className="w-4 h-4 text-secondary-600" />
          Waktu Sekarang
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <p className="text-3xl font-bold text-secondary-600 font-mono">
            {format(time, 'HH:mm:ss')}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {format(time, 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
