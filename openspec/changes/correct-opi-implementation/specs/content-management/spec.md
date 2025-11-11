## MODIFIED Requirements

### Requirement: Article Content Management
The blog SHALL provide articles that use exact content from the specified `opi.md` document without generating additional content or creating unnecessary pages.

#### Scenario: Exact Content Implementation
- **WHEN** articles are displayed on the site
- **THEN** the article content SHALL match exactly what is specified in `opi.md`
- **AND** "Lonjakan Karies Digital Age" article SHALL include the specified statistics about 73% karies rate, 29% brushing frequency, and 8% golden time brushing
- **AND** "Gerakan Nasional Anti-Gula" article SHALL include the Zero Sugar Drink at School campaign details and Erdinta's role in implementation
- **AND** "Inovasi Edukasi 3D & AI" article SHALL include the HealthTech Education focus on phantom resin 3D, AR dental models, video animation, and sensor-based brushing simulation

#### Scenario: Minimal Page Structure
- **WHEN** users navigate the site
- **THEN** the site SHALL maintain the existing page structure without unnecessary new pages
- **AND** existing pages SHALL be updated with content from `opi.md` where applicable
- **AND** no additional pages SHALL be created beyond what is specifically requested
- **AND** navigation SHALL remain functional and user-friendly

## REMOVED Requirements

### Requirement: Over-Engineered Page Creation
**Reason**: Previous implementation created unnecessary new pages and navigation items not specified in opi.md
**Migration**: Remove unnecessary pages (/edukasi, /program-3d) and revert navigation to simplified structure