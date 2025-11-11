## Context
This is a complete site transformation that involves replacing the entire content strategy, brand identity, and user experience. The change affects author identity, blog focus, navigation structure, and content approach while maintaining the existing technical architecture and coral color theme.

## Goals / Non-Goals
- Goals: Complete content transformation, new author identity, specialized pediatric dental focus, updated navigation, enhanced educational features
- Non-Goals: Changing the tech stack, color scheme (keep coral theme), hosting infrastructure, or core component architecture

## Decisions
- Decision: Maintain existing Next.js + TypeScript + Tailwind architecture for stability
- Decision: Keep coral color theme as it's healthcare-appropriate and already implemented
- Decision: Reuse existing component patterns with new content to minimize development risk
- Decision: Implement content-first approach where new content drives layout adjustments rather than architectural changes
- Decision: Maintain responsive design and accessibility standards

## Risks / Trade-offs
- **Risk**: Content quality and accuracy must be verified for healthcare context
- **Risk**: New navigation structure requires comprehensive testing
- **Risk**: SEO impact from complete content change requires careful metadata updates
- **Trade-off**: Faster transformation by reusing architecture vs. complete redesign
- **Mitigation**: Gradual rollout with validation at each step

## Migration Plan
1. Update site identity and metadata (layout.tsx, header, footer)
2. Replace author information throughout the codebase
3. Update navigation structure and route mappings
4. Create new page content based on opi.md specifications
5. Update widgets and sidebar components
6. Replace article content and create new markdown files
7. Update internal links and cross-references
8. Validate all functionality and SEO settings

## Open Questions
- Should we keep existing image assets or replace with new ones that match Erdinta's activities?
- Does the translate widget need specific language requirements (English ↔ Indonesian)?
- Should we implement any specific 3D model viewers or interactive elements for the "Program 3D" section?