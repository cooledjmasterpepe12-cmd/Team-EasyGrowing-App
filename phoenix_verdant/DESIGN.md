---
name: Phoenix Verdant
colors:
  surface: '#121412'
  surface-dim: '#121412'
  surface-bright: '#383a37'
  surface-container-lowest: '#0d0f0d'
  surface-container-low: '#1a1c1a'
  surface-container: '#1e201e'
  surface-container-high: '#292a28'
  surface-container-highest: '#333533'
  on-surface: '#e2e3df'
  on-surface-variant: '#c2c9bb'
  inverse-surface: '#e2e3df'
  inverse-on-surface: '#2f312e'
  outline: '#8c9387'
  outline-variant: '#42493e'
  surface-tint: '#a1d494'
  primary: '#a1d494'
  on-primary: '#0a3909'
  primary-container: '#2d5a27'
  on-primary-container: '#9dd090'
  inverse-primary: '#3b6934'
  secondary: '#ffc384'
  on-secondary: '#482900'
  secondary-container: '#fe9d00'
  on-secondary-container: '#663c00'
  tertiary: '#e7bdb1'
  on-tertiary: '#442a22'
  tertiary-container: '#674940'
  on-tertiary-container: '#e3baae'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#bcf0ae'
  primary-fixed-dim: '#a1d494'
  on-primary-fixed: '#002201'
  on-primary-fixed-variant: '#23501e'
  secondary-fixed: '#ffdcbb'
  secondary-fixed-dim: '#ffb869'
  on-secondary-fixed: '#2c1700'
  on-secondary-fixed-variant: '#673d00'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#e7bdb1'
  on-tertiary-fixed: '#2c160e'
  on-tertiary-fixed-variant: '#5d4037'
  background: '#121412'
  on-background: '#e2e3df'
  surface-variant: '#333533'
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
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-margin: 20px
  stack-gap: 16px
  section-gap: 32px
  inline-padding: 12px
---

## Brand & Style

The design system is built upon the "Modern Nature" aesthetic—a sophisticated intersection where organic vitality meets technical precision. It is designed for a community that values growth, professional-grade botanical knowledge, and the rhythmic connection between music and cultivation.

The visual language balances the raw energy of the phoenix with a structured, professional SaaS-like interface. It utilizes **Glassmorphism** as its primary depth metaphor, signifying clarity and transparency within the community. The interface should feel like a high-end greenhouse: controlled, modern, and brimming with life. 

**Key Principles:**
- **Organic Precision:** Use perfect geometric shapes but soften them with generous radiuses.
- **Illuminated Depth:** Backgrounds should remain dark and earthy, allowing "glowing" interactive elements to pop, mimicking the phoenix's fire against a forest floor.
- **Vibrant Professionalism:** Data-heavy features (Grow Diary, Bible) must remain legible and utilitarian, while marketing and social features (Music, Shop) use higher contrast and expressive gradients.

## Colors

The palette is rooted in the "Deep Forest" spectrum, using dark neutrals to ensure the vibrant "Phoenix Amber" and "Lush Green" accents command attention.

- **Primary (Forest Green):** Used for growth-related status, primary brand moments, and successful states.
- **Secondary (Phoenix Amber):** Reserved for high-action items, progress indicators, and "Premium" or "Music" related highlights.
- **Tertiary (Earthy Brown):** Used for subtle borders, secondary containers, and backgrounds to provide warmth.
- **Neutral (Obsidian):** A near-black with a slight green tint to prevent visual fatigue and provide a canvas for glassmorphic blurs.
- **Functional Colors:** Use a cool blue for the "Community" segment to differentiate social interactions from cultivation tasks.

## Typography

This design system uses a dual-font strategy to balance character with utility. 

**Montserrat** is used for all headings and display text. Its geometric construction and wide stance convey modern authority. Bold weights are preferred for titles to create a strong visual hierarchy against the dark background.

**Inter** is the workhorse for body copy, labels, and data entry. Its high x-height and neutral tone ensure that technical information in the "Bible" and "Grow Diary" remains perfectly legible even at smaller sizes.

**Formatting Rules:**
- All labels and overlines should use `uppercase` with the defined letter spacing for a "Pro-Tools" feel.
- Use `headline-lg` for mobile view titles, reserving `display-lg` for splash screens or major marketing headers.

## Layout & Spacing

The layout follows a **Fluid Grid** model optimized for mobile-first consumption. 

**The 8px Rhythm:** All spacing and sizing must be multiples of 8px. This maintains a clean, mathematical structure that feels professional.

**Mobile Layout:**
- **Margins:** Standard 20px horizontal margins for the main content container.
- **Gutters:** 16px between cards or grid items.
- **Safe Areas:** Ensure bottom navigation accounts for the system home indicator with a minimum 34px bottom padding.

**Sectioning:** Use generous vertical spacing (32px+) between disparate content types (e.g., separating the News card stack from the Music player widget) to let the design breathe.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Glassmorphism**, rather than traditional heavy shadows.

- **Level 0 (Background):** Solid Obsidian (#121412).
- **Level 1 (Cards/Containers):** A semi-transparent dark green or brown (80% opacity) with a 1px inner stroke of white at 10% opacity.
- **Level 2 (Floating Elements):** Glassmorphic overlays with a `backdrop-filter: blur(12px)`. These are used for the Bottom Navigation Bar and Top App Bar.
- **Level 3 (Pop-ups/Modals):** High-blur backgrounds with a subtle Amber glow (`box-shadow: 0 0 20px rgba(255, 157, 0, 0.2)`) to indicate the phoenix-inspired energy.

Avoid pitch-black shadows. Instead, use "Environmental Shadows"—soft, blurred glows that take on the color of the primary or secondary brand colors to simulate light passing through foliage or fire.

## Shapes

The design system employs **Rounded** geometry. This choice mirrors the organic curves found in nature while maintaining the structural integrity of a modern app.

- **Buttons & Chips:** Use `rounded-xl` (1.5rem / 24px) to create a soft, inviting touch target.
- **Cards:** Use `rounded-lg` (1rem / 16px) for a structured but friendly layout.
- **Input Fields:** Follow the button rounding for consistency.
- **Progress Bars:** Fully rounded (pill-shaped) to represent a continuous flow of growth.

## Components

### Bottom Navigation
The navigation bar is a glassmorphic floating element.
- **Icons:** Use thin-stroke 24px icons.
- **Active State:** The active icon glows with the Secondary (Amber) color and features a small 4px dot indicator underneath.

### Cards (News & Tutorials)
- **Visuals:** Background image with a dark gradient overlay.
- **Content:** Title in `headline-sm` white text. 
- **Metadata:** "Tutorial" or "News" tags using the Label-sm style in the top right corner.

### Progress Trackers (Grow Diary)
- **Style:** Linear progress bars using a Primary Green track with a Secondary Amber indicator for current progress.
- **Micro-copy:** Use `label-sm` to indicate "Day X of Y" above the bar.

### Buttons
- **Shop/Primary:** Solid Secondary Amber background with white `label-lg` text. 
- **Profile/Secondary:** Ghost style with a 2px Primary Green border and green text.
- **Feedback:** Add a subtle "Phoenix glow" shadow on press to indicate activation.

### Input Fields
- Dark Earthy Brown backgrounds with a 1px border that turns Green on focus. 
- Placeholder text in a muted grey-green.