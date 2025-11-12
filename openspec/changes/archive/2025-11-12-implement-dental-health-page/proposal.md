## Why

The current dental-health page contains general content that doesn't match the specific requirements from `opi.md`. The `opi.md` specifies exact content for the "🦷 Halaman Edukasi Kesehatan Gigi & Mulut" section with specific tips for children and teenagers, plus required image references (6 steps brushing poster and phantom demo photo). This implementation will update the page to use the exact content from `opi.md` while adding image support for the referenced visuals.

## What Changes

- **Update page content**: Replace current content with exact "🦷 Halaman Edukasi Kesehatan Gigi & Mulut" section from `opi.md`
- **Add image support**: Implement support for displaying the referenced images:
  - Poster 6 langkah sikat gigi (image4)
  - Foto demo phantom (image5)
- **Simplify structure**: Focus specifically on the "Tips Wajib untuk Anak & Remaja" section from `opi.md`
- **Maintain design consistency**: Keep existing coral theme and component patterns
- **Image optimization**: Use Next.js Image component for optimized loading

## Impact

- **Affected specs**: dental-health-page-content
- **Affected code**:
  - Update `content/data/dental-health.json` with exact `opi.md` content
  - Modify `app/dental-health/page.tsx` to support image display
  - Add image references and alt text for accessibility
  - Keep existing responsive layout and card components
- **Content alignment**: Page will now match exactly what's specified in `opi.md`
- **Visual enhancement**: Add educational images for better user engagement
