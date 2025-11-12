"use client";

import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Play } from "lucide-react";

// Mock hero data to avoid server-side imports
const mockHeroData = {
  badgeText: "Inovasi Kesehatan Digital",
  heading: "Senyum Cerdas",
  highlightText: 2025,
  description:
    "Platform edukasi kesehatan gigi digital generasi emas Indonesia dengan teknologi 3D dan AI untuk pembelajaran interaktif.",
  primaryButtonText: "Mulai Belajar",
  primaryButtonLink: "/articles",
  secondaryButtonText: "Tonton Demo",
  secondaryButtonLink: "#demo",
};

export default function HeroSection() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading with mock data
    const timer = setTimeout(() => {
      setData(mockHeroData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <section className="relative min-h-[80vh] bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-500 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-300/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-white space-y-8">
              {/* Loading skeletons */}
              <div className="space-y-4">
                <div className="skeleton h-8 w-32 rounded-full" />
                <div className="space-y-2">
                  <div className="skeleton h-16 w-3/4 rounded" />
                  <div className="skeleton h-16 w-1/2 rounded" />
                  <div className="skeleton h-8 w-2/3 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="skeleton h-4 w-full rounded" />
                  <div className="skeleton h-4 w-5/6 rounded" />
                  <div className="skeleton h-4 w-4/5 rounded" />
                </div>
                <div className="flex gap-4">
                  <div className="skeleton h-14 w-40 rounded-xl" />
                  <div className="skeleton h-14 w-40 rounded-xl" />
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="aspect-square bg-gradient-to-br from-white/20 to-white/5 rounded-xl">
                  <div className="skeleton h-32 w-32 rounded-full mx-auto mt-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-500 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-300/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse-slow" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-white space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-default">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
              <span className="text-sm font-medium text-white">
                {data.badgeText}
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                <span className="text-white">{data.heading}</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-secondary-200">
                  {data.highlightText}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                Kesehatan Gigi untuk Generasi Emas Indonesia
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-white/80 max-w-lg leading-relaxed">
              {data.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={data.primaryButtonLink}
                className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-white/90 font-semibold px-8 py-4 rounded-xl shadow-large hover:shadow-glow hover:scale-105 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10">{data.primaryButtonText}</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
              <a
                href={data.secondaryButtonLink}
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{data.secondaryButtonText}</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Erdinta Ovielia Putri</span>
              </div>
              <div>•</div>
              <span>Poltekkes Kemenkes Semarang</span>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div
            className="relative animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative">
              {/* Main Image/Visual Placeholder */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="aspect-square bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white space-y-4">
                    <div className="w-24 h-24 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Senyum Cerdas 2025</h3>
                    <p className="text-white/70">
                      Inovasi Edukasi Kesehatan Gigi Digital
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-secondary-500 text-white rounded-lg p-3 shadow-lg animate-float">
                <span className="text-sm font-semibold">3D & AI</span>
              </div>
              <div
                className="absolute -bottom-4 -left-4 bg-white text-primary-600 rounded-lg p-3 shadow-lg animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                <span className="text-sm font-semibold">Edukasi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
