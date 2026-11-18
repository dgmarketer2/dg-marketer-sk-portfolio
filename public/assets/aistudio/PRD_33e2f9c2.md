# Product Requirements Document (PRD)
## DG MARKETER SK — Digital Marketing Portfolio

### 1. Product overview
A responsive bilingual personal portfolio website for SK Shakil Hussain, Digital Marketing Specialist and personal brand DG MARKETER SK. The website should build credibility, present services and practice work, and convert interested visitors into inquiries.

### 2. Goals
- Clearly communicate who the marketer is and what services are offered.
- Showcase relevant work without misrepresenting practice projects as client work.
- Encourage prospective clients to make contact.
- Support local Bangladeshi and international visitors with English and Bangla.
- Establish a clean, premium, memorable personal brand.

### 3. Target users
- Small and medium business owners.
- E-commerce and online store owners.
- Startups and local businesses.
- Personal brands and creators.
- International businesses looking for digital marketing support.

### 4. Primary conversion
Contact inquiry via email, contact form, or verified social/WhatsApp links once provided.

### 5. Site architecture
Single-page portfolio with section navigation:
- Home / Hero
- About
- Services
- Skills & Tools
- Selected Projects
- Process
- Contact

### 6. Functional requirements
**FR-01 Navigation:** Desktop navigation and mobile menu navigate to page sections. Mobile menu supports keyboard use and closes after selection.

**FR-02 Language:** EN/বাংলা switch updates all interface content and form states. English is default.

**FR-03 Hero CTA:** “View Projects” scrolls to projects; “Let’s Work Together” scrolls to contact.

**FR-04 Services:** Present five service cards: Social Media Marketing, Facebook & Instagram Ads, SEO, Google Ads, Social Media Management.

**FR-05 Projects:** Show 2–3 editable concept/practice project cards. Each must have a visible “Practice Project” or “Concept Project” label. Do not include fake client names, metrics, or outcomes.

**FR-06 Skills/tools:** Display only confirmed skills/platforms or editable “Add tools” placeholders. Platform/service names may be used as service categories, not as proof of certification.

**FR-07 Contact:** Display email `dgmarketersk@gmail.com`. Social profile links and WhatsApp are editable placeholders until user provides exact URLs and number.

**FR-08 Contact form:** Frontend validation for name, email, and message. If no backend/email service is connected, clearly state that the form is not connected and provide a mailto fallback. Do not claim a submission was sent.

**FR-09 Responsive layout:** Usable at 360px mobile, tablet, and desktop.

**FR-10 Accessibility:** Semantic sections, focus indicators, descriptive alt text, labels, keyboard navigation, sufficient contrast, and reduced-motion support.

### 7. Non-functional requirements
- Fast load and low visual clutter.
- Responsive images and lazy-loading for below-the-fold media.
- Maintainable components and editable data.
- Avoid unnecessary dependencies.
- Search-friendly title, description, and section headings.
- Avoid animation that impairs readability or motion sensitivity.

### 8. User journey
1. Visitor lands on Hero and understands specialty/brand.
2. Visitor reviews About and Services.
3. Visitor explores Projects, understanding that examples are practice work.
4. Visitor sees process and/or skills.
5. Visitor contacts through email or verified contact option.

### 9. Visual direction
Dark Premium: deep navy background, blue/cyan accents, subtle glow, clean typography, strong spacing, restrained glass-like surfaces. Reference the Design System file.

### 10. Content and data constraints
Unknown data must be placeholders or omitted:
- WhatsApp number.
- Social URLs (Facebook, LinkedIn, Instagram, Behance, Fiverr, Upwork).
- Portrait image.
- Real client work, testimonials, metrics, awards, certifications, years of experience, and tool proficiency.
Do not fabricate any of these.

### 11. Acceptance criteria
- The site renders without errors.
- All sections and navigation work.
- Language toggle fully switches the UI.
- Mobile layout is usable and polished.
- Projects are clearly labeled practice/concept.
- Email is correct and clickable.
- Placeholder contacts are not mistaken for live links.
- No fake statistics, testimonials, client names, or guaranteed outcomes.
- User can replace portrait and project assets with simple instructions.
