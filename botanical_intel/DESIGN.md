---
name: Botanical Intel
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c2c9bb'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8c9387'
  outline-variant: '#42493e'
  surface-tint: '#a1d494'
  primary: '#a1d494'
  on-primary: '#0a3909'
  primary-container: '#2d5a27'
  on-primary-container: '#9dd090'
  inverse-primary: '#3b6934'
  secondary: '#9ddf2e'
  on-secondary: '#213600'
  secondary-container: '#83c300'
  on-secondary-container: '#304b00'
  tertiary: '#ffb690'
  on-tertiary: '#552100'
  tertiary-container: '#873900'
  on-tertiary-container: '#ffb188'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#bcf0ae'
  primary-fixed-dim: '#a1d494'
  on-primary-fixed: '#002201'
  on-primary-fixed-variant: '#23501e'
  secondary-fixed: '#b2f746'
  secondary-fixed-dim: '#98da27'
  on-secondary-fixed: '#121f00'
  on-secondary-fixed-variant: '#334f00'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#783200'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  container-max-width: 1280px
---

## Brand & Style

The visual identity of the design system centers on a "Pro-Tool" aesthetic for biological sciences, blending the precision of a laboratory dashboard with the high-engagement vibrancy of illustrative infographics. It is designed to evoke a sense of expertise, vitality, and technical mastery.

The style is a hybrid of **Modern Corporate** and **High-Fidelity Pixel Art**. While the interface structures remain clean and systematic to handle complex data, the content is enriched with rich, tactile illustrations. This juxtaposition creates a unique "manual" or "encyclopedia" feel that is both authoritative and visually captivating. 

Key attributes include:
- **Illustrative High-Fidelity:** Using detailed pixel-art and shaded 2D illustrations to represent organic matter.
- **Technical Precision:** Clean layouts and systematic information density.
- **Engagement:** High color saturation and glow effects to maintain user focus on key data points.

## Colors

The palette is rooted in deep, earthy tones contrasted by "bio-luminescent" accents. 

- **Primary (Forest Green):** Used for structural grounding, header backgrounds, and primary brand elements.
- **Secondary (Vibrant Lime):** The "action" color. Used for success states, active growth indicators, and primary call-to-actions.
- **Tertiary (Phoenix Orange/Amber):** Used for warnings, metabolic heat indicators, and highlights that require immediate attention.
- **Neutral (Charcoal/Black):** The base surface color, providing a high-contrast canvas that allows the botanical colors to pop.

The system exclusively utilizes a **dark mode** default to minimize eye strain during technical data analysis and to enhance the "glow" effects of the UI elements.

## Typography

This design system uses **Montserrat** across all levels to provide a modern, geometric contrast to the organic and illustrative content. 

- **Headlines:** Bold and impactful. Use Uppercase for section headers to mimic an infographic "title block" feel.
- **Body:** Clean and legible with generous line heights to ensure complex scientific descriptions are readable.
- **Labels:** Used for data points, tags, and small metadata. These often utilize a slightly heavier weight and increased letter spacing for clarity at small sizes.

Typography should be rendered with high-contrast white or light-grey against the dark surfaces to ensure maximum accessibility.

## Layout & Spacing

The layout philosophy follows a **fixed-grid** model within a flexible container, emphasizing structured "information blocks" similar to a scientific poster.

- **Grid:** A 12-column system is used for desktop, collapsing to 4 columns on mobile.
- **Rhythm:** Spacing follows a 4px baseline. Most internal container padding should be 16px or 24px to maintain a dense but organized "Pro-Tool" density.
- **Responsive Behavior:** On desktop, content is organized into multi-paneled dashboards. On mobile, these panels stack vertically, maintaining their internal infographic relationships. 

Use generous gutters (16px+) to prevent the rich illustrative elements from feeling cluttered.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Luminescent Outlines** rather than traditional shadows.

- **Surfaces:** Use a primary dark background (#0a0a0a). Secondary containers use a slightly lighter charcoal (#1a1a1a).
- **Outlines:** All main containers feature a subtle, low-opacity border (1px). For active or "energized" states, these borders adopt the Secondary Lime or Tertiary Orange colors with a soft outer glow (bloom effect).
- **Depth:** High-fidelity pixel elements are placed on the topmost layer, occasionally breaking the "frame" of their containers to create a sense of physical presence and depth.
- **Backdrop:** Background blurs are used sparingly behind floating modals to maintain focus on the intricate foreground details.

## Shapes

The design system utilizes **Soft** roundedness. This 4px (0.25rem) radius provides a professional, "tooled" look that feels more modern than sharp edges but avoids the playfulness of fully rounded corners.

- **Containers:** 4px radius.
- **Buttons/Inputs:** 4px radius to maintain a consistent "unit" feel.
- **Illustrative Frames:** Occasionally use 8px (rounded-lg) for larger featured image blocks to soften the visual impact of complex art.

## Components

### Buttons
Primary buttons use a solid Secondary Lime background with black text for maximum contrast. Secondary buttons use a dark green outline with lime text. All buttons feature a subtle outer glow on hover.

### Containers & Cards
Cards are the primary layout building block. They feature a 1px border (#2d5a27). For "Technical Info" blocks, the header of the card should have a solid dark green background with white uppercase text.

### Input Fields
Inputs are dark-themed with a subtle green bottom border. On focus, the border transitions to a full lime outline with a faint glow.

### Chips & Tags
Used for categorizing botanical data (e.g., "Nitrogen", "PH Level"). These use a "Pill" shape to contrast against the rectangular layout, with background colors corresponding to their specific data category.

### Progress Bars & Gauges
Gauges should mimic the "VPD" style from the reference images, using a multi-color gradient (Green -> Yellow -> Red) to show optimal ranges. Progress bars for "Growth" should use a vibrant lime fill.

### Tooltips
Technical tooltips provide definitions for scientific terms. These appear as small, dark floating boxes with a lime border.