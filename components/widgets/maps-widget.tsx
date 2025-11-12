"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  ExternalLink,
  Navigation,
  Clock,
  Phone,
  Mail,
} from "lucide-react";

interface LocationData {
  locationName: string;
  locationAddress: string;
  googleMapsUrl: string;
  mapEmbedUrl: string;
  phone?: string;
  email?: string;
  hours?: string;
}

// Mock data for development - replace with actual data fetching
const mockLocationData: LocationData = {
  locationName: "Poltekkes Kemenkes Semarang",
  locationAddress:
    "Jl. Tirto Agung No.1, Pedalangan, Kec. Banyumanik, Semarang, Jawa Tengah",
  googleMapsUrl: "https://maps.google.com/?q=Poltekkes+Kemenkes+Semarang",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.8049399433845!2d110.45343737499015!3d-7.055841692948389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708bbf8e8b5c7b%3A0x1234567890abcdef!2sPoltekkes+Kemenkes+Semarang!5e0!3m2!1sen!2sid!4v1234567890",
  phone: "+62 24 7474 531",
  email: "info@poltekkes-smg.ac.id",
  hours: "Senin - Jumat: 08:00 - 16:00",
};

export default function MapsWidget() {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchLocationData = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLocationData(mockLocationData);
      setLoading(false);
    };

    fetchLocationData();
  }, []);

  if (loading) {
    return (
      <div className="widget-base">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2 text-neutral-700 mb-2">
            <div className="p-1.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold">Lokasi Kami</span>
          </div>

          {/* Map skeleton */}
          <div className="space-y-3">
            <div className="skeleton h-32 w-full rounded-lg" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-3 w-full rounded" />
              <div className="skeleton h-3 w-5/6 rounded" />
            </div>
            <div className="skeleton h-8 w-full rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!locationData) {
    return (
      <div className="widget-base">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2 text-neutral-700 mb-2">
            <div className="p-1.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold">Lokasi Kami</span>
          </div>

          {/* Error state */}
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-neutral-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-neutral-400" />
            </div>
            <p className="text-sm text-neutral-500">Lokasi tidak tersedia</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="widget-base">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-neutral-800">
              Lokasi Kami
            </span>
          </div>
          <div className="flex items-center gap-1 text-primary-600">
            <Navigation className="w-3 h-3" />
            <span className="text-xs font-medium">Maps</span>
          </div>
        </div>

        {/* Map Container with modern styling */}
        <div className="relative group">
          <div className="relative w-full rounded-xl overflow-hidden shadow-inner border border-neutral-200 mb-3">
            <div className="aspect-[4/3] w-full">
              {mapError ? (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="w-12 h-12 text-primary-400 mx-auto" />
                    <p className="text-sm text-neutral-600">
                      Map tidak tersedia
                    </p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={locationData.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={locationData.locationName}
                  className="absolute inset-0"
                  onError={() => setMapError(true)}
                />
              )}
            </div>

            {/* Overlay with location icon */}
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-md group-hover:bg-white transition-colors">
              <MapPin className="w-4 h-4 text-primary-600" />
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              {locationData.locationName}
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {locationData.locationAddress}
            </p>
          </div>

          {/* Contact Information */}
          {(locationData.phone || locationData.email || locationData.hours) && (
            <div className="space-y-2 pt-2 border-t border-neutral-100">
              {locationData.hours && (
                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <Clock className="w-3 h-3 text-primary-500" />
                  <span>{locationData.hours}</span>
                </div>
              )}
              {locationData.phone && (
                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <Phone className="w-3 h-3 text-primary-500" />
                  <span>{locationData.phone}</span>
                </div>
              )}
              {locationData.email && (
                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <Mail className="w-3 h-3 text-primary-500" />
                  <span className="truncate">{locationData.email}</span>
                </div>
              )}
            </div>
          )}

          {/* Open in Maps Link */}
          <a
            href={locationData.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full text-sm text-primary-600 hover:text-primary-700 font-medium py-2.5 px-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-all duration-200 group"
          >
            <span>Buka di Google Maps</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
