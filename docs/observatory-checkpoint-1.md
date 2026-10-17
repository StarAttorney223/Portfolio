# Observatory: Checkpoint 1

## Scope

The homepage is now a full-viewport procedural industrial environment. This is
the world-building checkpoint only. Scroll-driven travel, spatial section
navigation, and portfolio content integration are deliberately deferred until
approval of this checkpoint.

Existing portfolio routes, project data, links, and their components are retained.
The top-right Portfolio link opens the existing project archive. The former home
content remains in app/page.jsx, but AppShell renders the observatory at `/`.

## Art Direction

- A monumental turbine is the focal point, not a bank of computer displays.
- Lower service conduits, foreground bridges, elevated catwalks, gantries, and
  distant industrial masses establish scale and depth.
- Matte charcoal architecture is balanced with cooler steel, warm amber machine
  lighting, and restrained off-white practical lights.
- Procedural brushed-metal plates and baked environment lighting provide surface
  detail without external models, fonts, textures, or asset downloads in the scene.
- A slow moving gantry, service shuttle, counter-rotating turbine, sparse dust,
  and restrained camera drift create continuous motion.

Reference research: Bruno Simon's world-first exploration and accessible controls
(https://bruno-simon.com/), Jesse Zhou's composed architectural landmark and
material lighting (https://www.jesse-zhou.com/). Jay Ransijn's current site was
read, but its interactive world was not visually evaluated. The supplied Awwwards
inspiration page was unavailable. No reference models or designs were copied.

## Implementation

- `components/layout/AppShell.jsx`: selects the new homepage; other routes retain
  their existing layout.
- `ObservatoryExperience.jsx`: client-only scene loading, error boundary,
  reduced-motion preference, visibility suspension, and accessible controls.
- `IndustrialStructures.jsx`: reusable beams, instanced structural members,
  textured plates, stencils, turbine, walkways, and animated machinery.
- `ObservatoryScene.jsx`: camera, lighting, sparse particles, soft light shafts,
  render pipeline, context-loss handling, and adaptive quality.
- `observatory.module.css`: viewport layout and responsive overlay controls.

All implementation files remain JavaScript/JSX. No new dependencies were required.

## Performance And Accessibility

- Repeated geometry uses instanced meshes.
- Desktop DPR is capped at 1.5; mobile/economy DPR is 1.
- One 1024px shadow map; shadows and bloom disabled on mobile/economy mode.
- Environment reflection map is generated once at 128px resolution.
- 130 sparse particles on desktop; 45 on mobile/economy.
- Sustained slow frame sampling can switch to economy mode.
- Hidden tabs and paused scenes stop continuous rendering.
- Reduced-motion defaults to still; Play explicitly opts into animation.
- Buttons have accessible labels, focus outlines, and 40px+ targets.
- No audio or scroll hijacking.

## Verification

- `npm run build`: passed; all 14 static pages generated.
- `git diff --check`: passed (existing Windows line-ending warnings only).
- Portfolio link and return-home navigation verified in the running browser.
- Desktop 1440x900: full-viewport, nonblank 3D render; no horizontal overflow.
- Mobile 390x844 and 320x640: framed turbine, visible controls, no overflow.
- Desktop moving-frame comparison: approximately 28% of sampled color channels
  changed by more than eight levels between captures.
- Mobile moving-frame comparison: approximately 12.6% changed.
- Paused desktop screenshots were byte-identical across captures.
- Pause/Play, reset control, and quality toggle exercised in browser.
- Mobile scene pixel standard deviation exceeded 37 across RGB channels.

These are visual/functional checks, not an FPS benchmark. Hardware context-loss
recovery and actual low-powered phones were not simulated. The renderer still
reports a dependency-level THREE.Clock deprecation and a driver shader precision
warning; no application exception was observed in the new scene.
