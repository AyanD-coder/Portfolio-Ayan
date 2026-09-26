# Modern technical homepage

## Current behavior and preservation

The modern technical design is the permanent homepage at `/`. The page renders
`components/redesign/RedesignHome.js` directly, using the existing project data
and shared portfolio content. There is no runtime or build-time design switch.
Existing `DESIGN_MODE`, `SCROLL_STORY_ENABLED`, and
`ADVANCED_ANIMATION_ENABLED` environment values are ignored. Existing environment
files and hosting settings have been left unchanged; the old design entries in
`.env.example` are historical and are no longer consumed by the application.

The homepage uses warm ivory sections and deep navy Projects, AI Workflow, and
Contact bands in light mode. Dark mode pairs near-black navy with brighter
teal-blue bands. Section-local tokens coordinate text, cards, buttons, and focus
rings; print styles reset sections to a readable light palette.

The original reference is Git revision
`fe34494369ecea876ba195d4be45bfebc36ff6c2`. Its homepage composition remains in
`components/OriginalHome.js` as a source reference; it is not served by the current
homepage route. Both `app/globals.css` and `app/editorial.css` remain intact and
imported in their original order. Navigation, footer, theme preference, robot,
project data, API, and metadata remain shared. Existing section copy, portrait
markup, contact URL construction, and FAQ schema construction use shared modules.

New presentation styles are confined to `components/redesign/`. Existing anchor
IDs remain intact, with scoped overrides preventing the original anchor colors
from leaking into the homepage. The robot retains its original scene, component,
posters, dimensions, and loading behavior. New transforms never target the robot
or its ancestors. No new animation dependencies, fonts, or image assets were added.

## Run and roll back

```powershell
npm run dev
```

For a production build:

```powershell
npm run build
npm run start
```

Stop an existing production server before rebuilding its output. The homepage
remains statically generated, so updated source must be rebuilt and deployed to
appear on the hosted site. Changing an environment value does not select another
presentation or turn the new homepage off.

If the original presentation is needed again, make a source change that renders
`OriginalHome` with the existing shared project data, or restore the relevant
presentation from Git, then rebuild and redeploy. The preserved components and
styles make this possible without reconstructing content or changing backend
logic. Rollback is a source/Git operation, not an environment toggle.

## Progressive enhancement

The page always delivers complete server-rendered content. Storytelling and
advanced visual effects are enabled by the page, with automatic eligibility and
failure fallbacks. They activate only at viewport sizes of at least 900 × 700
pixels, with a fine primary pointer, no reduced-motion preference, and no
reported data-saving/2G connection. Other conditions keep ordinary document flow.
All project links and workflow text stay visible; there is no scroll interception,
reading-order change, or hidden focus target.

Sticky positioning and progress indicators form the basic layer. Advanced
visual effects add decorative hero movement, a slight project-image zoom, and
workflow step emphasis. Desktop scene geometry is reserved by CSS before
hydration. Story setup/update failures clear enhancement state and leave static
content; advanced-effect failures retain basic storytelling. Build or rendering
failures do not automatically switch to the preserved original presentation.

The controller pauses when the page is hidden, measures on resize/image load,
handles live preference changes, and removes observers, listeners, and animation
frames on unmount. The existing robot independently retains its own
reduced-motion/network policy. The original motion initializer remains unchanged
for the existing shared site behavior.

## Verification

```powershell
npm test
npm run build
npm run verify:design
```

The verifier defaults to the permanent redesigned homepage. It compares
production HTML with the saved baseline for unrelated routes, content/link/image
parity, project order, anchors, heading counts, one FAQ schema, and visible static
SSR content. `--mode=original` remains a comparator for historical original
builds only; it does not change the application presentation.

The verifier accepts `--base-url=http://localhost:3000` for a running server and
`--baseline=PATH` for a separate baseline capture. The original local capture is
`tmp/design-baseline/`, whose `baseline.json` records its capture time. It covers
Home, About, Projects, Contact, and the three featured case studies. This ignored
directory must exist for baseline comparisons; it is not bundled into the app.

Focused tests cover native motion eligibility, progression, offscreen/hidden-page
behavior, failure fallbacks, live preference changes, and lifecycle cleanup.

The permanent-homepage change was verified on September 27, 2026: all 17 motion
tests and seven route-preservation comparisons passed. A production build with
legacy `DESIGN_MODE=original` and both old motion flags set to `false` still
rendered the redesigned homepage with its motion controller enabled. These
values were supplied only to the test build process; environment files and
hosting settings were not changed.

### Earlier verification record

On September 26, 2026, the earlier configurable implementation passed 22 focused
tests, production builds, and all seven baseline comparisons in both original
and redesigned modes. Shared global styles, root layout, navigation, footer,
robot, data, and API files remained unchanged. Those results document the
preservation work; they do not replace verification of the permanent-homepage
change. Old preview processes and snapshots are not current acceptance targets.

Browser verification was unavailable during the initial implementation. Server
markup checks and mocked lifecycle tests do not establish visual correctness or
browser performance. Check both themes at 390px, 768px, 1024px, and 1440px,
landscape orientation, and 200% zoom. Include keyboard navigation, mobile-menu
focus, copy-email success/failure, theme switching, client navigation away and
back, one robot instance, robot loading/failure posters, reduced motion, missing
animation APIs, and disabled JavaScript. Sticky scenes must remain below the
header, anchors visible, and horizontal overflow absent. Measure layout shift
and loading under consistent production conditions against the saved baseline.
