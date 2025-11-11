import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, ExternalLink } from 'lucide-react';
import { getWidgetsData } from '@/lib/content';

export default function MapsWidget() {
  const data = getWidgetsData();
  const { locationWidget } = data;

  return (
    <Card className="border-0 shadow-soft bg-white hover:shadow-large transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary-600" />
          Lokasi Kami
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Map Container */}
        <div className="relative w-full rounded-lg overflow-hidden mb-3">
          <div className="aspect-[4/3] w-full">
            <iframe
              src={locationWidget.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Puskesmas Karanganyar"
              className="absolute inset-0"
            />
          </div>
        </div>

        {/* Location Info */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-900">
            {locationWidget.locationName}
          </p>
          <p className="text-xs text-gray-600">
            {locationWidget.locationAddress}
          </p>
          
          {/* Open in Maps Link */}
          <a
            href={locationWidget.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-primary-600 hover:text-primary-700 transition-colors font-medium"
          >
            Buka di Google Maps
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
