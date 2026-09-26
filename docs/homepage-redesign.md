# Reversible homepage redesign

## Baseline and boundaries

The original reference is Git revision `fe34494369ecea876ba195d4be45bfebc36ff6c2`.
Before implementation, server-rendered HTML for Home, About, Projects, Contact,
and the three featured case studies was saved in `tmp/design-baseline/`.
This directory is ignored by Git. Its `baseline.json` records the capture time.

The original presentation is preserved in `components/OriginalHome.js`. Both
`app/globals.css` and `app/editorial.css` are unchanged and still imported in
their original order. Navigation, footer, theme preference, robot, project data,
API, and metadata remain shared. Original section markup is unchanged; literal
copy, the portrait image, contact URL construction, and FAQ schema construction
were extracted into shared modules.

New presentation code lives in `components/redesign/`. Its CSS Module defines
only homepage-scoped tokens and selectors. Existing anchor IDs are preserved,
including scoped overrides to prevent the original anchor colors from leaking
into the new presentation. The robot keeps its original scene, component,
posters, dimensions, and loading behavior. New animation transforms never target
the robot or its ancestors.

The redesigned homepage uses contrasting section bands: warm ivory sections
alternate with deep navy Projects, AI Workflow, and Contact sections in light
mode. Dark mode pairs near-black navy with brighter teal-blue feature bands.
Section-local tokens coordinate headings, copy, cards, buttons, and focus rings;
print styles reset every section to a readable light palette. The refinement is
confined to the redesign stylesheet.

## Select a design

Use the variables in `.env.example` as a reference. Add the chosen settings to
`.env.local`, or set them in the terminal that starts the app. Do not overwrite
other existing environment settings.

| Setting | Default | Effect |
| --- | --- | --- |
| `DESIGN_MODE` | `original` | Only the exact value `redesign` selects the new homepage. |
| `SCROLL_STORY_ENABLED` | `true` | Enables eligible desktop storytelling in redesign mode. |
| `ADVANCED_ANIMATION_ENABLED` | `true` | Adds cinematic effects when storytelling is enabled. |

An unrecognized design mode selects the original. A missing animation setting
uses its default; any specified value other than `true` disables that layer.
Both animation layers are disabled in original mode. These are server-side
settings, separate from the existing light/dark preference.

PowerShell local preview:

```powershell
$env:DESIGN_MODE = 'redesign'
$env:SCROLL_STORY_ENABLED = 'true'
$env:ADVANCED_ANIMATION_ENABLED = 'true'
npm run dev
```

Stop any existing dev server before starting another server in this directory.
Restart the dev server after changing the configuration. The homepage stays
statically generated in production, so changing the environment of an already
built server does not change that build.

Production preview (local only):

```powershell
$env:DESIGN_MODE = 'redesign'
npm run build
npm run start
```

No production deployment or Git push is part of these instructions.

## Simplify or roll back

1. **Basic storytelling:** keep redesign and storytelling enabled; set
   `ADVANCED_ANIMATION_ENABLED=false`.
2. **Static redesign:** set `SCROLL_STORY_ENABLED=false`. This also disables
   advanced animation and omits the client story controller from the page.
3. **Original homepage:** set `DESIGN_MODE=original`, then restart development
   or rebuild production and restart the server.

PowerShell production rollback:

```powershell
$env:DESIGN_MODE = 'original'
npm run build
npm run start
```

Stop an existing production server before rebuilding its output. A live hosted
rollback would also require redeploying the rebuilt output; that requires the
owner's explicit permission. No source restoration or content reconstruction is
needed. The repository default remains original.

## Progressive enhancement

Both modes deliver complete server-rendered content. Storytelling activates
only at viewport sizes of at least 900 × 700 pixels, with a fine primary pointer,
no reduced-motion preference, and no reported data-saving/2G connection. Other
conditions keep ordinary document flow. All project links and workflow text stay
visible; no reading-order changes, scroll interception, or hidden focus targets
are used.

Sticky positioning and progress indicators form the basic layer. Advanced mode
adds decorative hero movement, a slight project-image zoom, and workflow step
emphasis. Desktop scene geometry is reserved by CSS before hydration. Story
setup/update failures clear enhancement state; advanced failures keep basic
storytelling. Returning to original after an overall rendering/build problem is
an explicit configuration rollback, not an automatic runtime promise.

The controller pauses work when the page is hidden, measures on resize/image
load, handles live preference changes, and removes observers, listeners, and
animation frames on unmount. It does not replace the original motion initializer.
The existing robot independently retains its own reduced-motion/network policy.

## Verification

```powershell
npm test
npm run build
npm run verify:design -- --mode=original
```

For a redesign build, set `DESIGN_MODE=redesign` before building and use
`npm run verify:design -- --mode=redesign`. The verifier compares production HTML
with the saved baseline: original markup, unrelated routes, content/link/image
parity, project order, anchors, heading counts, one FAQ schema, and static SSR
defaults. It also accepts `--base-url=http://localhost:3000` for a running server
and `--baseline=PATH` for a separate baseline capture. The baseline directory
must exist; it is a local verification artifact, not bundled into the app.

The focused tests exercise configuration defaults and invalid values, native
motion eligibility, progression, offscreen/hidden-page behavior, failure
fallbacks, live preference changes, and complete lifecycle cleanup.

### Results recorded on September 26, 2026

- 22 focused tests passed.
- Full redesigned and original production builds passed compilation, type
  validation, and generation of all 20 static outputs.
- All seven baseline comparisons passed in both modes, against build output
  and HTTP responses from their production previews. Original development
  responses also matched the baseline.
- Original global styles, root layout, navigation, footer, robot components,
  site data, project service, and project API source files are unchanged.
- The redesigned project API returned all eight projects; resume, image assets,
  discoverability routes, scripts, and stylesheets returned successful responses.
- A final `DESIGN_MODE=original` build and production server demonstrated
  rollback. The workspace production output remains in original mode.
- Initial asset transfer estimates were the same across these two builds:
  158,782 gzip bytes of linked JavaScript (including conditional/polyfill
  scripts) and 20,157 gzip bytes of CSS after the section-color refinement. This is a comparison of the two new
modes, not a browser loading benchmark against the pre-change revision.

For this session, the redesigned production snapshot is available at
`http://localhost:3108` and the original production build at
`http://localhost:3109`. The redesigned snapshot is under the ignored
`tmp/redesign-preview/` directory; it does not update when source files change.
Both previews are local processes, not deployments, and last only while their
servers remain running. Per-mode HTML and asset reports are under
`tmp/design-verification/`.

### Browser acceptance still required

The connected Browser runtime reported no available browser during
implementation. Consequently, screenshots, live browser interactions, visual
comparisons, and browser performance metrics could not be verified. Server
markup checks and mocked lifecycle tests do not replace these checks.

Before approving deployment, compare the original baseline and redesigned
full/basic/static states in both themes at 390px, 768px, 1024px, and 1440px;
include landscape and 200% zoom. Check keyboard navigation, mobile-menu focus,
copy-email success/failure, theme switching, client navigation to other routes
and back, one robot instance, robot loading/failure posters, reduced motion,
missing animation APIs, and disabled JavaScript. Check that sticky scenes remain
below the header, anchors are visible, and no horizontal overflow appears.

Measure layout shift and loading under the same production conditions in both
modes; investigate material regressions. No new animation dependencies, fonts,
or image assets were added.

Suggested review groups: shared preservation/configuration, static presentation,
motion controller, then validation/documentation. Changes remain local until
the owner explicitly authorizes a push or deployment.
