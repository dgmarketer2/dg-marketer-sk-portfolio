# MASTER PROMPT — DG MARKETER SK Portfolio Website

You are a senior UI/UX designer, frontend developer, accessibility specialist, and conversion-focused web designer. Build a polished, production-quality, responsive portfolio website for **SK Shakil Hussain**, a Digital Marketing Specialist and personal brand **DG MARKETER SK**.

## Project files: read and follow these first
Before coding, read and use all of the following project files as the source of truth:
1. `PRD.md` — goals, audience, site structure, requirements, user journeys, and acceptance criteria.
2. `DESIGN_SYSTEM.md` — visual tokens, typography, component rules, layout, responsiveness, and interaction principles.
3. `CONTENT.md` — approved website copy, language guidance, SEO metadata, and placeholder policy.
4. `ASSETS.md` — asset list, image directions, prompts, filenames, and usage notes.

If instructions conflict, use this priority: this Master Prompt for implementation rules; PRD for product behavior; Design System for visual decisions; Content for copy; Assets for visual assets. Do not invent personal facts, client names, performance numbers, awards, testimonials, or case-study results.

## Core objective
Create a memorable personal portfolio that explains Shakil's services, communicates professionalism, demonstrates work through clearly labeled practice/concept projects where real client work is not available, and makes it easy for prospective clients to contact him.

## Brand and audience
- Brand: DG MARKETER SK
- Name: SK Shakil Hussain
- Title: Digital Marketing Specialist
- Services: Social Media Marketing; Facebook & Instagram Ads; SEO; Google Ads; Social Media Management.
- Audience: small and medium businesses, e-commerce businesses, startups, local businesses, personal brands, and international clients.
- Languages: English and Bangla (bilingual experience; English-first default with a clear language toggle).
- Email: dgmarketersk@gmail.com
- User will provide their own professional portrait. Use a named image placeholder until provided; do not generate or substitute a portrait of a person.

## Build requirements
- Create a responsive, accessible, modern website with clean semantic HTML and maintainable components.
- Use the framework/environment supplied by Google AI Studio. If no framework is specified, use React + TypeScript with a lightweight, straightforward setup.
- Keep content, service cards, project data, navigation, and language strings organized so they can be edited easily.
- No backend is required unless the user explicitly asks. For a contact form, implement frontend validation and a clearly explained working fallback (email link or WhatsApp link after number is supplied). Do not pretend a form submission was delivered to a server.
- Make navigation functional: links scroll to sections; mobile menu opens/closes and closes after selection; language switch changes all authored interface copy, not just headings.
- Add restrained motion only: smooth section transitions, subtle reveal/hover effects, and respect `prefers-reduced-motion`.
- Include keyboard focus states, accessible labels, appropriate contrast, alt text, and keyboard navigation.
- Optimize for performance: responsive image sizes, lazy-load non-critical images, avoid heavy libraries and unnecessary effects.
- Avoid dead buttons, fake loading states, lorem ipsum, fake metrics, and nonfunctional UI.
- Use actual platform icons only when licensed/available through a suitable icon library; otherwise use simple text labels or generic icons. Do not reproduce official logos inaccurately.
- Provide a clear CTA and contact routes. Use email `mailto:dgmarketersk@gmail.com`; social/contact destinations remain placeholders until the user supplies real URLs and WhatsApp number.
- No fake client portfolio. Clearly label concept/practice work.

## Suggested section order
1. Sticky or compact navigation: logo/brand, About, Services, Projects, Skills/Tools, Contact, language toggle.
2. Hero: professional title, concise value proposition, CTA buttons, portrait placeholder, small brand label.
3. About: genuine, non-invented professional summary.
4. Services: five services, each with a short description and benefit-focused but non-guaranteed wording.
5. Skills / Tools: show only tools/platforms the user confirms or provide editable placeholders marked for confirmation. Do not imply certification.
6. Selected Projects: 2–3 demo/practice project cards with clear concept labels and project details. Use placeholder assets until supplied/generated.
7. Process: brief steps such as Discover, Plan, Execute, Optimize; frame as proposed workflow, not a claim of past results.
8. Contact: email, contact form (front-end only unless backend is available), social links placeholders, CTA.
9. Footer: brand, navigation, language control if useful, copyright year dynamic if implemented.

## Content integrity
- The user has not provided real client case studies, results, testimonials, years of experience, certifications, exact tool proficiency, or social URLs. Do not invent these.
- Do not claim guaranteed sales, rankings, leads, ROAS, or business growth.
- Clearly distinguish demo/concept projects from real client work.
- Avoid hard-coded fake contact links. Use an editable placeholder or omit until supplied.
- Do not publish a WhatsApp button with a made-up number.

## Bilingual behavior
- English is the default language.
- Add a visible `EN | বাংলা` switch.
- Switching language must update navigation, headings, body text, buttons, form labels, validation messages, project labels, and footer.
- Bengali copy should be natural and concise. Do not transliterate English UI labels unnecessarily.
- Keep proper names, brand name, service names, and email address unchanged where appropriate.

## Final quality checks
Before presenting the implementation:
- Test desktop, tablet, and mobile widths.
- Confirm all navigation and CTA actions work.
- Confirm language toggle works across every section.
- Check that portrait and project image placeholders are easy to replace.
- Check no fabricated information appears.
- Check no console errors, broken links, or inaccessible controls.
- Check responsive spacing, text wrapping, and section hierarchy.
- Check contact form behavior is honest and functional.
- Explain how to replace placeholders and run/build the project.
