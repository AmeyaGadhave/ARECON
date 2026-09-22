# Sheth Architects Website - Project Structure

## Overview
The website is organized into a clean, modular structure with project categories separated into their own folders for scalability and maintainability.

## Directory Structure

```
sheth-website/
├── index.html                          # Home page
├── projects.html                       # Projects overview & filtering
├── about.html                          # About page
├── solutions.html                      # Solutions page
├── contact.html                        # Contact page
├── project-detail.html                 # Template for detail pages
│
├── projects/                           # Projects organized by category
│   ├── healthcare/                     # Healthcare projects (10 projects)
│   │   ├── west-bengal-hospitals.html           # Multi-facility navigation page
│   │   ├── bmc-general-hospital.html            # Individual project pages
│   │   ├── indira-gandhi-hospital.html
│   │   ├── sankalp-hospital-extension.html
│   │   ├── christian-hospital-bissamcuttack.html
│   │   ├── makunda-hospital.html
│   │   ├── aurelion-hospital.html
│   │   ├── echelon-hospital.html
│   │   ├── fertility-ivf-centre.html
│   │   └── homi-bhabha-cancer-hospital.html
│   │
│   ├── architecture/                   # Architecture projects (Ready for future projects)
│   ├── interior/                       # Interior projects (Ready for future projects)
│   └── pmc/                            # Project Management Consulting projects (Ready for future projects)
│
├── css/                                # Stylesheets
│   └── style.css
│
├── js/                                 # JavaScript files
│   └── main.js
│
├── assets/                             # Project images and assets
├── home_pro_images/                    # Home page images
├── expertise_images/                   # Expertise section images
│
└── Documentation files
    ├── PROJECT_STRUCTURE.md           # This file
    ├── DESIGN_IMPROVEMENTS.md
    ├── Z_INDEX_DEPTH_SYSTEM.md
    └── PROJECTS_PAGE_FEATURES.md
```

## File Organization Details

### Healthcare Projects (10 Total)

#### 1. West Bengal Hospitals (Multi-facility page)
- **File**: `projects/healthcare/west-bengal-hospitals.html`
- **Description**: Single-page navigation with 6 hospital options
- **Features**:
  - Dynamic hospital selection via navigation bar
  - Content updates on same page (no page reload)
  - All hospitals accessible from single URL
  - Pill-shaped button navigation
  - Responsive design (desktop: 2-column, mobile: single column)

#### 2-10. Individual Hospital Pages (One page per hospital)
- **Files**: 
  - `bmc-general-hospital.html`
  - `indira-gandhi-hospital.html`
  - `sankalp-hospital-extension.html`
  - `christian-hospital-bissamcuttack.html`
  - `makunda-hospital.html`
  - `aurelion-hospital.html`
  - `echelon-hospital.html`
  - `fertility-ivf-centre.html`
  - `homi-bhabha-cancer-hospital.html`
- **Description**: Individual detail pages for each hospital project
- **Features**:
  - Professional project detail layout
  - Complete metadata (Location, Typology, Status, Built-Up Area, Scope)
  - Content sections (Site & Concept, Design Approach)
  - Photo gallery placeholders
  - Navigation between related projects

### Relative Path Structure

All project files use relative paths to access shared resources:

```
From projects/healthcare/[project].html:
- CSS:       href="../../../css/style.css"
- JavaScript: src="../../../js/main.js"
- Home:      href="../../../index.html"
- Projects:  href="../../../projects.html"
- About:     href="../../../about.html"
- Solutions: href="../../../solutions.html"
- Contact:   href="../../../contact.html"
```

**Explanation**: Files are 3 levels deep (root → projects → healthcare → file.html), so they use `../../../` to navigate back to root directory.

## Adding New Projects

### To Add a New Healthcare Project:

1. **Create new file**:
   ```bash
   cp projects/healthcare/echelon-hospital.html projects/healthcare/[project-name].html
   ```

2. **Update content** in the new file:
   - Change `<title>` tag
   - Update metadata (location, typology, status, area, scope)
   - Update content sections

3. **Add card to projects.html**:
   ```html
   <a class="project-card" data-category="healthcare" href="projects/healthcare/[project-name].html" data-reveal>
     <figure>
       <div class="ph-img ratio-4-5">
         <div class="ph-inner">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
             <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6"/>
           </svg>
           <span>Project</span>
         </div>
       </div>
     </figure>
     <span class="card-tag">Healthcare</span>
     <h3>[Project Name] <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M7 7h10v10"/></svg></h3>
     <span class="card-loc">[Location] — [Status]</span>
   </a>
   ```

### To Add Another Project Category:

1. **Create category folder**:
   ```bash
   mkdir projects/[category-name]
   ```

2. **Add project files** to the new folder

3. **Update projects.html** with appropriate `data-category` values

4. **Update filtering** in projects.html filter buttons if needed

## Link Management

### Internal Links (Within the Site)
All internal links use relative paths for portability:
- Main navigation and footer links point to root-level pages
- Project cards point to `projects/[category]/[project].html`
- All resources (CSS, JS) use `../../../` relative paths

### Cross-Project Links
- Individual hospital pages can link to related projects within the same category
- Example: From one hospital to the next hospital in the category

### External Navigation
- "Back to Projects" links in detail pages return to: `href="../../../projects.html"`
- Main header logo links to: `href="../../../index.html"`

## Project Card Properties

Each project card in `projects.html` has these attributes:
```html
<a class="project-card" data-category="[category]" href="[path]" data-reveal>
```

**Categories**: `healthcare`, `architecture`, `interior`, `pmc`

**Data attributes**:
- `data-category`: Used for filtering functionality
- `data-reveal`: Triggers animation/reveal effects

## Styling & Responsiveness

- **Desktop Layout** (> 900px):
  - West Bengal Hospitals: 2-column (nav sidebar + content)
  - Individual projects: Full width with sidebar navigation

- **Mobile Layout** (< 900px):
  - Navigation bar stacks horizontally (wrapped buttons)
  - Content spans full width
  - Single column layout

## Performance Notes

1. **Lazy Loading**: Project images use placeholder SVG icons
2. **No External APIs**: All content is static HTML
3. **Fast Load Times**: Minimal dependencies, CSS/JS from CDN or local
4. **SEO Friendly**: Each page has unique title and meta description

## Maintenance

### Adding New Categories
1. Create folder: `projects/[new-category]/`
2. Add HTML files for projects
3. Update filter buttons in `projects.html`
4. Ensure all relative paths are correct (`../../../`)

### Updating Navigation
- Main navigation is consistent across all pages
- Update in one place for changes to reflect everywhere

### Updating CSS/JS
- Shared across all pages via `../../../css/style.css` and `../../../js/main.js`
- Changes automatically reflect in all project pages

## Notes

- All files maintain consistent styling and structure
- Relative paths ensure portability of the project
- Folder organization scales well for adding more projects
- Each category can accommodate multiple projects without issue
