import { Sparkles, Shield, AlertCircle, CheckCircle, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import fs from 'fs';
import path from 'path';

interface DentalHealthData {
  pageTitle: string;
  pageSubtitle: string;
  introSection: {
    paragraph1: string;
    paragraph2: string;
  };
  tipsSection: {
    title: string;
    tips: Array<{
      title: string;
      description: string;
    }>;
  };
  preventionSection: {
    title: string;
    categories: Array<{
      title: string;
      items: string[];
    }>;
  };
  programSection: {
    title: string;
    description: string;
    programs: string[];
    motto: string;
    callToAction: string;
  };
  resourcesSection: {
    title: string;
    resources: Array<{
      title: string;
      description: string;
      url: string;
    }>;
  };
}

async function getDentalHealthData(): Promise<DentalHealthData> {
  const filePath = path.join(process.cwd(), 'content/data/dental-health.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function DentalHealthPage() {
  const data = await getDentalHealthData();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-heading font-bold text-gray-900 mb-4">
            {data.pageTitle}
          </h1>
          <p className="text-xl text-gray-600">
            {data.pageSubtitle}
          </p>
        </div>

        <Card className="mb-8 border-0 shadow-medium bg-gradient-to-br from-primary-50 to-white hover:shadow-large transition-shadow">
          <CardContent className="p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {data.introSection.paragraph1}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {data.introSection.paragraph2}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8 border-0 shadow-soft hover:shadow-large transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary-600" />
              {data.tipsSection.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.tipsSection.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{index + 1}. {tip.title}</h4>
                    <p className="text-gray-600">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-0 shadow-soft hover:shadow-large transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-secondary-600" />
              {data.preventionSection.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {data.preventionSection.categories.map((category, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">{category.title}</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-0 shadow-medium bg-gradient-to-br from-secondary-50 to-white hover:shadow-large transition-shadow">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <Heart className="w-12 h-12 text-secondary-600 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                  {data.programSection.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {data.programSection.description}
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  {data.programSection.programs.map((program, index) => (
                    <li key={index}>• {program}</li>
                  ))}
                </ul>
                <div className="bg-white rounded-lg p-4 border-l-4 border-secondary-500">
                  <p className="text-gray-700 font-semibold mb-2">
                    💬 &quot;{data.programSection.motto}&quot;
                  </p>
                  <p className="text-sm text-gray-600">
                    {data.programSection.callToAction}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft hover:shadow-large transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-primary-600" />
              {data.resourcesSection.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.resourcesSection.resources.map((resource, index) => (
                <a 
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-4 ${index % 2 === 0 ? 'bg-primary-50 hover:bg-primary-100' : 'bg-secondary-50 hover:bg-secondary-100'} rounded-lg transition-colors`}
                >
                  <h4 className={`font-semibold ${index % 2 === 0 ? 'text-primary-700' : 'text-secondary-700'} mb-1`}>
                    {resource.title}
                  </h4>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
