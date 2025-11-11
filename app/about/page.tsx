import { Stethoscope, Award, Heart, Users, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getAboutData } from '@/lib/content';

export default function AboutPage() {
  const data = getAboutData();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-heading font-bold text-gray-900 mb-4">
            {data.pageTitle}
          </h1>
          <p className="text-xl text-gray-600">
            {data.pageSubtitle}
          </p>
        </div>

        {/* Profile Section */}
        <Card className="mb-12 border-0 shadow-medium hover:shadow-large transition-shadow">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center flex-shrink-0">
                <Stethoscope className="w-24 h-24 text-primary-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                  {data.profileName}
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  {data.profileTitle}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {data.profileBio}
                </p>
                <p className="text-primary-600 font-semibold text-lg">
                  {data.motto}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purpose */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="border-0 shadow-soft hover:shadow-large transition-shadow">
            <CardContent className="p-6">
              <Award className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-heading font-semibold mb-3">Tujuan Blog</h3>
              <ul className="space-y-2 text-gray-600">
                {data.purposeList.map((item: { item: string }, index: number) => (
                  <li key={index}>• {item.item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft hover:shadow-large transition-shadow">
            <CardContent className="p-6">
              <Users className="w-12 h-12 text-secondary-600 mb-4" />
              <h3 className="text-xl font-heading font-semibold mb-3">Pengalaman</h3>
              <ul className="space-y-2 text-gray-600">
                {data.experienceList.map((item: { item: string }, index: number) => (
                  <li key={index}>• {item.item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 border-0 shadow-medium bg-gradient-to-br from-primary-50 to-secondary-50 hover:shadow-large transition-shadow">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <Heart className="w-12 h-12 text-primary-600 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                  {data.missionHeading}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {data.missionText1}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {data.missionText2}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Section */}
        <Card className="border-0 shadow-medium bg-gradient-to-br from-primary-50 to-white hover:shadow-large transition-shadow">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <MapPin className="w-8 h-8 text-primary-600 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                  {data.locationHeading}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {data.locationDescription}
                </p>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="relative w-full rounded-lg overflow-hidden shadow-medium">
              <div className="aspect-video w-full">
                <iframe
                  src={data.mapEmbedUrl}
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

            {/* Location Details */}
            <div className="mt-6 p-4 bg-white rounded-lg">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {data.locationName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {data.locationAddress}
                  </p>
                </div>
                <a
                  href={data.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap"
                >
                  Buka Peta
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
