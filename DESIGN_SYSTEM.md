# Research Data Lab Design System

## Visual direction

The interface uses a calm technical/editorial language: a near-white research workspace, precise one-pixel rules, restrained dataset artifacts, and an asymmetric layout. Technical detail appears through schema previews, file manifests, configuration labels, and methodology states rather than decorative imagery. The page takes quality cues from premium design-system sites without reusing their composition, assets, brand, or token names.

## Color palette

- Canvas: `#f7f8f6`
- Surface: `#ffffff`
- Subtle surface: `#f0f3f0`
- Primary ink: `#18211f`
- Muted ink: `#596762`
- Border: `#dce3df`
- Accent: `#0b766b`
- Accent soft: `#e1efeb`

Color is centralized in CSS custom properties in `app/globals.css`. Teal is the only accent and is reserved for active states, checks, compact labels, and the primary CTA.

## Typography

- Display and body: Geist
- Technical labels and data: Geist Mono
- H1: responsive `clamp()` sizing with tight tracking and balanced wrapping
- Section headings: 30–48px depending on viewport
- Body: 16–18px with 1.55–1.75 line height
- Technical labels: 9–11px uppercase with increased letter spacing

## Spacing

- Page container: maximum 1400px; 20px mobile, 32px tablet, 48px desktop gutters
- Section rhythm: responsive 92–144px via `--section-space`
- Card padding: 24–32px
- Primary layout gap: 48–80px
- Minimum interactive target: 44px

## Card styles

- One-pixel cool-slate border
- White surface with very light, tinted diffusion shadow
- 18–28px radii based on hierarchy
- Hover movement is limited to 4px
- Cards are used for files, packages, and structured previews; descriptive features often use top rules and whitespace instead

## Button styles

- Pill shape, 44px minimum height
- Primary uses solid teal with white text
- Secondary uses a white surface and stronger border
- Active state moves down 1px for tactile feedback
- Focus-visible state uses a two-pixel teal outline with offset

## Animation rules

- Framer Motion reveals use opacity and a maximum 22px upward translation
- Reveals run once with a restrained 650ms custom easing curve
- Hero visual floats by 4px over eight seconds
- Hover effects use transform and opacity only
- `prefers-reduced-motion` disables nonessential animation
- No bouncing, spinning, cursor effects, or aggressive parallax

## Responsive rules

- Asymmetric desktop layouts collapse to one column below 1024px
- Two-column card grids collapse below 768px
- Mobile navigation uses an accessible disclosure menu and Escape-key dismissal
- Wide dataset tables scroll inside their own container, never the page
- No fixed viewport-height sections; content determines section height
- Type and spacing scale with `clamp()` or breakpoint classes
