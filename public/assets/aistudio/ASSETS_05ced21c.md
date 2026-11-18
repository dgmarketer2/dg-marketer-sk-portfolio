# Assets & Image Generation Prompts — DG MARKETER SK

## Asset checklist
| Asset | Filename | Status | Recommended dimensions / ratio |
|---|---|---|---|
| Professional portrait | `shakil-portrait.png` or `.webp` | User will provide | Portrait, 4:5 or 3:4, high resolution |
| Hero abstract background | `hero-abstract.webp` | Generate if needed | 1920×1080, 16:9 |
| Social campaign mockup | `project-social-campaign.webp` | Generate | 4:5 or 1:1 |
| Paid ads mockup | `project-ad-campaign.webp` | Generate | 4:5 or 1:1 |
| SEO project visual | `project-seo-plan.webp` | Generate | 16:9 |
| Optional favicon | `favicon.svg` | Build from brand initials | 1:1 |

## Portrait handling
The user will provide their own portrait. Do not generate a person to stand in for the user. Crop/position the supplied photo with `object-fit: cover`, provide a focal-position setting, and ensure it looks good on desktop and mobile. If the image is missing, show a neutral placeholder with an instruction to replace it.

## Image generation prompts
Generate each asset separately. Use no embedded text unless explicitly needed; website typography should be rendered in code for clarity.

### 1. Hero abstract background
**Filename:** `hero-abstract.webp`
**Prompt:**
Create a premium abstract background visual for a digital marketing specialist's personal portfolio website. Deep navy blue base (#07111F), subtle electric-blue and cyan radial glow, elegant flowing light lines suggesting data, digital connectivity, and growth, very faint geometric grid, restrained modern tech aesthetic, clean negative space in the center and left for website text, sophisticated and minimal, high-end web design background, no text, no logos, no people, no clutter, 16:9 landscape.

### 2. Social media campaign practice project mockup
**Filename:** `project-social-campaign.webp`
**Prompt:**
A high-end presentation mockup of a hypothetical local business social media marketing campaign, showing a clean content calendar, several generic social media post creatives, audience strategy notes, and a mobile feed preview on a dark navy presentation board with blue and cyan accents. Clearly fictional generic business, no real brand logos, no readable fake metrics, no client names, no claims of results. Premium digital marketing portfolio case-study visual, balanced composition, crisp UI mockups, 4:5 vertical.

### 3. Facebook & Instagram Ads concept mockup
**Filename:** `project-ad-campaign.webp`
**Prompt:**
Premium portfolio visual demonstrating a hypothetical e-commerce paid social advertising concept. Show two or three generic ad creative variations inside elegant mobile-screen mockups, with a simple campaign structure and audience-testing visual cues. Dark navy background, electric blue and cyan accents, professional studio lighting, no real company branding, no readable fake statistics, no performance claims, no logos. Clearly a concept/practice campaign, 4:5 vertical.

### 4. SEO practice project visual
**Filename:** `project-seo-plan.webp`
**Prompt:**
A premium digital marketing portfolio mockup for a hypothetical SEO practice project. Visualize a keyword/topic map, on-page optimization checklist, content outline cards, and a generic search-results page wireframe. Deep navy UI, clean cyan and blue highlights, minimal modern dashboard style, no readable invented rankings, no fake traffic figures, no company/client names, no logos. Portfolio presentation, 16:9 landscape.

### 5. Optional abstract service icons
**Filename:** use inline SVG icons or icon library instead of generated images.
Prompt if image icons are required: a coherent set of five simple abstract line icons representing social media strategy, paid advertising, search optimization, search ads, and social media management. Electric blue/cyan strokes on transparent background, consistent stroke width, no text, no brand marks, vector-like, individually separated.

## Asset implementation notes
- Store assets under `/public/assets/` or the equivalent static assets folder.
- Use descriptive filenames and meaningful alt text.
- Optimize portrait and project images to WebP where possible.
- Lazy-load project images below the fold.
- Decorative backgrounds should have empty alt text or be implemented as CSS backgrounds.
- Ensure generated mockups are described as practice/concept projects in the site content.
- Do not use AI-generated portrait as a substitute for the user's own photo.
