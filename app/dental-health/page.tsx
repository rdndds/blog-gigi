import { CheckCircle, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LightboxGallery from "@/components/article/lightbox-gallery";
import fs from "fs";
import path from "path";

interface DentalHealthData {
  pageTitle: string;
  pageSubtitle: string;
  tipsSection: {
    title: string;
    description: string;
    tips: Array<{
      text: string;
      detail: string;
    }>;
  };
  imagesSection: {
    title: string;
    description: string;
    images: Array<{
      id: string;
      src: string;
      alt: string;
      title: string;
      caption: string;
    }>;
  };
}

async function getDentalHealthData(): Promise<DentalHealthData> {
  const filePath = path.join(process.cwd(), "content/data/dental-health.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export default async function DentalHealthPage() {
  const data = await getDentalHealthData();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-heading font-bold text-gray-900 mb-4">
            {data.pageTitle}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {data.pageSubtitle}
          </p>
        </div>

        {/* Tips Section */}
        <Card className="mb-12 border-0 shadow-medium bg-gradient-to-br from-primary-50 to-white hover:shadow-large transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 text-center">
              {data.tipsSection.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-gray-700 text-center mb-8 leading-relaxed">
              {data.tipsSection.description}
            </p>
            <div className="space-y-6">
              {data.tipsSection.tips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg border border-primary-100 hover:border-primary-300 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {tip.text}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {tip.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Images Section */}
        <Card className="border-0 shadow-soft hover:shadow-large transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <ImageIcon className="w-6 h-6 text-primary-600" />
              {data.imagesSection.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-6 text-center">
              {data.imagesSection.description}
            </p>

            {/* Transform images for LightboxGallery */}
            <LightboxGallery
              images={data.imagesSection.images.map((image) => ({
                image: image.src,
                title: image.title,
              }))}
              columns={
                data.imagesSection.images.length === 1
                  ? 1
                  : data.imagesSection.images.length === 2
                    ? 2
                    : 3
              }
            />

            {/* Show captions below the gallery */}
            <div className="mt-6 space-y-4">
              {data.imagesSection.images.map((image, index) => (
                <div
                  key={image.id}
                  className="text-center p-4 bg-gradient-to-br from-primary-50 to-white rounded-lg border border-primary-100"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {image.title}
                  </h4>
                  <p className="text-sm text-gray-600">{image.caption}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
