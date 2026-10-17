# Complete Observatory Portfolio

## Architecture

All portfolio URLs now mount one persistent Observatory experience through
`components/layout/AppShell.jsx`. There is no redirect to the former portfolio,
and neither the old monitor scene nor its dashboard components are imported by
the active application shell. Existing data and legacy source files are retained.

The journey has eleven connected destinations: home, profile, Ether Studio,
Unravel, PhysioGenie, PixelChat, AtmosAlert, skills, experience and education,
about, and contact. Every main section has a direct URL. `/projects/ether` is an
alias for the Ether destination, and AtmosAlert has its own static route.

Native page scrolling determines camera progress. Navigation animates the same
scroll position, so the camera and section indicator share one source of truth.
Wheel or touch input interrupts a navigation animation. History navigation and
direct loads restore the appropriate stop. Content has its own scrollable reading
area so long case studies do not force the camera away from their project.

## Content

Profile, skills, experience, and contact information use the existing data files.
All four full project objects are reused intact, including their repository and
demo URLs, descriptions, features, architecture, contribution, and outcomes.
The project inspector also exposes saved specifications. Screenshot images render
only when an actual image URL exists; the old schematic placeholders are not used.

AtmosAlert uses the description already present in experience data and the title
provided in the brief. It has no fabricated stack, repository, demo, or metrics.
Institution placeholders and the explicitly editable hackathon entry are omitted
from the presentation. The LinkedIn URL is
retained as recorded in profile data; its ownership has not been independently
confirmed. The contact form opens an email draft and does not claim delivery.

## Environments

- Home: retained turbine observatory, conduits, crane, and service shuttle.
- Profile: architectural foundry and moving press.
- Ether: suspended, animated procedural artwork installation.
- Unravel: binary computation structure with a moving scan line.
- PhysioGenie: articulated pose model and moving analysis ring.
- PixelChat: opposing exchange rings with travelling message packets.
- AtmosAlert: shaped terrain, cloud layers, rainfall, and radar sweep.
- Skills: selectable physical domain nodes and project/technology associations.
- Experience: stepped chronology installation.
- About: mechanical gear and moving fabrication arm.
- Contact: concave communications dish and contact landmarks.

A continuous service spine connects the platforms. Materials, practical lighting,
metal textures, and environment reflections share the Observatory art direction.

## Performance And Accessibility

Only the current destination and its neighbors are mounted. Structural repetitions
use instancing. DPR is capped at 1.5 on desktop and 1 on mobile/economy mode. Mobile
and economy mode disable bloom and shadows; slow frame sampling can enable economy
mode automatically. Hidden tabs and paused scenes use demand rendering.

Reduced motion starts the world still and snaps camera destinations. Explicitly
enabling animation opts into ambient motion and animated camera navigation.
Keyboard-accessible section/project/skill controls provide alternatives to 3D
selection. Destination navigation focuses the reading area. Icons have labels and
tooltips; mobile controls remain visible. Standard view uses the same content,
navigation, and routes when WebGL is unavailable or disabled.

## Verification

- Three Node tests pass for project preservation, URL mapping, and camera-path
  continuity/bounds on desktop and mobile.
- Browser checks verified section navigation, Back restoring location, native
  scrolling, physical skill-node selection, project detail expansion, and standard
  view navigation.
- Desktop 1440px and mobile 390px/320px layouts were inspected; no horizontal
  overflow was found.
- Contact email and external link targets were checked against saved data.
- Production build passed with 15 static pages; all 12 portfolio URLs returned 200.
- A fresh PixelChat URL loaded its correct 3D destination in production.
- Production frame comparison showed about 10.6% of sampled color channels changed
  by more than eight levels during animation; paused captures were byte-identical.

Hardware WebGL loss and physical low-powered phones have not been tested. Rendering
quality is procedural; the light shafts approximate volume rather than performing
expensive volumetric ray marching. Library/driver deprecation and shader precision
warnings may still appear; these were also present in the prior world study.
