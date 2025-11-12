# Dental Health Blog - Comprehensive Site Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Pages](#pages)
4. [Components](#components)
5. [Widgets](#widgets)
6. [Content Management](#content-management)
7. [Functionality](#functionality)
8. [Styling and Design](#styling-and-design)
9. [Configuration](#configuration)

## Project Overview

The "Dental Health Blog" is a Next.js 16 application focused on dental health education. The site is created by Shalsha Billa and supports the National Health Check (CKG) program of 2025 in Semarang City. The primary purpose is to educate the public about dental and oral health, with content covering various aspects of dental care, health programs, and related topics.

The site is built with:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Various UI and utility libraries

## Project Structure

```
/home/rd/project/gigi3/
├── .gitignore
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
├── RELATED_LINKS_GUIDE.md
├── tailwind.config.ts
├── tsconfig.json
├── .git/...
├── .next/...
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── api/
│   ├── articles/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── dental-health/
│   │   └── page.tsx
│   ├── hobbies/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── article/
│   ├── home/
│   ├── layout/
│   ├── ui/
│   └── widgets/
├── content/
│   ├── articles/
│   ├── data/
│   ├── pages/
│   └── settings/
├── lib/
├── node_modules/...
├── public/
│   ├── admin/
│   └── images/
└── types/
```

## Pages

### 1. Home Page (`/`)

- **File**: `/app/page.tsx`
- **Components Used**: `HeroSection`, `FeaturedArticles`, `Sidebar`
- **Functionality**:
  - Displays a hero section with welcome message
  - Shows featured articles (6 most recent)
  - Includes a sidebar with various widgets
  - Responsive grid layout (2 columns main content, 1 column sidebar on large screens)

### 2. About Page (`/about`)

- **File**: `/app/about/page.tsx`
- **Components Used**: `Card`, `CardContent`, `Stethoscope`, `Award`, `Heart`, `Users`, `MapPin` (Lucide React icons)
- **Functionality**:
  - Displays information about the author (Shalsha Billa)
  - Shows the purpose and experience sections
  - Includes a mission statement
  - Features an embedded Google Maps for Puskesmas Karanganyar
  - Provides a link to open the location in Google Maps

### 3. Articles Page (`/articles`)

- **File**: `/app/articles/page.tsx`
- **Components Used**: `ArticleCard`, `SearchWidget`, `ChevronLeft`, `ChevronRight` (Lucide React icons)
- **Functionality**:
  - Displays a grid of articles (6 per page)
  - Includes a search widget for filtering articles
  - Supports filtering by tag and date
  - Implements pagination with previous/next navigation
  - Shows article count and search results information
  - Responsive grid layout (1-2-3 columns based on screen size)

### 4. Article Detail Page (`/articles/[slug]`)

- **File**: `/app/articles/[slug]/page.tsx`
- **Components Used**: Various components from `components/article/` directory
- **Functionality**:
  - Displays individual article content
  - Includes image gallery functionality
  - Shows related articles and links
  - Provides navigation between articles
  - Includes share section for social media

### 5. Dental Health Page (`/dental-health`)

- **File**: `/app/dental-health/page.tsx`
- **Components Used**: `Card`, `CardContent`, `CardHeader`, `CardTitle`, `Sparkles`, `Shield`, `AlertCircle`, `CheckCircle`, `Heart` (Lucide React icons)
- **Functionality**:
  - Provides comprehensive dental health information
  - Displays dental care tips
  - Shows prevention categories
  - Includes information about health programs
  - Links to external resources

### 6. Hobbies Page (`/hobbies`)

- **File**: `/app/hobbies/page.tsx`
- **Components Used**: `Card`, `CardContent`, `Heart`, `Plane`, `Sparkles`, `Camera` (Lucide React icons)
- **Functionality**:
  - Displays hobbies of the author
  - Shows how hobbies contribute to work-life balance
  - Includes information about PKL (practice) experience

## Components

### Article Components (`/components/article/`)

- `article-card.tsx`: Displays a card with article information (image, title, excerpt, date, author)
- `image-gallery.tsx`: Shows article-related images in a gallery
- `info-box.tsx`: Displays additional information related to articles
- `lightbox-gallery.tsx`: Provides lightbox functionality for image galleries
- `page-navigation.tsx`: Enables navigation between articles
- `related-articles.tsx`: Shows related articles based on tags
- `related-links.tsx`: Displays related external links
- `share-section.tsx`: Provides social sharing functionality

### Home Components (`/components/home/`)

- `featured-articles.tsx`: Displays featured articles on the homepage
- `hero-section.tsx`: Shows the hero section on the homepage

### Layout Components (`/components/layout/`)

- `footer.tsx`: Page footer with copyright and navigation
- `header.tsx`: Page header with navigation menu and logo
- `sidebar.tsx`: Sidebar with various widgets

### UI Components (`/components/ui/`)

- `badge.tsx`: Reusable badge component
- `button.tsx`: Reusable button component
- `card.tsx`: Reusable card component with header, content, and footer
- `input.tsx`: Reusable input component

### Widgets (`/components/widgets/`)

- `blog-roll.tsx`: Displays a list of blog posts
- `calendar-widget-wrapper.tsx`: Wrapper for calendar widget
- `calendar-widget.tsx`: Shows a calendar
- `cloud-tag.tsx`: Displays tags as a cloud
- `latest-articles.tsx`: Shows the latest articles
- `maps-widget.tsx`: Embedded map widget
- `search-widget-client.tsx`: Client-side search widget
- `search-widget.tsx`: Server-side search functionality
- `time-widget.tsx`: Shows the current time
- `visitor-counter.tsx`: Tracks and displays visitor count
- `whatsapp-widget.tsx`: WhatsApp chat functionality

## Widgets

The site includes several widgets that appear in the sidebar:

### Calendar Widget

- Shows the current month calendar
- Provides visual date selection

### Time Widget

- Displays current time
- Updates in real-time

### Latest Articles Widget

- Shows titles of most recent articles
- Links to full articles

### Search Widget

- Allows users to search within articles
- Filters by content, title, excerpts, or tags

### Cloud Tag

- Displays popular tags in a cloud format
- Enables quick navigation to articles with specific tags

### Visitor Counter

- Tracks and displays the number of visitors
- Shows visit statistics

### WhatsApp Widget

- Fixed-position chat widget
- Links to WhatsApp for direct communication

### Maps Widget

- Embedded Google Maps
- Shows location of health facilities

### Blog Roll

- Lists recent blog posts
- Provides quick access to articles

## Content Management

### Markdown Articles

- Articles are stored as Markdown files in `/content/articles/`
- Each article has frontmatter containing metadata:
  - `title`: Article title
  - `date`: Publication date
  - `excerpt`: Short description
  - `image`: Featured image
  - `author`: Author name
  - `tags`: List of tags
  - `gallery`: Image gallery items
  - `relatedLinks`: External links related to the content

### Data Files

- Configuration data is stored as JSON files in `/content/data/`
- Includes:
  - `about.json`: About page content
  - `dental-health.json`: Dental health page content
  - `hero.json`: Hero section content
  - `hobbies.json`: Hobbies page content
  - `widgets.json`: Widget configurations

### Static Assets

- Images are stored in `/public/images/` in categorized folders:
  - `about/`: Images for about page
  - `articles/`: Article-related images
  - `hero/`: Hero section images
  - `hobbies/`: Hobbies page images
  - `uploads/`: Uploaded images
  - `icon.png`: Site icon

## Functionality

### Search

- Full-text search across articles
- Filter by keyword or tag
- Date-based filtering
- Real-time search results

### Filtering

- Tag-based filtering
- Date-based filtering
- Combined filtering options

### Pagination

- Article listing with 6 articles per page
- Previous/next navigation
- Page number display

### Image Gallery

- Lightbox functionality
- Thumbnail navigation
- Responsive design

### Social Sharing

- Share articles on social media
- Copy article URL to clipboard

### Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Adaptive components

### SEO

- Proper metadata for each page
- Semantic HTML structure
- Optimized images

## Styling and Design

### Color Palette

- Primary colors: Various shades of pink/purple (#ec4899 as primary)
- Secondary colors: Complementary colors
- Accent colors: High-contrast colors for highlights

### Typography

- Custom fonts defined via CSS variables
- Heading font for titles
- Sans-serif font for body text

### Spacing and Layout

- Tailwind CSS utility classes for consistent spacing
- Responsive grid system
- Mobile-first design approach

### Shadows and Effects

- Soft shadows for subtle depth
- Medium shadows for cards
- Large shadows for hover states
- Smooth transitions between states

### Animation

- Framer Motion for subtle animations
- Hover effects on interactive elements
- Smooth transitions between states

## Configuration

### Next.js Configuration (`next.config.js`)

- Image optimization for AVIF and WebP formats
- Compression enabled
- Powered-by header disabled

### Tailwind Configuration (`tailwind.config.ts`)

- Responsive design breakpoints
- Custom color palette
- Font family definitions
- Shadow definitions
- Custom plugin configuration

### Package Dependencies

- Next.js: React framework
- React: UI library
- TypeScript: Type safety
- Tailwind CSS: Styling framework
- Framer Motion: Animation library
- Lucide React: Icon library
- React Markdown: Markdown rendering
- Gray Matter: Markdown parsing
- LightGallery: Image gallery functionality
- Date-fns: Date formatting
- Fuse.js: Search functionality
