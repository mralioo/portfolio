// Single entry point for the bubble hero's client-side behavior.
// Astro silently dropped one of two sibling <script src> tags on the same
// component during production builds (present in dev, missing from the
// built bundle) — routing both through one entry avoids that.
import './particles.js';
import './bubbles.js';
