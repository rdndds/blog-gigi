## Why
The previous implementation went beyond the scope of `opi.md` by creating unnecessary new pages (edukasi, program-3d) and navigation items that weren't specified in the original markdown document. This proposal reverts the over-engineered changes and implements only what's actually specified in `opi.md`, using the exact content provided rather than generating new content.

## What Changes
- **Revert navigation structure**: Remove unnecessary new pages from navigation, keep existing structure with updated names
- **Update existing content only**: Replace article and about page content with exact content from `opi.md`
- **Remove over-engineered pages**: Delete the unnecessarily created `/edukasi` and `/program-3d` pages
- **Use exact opi.md content**: Copy content directly from `opi.md` rather than generating new pages
- **Minimal implementation**: Focus only on content updates that are explicitly specified in `opi.md`

## Impact
- **Affected specs**: content-management
- **Affected code**:
  - Revert navigation in `components/layout/header.tsx` to remove unnecessary items
  - Revert navigation in `components/layout/footer.tsx` to match simplified structure
  - Update article markdown files with exact content from `opi.md`
  - Update `content/data/about.json` with profile from `opi.md`
  - Remove unnecessary page routes (`app/edukasi/page.tsx`, `app/program-3d/page.tsx`)
  - Remove unnecessary data files (`edukasi.json`, `program-3d.json`)
  - Keep existing coral color scheme and technical architecture