## ADDED Requirements

### Requirement: Dental Health Education Page Content
The dental-health page SHALL display exact content from the specified `opi.md` "🦷 Halaman Edukasi Kesehatan Gigi & Mulut" section without adding additional content or sections.

#### Scenario: Exact Content Implementation
- **WHEN** users visit the dental-health page
- **THEN** the page SHALL display the title "🦷 Halaman Edukasi Kesehatan Gigi & Mulut"
- **AND** the page SHALL include the section "Tips Wajib untuk Anak & Remaja"
- **AND** the page SHALL display exactly 5 tips with checkmarks:
  - "Sikat gigi 2× sehari"
  - "Kurangi makanan/minuman manis"
  - "Gunakan pasta gigi berfluor"
  - "Periksa gigi tiap 6 bulan"
  - "Batasi screen time ke <2 jam untuk anak"
- **AND** the page SHALL include the specified images section with proper captions

#### Scenario: Image Support Implementation
- **WHEN** the page renders the images section
- **THEN** the page SHALL display "Poster 6 langkah sikat gigi" image with caption
- **AND** the page SHALL display "Foto demo phantom" image with caption
- **AND** all images SHALL use Next.js Image component for optimization
- **AND** images SHALL have proper alt text for accessibility
- **AND** images SHALL be responsive and mobile-friendly

#### Scenario: Visual Design Consistency
- **WHEN** displaying the dental health content
- **THEN** the page SHALL maintain the existing coral color scheme
- **AND** the page SHALL use consistent card-based layout
- **AND** the page SHALL preserve responsive design patterns
- **AND** the page SHALL maintain accessibility standards