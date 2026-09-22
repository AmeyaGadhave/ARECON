# Sheth Architects Website - Routing Guide

## URL Routes

### Main Pages (Root Level)
- `/index.html` - Home page
- `/projects.html` - Projects overview with filtering
- `/about.html` - About the firm
- `/solutions.html` - Services & solutions
- `/contact.html` - Contact page

### Healthcare Projects (Category)
- `/projects/healthcare/` - Healthcare project folder

#### Healthcare Sub-routes:
```
/projects/healthcare/bmc-general-hospital.html
/projects/healthcare/indira-gandhi-hospital.html
/projects/healthcare/sankalp-hospital-extension.html
/projects/healthcare/christian-hospital-bissamcuttack.html
/projects/healthcare/makunda-hospital.html
/projects/healthcare/aurelion-hospital.html
/projects/healthcare/west-bengal-hospitals.html
/projects/healthcare/echelon-hospital.html
/projects/healthcare/fertility-ivf-centre.html
/projects/healthcare/homi-bhabha-cancer-hospital.html
```

### Architecture Projects (Category - Ready for expansion)
- `/projects/architecture/` - Architecture project folder

### Interior Projects (Category - Ready for expansion)
- `/projects/interior/` - Interior project folder

### PMC Projects (Category - Ready for expansion)
- `/projects/pmc/` - PMC project folder

## Link Navigation Flows

### From projects.html to Project Detail Pages
```
projects.html → projects/healthcare/[project-name].html
             → projects/architecture/[project-name].html
             → projects/interior/[project-name].html
             → projects/pmc/[project-name].html
```

### From Project Detail Pages Back to Main Site
```
projects/healthcare/[project].html → ../../../projects.html (Back to Projects)
                                   → ../../../index.html (Home)
                                   → ../../../about.html (About)
                                   → ../../../solutions.html (Solutions)
                                   → ../../../contact.html (Contact)
```

### West Bengal Hospitals Special Navigation
- Single page with 6 hospital options
- Internal navigation between hospitals without page reload
- Dynamic content switching via JavaScript

## Relative Path Explanation

### Why `../../../`?

**File Depth**: `projects/healthcare/west-bengal-hospitals.html`
- Level 1: `projects/` (from root)
- Level 2: `healthcare/` (from projects)
- Level 3: `west-bengal-hospitals.html` (current file)

**To reach root**: `../` (up 1) + `../` (up 1) + `../` (up 1) = `../../../`

### From Each Level:

```
Root level (index.html):
- CSS: css/style.css
- Projects: projects.html

From projects/[category]/:
- CSS: ../../css/style.css
- Projects: ../../projects.html

From projects/[category]/[project].html:
- CSS: ../../../css/style.css
- Projects: ../../../projects.html
```

## Adding New Project Routes

### To add Architecture Project:
1. Create file: `/projects/architecture/[project-name].html`
2. Add card in `projects.html` with `data-category="architecture"`
3. Link: `href="projects/architecture/[project-name].html"`

### To add Interior Project:
1. Create file: `/projects/interior/[project-name].html`
2. Add card in `projects.html` with `data-category="interior"`
3. Link: `href="projects/interior/[project-name].html"`

### To add PMC Project:
1. Create file: `/projects/pmc/[project-name].html`
2. Add card in `projects.html` with `data-category="pmc"`
3. Link: `href="projects/pmc/[project-name].html"`

## File Loading Flow

When visiting: `/projects/healthcare/echelon-hospital.html`

1. Browser loads HTML file
2. CSS loaded from: `../../../css/style.css`
3. JavaScript loaded from: `../../../js/main.js`
4. Navigation links point to root-level pages via `../../../[page].html`
5. Footer links also use `../../../[page].html` paths

## Project Filtering

All project cards on `projects.html` use `data-category` attribute for filtering:
- `data-category="healthcare"` - Shows in Healthcare filter
- `data-category="architecture"` - Shows in Architecture filter
- `data-category="interior"` - Shows in Interior filter
- `data-category="pmc"` - Shows in PMC filter

Filter buttons click handlers toggle visibility based on these categories.

## Summary

✅ **Clean URL Structure**: Organized by category
✅ **Consistent Routing**: All links follow same pattern
✅ **Scalable Design**: Easy to add new categories and projects
✅ **Correct Relative Paths**: All files use proper relative path navigation
✅ **No Broken Links**: All routes maintain proper directory structure
✅ **Future-Ready**: Architecture, Interior, and PMC folders ready for expansion
