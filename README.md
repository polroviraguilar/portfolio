# Pol Rovira - Game Developer Portfolio

A personal portfolio website presenting my work across game development, frontend development, pixel art, and low-poly 3D modelling.

The site is designed as a focused, interactive showcase of selected projects, detailed case studies, technical experience, education, and contact information. It is built entirely with semantic HTML, modern CSS, and vanilla JavaScript, then deployed as a static website through GitHub Pages.

## Live Website

[View the portfolio](https://polroviraguilar.github.io/portfolio/)

## Table of Contents

- [Overview](#overview)
- [Portfolio Content](#portfolio-content)
- [Main Features](#main-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Implementation Details](#implementation-details)
- [Running the Project Locally](#running-the-project-locally)
- [Adding or Updating Projects](#adding-or-updating-projects)
- [Deployment](#deployment)
- [Accessibility](#accessibility)
- [Performance and Responsive Design](#performance-and-responsive-design)
- [Project Context](#project-context)
- [Contact](#contact)

## Overview

This repository contains the source code and media used for my professional portfolio. The website brings together programming and visual design, with an emphasis on game feel, clear interaction, readable interfaces, and expressive art direction.

The portfolio is organised into the following areas:

- Game development projects made primarily with Unity and C#.
- A mobile-first progressive web application for powerlifting training.
- Pixel-art character design and animation work.
- Low-poly 3D props, wearable assets, and vehicle studies.
- Academic background and technical experience.
- Direct links to my resume, GitHub profile, LinkedIn, Instagram, and email.

The website does not require a framework, package manager, build process, database, or backend service.

## Portfolio Content

### Game Projects

The game development section contains interactive case studies for:

| Project | Year | Role | Main Focus |
| --- | ---: | --- | --- |
| Monkey Island Fight | 2024 | Solo developer | Branching dialogue, timing, state management, and player feedback |
| Super Mario Bros | 2024 | Solo developer | Character controls, collision systems, level recreation, and retro interface design |
| Mecha Fight | 2025 | Game designer and programmer | Turn-based combat, projectile physics, destructible terrain, and modular abilities |
| SOMA | 2025 | Designer, writer, and programmer | Narrative design, combat, branching dialogue, cinematic flow, and audio systems |

Each project can be opened from its portfolio card to reveal a full-screen case study with project information, development notes, media, and key lessons.

### Web Application

The portfolio also presents Power App, a mobile-first progressive web application created for planning and tracking structured powerlifting programmes.

The case study covers:

- Daily workout tracking.
- Editable multi-week programming.
- Browser-based local persistence.
- Light and dark themes.
- Installable PWA behaviour.
- Product design and mobile interaction decisions.
- A framework-free frontend built with HTML, CSS, and JavaScript.

### Pixel Art

The visual development section includes:

- Sentient Characters.
- Fantasy Characters.
- Thriller Characters.

These collections focus on character silhouettes, readable poses, controlled colour palettes, animation, and role distinction at small in-game sizes.

### 3D Models

The 3D section includes low-poly studies created in Blockbench:

- Pokeitems.
- Malenia's Helmet.
- Hoverbikes.

The models explore recognisable silhouettes, economical geometry, stylised forms, and visual consistency for real-time applications.

## Main Features

- Responsive single-page portfolio layout.
- Fixed navigation with active-section tracking.
- Mobile navigation menu.
- Scroll progress indicator.
- Reusable horizontal project carousels.
- Keyboard-accessible project cards.
- Full-screen project case-study dialogs.
- Hash-based project URLs using the `#/portfolio/project-slug` format.
- Browser history support for opening and closing project details.
- Keyboard focus management inside open dialogs.
- Escape-key and backdrop-based dialog closing.
- Animated content reveals using `IntersectionObserver`.
- Automatic support for the user's reduced-motion preference.
- Lazy-loaded project media.
- Dynamic current-year display.
- Dedicated media switcher for the Hoverbikes collection.
- External links to live products, source code, professional profiles, and a downloadable resume.

## Technology Stack

### Website

| Area | Technology |
| --- | --- |
| Structure | Semantic HTML5 |
| Styling | CSS3, custom properties, responsive media queries, transitions, and keyframe animation |
| Interaction | Vanilla JavaScript |
| Browser APIs | Intersection Observer, History API, MatchMedia, Local DOM APIs |
| Hosting | GitHub Pages |
| Version control | Git and GitHub |

### Skills and Tools Showcased

| Area | Tools and Technologies |
| --- | --- |
| Game development | Unity, C# |
| Programming | C#, Python, JavaScript, HTML, CSS |
| Pixel art | Aseprite, Photoshop |
| 3D creation | Blockbench, Blender |
| Visual design | Photoshop, Illustrator |
| Development workflow | Visual Studio, Git, GitHub, GitLab |
| Web product development | Progressive web apps, browser storage, service workers, web app manifests |

## Project Structure

```text
portfolio/
|-- index.html
|-- style.css
|-- script.js
|-- resume.pdf
|-- README.md
`-- assets/
    `-- images/
        |-- profile and background media
        |-- project thumbnails
        |-- gameplay videos and animations
        |-- case-study images
        |-- pixel-art sprites
        |-- 3D model previews
        `-- power-app/
            |-- power-app-daily.webp
            |-- power-app-plan.webp
            |-- power-app-editor.webp
            `-- power-app-dark.webp
```

The exact contents of the media directory may grow as new projects and case studies are added.

## Implementation Details

### HTML

`index.html` contains the full content structure of the portfolio:

- Header and primary navigation.
- Hero introduction.
- Game, web application, pixel-art, and 3D sections.
- Education and technical-experience sections.
- Contact footer.
- Project cards.
- Full project-detail sections implemented as accessible dialogs.

Each portfolio item uses a `data-project` value that corresponds to a project-detail section.

Example:

```html
<article data-project="example-project">
  ...
</article>

<section id="project-detail-example-project" role="dialog" hidden>
  ...
</section>
```

### CSS

`style.css` defines the complete visual system, including:

- Colour, spacing, radius, shadow, content-width, and motion variables.
- Dark visual theme with yellow and orange accent colours.
- Responsive layouts for desktop, tablet, and mobile screens.
- Project cards, timelines, skill groups, dialogs, galleries, and controls.
- Hover, focus, active, and disabled states.
- Pixel-art rendering rules.
- Reduced-motion fallbacks.
- Dedicated styles for the Power App case study and Hoverbikes media switcher.

### JavaScript

`script.js` provides the site's interactive behaviour:

- Header state and scroll progress.
- Mobile navigation.
- Back-to-top behaviour.
- Active navigation updates.
- Reveal-on-scroll animation.
- Reusable carousel controls and counters.
- Project dialog routing and history management.
- Focus trapping and focus restoration.
- Background inert state while a dialog is open.
- Automatic video playback and pausing.
- Reduced-motion handling.
- Hoverbike media switching.
- Automatic footer year updates.

Project cards and detail views are connected through naming conventions, so most new projects can be added without creating a separate JavaScript configuration object.

## Running the Project Locally

### Requirements

- Git.
- A modern web browser.
- Any simple local static-file server.

No Node.js packages or additional dependencies are required.

### Clone the Repository

```bash
git clone https://github.com/polroviraguilar/portfolio.git
cd portfolio
```

### Start a Local Server

Using Python:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

A local server is recommended instead of opening `index.html` directly because it more closely reproduces the behaviour of the deployed GitHub Pages website and avoids browser restrictions around local media and navigation.

## Adding or Updating Projects

### Add a New Project Card

Create a card in the appropriate carousel or featured section and assign it a unique slug:

```html
<article
  class="project-card"
  tabindex="0"
  role="button"
  aria-haspopup="dialog"
  data-project="new-project"
>
  ...
</article>
```

### Add the Matching Case Study

Create a project-detail section using the same slug:

```html
<section
  class="project-detail"
  id="project-detail-new-project"
  role="dialog"
  aria-modal="true"
  aria-labelledby="project-title-new-project"
  hidden
>
  ...
</section>
```

The value in `data-project` must match the final part of the detail section's `id`.

### Add Media

Place new images, GIFs, videos, or WebP files inside `assets/images/` or a dedicated project subdirectory. Use descriptive file names and provide meaningful alternative text for informative images.

### Check the Result

After making changes, verify:

- Desktop, tablet, and mobile layouts.
- Keyboard navigation.
- Enter and Space activation on project cards.
- Escape-key dialog closing.
- Focus restoration after closing a project.
- Carousel controls and counters.
- Direct project URLs.
- Reduced-motion behaviour.
- Media paths and alternative text.

## Deployment

The portfolio is deployed with GitHub Pages.

To publish updates:

1. Commit the changes.
2. Push them to the branch configured as the GitHub Pages source.
3. Open the repository's GitHub Pages settings if the publishing source needs to be changed.
4. Configure deployment from the required branch and repository root.
5. Wait for the Pages deployment workflow to complete.

Once published, the website is available at:

[https://polroviraguilar.github.io/portfolio/](https://polroviraguilar.github.io/portfolio/)

Because the project is fully static, no environment variables, server configuration, or production build command are required.

## Accessibility

Accessibility is treated as part of the interaction design rather than an optional addition.

The current implementation includes:

- A skip link for keyboard users.
- Semantic page regions and heading structure.
- Accessible names for navigation and controls.
- Visible `:focus-visible` styles.
- Keyboard-operable project cards.
- Arrow-key carousel navigation.
- Dialog roles and modal state.
- Focus trapping while a project detail is open.
- Restoration of focus after closing a dialog.
- Background content marked as inert while a dialog is active.
- Escape-key support.
- Alternative text for project media.
- Support for `prefers-reduced-motion`.

When adding new content, preserve these patterns and avoid using visual appearance as the only way to communicate state or meaning.

## Performance and Responsive Design

The website is designed to remain lightweight and usable across different screen sizes.

Relevant implementation choices include:

- No frontend framework or third-party runtime dependency.
- Lazy loading for non-critical images.
- Asynchronous image decoding where appropriate.
- Native browser APIs for observation, navigation, and interaction.
- Responsive typography and spacing with `clamp()`.
- Flexible grid and carousel layouts.
- Mobile-specific navigation and project-detail layouts.
- WebP media for the Power App case study.
- Paused project videos when their detail view is not active.
- Motion reduction for users who request it.

Large GIF and video assets can have a significant effect on loading performance. New media should be compressed, correctly sized, and converted to efficient formats whenever possible.

## Project Context

Some projects displayed in this portfolio are educational recreations or fan studies inspired by existing games, characters, or fictional properties. They are presented to document programming, design, and artistic practice.

All third-party names, characters, trademarks, and original intellectual property remain the property of their respective owners.

## Contact

Pol Rovira

- Portfolio: [polroviraguilar.github.io/portfolio](https://polroviraguilar.github.io/portfolio/)
- Email: [proviraguilar@gmail.com](mailto:proviraguilar@gmail.com)
- GitHub: [github.com/polroviraguilar](https://github.com/polroviraguilar)
- LinkedIn: [Pol Rovira Aguilar](https://www.linkedin.com/in/pol-rovira-aguilar-4257961b1/)
- Instagram: [sentienthegame](https://www.instagram.com/sentienthegame/)
