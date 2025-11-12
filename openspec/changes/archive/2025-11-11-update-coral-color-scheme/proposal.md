## Why

Transform the current pink-based color palette to a coral color scheme to provide a fresh, vibrant aesthetic while maintaining the healthcare blog's professional and accessible design for the Indonesian dental health audience.

## What Changes

- Replace all pink-based color tokens (primary, secondary, accent) with coral-based color palette in Tailwind configuration
- Update global CSS gradients and background colors to use coral variants
- Modify all UI components (buttons, cards, badges) to use coral color scheme
- Update widget components (search, visitor counter, calendar, etc.) to use coral colors
- Ensure consistent coral theming across all interactive elements and states
- Maintain accessibility contrast ratios and healthcare-appropriate visual hierarchy

## Impact

- **Affected specs**: ui-system (color theming capability)
- **Affected code**:
  - `tailwind.config.ts:12-49` (color tokens)
  - `app/globals.css:21` (global background gradient)
  - All component files using color classes (button.tsx, card.tsx, badge.tsx, etc.)
  - All widget components in `/components/widgets/`
  - Layout components (header.tsx, footer.tsx)
  - Page components using color-specific classes
