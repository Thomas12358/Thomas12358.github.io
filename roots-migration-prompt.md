# Prompt: Migrate the /roots Bike Route Planner to a New Website

## Context

I have a Jekyll-based personal portfolio site (Thomas12358.github.io) that contains a
self-contained **Bike Route Planner** app at the `/roots/` route. I want to move this
app into a separate website. Please help me do that migration.

---

## What the /roots app is

The `/roots/` page is a full interactive web app (~60 KB of inline HTML/CSS/JS) that:

- Displays an interactive Leaflet map centred on Vancouver
- Loads and visualises GPX bike routes stored in Firebase Cloud Storage / Firestore
- Lets users add GPS waypoints from CSV files or Google Maps URLs
- Groups markers by type (Onsen, Campsite, Roadside Station, Must See, Hotel, Other)
- Uses Leaflet.MarkerCluster for performance
- Supports Google OAuth authentication for admin users
- Has a companion admin page (`/roots/admin/`) for CRUD operations on routes and points

---

## Files to migrate (source: Thomas12358.github.io)

| File | Description |
|------|-------------|
| [`_pages/roots.md`](https://github.com/Thomas12358/Thomas12358.github.io/blob/main/_pages/roots.md) | Main app page (~1 760 lines, all logic inline) |
| [`_pages/admin.md`](https://github.com/Thomas12358/Thomas12358.github.io/blob/main/_pages/admin.md) | Admin CRUD panel (~1 200 lines, all logic inline) |
| [`assets/js/firebase-config.js`](https://github.com/Thomas12358/Thomas12358.github.io/blob/main/assets/js/firebase-config.js) | Firebase project config + admin email constant |
| [`assets/gpx/routes.json`](https://github.com/Thomas12358/Thomas12358.github.io/blob/main/assets/gpx/routes.json) | Static GPX manifest (currently `[]` – data lives in Firestore) |
| [`assets/csv/example_points.csv`](https://github.com/Thomas12358/Thomas12358.github.io/blob/main/assets/csv/example_points.csv) | Sample CSV for point imports |
| [`assets/csv/README.md`](https://github.com/Thomas12358/Thomas12358.github.io/blob/main/assets/csv/README.md) | CSV format documentation |

---

## External dependencies (CDN – must be preserved)

```html
<!-- Mapping -->
<link  rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<link  rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css" />
<link  rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>

<!-- Firebase (compat SDK v10) -->
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>
<!-- auth-compat and storage-compat are lazy-loaded only when the user clicks Sign In -->
```

---

## Firebase backend (shared – no changes needed to Firebase itself)

The Firebase project (`roots-eddf5`) stays exactly as-is. The new site just needs to
load `firebase-config.js` (or inline the config object) so the same Firestore collections
(`routes`, `points`) and Cloud Storage bucket are used.

---

## What needs to change in the **source** site (Thomas12358.github.io) after migration

1. Remove the `Roots` entry from [`_data/navigation.yml`](https://github.com/Thomas12358/Thomas12358.github.io/blob/main/_data/navigation.yml).
2. Delete (or archive) [`_pages/roots.md`](https://github.com/Thomas12358/Thomas12358.github.io/blob/main/_pages/roots.md) and [`_pages/admin.md`](https://github.com/Thomas12358/Thomas12358.github.io/blob/main/_pages/admin.md).
3. Optionally add a redirect from `/roots/` to the new site's URL.
4. Keep [`assets/js/firebase-config.js`](https://github.com/Thomas12358/Thomas12358.github.io/blob/main/assets/js/firebase-config.js) only if other pages still reference it; otherwise
   delete it too.

---

## Target site – questions to answer before starting

Before generating any code, please clarify (or propose sensible defaults for) the
following:

1. **Framework / tech stack** – e.g. plain HTML/JS, Next.js, Vite + React, SvelteKit,
   another Jekyll site, etc.
2. **Hosting** – GitHub Pages, Vercel, Netlify, Firebase Hosting, etc.
3. **URL structure** – should the app live at the root `/`, at `/roots/`, or somewhere
   else?
4. **Should the admin panel be a separate route** (`/admin/`) or merged into the main
   page behind an auth gate?
5. **Domain / repo name** – is a new repo needed, or does one already exist?

---

## Migration tasks (once the above is answered)

- [ ] Scaffold the new project with the chosen framework
- [ ] Copy and adapt `roots.md` content → framework-appropriate page/component
- [ ] Copy and adapt `admin.md` content → framework-appropriate admin page/component
- [ ] Move `firebase-config.js` to the new project's assets or environment variables
- [ ] Move example CSV and GPX manifest
- [ ] Verify all CDN links are present in the new page's `<head>`
- [ ] Test map rendering, route loading, point import, and admin auth
- [ ] Update `Thomas12358.github.io` navigation and add redirect as needed
- [ ] Deploy and confirm the live URL works

---

## Additional notes

- All app logic (routing, map, Firebase calls, CSV parsing, GPX parsing) is currently
  **inline** in the markdown files. If the target framework supports components/modules,
  it would be a good opportunity to split the code into logical files, but this is
  optional – a straight copy-paste of the HTML/CSS/JS blocks will also work.
- The app uses a dark colour scheme (`#252a34` background, `#e0e0e0` text, `#58a6ff`
  accent) that should be preserved or adapted to the new site's theme.
- The Firebase API key in `firebase-config.js` is a **client-side** key and is
  intentionally public; security is enforced by Firestore rules. Do **not** treat it as
  a secret that needs to be hidden in environment variables (though you may do so for
  cleanliness).
