import { Heart, Plane, Sparkles, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getHobbiesData } from "@/lib/content";

const iconMap = {
  Heart,
  Plane,
  Sparkles,
  Camera,
};

const colorMap = {
  "from-green-500 to-emerald-500": "#22c55e, #10b981",
  "from-blue-500 to-cyan-500": "#3b82f6, #06b6d4",
  "from-purple-500 to-primary-500": "#a855f7, #f97316",
  "from-orange-500 to-red-500": "#f97316, #ef4444",
};

export default function HobbiesPage() {
  const data = getHobbiesData();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-heading font-bold text-gray-900 mb-4">
            {data.pageTitle}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {data.pageDescription}
          </p>
        </div>

        {/* Hobbies Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {data.hobbies.map((hobby: any, index: number) => {
            const Icon = iconMap[hobby.icon as keyof typeof iconMap] || Heart;

            return (
              <Card
                key={hobby.title}
                className="group border-0 shadow-soft hover:shadow-large transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg group-hover:scale-110 transition-transform"
                      style={{
                        background: `linear-gradient(to bottom right, ${colorMap[hobby.color as keyof typeof colorMap]})`,
                      }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                        {hobby.title}
                      </h3>
                      <p className="text-gray-600">{hobby.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Personal Note */}
        <Card className="border-0 shadow-medium bg-gradient-to-br from-primary-50 to-white hover:shadow-large transition-shadow">
          <CardContent className="p-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
              {data.balanceHeading}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {data.balanceText1}
            </p>
            <p className="text-gray-700 leading-relaxed">{data.balanceText2}</p>
          </CardContent>
        </Card>

        {/* PKL Experience */}
        <Card className="mt-8 border-0 shadow-soft bg-gradient-to-br from-secondary-50 to-white hover:shadow-large transition-shadow">
          <CardContent className="p-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
              {data.pklHeading}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {data.pklDescription}
            </p>
            <div className="bg-white rounded-lg p-4 border-l-4 border-primary-500">
              <p className="text-gray-700 italic">{data.pklQuote}</p>
              <p className="text-primary-600 font-semibold mt-2">
                - Erdinta Ovielia Putri
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
