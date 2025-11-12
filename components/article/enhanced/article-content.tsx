"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  BookOpen,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { TableOfContentsItem } from "@/types/article";
import { generateHeadingId, extractMedicalTerms } from "@/lib/article-utils";

interface ArticleContentProps {
  content: string;
  onSectionChange?: (activeSection: string) => void;
  className?: string;
}

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  children,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-gray-200 rounded-lg my-4 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
      >
        <span className="font-medium text-gray-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-primary-600" />
          {title}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {isExpanded && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
};

const MedicalTooltip: React.FC<{ term: string; children: React.ReactNode }> = ({
  term,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const definitions: Record<string, string> = {
    karies:
      "Kerusakan gigi yang disebabkan oleh bakteri dan asam dari sisa makanan.",
    periodontitis:
      "Peradangan pada jaringan penyangga gigi yang dapat menyebabkan kerusakan tulang.",
    endodontik:
      "Pengobatan saluran akar gigi untuk mengobati infeksi di dalam gigi.",
    prostodonsia:
      "Bidang kedokteran gigi yang berfokus pada gigi tiruan dan rehabilitasi mulut.",
    ortodonti:
      "Spesialisasi yang memperbaiki posisi gigi dan rahang yang tidak sejajar.",
    plak: "Lapisan lengket tak berwarna dari bakteri yang terbentuk di permukaan gigi.",
    tartar:
      "Plak yang mengeras dan menempel pada gigi, memerlukan pembersihan profesional.",
    scaling:
      "Pembersihan karang gigi profesional untuk menghilangkan plak dan tartar.",
    bleaching:
      "Proses pemutihan gigi untuk meningkatkan warna gigi yang lebih cerah.",
    implan:
      "Tiruan akar gigi yang ditanamkan ke rahang untuk menggantikan gigi yang hilang.",
    puskesmas:
      "Pusat Kesehatan Masyarakat, fasilitas kesehatan primer di Indonesia.",
    ukgs: "Usaha Kesehatan Gigi Sekolah, program kesehatan gigi di sekolah.",
  };

  const definition = definitions[term.toLowerCase()];

  if (!definition) {
    return <>{children}</>;
  }

  return (
    <span className="relative">
      <span
        className="border-b-2 border-dotted border-primary-400 text-primary-700 cursor-help hover:bg-primary-50 transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsVisible(!isVisible);
          }
        }}
        aria-label={`Definisi: ${term}`}
      >
        {children}
      </span>
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-50 w-64 p-3 bg-white border border-primary-200 rounded-lg shadow-large bottom-full left-1/2 transform -translate-x-1/2 mb-2"
          role="tooltip"
        >
          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 text-sm mb-1">{term}</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {definition}
              </p>
            </div>
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-primary-200 rotate-45" />
        </div>
      )}
    </span>
  );
};

export default function ArticleContent({
  content,
  onSectionChange,
  className = "",
}: ArticleContentProps) {
  const [medicalTerms] = useState(() => extractMedicalTerms(content));
  const contentRef = useRef<HTMLDivElement>(null);

  // Track active section for table of contents
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onSectionChange?.(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );

    // Observe all heading elements
    const headings = contentRef.current?.querySelectorAll("h2, h3, h4, h5, h6");
    headings?.forEach((heading) => observer.observe(heading));

    return () => {
      headings?.forEach((heading) => observer.unobserve(heading));
    };
  }, [content, onSectionChange]);

  // Custom components for markdown rendering
  const components = {
    // Headings with IDs for navigation
    h1: ({ node, ...props }: any) => (
      <h1
        className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-8 mb-6 leading-tight"
        id={generateHeadingId(props.children || "")}
        {...props}
      />
    ),
    h2: ({ node, ...props }: any) => (
      <h2
        className="text-2xl md:text-3xl font-heading font-semibold text-gray-900 mt-8 mb-4 leading-tight"
        id={generateHeadingId(props.children || "")}
        {...props}
      />
    ),
    h3: ({ node, ...props }: any) => (
      <h3
        className="text-xl md:text-2xl font-heading font-semibold text-gray-900 mt-6 mb-3 leading-tight"
        id={generateHeadingId(props.children || "")}
        {...props}
      />
    ),
    h4: ({ node, ...props }: any) => (
      <h4
        className="text-lg md:text-xl font-heading font-medium text-gray-900 mt-5 mb-3 leading-tight"
        id={generateHeadingId(props.children || "")}
        {...props}
      />
    ),
    h5: ({ node, ...props }: any) => (
      <h5
        className="text-lg font-heading font-medium text-gray-900 mt-4 mb-2 leading-tight"
        id={generateHeadingId(props.children || "")}
        {...props}
      />
    ),
    h6: ({ node, ...props }: any) => (
      <h6
        className="text-base font-heading font-medium text-gray-900 mt-3 mb-2 leading-tight"
        id={generateHeadingId(props.children || "")}
        {...props}
      />
    ),

    // Enhanced paragraphs with medical term highlighting
    p: ({ node, children, ...props }: any) => {
      // Check if this is an image grid paragraph
      const isImageGrid = (node as any)?.data?.isImageGrid;

      if (isImageGrid) {
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
            {children}
          </div>
        );
      }

      return (
        <p
          className="text-article-body text-gray-700 leading-relaxed mb-4"
          {...props}
        >
          {children}
        </p>
      );
    },

    // Enhanced lists
    ul: ({ node, ...props }: any) => (
      <ul
        className="list-disc list-inside text-article-body text-gray-700 mb-4 space-y-2"
        {...props}
      />
    ),
    ol: ({ node, ...props }: any) => (
      <ol
        className="list-decimal list-inside text-article-body text-gray-700 mb-4 space-y-2"
        {...props}
      />
    ),
    li: ({ node, children, ...props }: any) => (
      <li className="text-gray-700" {...props}>
        {children}
      </li>
    ),

    // Enhanced text formatting
    strong: ({ node, children, ...props }: any) => (
      <strong className="font-semibold text-gray-900" {...props}>
        {children}
      </strong>
    ),
    em: ({ node, children, ...props }: any) => (
      <em className="italic text-gray-800" {...props}>
        {children}
      </em>
    ),

    // Enhanced blockquotes with variants
    blockquote: ({ node, children, ...props }: any) => {
      const text = React.Children.toArray(children).join("").toLowerCase();

      // Detect blockquote type based on content
      if (
        text.includes("penting") ||
        text.includes("warning") ||
        text.includes("peringatan")
      ) {
        return (
          <blockquote
            className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg my-4"
            {...props}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="text-orange-800 font-medium">{children}</div>
            </div>
          </blockquote>
        );
      } else if (
        text.includes("catatan") ||
        text.includes("note") ||
        text.includes("tips")
      ) {
        return (
          <blockquote
            className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg my-4"
            {...props}
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-blue-800">{children}</div>
            </div>
          </blockquote>
        );
      } else {
        return (
          <blockquote
            className="border-l-4 border-primary-500 pl-4 italic text-gray-700 my-4"
            {...props}
          >
            {children}
          </blockquote>
        );
      }
    },

    // Enhanced code blocks
    code: ({ node, inline, children, ...props }: any) => {
      if (inline) {
        return (
          <code
            className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <code
          className="block bg-gray-100 p-4 rounded-lg text-sm font-mono text-gray-800 overflow-x-auto my-4"
          {...props}
        >
          {children}
        </code>
      );
    },

    // Enhanced links
    a: ({ node, children, href, ...props }: any) => {
      const isExternal =
        href && (href.startsWith("http") || href.startsWith("mailto:"));
      return (
        <a
          href={href}
          className="text-primary-600 hover:text-primary-700 underline font-medium transition-colors inline-flex items-center gap-1"
          {...props}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
          {isExternal && (
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          )}
        </a>
      );
    },

    // Enhanced images with loading states
    img: ({ node, src, alt, ...props }: any) => {
      return (
        <div className="my-6 rounded-lg overflow-hidden shadow-medium">
          <img
            src={src}
            alt={alt || ""}
            className="w-full h-auto object-cover"
            loading="lazy"
            {...props}
          />
          {alt && (
            <p className="text-article-caption text-gray-600 mt-2 text-center italic">
              {alt}
            </p>
          )}
        </div>
      );
    },

    // Table support
    table: ({ node, children, ...props }: any) => (
      <div className="overflow-x-auto my-6 border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ node, children, ...props }: any) => (
      <thead className="bg-gray-50" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ node, children, ...props }: any) => (
      <tbody className="bg-white divide-y divide-gray-200" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ node, children, ...props }: any) => (
      <tr className="hover:bg-gray-50" {...props}>
        {children}
      </tr>
    ),
    th: ({ node, children, ...props }: any) => (
      <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ node, children, ...props }: any) => (
      <td
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
        {...props}
      >
        {children}
      </td>
    ),
  };

  // Custom text renderer for medical term highlighting
  const textRenderer = (text: string) => {
    if (!medicalTerms.length) return text;

    const parts = [];
    let lastIndex = 0;

    // Find all medical terms in the text
    const sortedTerms = [...medicalTerms].sort((a, b) => b.length - a.length);

    for (const term of sortedTerms) {
      const regex = new RegExp(`\\b${term}\\b`, "gi");
      let match;

      while ((match = regex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          parts.push(text.substring(lastIndex, match.index));
        }

        // Add the highlighted term
        const matchedText = text.substring(
          match.index,
          match.index + term.length,
        );
        parts.push(
          <MedicalTooltip key={`${term}-${match.index}`} term={matchedText}>
            {matchedText}
          </MedicalTooltip>,
        );

        lastIndex = match.index + term.length;
      }
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div
      ref={contentRef}
      className={`prose prose-lg max-w-none ${className}`}
      id="article-content"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
