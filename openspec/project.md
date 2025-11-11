# Project Context

## Purpose
This is a professional dental health blog called "Senyum Sehat untuk Indonesia Hebat" (Healthy Smiles for a Great Indonesia), created by Shalsha Billa. The blog serves as an educational platform for dental and oral health, supporting the National CKG (Free Health Check) Program 2025 in Semarang City. It provides comprehensive information about dental services, health education, and promotes community health awareness through accessible digital content.

## Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.18 with custom healthcare-themed color palette
- **UI Components**: Custom React components with class-variance-authority pattern
- **Icons**: Lucide React, FontAwesome (React)
- **Content Management**: Markdown files with gray-matter frontmatter parsing
- **Image Handling**: Next.js Image optimization with AVIF/WebP support
- **Animations**: Framer Motion
- **Search**: Fuse.js for client-side search functionality
- **Galleries**: LightGallery with thumbnail and zoom plugins
- **Package Manager**: pnpm (based on lock file presence)

## Project Conventions

### Code Style
- TypeScript strict mode enabled
- Component-based architecture with functional components and hooks
- Tailwind CSS utility-first styling approach
- Path aliases using `@/` for root-relative imports
- Components organized by feature (layout, widgets, article, home, ui)
- Consistent naming conventions: kebab-case for files, PascalCase for components

### Architecture Patterns
- **Next.js App Router**: Server components by default, client components marked with "use client"
- **Content Management**: Markdown-based content with structured frontmatter
- **Widget System**: Modular sidebar widgets (search, visitor counter, calendar, etc.)
- **API Routes**: RESTful API endpoints for dynamic content (visitor counting, articles)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Image Optimization**: Next.js Image component with multiple format support

### Testing Strategy
- ESLint configuration with Next.js rules for code quality
- No testing framework currently configured (opportunity for improvement)

### Git Workflow
- Main branch: `main` (production)
- Development branch: `dev` (current working branch)
- Conventional commit messages observed in recent commits
- Feature branch workflow recommended

## Domain Context
This is a healthcare-focused blog specifically targeting:
- **Indonesian audience** with content in Bahasa Indonesia
- **Dental health education** and public health awareness
- **CKG Program 2025** (Cek Kesehatan Gratis - Free Health Check) support
- **Semarang City** community health initiatives
- **Puskesmas** (Community Health Centers) dental services
- **UKGS** (Usaha Kesehatan Gigi Sekolah - School Dental Health Program)

Content focuses on professional dental health information, community health activities, and public health education appropriate for Indonesian healthcare context.

## Important Constraints
- **Language**: Primary content in Bahasa Indonesia
- **Healthcare Accuracy**: All medical/dental content must be accurate and professional
- **Cultural Context**: Content must be appropriate for Indonesian cultural context
- **Accessibility**: Must be accessible to diverse Indonesian audience
- **Mobile Performance**: Optimize for mobile internet conditions in Indonesia
- **Static Hosting**: Designed for static deployment on platforms like Vercel

## External Dependencies
- **No external APIs** currently integrated (opportunity for health data APIs)
- **Image Hosting**: Local image storage in `/public/images/`
- **WhatsApp Integration**: Direct WhatsApp contact functionality
- **Social Media**: Configuration for Facebook, Instagram, Twitter, LinkedIn
- **No external CMS**: Self-hosted markdown content management
