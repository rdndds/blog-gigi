import { Sparkles } from 'lucide-react';
import { getHeroData } from '@/lib/content';

export default function HeroSection() {
  const data = getHeroData();
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-2xl p-8 md:p-12">
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-soft">
          <Sparkles className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-medium text-primary-700">{data.badgeText}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-6">
          {data.heading}
          <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> {data.highlightText} </span>
          Dimulai Dari Sini
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          {data.description}
        </p>

        <div className="flex flex-wrap gap-4">
          <a 
            href={data.primaryButtonLink}
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-medium hover:shadow-large"
          >
            {data.primaryButtonText}
          </a>
          <a 
            href={data.secondaryButtonLink}
            className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg border-2 border-primary-200 hover:border-primary-300 transition-colors"
          >
            {data.secondaryButtonText}
          </a>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-primary-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-secondary-200 rounded-full blur-3xl opacity-30" />
    </section>
  );
}
