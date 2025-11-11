import { getEdukasiData } from '@/lib/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertCircle, CheckCircle, Clock, Phone, MapPin } from 'lucide-react';

export default function EdukasiPage() {
  const data = getEdukasiData();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
          {data.pageTitle}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {data.pageSubtitle}
        </p>
      </div>

      {/* Introduction Section */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                {data.introHeading}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {data.introText}
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-primary-200 rounded-full flex items-center justify-center">
                <Shield className="w-16 h-16 text-primary-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">
          Panduan Lengkap Kesehatan Gigi
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.tipsList.map((tip: any, index: number) => (
            <Card key={index} className="border-0 shadow-soft hover:shadow-large transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{tip.icon}</div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {tip.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tip.description}
                </p>
                {tip.time && (
                  <div className="mt-3 inline-flex items-center gap-1 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                    <Clock className="w-3 h-3" />
                    {tip.time}
                  </div>
                )}
                {tip.alert && (
                  <div className="mt-3 inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    <AlertCircle className="w-3 h-3" />
                    {tip.alert}
                  </div>
                )}
                {tip.expert && (
                  <div className="mt-3 inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    {tip.expert}
                  </div>
                )}
                {tip.urgent && (
                  <div className="mt-3 inline-flex items-center gap-1 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                    <AlertCircle className="w-3 h-3" />
                    {tip.urgent}
                  </div>
                )}
                {tip.hydration && (
                  <div className="mt-3 inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {tip.hydration}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Educational Materials Section */}
      <section className="mb-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Poster Section */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="text-2xl">📋</div>
                {data.posterHeading}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{data.posterDescription}</p>
              <div className="bg-primary-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-2">🖼️</div>
                <p className="text-sm text-primary-700 font-medium">
                  Poster 6 Langkah Sikat Gigi
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Phantom Demo Section */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="text-2xl">🦷</div>
                {data.phantomHeading}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{data.phantomDescription}</p>
              <div className="bg-secondary-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-2">🎯</div>
                <p className="text-sm text-secondary-700 font-medium">
                  Demo Interaktif 3D
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center">
        <Card className="border-0 shadow-medium bg-gradient-to-br from-primary-100 to-secondary-100">
          <CardContent className="p-8">
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
              {data.callToAction}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {data.callToActionText}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/articles"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Hubungi Sekarang
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-medium rounded-lg border-2 border-primary-200 hover:border-primary-300 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Lihat Lokasi Kegiatan
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}