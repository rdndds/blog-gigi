import { getProgram3DData } from '@/lib/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Cpu, Video, Gamepad2, Target, Lightbulb, Phone } from 'lucide-react';

export default function Program3DPage() {
  const data = getProgram3DData();

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
        <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                {data.introHeading}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {data.introText}
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-accent-200 rounded-full flex items-center justify-center">
                <Cpu className="w-16 h-16 text-accent-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">
          Teknologi Edukasi Inovatif
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data.innovations.map((innovation: any, index: number) => (
            <Card key={index} className="border-0 shadow-soft hover:shadow-large transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{innovation.icon}</div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {innovation.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {innovation.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {innovation.features.map((feature: any, idx: number) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                      <Lightbulb className="w-3 h-3" />
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* My Developments Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">
          Pengembangan Saya
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.myDevelopments.map((dev: any, index: number) => (
            <Card key={index} className="border-0 shadow-medium bg-gradient-to-br from-primary-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  {dev.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{dev.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-primary-500" />
                    <span className="font-medium text-primary-700">Penggunaan:</span>
                    <span className="text-gray-600">{dev.usage}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-accent-500" />
                    <span className="font-medium text-accent-700">Dampak:</span>
                    <span className="text-gray-600">{dev.impact}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">
          Keunggulan Metode Ini
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.benefits.map((benefit: any, index: number) => (
            <Card key={index} className="border-0 shadow-soft text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">
                    {index === 0 && '🎮'}
                    {index === 1 && '💡'}
                    {index === 2 && '📱'}
                    {index === 3 && '🔄'}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center">
        <Card className="border-0 shadow-medium bg-gradient-to-br from-accent-100 to-primary-100">
          <CardContent className="p-8">
            <div className="text-5xl mb-4">🚀</div>
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
                Hubungi untuk Demo
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-medium rounded-lg border-2 border-primary-200 hover:border-primary-300 transition-colors"
              >
                <Video className="w-4 h-4" />
                Lihat Portofolio
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}