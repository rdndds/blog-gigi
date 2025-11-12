# Dental Health Blog

A professional dental health blog built with Next.js 14, featuring educational content, service information, and interactive widgets.

## Features

- 🦷 **Comprehensive Content**: Articles on dental health, services, and wellness
- 🎨 **Beautiful UI**: Modern design with Tailwind CSS and healthcare-themed colors
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🔍 **Search**: Find articles quickly with integrated search
- 📊 **Widgets**: Visitor counter, calendar, time display, tag cloud, and more
- ⚡ **Fast**: Optimized with Next.js 14 App Router

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Shadcn/ui inspiration
- **Icons**: Lucide React
- **Date**: date-fns
- **Content**: Markdown with gray-matter

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd dental-health-blog
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.local.example .env.local
# Edit .env.local with your API keys
```

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
dental-health-blog/
├── app/                    # Next.js 14 App Router
│   ├── about/             # About page
│   ├── articles/          # Articles listing and detail pages
│   ├── dental-health/     # Dental health information
│   ├── hobbies/           # Hobbies page
│   └── api/               # API routes
├── components/            # React components
│   ├── layout/           # Layout components (header, footer, sidebar)
│   ├── widgets/          # Widget components
│   ├── article/          # Article-related components
│   ├── home/             # Homepage components
│   └── ui/               # UI components
├── content/              # Markdown content
│   └── articles/         # Article markdown files
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Adding Content

### Creating New Articles

1. Create a new `.md` file in `content/articles/`
2. Add frontmatter with metadata:

```markdown
---
title: "Your Article Title"
excerpt: "Brief description of the article"
date: "2024-11-10"
author: "Dr. Name"
image: "/images/articles/your-image.jpg"
tags: ["Dental Care", "Prevention"]
---

Your article content here...
```

3. The article will automatically appear on the homepage and articles page

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

- Primary: Professional Blue
- Secondary: Medical Green
- Accent: Trust Teal

### Content

- Edit pages in `app/` directory
- Modify components in `components/` directory
- Update article content in `content/articles/`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

```bash
npm run build
npm run start
```

## Features in Detail

### Widgets

- **Visitor Counter**: Tracks total site visits
- **Search**: Search through all articles
- **Time Widget**: Display current time and date
- **Latest Articles**: Shows recent posts
- **Tag Cloud**: Popular article tags
- **Blog Roll**: Links to useful resources

### Pages

- **Homepage**: Hero section with featured articles
- **About**: Professional biography and credentials
- **Hobbies**: Personal interests outside dentistry
- **Dental Health**: Comprehensive oral health guide
- **Articles**: All published articles with filtering

## Performance

- Optimized images with Next.js Image component
- Static generation where possible
- Minimal JavaScript bundle
- Fast page loads (<2s)

## License

This project is licensed under the ISC License.

## Support

For questions or support, please contact the practice or open an issue on GitHub.

## Acknowledgments

- Built with Next.js and React
- Styled with Tailwind CSS
- Icons by Lucide
- Inspired by modern healthcare design patterns
