## Design Considerations

### Content Structure
The page will focus on the exact content from `opi.md`:
- Page title: "🦷 Halaman Edukasi Kesehatan Gigi & Mulut"
- Main section: "Tips Wajib untuk Anak & Remaja"
- 5 specific tips with checkmarks
- Image section with 2 educational images

### Image Implementation
- **Image 1**: Poster 6 langkah sikat gigi (image4)
  - Purpose: Educational visual for proper brushing technique
  - Display: Full-width with caption
  - Alt text: "Poster 6 langkah sikat gigi yang benar"

- **Image 2**: Foto demo phantom (image5)
  - Purpose: Dental education demonstration
  - Display: Full-width with caption
  - Alt text: "Demonstrasi penggunaan phantom untuk edukasi kesehatan gigi"

### Technical Approach
- Use existing Next.js Image component for optimization
- Maintain responsive design with mobile-first approach
- Keep coral color scheme and card-based layout
- Preserve accessibility features (ARIA labels, semantic HTML)
- Support for placeholder images if actual files not available

### Layout Structure
1. **Hero Section**: Page title and introduction
2. **Tips Section**: 5 mandatory tips with checkmarks
3. **Images Section**: Educational visuals with captions
4. **Footer**: Optional call-to-action or additional resources

### Performance Considerations
- Lazy load images for better performance
- Use WebP/AVIF format support from Next.js
- Implement proper image sizing and aspect ratios
- Add loading states for images