/* logo3d.js — Turbo Contracting and Mining Services
   Three.js 3D logo: beveled plane, gold/steel lighting, spark particles, mouse tilt */

(function () {
  const canvas = document.getElementById('logo-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  /* ── Scene setup ── */
  const W = canvas.clientWidth || 440;
  const H = canvas.clientHeight || 400;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
  camera.position.set(0, 0, 4.2);

  /* ── Logo plane ── */
  const texture = new THREE.TextureLoader().load('images/logo.jpg', (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
  });

  const logoGeo = new THREE.BoxGeometry(2.8, 2.8, 0.08, 1, 1, 1);
  const logoMat = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.35,
    metalness: 0.45,
    color: 0xffffff,
  });

  /* Dark steel for side/back faces */
  const sideMat = new THREE.MeshStandardMaterial({
    color: 0x3D3A47,
    roughness: 0.6,
    metalness: 0.8,
  });
  const materials = [sideMat, sideMat, sideMat, sideMat, logoMat, sideMat];
  const logo = new THREE.Mesh(logoGeo, materials);
  logo.castShadow = true;
  scene.add(logo);

  /* ── Thin gold border frame ── */
  const frameGeo = new THREE.BoxGeometry(2.96, 2.96, 0.04);
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0xF0C400,
    roughness: 0.2,
    metalness: 0.9,
    emissive: 0xC4A100,
    emissiveIntensity: 0.18,
  });
  const frame = new THREE.Mesh(frameGeo, frameMat);
  frame.position.z = -0.02;
  scene.add(frame);

  /* ── Lighting ── */
  const ambient = new THREE.AmbientLight(0xF4F2F8, 0.55);
  scene.add(ambient);

  /* Key light: warm gold from top-right */
  const keyLight = new THREE.DirectionalLight(0xF0C400, 1.8);
  keyLight.position.set(3, 4, 5);
  keyLight.castShadow = true;
  scene.add(keyLight);

  /* Fill light: flame blue from left */
  const fillLight = new THREE.DirectionalLight(0x1B68D8, 0.9);
  fillLight.position.set(-4, -1, 3);
  scene.add(fillLight);

  /* Rim light: steel highlight from behind-top */
  const rimLight = new THREE.DirectionalLight(0xC8C5D0, 0.7);
  rimLight.position.set(0, 5, -4);
  scene.add(rimLight);

  /* Moving gold spot that orbits */
  const orbitLight = new THREE.PointLight(0xF0C400, 2.2, 12);
  orbitLight.position.set(3, 2, 3);
  scene.add(orbitLight);

  /* ── Gold spark particles ── */
  const SPARK_COUNT = 60;
  const sparkPositions = new Float32Array(SPARK_COUNT * 3);
  const sparkSizes = new Float32Array(SPARK_COUNT);
  const sparkVelocities = [];
  const sparkLifetimes = [];

  for (let i = 0; i < SPARK_COUNT; i++) {
    sparkPositions[i * 3]     = (Math.random() - 0.5) * 4;
    sparkPositions[i * 3 + 1] = (Math.random() - 0.5) * 4;
    sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    sparkSizes[i] = Math.random() * 4 + 1;
    sparkVelocities.push({
      x: (Math.random() - 0.5) * 0.004,
      y: Math.random() * 0.006 + 0.002,
      z: (Math.random() - 0.5) * 0.002,
    });
    sparkLifetimes.push(Math.random());
  }

  const sparkGeo = new THREE.BufferGeometry();
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
  sparkGeo.setAttribute('size', new THREE.BufferAttribute(sparkSizes, 1));

  const sparkMat = new THREE.PointsMaterial({
    color: 0xF0C400,
    size: 0.035,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const sparks = new THREE.Points(sparkGeo, sparkMat);
  scene.add(sparks);

  /* Blue arc sparks (secondary, smaller) */
  const arcPositions = new Float32Array(20 * 3);
  for (let i = 0; i < 20; i++) {
    arcPositions[i * 3]     = (Math.random() - 0.5) * 3;
    arcPositions[i * 3 + 1] = (Math.random() - 0.5) * 3;
    arcPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
  }
  const arcGeo = new THREE.BufferGeometry();
  arcGeo.setAttribute('position', new THREE.BufferAttribute(arcPositions, 3));
  const arcMat = new THREE.PointsMaterial({
    color: 0x1B68D8,
    size: 0.02,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const arcSparks = new THREE.Points(arcGeo, arcMat);
  scene.add(arcSparks);

  /* ── Mouse tracking ── */
  const mouse = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  document.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* Touch support */
  document.addEventListener('touchmove', (e) => {
    if (!e.touches[0]) return;
    mouse.x = (e.touches[0].clientX / window.innerWidth  - 0.5) * 2;
    mouse.y = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  /* ── Resize handler ── */
  const ro = new ResizeObserver(() => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
  ro.observe(canvas);

  /* ── Reduce motion check ── */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Animation loop ── */
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.016;

    if (!reduced) {
      /* Smooth mouse follow */
      target.x += (mouse.x - target.x) * 0.04;
      target.y += (mouse.y - target.y) * 0.04;

      /* Logo rotation: mouse tilt + gentle float, no spin */
      logo.rotation.y = target.x * 0.35;
      logo.rotation.x = Math.sin(t * 0.4) * 0.06 - target.y * 0.22;
      logo.rotation.z = Math.sin(t * 0.2) * 0.018;

      /* Frame follows logo */
      frame.rotation.copy(logo.rotation);

      /* Orbit light */
      orbitLight.position.x = Math.sin(t * 0.7) * 3.5;
      orbitLight.position.y = Math.cos(t * 0.5) * 2.5;
      orbitLight.position.z = Math.cos(t * 0.7) * 2 + 2;

      /* Update spark particles */
      const pos = sparkGeo.attributes.position.array;
      for (let i = 0; i < SPARK_COUNT; i++) {
        sparkLifetimes[i] += 0.004;
        if (sparkLifetimes[i] > 1) {
          sparkLifetimes[i] = 0;
          pos[i * 3]     = (Math.random() - 0.5) * 4;
          pos[i * 3 + 1] = -2.2;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
        } else {
          pos[i * 3]     += sparkVelocities[i].x;
          pos[i * 3 + 1] += sparkVelocities[i].y;
          pos[i * 3 + 2] += sparkVelocities[i].z;
        }
      }
      sparkGeo.attributes.position.needsUpdate = true;
      sparkMat.opacity = 0.6 + Math.sin(t * 3) * 0.25;

      /* Arc sparks drift */
      const apos = arcGeo.attributes.position.array;
      for (let i = 0; i < 20; i++) {
        apos[i * 3 + 1] += 0.005;
        if (apos[i * 3 + 1] > 2.2) {
          apos[i * 3]     = (Math.random() - 0.5) * 3;
          apos[i * 3 + 1] = -2.2;
        }
      }
      arcGeo.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }

  animate();
}());
