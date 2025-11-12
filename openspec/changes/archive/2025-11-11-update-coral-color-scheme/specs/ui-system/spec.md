## MODIFIED Requirements

### Requirement: Color Theme System

The dental health blog SHALL provide a cohesive color theme system that supports professional healthcare branding while maintaining accessibility and visual appeal for Indonesian audiences.

#### Scenario: Coral color palette implementation

- **WHEN** the color theme system is configured
- **THEN** all UI components SHALL use coral-based color tokens instead of pink
- **AND** primary colors SHALL range from light coral (#fff7ed) to deep coral (#7c2d12)
- **AND** secondary colors SHALL provide complementary coral variants for visual hierarchy
- **AND** accent colors SHALL offer vibrant coral shades for interactive elements
- **AND** all color combinations SHALL maintain WCAG AA contrast ratios

#### Scenario: Component color consistency

- **WHEN** any UI component renders
- **THEN** it SHALL inherit colors from the centralized coral theme tokens
- **AND** buttons, cards, badges, and widgets SHALL display consistent coral styling
- **AND** hover states SHALL use darker coral variants for clear interaction feedback
- **AND** focus states SHALL maintain accessibility with proper contrast

#### Scenario: Healthcare-appropriate visual design

- **WHEN** users view the dental health blog
- **THEN** the coral color scheme SHALL project professionalism and trustworthiness
- **AND** colors SHALL be warm and inviting without overwhelming medical content
- **AND** the design SHALL remain accessible to diverse Indonesian audiences
- **AND** mobile rendering SHALL maintain color consistency and readability
