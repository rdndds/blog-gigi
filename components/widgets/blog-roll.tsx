import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, ExternalLink } from "lucide-react";

// Mock data to avoid server-side imports
const mockData = {
  usefulLinks: [
    {
      name: "Kemenkes RI",
      url: "https://www.kemkes.go.id/",
    },
    {
      name: "PDGI",
      url: "https://www.pdgi.or.id/",
    },
    {
      name: "WHO Oral Health",
      url: "https://www.who.int/health-topics/oral-health",
    },
    {
      name: "Poltekkes Semarang",
      url: "https://poltekkes-smg.ac.id/",
    },
  ],
};

export default function BlogRoll() {
  const data = mockData;

  return (
    <div className="widget-base">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 text-neutral-700 mb-2">
          <div className="p-1.5 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg">
            <Link2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold">Link Berguna</span>
        </div>

        {/* Links List */}
        <div className="space-y-2">
          {data.usefulLinks.map((link: { name: string; url: string }) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-3 bg-white/60 rounded-lg border border-neutral-100 hover:bg-white hover:border-accent-200 hover:shadow-sm transition-all duration-200"
            >
              <span className="text-sm text-gray-700 group-hover:text-accent-700 font-medium">
                {link.name}
              </span>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-accent-600 group-hover:translate-x-0.5 transition-all" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
