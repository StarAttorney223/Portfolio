# Cinematic Navigation and Dolly Zoom

## Diagnosis

The Git reference (`170470d`) used scroll-offset interpolation between camera stops,
not a dedicated corridor controller. The current reduced-motion/pause branch snapped
to sections, and dolly zoom changed distance by only five percent per click.

## Current Architecture

- Navigation owns one replaceable travel record, separate from environmental playback.
- Each record starts from the actual rendered position, look-at target, and FOV.
- Three connected cubic segments leave the room, traverse the shared x=32 passage,
  and approach the destination from its open forecourt. Global easing provides
  acceleration/deceleration; corridor control points match entry/exit tangents.
- Desktop travel lasts 1.85 seconds (1.6 with reduced motion); mobile uses 1.35 seconds.
- A newer request replaces the current record from its rendered state. No animation
  queues or independent timers can complete an obsolete transition.
- Source/destination installations stay mounted through travel; only the destination
  remains after arrival. Home architecture is hidden once its departure bay is cleared.
- The shared passage uses instanced structural frames, open boarding bays, warm floor
  rails, cool overhead rails, and moving illumination.
- Navigation uses links/arrows/history, not document scroll offsets. Wheel input over
  the world only zooms; information overlays retain normal internal scrolling.
- Environmental playback starts enabled and can be paused without cancelling travel.

## Zoom

Each environment has explicit minimum/maximum distance factors and an 18-percent
click step in `viewControls.js`. These are actual perspective-camera dolly positions
on the authored approach ray, not CSS or scene scaling. Near bounds remain outside
the installation forecourt; far bounds avoid corridor columns or remain above its roof.
Reset converges to the exact authored camera without pointer drift.

## Verification

- Seven Node tests pass: project mapping/data retention, canonical routes, camera
  interpolation, all desktop/mobile travel pairs, mid-flight retargeting, continuous
  joins, visible dolly steps, safe distance bounds, and exact reset endpoints.
- Browser-observed Ether -> Unravel passage, with a captured mid-corridor screenshot.
- Browser-observed travel/arrival for PhysioGenie, PixelChat, and AtmosAlert.
- All main sections reached their exact authored desktop camera coordinates.
- Rapid Profile -> About -> Contact requests settled at Contact's correct camera.
- Zoom-in changed Unravel's camera by about five world units in a single click; reset
  restored `17,9,-248` exactly.
- Mobile Unravel arrived at `10,10,-230`; document height equalled viewport height,
  eliminating section-scroll conflicts.
- Paused-environment travel remained functional. Resumed Ether animation changed
  269,080 sampled RGB channels while the camera stayed exactly `16,8,-159`.

These are targeted desktop/mobile browser checks, not exhaustive hardware testing.
No external project URLs or project data were changed.
