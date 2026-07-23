# Pol Rovira — Portfolio

A responsive, accessible, single-page portfolio website showcasing Pol Rovira's work across game development, web application development, pixel art, and low-poly 3D modelling.

The website is built with semantic HTML, modern CSS, and framework-free JavaScript. It presents selected projects through interactive carousels and detailed case-study dialogs while keeping the site lightweight, deployable as static files, and usable across desktop and mobile devices.

## Table of Contents

- [Overview](#overview)
- [Main Features](#main-features)
- [Portfolio Content](#portfolio-content)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How the Interface Works](#how-the-interface-works)
- [JavaScript Architecture](#javascript-architecture)
- [Styling Architecture](#styling-architecture)
- [Accessibility](#accessibility)
- [Responsive Design](#responsive-design)
- [Performance Considerations](#performance-considerations)
- [Adding a New Portfolio Project](#adding-a-new-portfolio-project)
- [Customisation Guide](#customisation-guide)
- [Deployment](#deployment)
- [Browser Support](#browser-support)
- [Current Limitations](#current-limitations)
- [Author](#author)

## Overview

This project is the source code for a personal portfolio focused on both technical and visual work. Its purpose is to communicate a multidisciplinary profile through a polished editorial interface rather than a conventional list of links.

The portfolio introduces Pol Rovira as a game developer with experience in Unity and C#, while also presenting front-end product work, pixel-art character design, and low-poly 3D studies. Each major project can be opened as an in-page case study containing project context, responsibilities, design decisions, technical implementation details, screenshots, videos, galleries, and lessons learned.

The site does not require a framework, package manager, bundler, database, or server-side runtime. It can be hosted directly as a static website.

## Main Features

### Single-page portfolio navigation

The fixed header links to the main sections of the page:

- Home
- Game projects
- Web applications
- Pixel art
- 3D models
- Education
- Contact

The active navigation item updates automatically as the visitor scrolls through the page.

### Responsive mobile navigation

On smaller screens, the desktop navigation becomes a compact menu controlled by an accessible toggle button. The menu:

- Updates `aria-expanded` correctly.
- Changes its accessible label between opening and closing states.
- Closes after selecting a navigation link.
- Closes when clicking outside the menu.
- Closes when the viewport is resized.
- Can be dismissed with the `Escape` key.

### Interactive project carousels

Game projects, pixel-art work, and 3D models are displayed in horizontally scrollable carousels. Each carousel supports:

- Previous and next controls on larger screens.
- Touch and trackpad scrolling.
- CSS scroll snapping.
- Left and right arrow-key navigation.
- Automatic current-item and total-item indicators.
- Disabled navigation buttons at the beginning and end.
- Responsive card widths for desktop, tablet, and mobile layouts.

### Detailed project case studies

Project cards open full-screen case-study dialogs without navigating away from the portfolio. These dialogs include:

- Project hero media.
- Role, team size, duration, year, platform, or technology metadata.
- Design and development explanations.
- Screenshots, videos, GIFs, and image galleries.
- Technology lists.
- External links to live products or source repositories where available.
- Project-specific conclusions and learning outcomes.

### URL-addressable project dialogs

Case studies use hash-based URLs in the following format:

```text
#/portfolio/project-slug
```

This makes an individual project directly addressable and allows the browser back and forward buttons to open or close project details naturally.

### Accessible modal behaviour

When a project case study is open:

- The background page is marked as inert.
- Background regions are hidden from assistive technology.
- Page scrolling is locked.
- Focus moves to the close control.
- Keyboard focus is trapped inside the active dialog.
- The `Escape` key closes the dialog.
- Focus returns to the project card that opened the dialog.
- Project videos outside the active dialog are paused.

### Scroll-based interface feedback

The page includes several small interaction details:

- A reading-progress bar at the top of the viewport.
- A translucent, blurred header after scrolling.
- A back-to-top button that appears after the visitor moves down the page.
- Section reveal animations powered by `IntersectionObserver`.
- Automatic copyright-year updates.

### Reduced-motion support

The project respects the visitor's `prefers-reduced-motion` setting. When reduced motion is requested:

- Smooth scrolling is replaced with immediate scrolling.
- CSS animations and transitions are effectively disabled.
- Reveal elements are shown without movement.
- Case-study videos are not automatically played.
- Open project videos are paused if the preference changes while the page is active.

### Media switcher for 3D models

The Hoverbikes case study contains a tab-like image selector for switching between multiple model variants. It includes:

- Active-state styling.
- `aria-pressed` state updates.
- Image preloading before replacing the visible asset.
- A short transition while the new image loads.
- Basic error handling when an image cannot be loaded.

## Portfolio Content

### Game projects

The game-development section presents Unity and C# projects through interactive cards and extended case studies.

#### Monkey Island Fight

A recreation and reinterpretation of the insult-sword-fighting mechanic from the Monkey Island series. The case study discusses branching dialogue, ScriptableObject-based data, state management, interface feedback, and timing as part of comedic delivery.

#### Super Mario Bros

A recreation of the first level of the original game, with emphasis on custom character physics, momentum, collision behaviour, tile-based level construction, enemy behaviour, and retro interface design.

#### Mecha Fight

A turn-based tactical artillery game featuring destructible terrain, physics-driven projectiles, modular abilities, mech movement, tactical positioning, and an industrial-futuristic HUD.

#### SOMA

A narrative-driven 2D action platformer combining combat, branching conversations, scripted scenes, boss encounters, pixel art, environmental effects, and audio management.

### Web applications

The web-application section uses a responsive editorial grid rather than the horizontal carousel used by the visual and game projects.

#### Bookverse

A desktop-first React and Konva application for visually organising books, sagas, and shared literary universes. The case study covers:

- A zoomable and pannable canvas.
- Universe, saga, and book hierarchies.
- Draggable nodes and animated relationships.
- Focused collection views.
- A reading timeline.
- Contextual editing.
- LocalStorage autosave.
- Versioned JSON import and export.
- Performance considerations for canvas animation.

#### Power App

A mobile-first progressive web application that transforms a structured powerlifting spreadsheet into an installable training tool. It includes:

- Daily training views.
- Programme editing.
- Exercise completion tracking.
- Actual-performance recording.
- Local browser persistence.
- Light and dark themes.
- Service-worker and web-app-manifest support.

#### Weekly Meal Planner

A responsive React, TypeScript, and Firebase application for shared household meal planning. It includes:

- Fourteen weekly meal slots.
- A reusable menu library.
- Household-member assignments.
- A shared shopping list.
- Real-time Firestore synchronisation.
- Responsive desktop and mobile workflows.
- PWA delivery through Vite and Workbox.

The live deployment is intentionally private because the current product is designed for one household and does not include user authentication.

### Pixel art

The pixel-art section presents character collections created with Aseprite and related visual tools.

- **Sentient Characters** — retro-futuristic player, NPC, enemy, and boss sprites designed for in-game readability.
- **Fantasy Characters** — literary character interpretations focused on silhouette, pose, palette, and defining visual details.
- **Thriller Characters** — mystery archetypes communicated through costume, posture, and personality.

### 3D models

The 3D section presents low-poly studies produced in Blockbench.

- **Pokéitems** — simplified real-time props built around recognisable shapes and compact geometry.
- **Malenia's Helmet** — a stylised low-poly recreation focused on silhouette and layered ornamental forms.
- **Hoverbikes** — four futuristic vehicle variants that share a visual language while exploring different proportions and profiles.

### Education and technical experience

The site also documents formal education and a multidisciplinary toolkit covering:

- Unity and C# game development.
- JavaScript and TypeScript front-end development.
- React and Konva.
- Python.
- HTML and CSS.
- Firebase and progressive web applications.
- Aseprite, Blender, Blockbench, Photoshop, and Illustrator.
- Git, GitHub, GitLab, and Visual Studio workflows.

## Technology Stack

### Core website

- **HTML5** for semantic page structure and accessible landmarks.
- **CSS3** for layout, responsive design, animation, theming, and component styling.
- **Vanilla JavaScript** for all navigation, carousel, dialog, routing, and interaction behaviour.

### Browser APIs used

- `IntersectionObserver`
- `History API`
- `Window.matchMedia()`
- `Element.scrollBy()`
- `Window.scrollTo()`
- `requestAnimationFrame()`
- `Local focus management`
- `inert` attribute
- `Image` preloading

### External runtime dependencies

None.

The portfolio itself does not import a JavaScript framework or third-party stylesheet. The technologies listed inside individual case studies describe those showcased products, not dependencies required to run this portfolio.

## Project Structure

The supplied project is organised around three primary source files and an asset directory:

```text
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
├── resume.pdf
└── assets/
    └── images/
        ├── profile.png
        ├── hero-background.gif
        ├── favicon.ico
        ├── project GIFs, videos, and screenshots
        ├── power-app/
        ├── weekly-meal-planner/
        └── bookverse/
```

### `index.html`

Contains:

- Site metadata and document title.
- Fixed header and primary navigation.
- Hero content.
- Portfolio sections.
- Education and technical-skills sections.
- Contact footer.
- All project case-study dialogs.
- Media references and external project links.

### `style.css`

Contains:

- Design tokens through CSS custom properties.
- Global resets and typography.
- Header, hero, section, card, carousel, timeline, skill, footer, and dialog styles.
- Responsive breakpoints.
- Reduced-motion behaviour.
- Web-application showcase layouts.
- Project-specific case-study presentation styles.
- Hoverbike media-switcher styling.

### `script.js`

Contains:

- Mobile-menu state management.
- Scroll-progress and header-state updates.
- Active-section detection.
- Reveal animations.
- Carousel controls and status updates.
- Project-dialog opening and closing.
- Hash-based project routing.
- Browser-history integration.
- Focus trapping and focus restoration.
- Reduced-motion handling.
- Video playback management.
- Hoverbike media switching.
- Dynamic copyright-year updates.

## Getting Started

Because the site is entirely static, setup is minimal.

### 1. Download or clone the project

```bash
git clone <repository-url>
cd <repository-folder>
```

Replace the placeholders with the actual repository URL and local folder name.

### 2. Confirm the required assets

The HTML expects the images, GIFs, videos, favicon, and project screenshots to be available under:

```text
assets/images/
```

It also expects a resume file at:

```text
resume.pdf
```

Preserve the existing relative paths or update the references in `index.html`.

### 3. Run a local server

Opening `index.html` directly may work for basic browsing, but a local HTTP server is recommended so that browser behaviour matches production hosting more closely.

Using Python:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Using Node.js and `npx`:

```bash
npx serve .
```

No installation or build command is required for the portfolio source itself.

## How the Interface Works

### Navigation and active-section tracking

The script observes all major page sections and the footer. As sections enter the central portion of the viewport, the corresponding header link receives the `is-active` class.

The observer uses a negative top and bottom root margin so that the active state changes when a section reaches the main reading area rather than only when it first touches the viewport.

### Reveal animation

Elements with the `.reveal` class begin slightly translated and transparent. A dedicated observer adds `.is-visible` when each element enters the viewport and then stops observing it.

This provides one-time entrance animation without continuously running scroll handlers.

### Carousel calculation

Each carousel calculates its scroll step from:

1. The rendered width of the first card.
2. The computed CSS gap between cards.

This allows the same JavaScript logic to work at different responsive card widths. The current item is estimated from the horizontal scroll position divided by the calculated step.

### Dialog routing

Every interactive project card includes a `data-project` value, for example:

```html
<article data-project="bookverse">...</article>
```

Its matching dialog uses an ID in this format:

```html
<section id="project-detail-bookverse">...</section>
```

When the card opens, the script updates the URL to:

```text
#/portfolio/bookverse
```

On initial page load and browser-history changes, the script reads the hash and opens the appropriate dialog.

### Direct links and browser history

The script distinguishes between:

- A project opened from the portfolio interface.
- A project opened directly from a copied hash URL.

When a project was opened through the interface, closing it can use `history.back()`. When the page was entered directly at a project URL, closing replaces the hash without incorrectly navigating away from the portfolio.

## JavaScript Architecture

The JavaScript is wrapped in an immediately invoked function expression and uses strict mode:

```javascript
(() => {
  "use strict";
  // Application behaviour
})();
```

This avoids leaking variables into the global scope.

### Main state values

The script keeps only a small amount of shared state:

- `activeProject` — the currently open project dialog.
- `lastFocusedElement` — the element that should receive focus after a dialog closes.
- `prefersReducedMotion` — the current operating-system motion preference.

### Page chrome updates

`updatePageChrome()` controls three scroll-dependent interface states:

- Header appearance.
- Back-to-top visibility.
- Scroll-progress width.

The scroll listener is passive to avoid blocking scrolling.

### Dialog lifecycle

`showProject()`:

1. Finds the matching dialog.
2. Stores the currently focused element.
3. Reveals the dialog.
4. Locks body scrolling.
5. Makes the background inert.
6. Pauses other project videos.
7. Starts the active video when motion is allowed.
8. Moves focus into the dialog.
9. Updates browser history when required.

`hideProject()` reverses these operations and restores focus after the closing transition.

### Focus trapping

While a dialog is open, the script intercepts `Tab` and `Shift + Tab` at the first and last focusable elements. This keeps keyboard navigation inside the modal surface until it is closed.

### Defensive coding

Most DOM lookups are guarded with optional chaining or explicit existence checks. This allows individual components to be removed without causing the rest of the page script to fail.

## Styling Architecture

### Design tokens

Global visual values are declared as CSS custom properties under `:root`, including:

- Background and surface colours.
- Primary text and muted text colours.
- Yellow and orange accent colours.
- Border colours.
- Shadows.
- Border radii.
- Content width.
- Header height.
- Shared easing curve.

Example:

```css
:root {
  --bg: #131210;
  --surface: #1a1816;
  --text: #f3f0e8;
  --yellow: #fada5e;
  --orange: #f48067;
  --content: 1180px;
}
```

Changing these variables is the fastest way to create a different visual theme.

### Naming convention

The stylesheet generally follows a component-oriented, BEM-like naming pattern:

```text
component
component__element
component--modifier
```

Examples:

- `.project-card`
- `.project-card__media`
- `.project-card--pixel`
- `.detail-hero__overlay`
- `.web-project-tile--featured`

### Layout systems

The site combines several CSS layout techniques:

- CSS Grid for section headings, education, skills, case-study summaries, galleries, and web-project layouts.
- Flexbox for navigation, buttons, tags, carousel tracks, and footer links.
- Fixed positioning for the header, progress bar, modal dialogs, and back-to-top control.
- Scroll snapping for project carousels.
- `clamp()` for fluid typography and spacing.
- `aspect-ratio` for stable media frames.
- `color-mix()` for project-specific accent variations.

### Visual language

The design uses:

- A dark, warm-neutral base.
- Yellow as the main highlight colour.
- Coral-orange as a secondary accent.
- Large editorial typography.
- Rounded surfaces and subtle borders.
- Soft radial glows.
- Layered shadows and blurred translucent panels.
- Project-specific visual accents for Bookverse, Power App, and Weekly Meal Planner.

## Accessibility

Accessibility is integrated into both the markup and interaction logic.

### Semantic structure

The document uses:

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<footer>`
- Heading hierarchies
- Description lists for project metadata
- Figures and captions for project media

### Keyboard support

Visitors can:

- Skip directly to the main content.
- Navigate project cards with the keyboard.
- Open cards using `Enter` or `Space`.
- Navigate carousels with arrow keys.
- Close menus and dialogs using `Escape`.
- Use visible focus indicators.
- Remain correctly contained inside open dialogs.

### ARIA usage

The project uses ARIA where native HTML alone does not fully describe the interaction:

- Navigation labels.
- Menu expanded state.
- Dialog roles and modal state.
- Dialog title relationships through `aria-labelledby`.
- Project-card popup intent through `aria-haspopup`.
- Media-tab pressed states.
- Accessible labels for icon-only controls.

### Motion and autoplay

Project videos are muted, looped, and configured for inline playback. JavaScript prevents automatic playback when reduced motion is requested and pauses videos that are not part of the active case study.

### Image descriptions

Content images include descriptive alternative text. Decorative interface images inside hero composites are hidden from assistive technology using empty alternative text and an `aria-hidden` parent where appropriate.

## Responsive Design

The layout changes across several major breakpoints.

### Large screens

- Full horizontal navigation.
- Three project cards visible in carousels.
- Three-column technical-skills layout.
- Two-column or feature-oriented web-application presentations.
- Multi-column project galleries.

### Medium screens

- Two project cards visible in carousels.
- Two-column skills and character galleries.
- Web-application tiles become full width.
- Featured project layouts stack vertically.

### Mobile screens

- Collapsible navigation menu.
- One card per carousel viewport.
- Hidden carousel arrow controls in favour of touch scrolling.
- Single-column section headings, education entries, skills, summaries, and project notes.
- Full-width call-to-action buttons.
- Smaller dialog toolbar and content margins.
- Mobile-specific arrangements for composite application screenshots.

## Performance Considerations

The portfolio includes several performance-oriented choices:

- Most below-the-fold images use `loading="lazy"`.
- Images use `decoding="async"` where appropriate.
- The profile image uses high fetch priority because it appears in the initial viewport.
- Project videos use `preload="metadata"` instead of immediately downloading complete files.
- Scroll listeners are passive.
- Visibility and section-state changes use `IntersectionObserver` rather than continuous geometry calculations.
- Hidden project videos are paused.
- The media switcher preloads a replacement image before swapping it into view.
- CSS defines fixed aspect ratios to reduce layout shifts.

For production deployment, large GIF and video assets should still be compressed carefully because media size is likely to have a greater effect on load time than the source code itself.

## Adding a New Portfolio Project

A new project requires both a trigger card and a matching detail dialog.

### 1. Add the project card

Use a unique slug in `data-project`:

```html
<article
  class="project-card"
  tabindex="0"
  role="button"
  aria-haspopup="dialog"
  data-project="new-project"
>
  <!-- Card media and content -->
</article>
```

For a web application, use the corresponding `.web-project-tile` structure instead.

### 2. Add the matching dialog

The dialog ID must use the same slug:

```html
<section
  class="project-detail"
  id="project-detail-new-project"
  role="dialog"
  aria-modal="true"
  aria-labelledby="project-title-new-project"
  hidden
>
  <div class="project-detail__panel">
    <div class="project-detail__toolbar">
      <button type="button" data-close-project>Back to portfolio</button>
      <span>Project case study</span>
      <button type="button" data-close-project aria-label="Close project">×</button>
    </div>

    <div class="detail-container">
      <h2 id="project-title-new-project">New Project</h2>
      <!-- Case-study content -->
    </div>
  </div>
</section>
```

No additional JavaScript registration is necessary. The existing script automatically discovers elements containing `data-project` and `data-close-project`.

### 3. Add media files

Place project media under `assets/images/` or an appropriately named subdirectory. Use:

- Meaningful file names.
- Correct alternative text.
- Lazy loading for non-critical images.
- Compressed WebP, AVIF, MP4, or similarly efficient formats where practical.

### 4. Check the route

The project will be available through:

```text
#/portfolio/new-project
```

### 5. Verify keyboard behaviour

Confirm that:

- The card can receive focus.
- `Enter` and `Space` open the dialog.
- Focus moves to a close button.
- `Tab` remains inside the dialog.
- `Escape` closes the dialog.
- Focus returns to the original card.

## Customisation Guide

### Change personal information

Update the following areas in `index.html`:

- Page title and meta description.
- Brand name and role.
- Hero portrait, status, headline, and introduction.
- Professional facts.
- Education timeline.
- Technical experience.
- Contact email.
- Resume path.
- GitHub, Instagram, and LinkedIn links.
- Footer location and employment text.

### Change the colour palette

Edit the colour variables at the top of `style.css`:

```css
:root {
  --bg: ...;
  --surface: ...;
  --text: ...;
  --yellow: ...;
  --orange: ...;
}
```

Review contrast after changing the palette, especially for muted text, borders, focus outlines, and text displayed over media.

### Change the hero background

Replace:

```text
assets/images/hero-background.gif
```

Or update the URL in `.hero__background` inside `style.css`.

### Change content width and spacing

The primary maximum width is controlled by:

```css
--content: 1180px;
```

Global section spacing is controlled by the `.section` rule and its responsive breakpoints.

### Add a new navigation section

1. Give the section a unique `id`.
2. Add a matching anchor link to `.primary-nav`.
3. Place the section inside `<main>` or use a footer section with an ID.

The active-section observer automatically includes `main section[id]` and `footer[id]`.

## Deployment

The project can be deployed to any static hosting provider.

### GitHub Pages

A typical GitHub Pages workflow is:

1. Push `index.html`, `style.css`, `script.js`, `resume.pdf`, and the complete `assets` directory to the repository.
2. Open the repository settings.
3. Enable Pages from the required branch and root directory.
4. Wait for the static site to publish.

The hash-based project routes work well on static hosting because they do not require server-side URL rewriting.

### Netlify, Vercel, or Cloudflare Pages

Use the repository root as the publish directory. No build command is required unless the project is later migrated into a build system.

### Traditional web hosting

Upload the files while preserving the same directory structure. Ensure the server sends appropriate MIME types for `.css`, `.js`, `.webp`, `.gif`, `.mp4`, `.pdf`, and icon files.

## Browser Support

The project is intended for current evergreen browsers, including recent versions of:

- Chrome
- Edge
- Firefox
- Safari

The implementation uses modern platform features such as:

- `IntersectionObserver`
- The `inert` attribute
- CSS `color-mix()`
- CSS `clamp()`
- `aspect-ratio`
- `backdrop-filter`
- Optional chaining

Older browsers may require fallbacks or polyfills. The core content remains semantic HTML, but some visual effects and modal-background behaviour may degrade when newer features are unavailable.

## Current Limitations

Based on the provided source snapshot:

- There is no automated test suite.
- There is no linting or formatting configuration.
- There is no package manifest or build pipeline.
- Project information is written directly in `index.html`, so adding many more case studies could eventually make the file difficult to maintain.
- The project dialogs behave like client-side views but are not generated from structured data.
- Large GIF and video files may require additional optimisation for slower connections.
- Some showcased applications are desktop-first or private by design, as explained in their case studies.

A future version could move project data into JSON or JavaScript objects, generate cards and dialogs from reusable templates, and add automated accessibility and browser testing.

## Author

**Pol Rovira**  
Game developer, front-end product developer, pixel artist, and 3D generalist based in Catalonia, Spain.

- GitHub: [polroviraguilar](https://github.com/polroviraguilar)
- LinkedIn: [Pol Rovira Aguilar](https://www.linkedin.com/in/pol-rovira-aguilar-4257961b1/)
- Instagram: [@sentienthegame](https://www.instagram.com/sentienthegame/)
- Email: [proviraguilar@gmail.com](mailto:proviraguilar@gmail.com)

---

This README documents the current static portfolio implementation and should be updated whenever the project structure, showcased work, routes, or interaction patterns change.
