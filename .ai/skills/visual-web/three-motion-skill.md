# Skill: 3D + Motion Web Implementation

Use for adding Three.js, React Three Fiber, GSAP, Framer Motion, Spline, Rive, or Lottie to a website.

## Rules
- Never block page content behind a heavy 3D scene.
- Lazy-load 3D below the fold or after main content.
- Provide fallback image/video/poster.
- Respect prefers-reduced-motion.
- Cap animation complexity on mobile.
- Use compressed glTF/GLB, Draco/Meshopt if needed.

## Recommended effects
- Hero 3D product/object with subtle cursor parallax
- Scroll-synced camera reveal
- Floating badges/icons
- Interactive service cards
- Metallic/industrial texture overlays
- Kinetic typography for section headers
- Particle fields only if lightweight and purposeful

## Anti-patterns
- Fullscreen WebGL that tanks mobile performance
- Smooth-scroll fighting browser behaviour
- Motion with no UX purpose
- Stock AI 3D assets that do not match the brand
