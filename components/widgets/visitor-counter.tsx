'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye } from 'lucide-react';

export default function VisitorCounter() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch('/api/visitor-count');
        const data = await res.json();
        setCount(data.count);
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        setCount(12547); // Fallback count
      } finally {
        setLoading(false);
      }
    }
    fetchCount();
  }, []);

  return (
    <Card className="border-0 shadow-soft bg-gradient-to-br from-primary-50 to-white hover:shadow-large transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Eye className="w-4 h-4 text-primary-600" />
          Total Pengunjung
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-12 bg-gray-200 animate-pulse rounded" />
        ) : (
          <p className="text-3xl font-bold text-primary-600">
            {count.toLocaleString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
