# Design System — DG MARKETER SK

## 1. Design principles
- Premium, modern, clear, trustworthy, conversion-focused.
- Dark premium interface without excessive neon, visual noise, or decorative overload.
- Strong hierarchy and generous whitespace.
- Accessible contrast and legible typography.
- Consistent bilingual layout; avoid cramped Bangla text.

## 2. Color palette
Suggested tokens (adjust slightly after visual testing):
- `--bg`: `#07111F` (deep navy)
- `--bg-elevated`: `#0D1B2A`
- `--surface`: `#102238`
- `--surface-soft`: `#142A40`
- `--text-primary`: `#F5F8FC`
- `--text-secondary`: `#A9B8C9`
- `--text-muted`: `#7C91A7`
- `--blue`: `#3B82F6`
- `--cyan`: `#22D3EE`
- `--border`: `rgba(148, 163, 184, 0.18)`
- `--success`: `#34D399` (use sparingly)

Gradient suggestion: deep navy → subtle blue; cyan glow should be used sparingly around hero accent or CTA.

## 3. Typography
- English: Inter, Manrope, or another modern sans-serif with strong readability.
- Bangla: Noto Sans Bengali or Hind Siliguri.
- Use a clear scale: hero 48–72px desktop / 36–44px mobile; section headings 32–44px desktop / 26–32px mobile; body 16–18px; captions 13–14px.
- Keep paragraphs short, line-height approximately 1.6.
- Avoid ultra-thin text and excessive uppercase.

## 4. Layout
- Max content width: approximately 1120–1200px.
- Desktop grid: 12 columns; hero two-column layout.
- Mobile: one column, stacked hero, cards.
- Section vertical spacing: 88–112px desktop; 56–72px mobile.
- Card padding: 24–32px desktop; 18–22px mobile.
- Use consistent 8px spacing scale (4px micro-spacing allowed).

## 5. Components
### Navigation
- Compact sticky top navigation, subtle backdrop, brand wordmark.
- Desktop links: About, Services, Projects, Skills, Contact.
- Clear language toggle `EN | বাংলা`.
- Mobile: accessible menu button, visible focus, close after navigation.

### Buttons
- Primary: blue fill, white text, clear hover/focus states.
- Secondary: transparent or surface fill with border.
- Minimum target size: 44×44px.
- CTA labels: “Let’s Work Together”, “View Projects”, “Send Email”.
- No decorative button that lacks an action.

### Cards
- Rounded corners 16–20px.
- Thin border and surface contrast.
- Use subtle hover lift/outline only on interactive cards.
- Services cards: icon, title, short description.
- Project cards: image/mockup, concept title, project type, practice label, concise scope, optional “View details” only if it works.

### Hero
- Text-first, confident, concise.
- Include name, title, one short value proposition, two CTAs.
- User portrait image placeholder on right for desktop; stacked on mobile.
- Background may use restrained blue/cyan radial gradients and abstract shapes, not noisy stock imagery.

### Projects
- 2–3 cards. Use mockups/creative images, not fake client logos.
- Visible label “Practice Project” / “Concept Project”.
- No outcome metrics unless user supplies verifiable data.

### Contact
- Email address shown as a clickable `mailto:`.
- Form fields: Name, Email, Message.
- Form status should truthfully indicate whether a backend is connected.
- Social links only when URLs are supplied.
- WhatsApp button only when number is supplied.

## 6. Motion
- Short transitions (150–250ms).
- Optional gentle reveal on scroll; avoid making content hidden if scripts fail.
- Respect `prefers-reduced-motion`.
- No autoplay video, parallax-heavy effects, or continuous distracting animation.

## 7. Responsive breakpoints
- Small mobile: ≤ 480px
- Tablet: 481–768px
- Laptop: 769–1024px
- Desktop: > 1024px
Use fluid spacing and typography. Avoid horizontal overflow. Test at 360px, 390px, 768px, 1024px, and 1440px.

## 8. Accessibility
- Semantic landmarks and heading order.
- Keyboard accessible navigation and controls.
- Visible focus rings.
- Contrast target WCAG AA.
- Alt text for meaningful images; decorative images use empty alt.
- Labels and helpful validation messages.
- Reduced-motion preference honored.

## 9. Image style
- High-quality, realistic professional portrait supplied by user.
- Marketing project visuals: clean, contemporary campaign mockups; avoid fake brand/client identity.
- Use consistent aspect ratios and crop.
- Keep image prompts and filenames in `ASSETS.md`.
