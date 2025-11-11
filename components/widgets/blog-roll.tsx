import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link2, ExternalLink } from 'lucide-react';
import { getWidgetsData } from '@/lib/content';

export default function BlogRoll() {
  const data = getWidgetsData();
  
  return (
    <Card className="border-0 shadow-soft bg-white hover:shadow-large transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Link2 className="w-4 h-4 text-primary-600" />
          Link Berguna
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {data.usefulLinks.map((link: { name: string; url: string }) => (
            <li key={link.name}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between text-sm text-gray-700 hover:text-primary-700 font-medium transition-colors"
              >
                <span>{link.name}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
