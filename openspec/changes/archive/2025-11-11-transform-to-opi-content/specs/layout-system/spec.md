## MODIFIED Requirements

### Requirement: Navigation Structure
The site SHALL provide a streamlined navigation structure optimized for educational content and program showcase.

#### Scenario: Updated navigation menu
- **WHEN** users access the main navigation
- **THEN** the menu SHALL display: "Beranda | Tentang Saya | Edukasi | Program 3D | Kontak"
- **AND** "Kesehatan Gigi" SHALL be replaced with "Edukasi"
- **AND** "Hobi" SHALL be replaced with "Program 3D"
- **AND** "Artikel" navigation SHALL focus on pediatric dental health topics
- **AND** all navigation links SHALL be functional and responsive

#### Scenario: Route mapping and URLs
- **WHEN** users navigate to specific sections
- **THEN** `/dental-health` SHALL redirect to `/edukasi`
- **AND** `/hobbies` SHALL redirect to `/program-3d`
- **AND** existing article routes SHALL be updated for new content
- **AND** proper redirects SHALL be implemented for changed URLs

## ADDED Requirements

### Requirement: Enhanced Widget System
The site SHALL provide an enhanced widget system with translation capabilities and location-based features.

#### Scenario: Multilingual support
- **WHEN** users need language translation
- **THEN** a translate widget SHALL be available in the sidebar
- **AND** translation SHALL support Indonesian ↔ English
- **AND** translation functionality SHALL be accessible and user-friendly

#### Scenario: Activity location mapping
- **WHEN** users want to find Erdinta's community activities
- **THEN** a Google Maps widget SHALL display Semarang area locations
- **AND** the map SHALL highlight dental health screening locations
- **AND** location information SHALL be current and accurate

#### Scenario: Enhanced content discovery
- **WHEN** users browse for relevant content
- **THEN** popular articles widget SHALL feature pediatric dental health topics
- **AND** search functionality SHALL work with new article content
- **AND** visitor counter SHALL display accurate engagement statistics

## REMOVED Requirements

### Requirement: Previous Widget Configuration
**Reason**: Widget system needs enhancement to support new content focus and user needs
**Migration**: Existing widgets shall be updated and enhanced with translate functionality, location mapping, and content-optimized features while maintaining the visitor counter and search capabilities