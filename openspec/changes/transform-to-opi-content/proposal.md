## Why
Transform the entire dental health blog from "Senyum Sehat untuk Indonesia Hebat" (by Shalsha Billa) to "Senyum Cerdas 2025" (by Erdinta Ovielia Putri) with completely new content focus, author identity, navigation structure, and specialized healthcare education approach targeting children's dental health in the digital age.

## What Changes
- **Complete Brand Identity Overhaul**: Change blog name from "Senyum Sehat" to "Senyum Cerdas 2025" with new subtitle "Kesehatan Gigi untuk Generasi Emas Indonesia"
- **Author Profile Replacement**: Replace Shalsha Billa with Erdinta Ovielia Putri (Poltekkes Kemenkes Semarang student) with new background, vision, and hobbies
- **Content Focus Shift**: Move from general dental health to specialized focus on children's dental health, digital age challenges, anti-sugar campaigns, and 3D educational innovations
- **Navigation Restructure**: Update menu from "Beranda | Artikel | Kesehatan Gigi | Tentang Saya | Hobi" to "Beranda | Tentang Saya | Edukasi | Program 3D | Kontak"
- **Complete Content Replacement**: Replace all existing articles with three new specialized articles about digital age dental crisis, anti-sugar campaigns, and 3D educational innovations
- **Widget System Updates**: Add translate widget and update existing widget selection
- **Layout Adjustments**: Optimize layout for new content structure with emphasis on educational media and community program showcase

## Impact
- **Affected specs**: content-management, site-identity, layout-system
- **Affected code**:
  - `lib/content.ts` (all content data and author information)
  - `components/layout/header.tsx` (navigation menu, branding, social links)
  - `components/layout/footer.tsx` (branding, navigation)
  - `app/layout.tsx` (site metadata and SEO)
  - All page components (`app/page.tsx`, `app/about/page.tsx`, etc.)
  - `app/dental-health/page.tsx` → rename/update to `app/edukasi/page.tsx`
  - `app/hobbies/page.tsx` → replace with `app/program-3d/page.tsx`
  - Article markdown files in `/content/articles/` directory
  - Widget configuration and components
  - All hardcoded references to author identity and blog name throughout the codebase