/**
 * AURA BLOOM • 300-Frame Botanical Kinetic Atelier
 * Master JavaScript Logic Script (2026 Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Config Constants
  const TOTAL_FRAMES = 300;
  const FRAME_PREFIX = 'frames/ezgif-frame-';
  const FRAME_EXT = '.jpg';
  
  // Core Engine State
  const images = [];
  let loadedCount = 0;
  let currentFrame = 1;
  let targetFrame = 1;
  
  // Video Playback Engine State
  let isPlayingVideo = false;
  let playbackSpeed = 1.0;
  let lastFrameTime = 0;
  let fitMode = 'contain';
  
  // Audio & Performance Metrics
  let audioContext = null;
  let ambientOsc = null;
  let ambientGain = null;
  let isMuted = true;
  let lastPlayedFrame = 1;
  let fps = 60;
  let frameCount = 0;
  let lastFpsCheck = performance.now();

  // Particle System State
  let particles = [];
  const particleCanvas = document.getElementById('particleCanvas');
  const pCtx = particleCanvas ? particleCanvas.getContext('2d') : null;

  // DOM Elements - UI & Surface
  const preloader = document.getElementById('preloader');
  const ringProgress = document.getElementById('ringProgress');
  const progressText = document.getElementById('progressText');
  const canvas = document.getElementById('roseCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const scrollContainer = document.getElementById('kinetic-studio');
  const studioHeadingOverlay = document.getElementById('studioHeadingOverlay');
  const frameScrubber = document.getElementById('frameScrubber');
  const currentFrameDisplay = document.getElementById('currentFrameDisplay');
  const fpsBadge = document.getElementById('fpsBadge');
  const filterOverlay = document.getElementById('filterOverlay');
  
  // Controls & Action Triggers
  const playPauseBtn = document.getElementById('playPauseBtn');
  const stepPrevBtn = document.getElementById('stepPrevBtn');
  const stepNextBtn = document.getElementById('stepNextBtn');
  const navPlayBtn = document.getElementById('navPlayBtn');
  const heroPlayBtn = document.getElementById('heroPlayBtn');
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const aspectToggleBtn = document.getElementById('aspectToggleBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const filterSelect = document.getElementById('filterSelect');
  const speedSelect = document.getElementById('speedSelect');
  const presetPills = document.querySelectorAll('.preset-pill');
  
  // Modal Elements
  const catalogModal = document.getElementById('catalogModal');
  const modalGrid = document.getElementById('modalGrid');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');

  // Milestone Cards (Calibrated for 300 frames)
  const milestoneCards = [
    { card: document.getElementById('cardPhase1'), minFrame: 1, maxFrame: 75 },
    { card: document.getElementById('cardPhase2'), minFrame: 76, maxFrame: 150 },
    { card: document.getElementById('cardPhase3'), minFrame: 151, maxFrame: 225 },
    { card: document.getElementById('cardPhase4'), minFrame: 226, maxFrame: 300 }
  ];

  /* ==========================================================================
     0. THREE.JS 3D WEBGL ENGINE & ATMOSPHERIC LIGHTING
     ========================================================================== */
  let threeScene, threeCamera, threeRenderer;
  let rosePetalsGroup, embersGroup;
  let threeMouseX = 0, threeMouseY = 0;
  let targetThreeMouseX = 0, targetThreeMouseY = 0;

  function initThreeJSEngine() {
    const canvas = document.getElementById('threeCanvas');
    if (!canvas || !window.THREE) return;

    try {
      threeScene = new THREE.Scene();
      threeScene.fog = new THREE.FogExp2(0x030305, 0.006);

      const aspect = window.innerWidth / window.innerHeight;
      threeCamera = new THREE.PerspectiveCamera(55, aspect, 0.1, 1000);
      threeCamera.position.set(0, 0, 18);

      threeRenderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      threeRenderer.setSize(window.innerWidth, window.innerHeight);
      threeRenderer.toneMapping = THREE.ACESFilmicToneMapping;
      threeRenderer.toneMappingExposure = 1.25;

      const ambientLight = new THREE.AmbientLight(0x1a0d1a, 1.6);
      threeScene.add(ambientLight);

      const dirLightGold = new THREE.DirectionalLight(0xf4d38c, 2.8);
      dirLightGold.position.set(8, 12, 10);
      threeScene.add(dirLightGold);

      const pointLightCrimson = new THREE.PointLight(0xff1a40, 5.5, 45);
      pointLightCrimson.position.set(-6, 2, 8);
      threeScene.add(pointLightCrimson);

      const pointLightEmerald = new THREE.PointLight(0x00e5a3, 2.5, 35);
      pointLightEmerald.position.set(8, -5, 5);
      threeScene.add(pointLightEmerald);

      // 3D Rose Petals
      rosePetalsGroup = new THREE.Group();
      const petalCount = 42;

      for (let i = 0; i < petalCount; i++) {
        const geom = new THREE.SphereGeometry(
          0.4 + Math.random() * 0.5,
          16, 16,
          0, Math.PI * 0.8,
          0, Math.PI * 0.5
        );
        
        const isGold = Math.random() > 0.75;
        const mat = new THREE.MeshPhysicalMaterial({
          color: isGold ? 0xf4d38c : (Math.random() > 0.4 ? 0xaa0022 : 0xff1a40),
          roughness: 0.25,
          metalness: isGold ? 0.85 : 0.15,
          transmission: isGold ? 0.1 : 0.45,
          thickness: 0.8,
          clearcoat: 0.9,
          clearcoatRoughness: 0.1,
          side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.set(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 24,
          (Math.random() - 0.5) * 20
        );
        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        mesh.userData = {
          rotSpeedX: (Math.random() - 0.5) * 0.007,
          rotSpeedY: (Math.random() - 0.5) * 0.007,
          rotSpeedZ: (Math.random() - 0.5) * 0.007,
          floatOffsetY: Math.random() * Math.PI * 2,
          floatSpeed: 0.005 + Math.random() * 0.01
        };

        rosePetalsGroup.add(mesh);
      }
      threeScene.add(rosePetalsGroup);

      // Z-Space Floating Particles (Embers)
      embersGroup = new THREE.Group();
      const emberGeom = new THREE.BufferGeometry();
      const emberCount = 180;
      const positions = new Float32Array(emberCount * 3);
      const colors = new Float32Array(emberCount * 3);

      const goldColor = new THREE.Color(0xf4d38c);
      const crimsonColor = new THREE.Color(0xff1a40);

      for (let i = 0; i < emberCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 38;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 38;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 28;

        const mixColor = Math.random() > 0.5 ? goldColor : crimsonColor;
        colors[i * 3] = mixColor.r;
        colors[i * 3 + 1] = mixColor.g;
        colors[i * 3 + 2] = mixColor.b;
      }

      emberGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      emberGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const emberMat = new THREE.PointsMaterial({
        size: 0.25,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });

      const embers = new THREE.Points(emberGeom, emberMat);
      embersGroup.add(embers);
      threeScene.add(embersGroup);

      let clock = new THREE.Clock();

      function renderThree() {
        requestAnimationFrame(renderThree);

        const elapsedTime = clock.getElapsedTime();

        threeMouseX += (targetThreeMouseX - threeMouseX) * 0.04;
        threeMouseY += (targetThreeMouseY - threeMouseY) * 0.04;

        threeCamera.position.x = threeMouseX * 1.5;
        threeCamera.position.y = -threeMouseY * 1.5;
        threeCamera.lookAt(0, 0, 0);

        if (rosePetalsGroup) {
          rosePetalsGroup.children.forEach(petal => {
            petal.rotation.x += petal.userData.rotSpeedX;
            petal.rotation.y += petal.userData.rotSpeedY;
            petal.rotation.z += petal.userData.rotSpeedZ;
            petal.position.y += Math.sin(elapsedTime * 0.8 + petal.userData.floatOffsetY) * 0.003;
          });
        }

        if (embersGroup) {
          embersGroup.rotation.y = elapsedTime * 0.03;
          embersGroup.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;
        }

        threeRenderer.render(threeScene, threeCamera);
      }
      renderThree();

      window.addEventListener('mousemove', (e) => {
        targetThreeMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        targetThreeMouseY = (e.clientY / window.innerHeight) * 2 - 1;
      });

      window.addEventListener('resize', () => {
        if (!threeCamera || !threeRenderer) return;
        threeCamera.aspect = window.innerWidth / window.innerHeight;
        threeCamera.updateProjectionMatrix();
        threeRenderer.setSize(window.innerWidth, window.innerHeight);
        threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });
    } catch (err) {
      console.warn('Three.js WebGL initialization fallback:', err);
    }
  }

  /* ==========================================================================
     NORMALIZED NATIVE BROWSER SCROLL & GSAP ENGINE
     ========================================================================== */
  function initGsapAndLenis() {
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      // Hero Text Animation: Fade in at start, fade out slowly as user scrolls 30% of the section
      gsap.from('#hero .hero-tag', { opacity: 0, y: 30, duration: 1.0, ease: 'power3.out', delay: 0.3 });
      gsap.from('#hero .hero-heading', { opacity: 0, y: 45, duration: 1.2, ease: 'power4.out', delay: 0.5 });
      gsap.from('#hero .hero-subheading, #hero .hero-actions, #hero .hero-scroll-cue', {
        opacity: 0, y: 30, duration: 1.0, stagger: 0.18, ease: 'power3.out', delay: 0.7
      });

      // Scroll Fade-Out over first 30% of hero section
      gsap.to('#hero .hero-inner', {
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: '30% top',
          scrub: true
        },
        opacity: 0,
        y: -40,
        ease: 'none'
      });

      gsap.from('.highlight-item-card', {
        scrollTrigger: { trigger: '#highlights', start: 'top 85%' },
        opacity: 0, y: 35, stagger: 0.15, duration: 0.8, ease: 'power2.out'
      });

      gsap.utils.toArray('.section-title-box, .about-content').forEach(box => {
        gsap.from(box, {
          scrollTrigger: { trigger: box, start: 'top 85%' },
          opacity: 0, y: 40, duration: 1.0, ease: 'power3.out'
        });
      });

      gsap.from('.bento-item', {
        scrollTrigger: { trigger: '#collection', start: 'top 80%' },
        opacity: 0, y: 40, stagger: 0.18, duration: 0.9, ease: 'power3.out'
      });

      gsap.from('.pricing-card', {
        scrollTrigger: { trigger: '#products', start: 'top 80%' },
        opacity: 0, y: 50, stagger: 0.2, duration: 1.0, ease: 'power3.out'
      });

      gsap.from('.process-card', {
        scrollTrigger: { trigger: '#process', start: 'top 80%' },
        opacity: 0, y: 40, stagger: 0.15, duration: 0.9, ease: 'power3.out'
      });

      gsap.from('.spec-card', {
        scrollTrigger: { trigger: '#specs', start: 'top 80%' },
        opacity: 0, y: 35, stagger: 0.15, duration: 0.8, ease: 'power2.out'
      });
    }
  }

  /* ==========================================================================
     CUSTOM LUXURY MAGNETIC CURSOR ENGINE
     ========================================================================== */
  function initCustomCursorEngine() {
    const cursor = document.getElementById('customCursor');
    const follower = document.getElementById('cursorFollower');
    if (!cursor || !follower) return;

    let cx = 0, cy = 0;
    let fx = 0, fy = 0;
    let mx = -100, my = -100;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    function updateCursor() {
      cx += (mx - cx) * 0.65;
      cy += (my - cy) * 0.65;
      fx += (mx - fx) * 0.18;
      fy += (my - fy) * 0.18;

      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;
      follower.style.left = `${fx}px`;
      follower.style.top = `${fy}px`;

      requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    const interactiveSelectors = 'a, button, input, select, textarea, .milestone-card, .pricing-card, .spec-card, .bento-item, .studio-slider, .highlight-item-card, .faq-question';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    });
  }

  /* ==========================================================================
     1. Preloading All 300 High-Definition Frames
     ========================================================================== */
  function preloadImages() {
    const dashLength = 276.46; // SVG Circle Stroke Length

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNumStr = String(i).padStart(3, '0');
      img.src = `${FRAME_PREFIX}${frameNumStr}${FRAME_EXT}`;
      
      img.onload = () => {
        loadedCount++;
        const ratio = loadedCount / TOTAL_FRAMES;
        const percent = Math.floor(ratio * 100);
        
        if (ringProgress) ringProgress.style.strokeDashoffset = `${dashLength * (1 - ratio)}`;
        if (progressText) progressText.textContent = `${loadedCount} / 300 Frames Loaded (${percent}%)`;

        if (i === 1) {
          setupCanvas();
        }

        if (loadedCount === TOTAL_FRAMES) {
          onAllImagesLoaded();
        }
      };

      img.onerror = () => {
        console.warn(`Failed to load frame ${i}`);
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          onAllImagesLoaded();
        }
      };

      images.push(img);
    }
  }

  function onAllImagesLoaded() {
    setTimeout(() => {
      if (preloader) preloader.classList.add('hidden');
      setupCanvas();
      initParticleSystem();
      initThreeJSEngine();
      initGsapAndLenis();
      initCustomCursorEngine();
      buildCatalogModal();
      startAtelierEngine();
    }, 400);
  }

  /* ==========================================================================
     2. Canvas 2D Hardware-Accelerated Rendering & Scaling
     ========================================================================== */
  function setupCanvas() {
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (particleCanvas && pCtx) {
      particleCanvas.width = window.innerWidth * dpr;
      particleCanvas.height = window.innerHeight * dpr;
      pCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    renderFrame(Math.round(currentFrame));
  }

  function renderFrame(index) {
    if (!ctx) return;
    const frameIdx = Math.max(1, Math.min(TOTAL_FRAMES, index)) - 1;
    const img = images[frameIdx];

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (fitMode === 'cover') {
      if (canvasRatio > imgRatio) {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
      } else {
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * imgRatio;
      }
    } else { // 'contain' mode
      if (canvasRatio < imgRatio) {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
      } else {
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * imgRatio;
      }
    }

    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = (canvasHeight - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    if (Math.round(index) !== lastPlayedFrame) {
      lastPlayedFrame = Math.round(index);
      playScrollTickSound(lastPlayedFrame);
    }
  }

  /* ==========================================================================
     3. Ultra-Luxury 3D Perspective Particle Engine & Mouse Parallax
     ========================================================================== */
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX - window.innerWidth / 2);
    targetMouseY = (e.clientY - window.innerHeight / 2);
  });

  function initParticleSystem() {
    particles = [];
    const count = 75;
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.6,
        y: (Math.random() - 0.5) * height * 1.6,
        z: Math.random() * 1000 + 1,
        radius: Math.random() * 3 + 1,
        colorPrefix: Math.random() > 0.4 ? 'rgba(244, 211, 140, ' : 'rgba(255, 26, 64, ',
        baseAlpha: Math.random() * 0.5 + 0.3,
        vz: -Math.random() * 1.2 - 0.4
      });
    }
  }

  function renderParticles() {
    if (!pCtx || !particleCanvas) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    pCtx.clearRect(0, 0, width, height);

    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    const fov = 400; // 3D Perspective focal distance
    const cx = width / 2 + mouseX * 0.08;
    const cy = height / 2 + mouseY * 0.08;

    particles.forEach(p => {
      p.z += p.vz;
      if (p.z <= 1) {
        p.z = 1000;
        p.x = (Math.random() - 0.5) * width * 1.6;
        p.y = (Math.random() - 0.5) * height * 1.6;
      }

      // 3D Perspective Projection
      const scale = fov / (fov + p.z);
      const projX = cx + p.x * scale;
      const projY = cy + p.y * scale;
      const projRadius = Math.max(0.6, p.radius * scale * 2.2);
      const alpha = Math.min(1, p.baseAlpha * scale * 1.8);

      if (projX > -50 && projX < width + 50 && projY > -50 && projY < height + 50) {
        pCtx.beginPath();
        pCtx.arc(projX, projY, projRadius, 0, Math.PI * 2);
        pCtx.fillStyle = `${p.colorPrefix}${alpha.toFixed(2)})`;
        pCtx.shadowBlur = projRadius * 3;
        pCtx.shadowColor = p.colorPrefix + '0.7)';
        pCtx.fill();
        pCtx.shadowBlur = 0;
      }
    });
  }

  /* ==========================================================================
     4. 60FPS Sequential Scroll & Video Animation Engine
     ========================================================================== */
  function updateScrollTarget() {
    if (isPlayingVideo || !scrollContainer) return;

    const rect = scrollContainer.getBoundingClientRect();
    const scrollableDistance = scrollContainer.scrollHeight - window.innerHeight;
    
    if (scrollableDistance <= 0) return;

    const currentScrollPos = -rect.top;
    const fraction = Math.max(0, Math.min(1, currentScrollPos / scrollableDistance));

    targetFrame = 1 + fraction * (TOTAL_FRAMES - 1);
  }

  function startAtelierEngine() {
    function loop(timestamp) {
      frameCount++;
      if (timestamp - lastFpsCheck >= 1000) {
        fps = Math.round((frameCount * 1000) / (timestamp - lastFpsCheck));
        if (fpsBadge) fpsBadge.textContent = `${fps} FPS`;
        frameCount = 0;
        lastFpsCheck = timestamp;
      }

      if (isPlayingVideo) {
        const frameInterval = 1000 / (30 * playbackSpeed);
        if (timestamp - lastFrameTime >= frameInterval) {
          lastFrameTime = timestamp;
          currentFrame++;
          
          if (currentFrame > TOTAL_FRAMES) {
            currentFrame = 1;
          }
          targetFrame = currentFrame;

          if (scrollContainer) {
            const scrollableDistance = scrollContainer.scrollHeight - window.innerHeight;
            const targetFraction = (currentFrame - 1) / (TOTAL_FRAMES - 1);
            const targetScrollY = scrollContainer.offsetTop + targetFraction * scrollableDistance;
            window.scrollTo({ top: targetScrollY, behavior: 'instant' });
          }
        }
      } else {
        const diff = targetFrame - currentFrame;
        if (Math.abs(diff) > 0.005) {
          currentFrame += diff * 0.45;
        } else {
          currentFrame = targetFrame;
        }
      }

      const roundedFrame = Math.round(currentFrame);
      renderFrame(roundedFrame);
      renderParticles();
      updateAtelierHUD(roundedFrame);
      updateMilestones(roundedFrame);
      updateHeadingFade(roundedFrame);

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* ==========================================================================
     5. Atelier HUD, Heading Fade & Milestone Overlay Sync
     ========================================================================== */
  function updateAtelierHUD(frame) {
    const formattedNum = String(frame).padStart(3, '0');
    if (currentFrameDisplay) currentFrameDisplay.textContent = formattedNum;
    if (frameScrubber) frameScrubber.value = frame;
  }

  function updateHeadingFade(frame) {
    if (!studioHeadingOverlay) return;
    const progressFraction = (frame - 1) / (TOTAL_FRAMES - 1); // 0.0 to 1.0
    // Fade away when person scrolls 30% of the scroll animation section (progressFraction <= 0.30)
    const titleOpacity = Math.max(0, 1 - (progressFraction / 0.30));
    studioHeadingOverlay.style.opacity = titleOpacity.toFixed(3);
    
    const translateOffset = progressFraction * 50;
    studioHeadingOverlay.style.transform = `translate(-50%, calc(-50% - ${translateOffset}px)) scale(${(1 - progressFraction * 0.15).toFixed(3)})`;

    if (titleOpacity <= 0) {
      studioHeadingOverlay.style.pointerEvents = 'none';
      studioHeadingOverlay.style.visibility = 'hidden';
    } else {
      studioHeadingOverlay.style.visibility = 'visible';
    }
  }

  function updateMilestones(frame) {
    milestoneCards.forEach(({ card, minFrame, maxFrame }) => {
      if (card) {
        if (frame >= minFrame && frame <= maxFrame) {
          card.classList.add('visible');
        } else {
          card.classList.remove('visible');
        }
      }
    });
  }

  /* ==========================================================================
     6. Video Engine Playback & Frame Step Triggers
     ========================================================================== */
  function playVideoMode() {
    isPlayingVideo = true;
    if (playPauseBtn) {
      playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      playPauseBtn.classList.add('active');
    }
    if (navPlayBtn) navPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
  }

  function pauseVideoMode() {
    isPlayingVideo = false;
    if (playPauseBtn) {
      playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      playPauseBtn.classList.remove('active');
    }
    if (navPlayBtn) navPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play 300 Video';
  }

  function toggleVideoMode() {
    if (isPlayingVideo) {
      pauseVideoMode();
    } else {
      playVideoMode();
    }
  }

  function stepSingleFrame(delta) {
    pauseVideoMode();
    targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(currentFrame) + delta));
    currentFrame = targetFrame;

    if (scrollContainer) {
      const scrollableDistance = scrollContainer.scrollHeight - window.innerHeight;
      const targetFraction = (targetFrame - 1) / (TOTAL_FRAMES - 1);
      const targetScrollY = scrollContainer.offsetTop + targetFraction * scrollableDistance;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  }

  /* ==========================================================================
     7. Web Audio API Harmonic Synthesizer
     ========================================================================== */
  function initAudioContext() {
    if (!audioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }

  function toggleAudio() {
    initAudioContext();
    isMuted = !isMuted;

    if (!isMuted) {
      if (audioToggleBtn) {
        audioToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        audioToggleBtn.classList.add('active');
      }
      startAmbientSynth();
    } else {
      if (audioToggleBtn) {
        audioToggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        audioToggleBtn.classList.remove('active');
      }
      stopAmbientSynth();
    }
  }

  function startAmbientSynth() {
    if (!audioContext || ambientOsc) return;

    ambientOsc = audioContext.createOscillator();
    ambientGain = audioContext.createGain();

    ambientOsc.type = 'sine';
    ambientOsc.frequency.setValueAtTime(146.83, audioContext.currentTime);

    ambientGain.gain.setValueAtTime(0.01, audioContext.currentTime);
    ambientGain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 2);

    ambientOsc.connect(ambientGain);
    ambientGain.connect(audioContext.destination);
    ambientOsc.start();
  }

  function stopAmbientSynth() {
    if (ambientGain && audioContext) {
      ambientGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
      setTimeout(() => {
        if (ambientOsc) {
          ambientOsc.stop();
          ambientOsc.disconnect();
          ambientOsc = null;
        }
      }, 500);
    }
  }

  function playScrollTickSound(frameNum) {
    if (isMuted || !audioContext) return;
    try {
      const tickOsc = audioContext.createOscillator();
      const tickGain = audioContext.createGain();

      tickOsc.type = 'triangle';
      const pitch = 220 + (frameNum / TOTAL_FRAMES) * 330;
      tickOsc.frequency.setValueAtTime(pitch, audioContext.currentTime);

      tickGain.gain.setValueAtTime(0.015, audioContext.currentTime);
      tickGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.05);

      tickOsc.connect(tickGain);
      tickGain.connect(audioContext.destination);

      tickOsc.start();
      tickOsc.stop(audioContext.currentTime + 0.06);
    } catch (e) {
      // Fallback
    }
  }

  /* ==========================================================================
     8. 300-Frame Lightbox Catalog Modal
     ========================================================================== */
  function buildCatalogModal() {
    if (!modalGrid) return;
    modalGrid.innerHTML = '';
    
    for (let i = 1; i <= TOTAL_FRAMES; i += 2) {
      const item = document.createElement('div');
      item.className = 'modal-grid-item';
      
      const frameNumStr = String(i).padStart(3, '0');
      item.innerHTML = `
        <img src="${FRAME_PREFIX}${frameNumStr}${FRAME_EXT}" alt="Frame ${i}" loading="lazy">
        <span class="item-badge">#${frameNumStr}</span>
      `;

      item.addEventListener('click', () => {
        pauseVideoMode();
        targetFrame = i;
        currentFrame = i;
        renderFrame(i);
        
        if (scrollContainer) {
          const scrollableDistance = scrollContainer.scrollHeight - window.innerHeight;
          const targetFraction = (i - 1) / (TOTAL_FRAMES - 1);
          const targetScrollY = scrollContainer.offsetTop + targetFraction * scrollableDistance;
          window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
        }

        closeCatalogModal();
      });

      modalGrid.appendChild(item);
    }
  }

  function openCatalogModal() {
    if (catalogModal) catalogModal.classList.add('open');
  }

  function closeCatalogModal() {
    if (catalogModal) catalogModal.classList.remove('open');
  }

  /* ==========================================================================
     9. Interactive FAQ Accordions & Newsletter Form
     ========================================================================== */
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      item.classList.toggle('active');
    });
  });

  const subscribeForm = document.getElementById('subscribeForm');
  const ctaMsg = document.getElementById('ctaMsg');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('subscriberEmail').value;
      if (email && ctaMsg) {
        ctaMsg.textContent = `✓ Thank you! Welcome to the AURA BLOOM Atelier Circle (${email}).`;
        subscribeForm.reset();
      }
    });
  }

  /* ==========================================================================
     10. Global Event Registration & Interactions
     ========================================================================== */
  window.addEventListener('scroll', updateScrollTarget, { passive: true });
  window.addEventListener('resize', () => {
    setupCanvas();
    updateScrollTarget();
  });

  if (frameScrubber) {
    frameScrubber.addEventListener('input', (e) => {
      pauseVideoMode();
      const frameVal = parseInt(e.target.value, 10);
      targetFrame = frameVal;
      currentFrame = frameVal;
      
      if (scrollContainer) {
        const scrollableDistance = scrollContainer.scrollHeight - window.innerHeight;
        const targetFraction = (frameVal - 1) / (TOTAL_FRAMES - 1);
        const targetScrollY = scrollContainer.offsetTop + targetFraction * scrollableDistance;
        window.scrollTo({ top: targetScrollY, behavior: 'instant' });
      }
    });
  }

  presetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      pauseVideoMode();
      const targetVal = parseInt(pill.dataset.frame, 10);
      targetFrame = targetVal;
      currentFrame = targetVal;

      if (scrollContainer) {
        const scrollableDistance = scrollContainer.scrollHeight - window.innerHeight;
        const targetFraction = (targetVal - 1) / (TOTAL_FRAMES - 1);
        const targetScrollY = scrollContainer.offsetTop + targetFraction * scrollableDistance;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }
    });
  });

  if (playPauseBtn) playPauseBtn.addEventListener('click', toggleVideoMode);
  if (stepPrevBtn) stepPrevBtn.addEventListener('click', () => stepSingleFrame(-1));
  if (stepNextBtn) stepNextBtn.addEventListener('click', () => stepSingleFrame(1));

  if (navPlayBtn) {
    navPlayBtn.addEventListener('click', () => {
      if (scrollContainer) scrollContainer.scrollIntoView({ behavior: 'smooth' });
      setTimeout(playVideoMode, 600);
    });
  }

  if (heroPlayBtn) {
    heroPlayBtn.addEventListener('click', () => {
      if (scrollContainer) scrollContainer.scrollIntoView({ behavior: 'smooth' });
      setTimeout(playVideoMode, 600);
    });
  }

  if (audioToggleBtn) audioToggleBtn.addEventListener('click', toggleAudio);
  if (speedSelect) {
    speedSelect.addEventListener('change', (e) => {
      playbackSpeed = parseFloat(e.target.value);
    });
  }

  if (aspectToggleBtn) {
    aspectToggleBtn.addEventListener('click', () => {
      fitMode = fitMode === 'contain' ? 'cover' : 'contain';
      aspectToggleBtn.classList.toggle('active', fitMode === 'cover');
      renderFrame(Math.round(currentFrame));
    });
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement && scrollContainer) {
        scrollContainer.requestFullscreen().catch(err => console.log(err));
      } else {
        document.exitFullscreen();
      }
    });
  }

  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      const filterClass = e.target.value;
      if (filterOverlay) filterOverlay.className = 'canvas-grading-overlay ' + (filterClass !== 'none' ? filterClass : '');
    });
  }

  if (openModalBtn) openModalBtn.addEventListener('click', openCatalogModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeCatalogModal);
  if (catalogModal) {
    catalogModal.addEventListener('click', (e) => {
      if (e.target === catalogModal) closeCatalogModal();
    });
  }

  /* ==========================================================================
     11. Expert Sales & Business Assistant Engine
     ========================================================================== */
  const SYSTEM_PROMPT = `You are an expert sales and business assistant for this website. Greet every visitor professionally, understand their needs, recommend the most suitable products or services, explain their value clearly, answer all questions accurately, address objections politely, and encourage the visitor to make a purchase or book a consultation. Focus on maximizing customer satisfaction, trust, and conversions through ethical and transparent communication. Never make false promises or misleading claims. Help visitors complete their purchase smoothly and provide excellent support throughout the process.`;

  let assistantSpeechEnabled = false;
  let hasInteractedWithAssistant = false;

  function initSalesAssistant() {
    const assistantToggleBtn = document.getElementById('assistantToggleBtn');
    const assistantWindow = document.getElementById('assistantWindow');
    const closeAssistantBtn = document.getElementById('closeAssistantBtn');
    const openAssistantNavBtn = document.getElementById('openAssistantNavBtn');
    const voiceToggleBtn = document.getElementById('voiceToggleBtn');
    const assistantForm = document.getElementById('assistantForm');
    const assistantInput = document.getElementById('assistantInput');
    const assistantMessages = document.getElementById('assistantMessages');
    const unreadBadge = document.getElementById('unreadBadge');
    const typingIndicator = document.getElementById('typingIndicator');
    const chipBtns = document.querySelectorAll('.chip-btn');
    
    // Consultation Modal Elements
    const consultationModal = document.getElementById('consultationModal');
    const openConsultationBtn = document.getElementById('openConsultationBtn');
    const closeConsultationBtn = document.getElementById('closeConsultationBtn');
    const consultationForm = document.getElementById('consultationForm');
    const consultService = document.getElementById('consultService');
    const selectTierBtns = document.querySelectorAll('.select-tier-btn');

    // Toggle Chat Window
    function toggleAssistantWindow(show) {
      if (!assistantWindow) return;
      const isCurrentlyHidden = assistantWindow.classList.contains('hidden');
      const shouldShow = show !== undefined ? show : isCurrentlyHidden;

      if (shouldShow) {
        assistantWindow.classList.remove('hidden');
        if (unreadBadge) unreadBadge.style.display = 'none';
        if (assistantInput) assistantInput.focus();

        // Send initial greeting if empty
        if (!hasInteractedWithAssistant && assistantMessages && assistantMessages.children.length === 0) {
          sendInitialGreeting();
        }
      } else {
        assistantWindow.classList.add('hidden');
      }
    }

    if (assistantToggleBtn) assistantToggleBtn.addEventListener('click', () => toggleAssistantWindow());
    if (closeAssistantBtn) closeAssistantBtn.addEventListener('click', () => toggleAssistantWindow(false));
    if (openAssistantNavBtn) openAssistantNavBtn.addEventListener('click', () => toggleAssistantWindow(true));

    // Voice Output Toggle
    if (voiceToggleBtn) {
      voiceToggleBtn.addEventListener('click', () => {
        assistantSpeechEnabled = !assistantSpeechEnabled;
        voiceToggleBtn.classList.toggle('active', assistantSpeechEnabled);
        voiceToggleBtn.style.color = assistantSpeechEnabled ? 'var(--gold-accent)' : 'var(--text-muted)';
        if (!assistantSpeechEnabled && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      });
    }

    // Initial Professional Welcome Greeting following System Prompt
    function sendInitialGreeting() {
      hasInteractedWithAssistant = true;
      const greeting = `Welcome to AURA BLOOM Atelier! 👋 I am your dedicated Sales & Business Assistant.

My mission is to help you find the ideal 300-frame kinetic animation assets, licensing solutions, or custom engineering services for your project with 100% transparent and ethical guidance.

How can I assist you today?
• Explore our **Essential & Atelier Licenses**
• Inquire about **Custom Botanical Engineering**
• Book a **1-on-1 Consultation**
• Ask technical or performance questions (60FPS Canvas Engine)`;

      const actions = [
        { label: '🏷️ View Products & Pricing', action: 'pricing' },
        { label: '📅 Book Consultation', action: 'consultation' },
        { label: '🖼️ Inspect 300-Frame Catalog', action: 'catalog' }
      ];

      appendAssistantMessage(greeting, actions);
    }

    // Render Assistant Message
    function appendAssistantMessage(text, actionButtons = null) {
      if (!assistantMessages) return;

      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const msgDiv = document.createElement('div');
      msgDiv.className = 'msg-bubble msg-assistant';

      // Format markdown-like bold text & linebreaks cleanly
      let formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');

      let html = `<div>${formattedText}</div>`;

      if (actionButtons && actionButtons.length > 0) {
        html += `<div class="chat-action-group">`;
        actionButtons.forEach(btn => {
          html += `<button class="action-chip-link" data-action="${btn.action}">${btn.label}</button>`;
        });
        html += `</div>`;
      }

      html += `<span class="msg-time">${timeStr}</span>`;
      msgDiv.innerHTML = html;

      assistantMessages.appendChild(msgDiv);
      assistantMessages.scrollTop = assistantMessages.scrollHeight;

      // Event listeners for embedded message buttons
      const actionBtns = msgDiv.querySelectorAll('.action-chip-link');
      actionBtns.forEach(b => {
        b.addEventListener('click', () => {
          const action = b.getAttribute('data-action');
          if (action === 'pricing') {
            const prodSection = document.getElementById('products');
            if (prodSection) prodSection.scrollIntoView({ behavior: 'smooth' });
          } else if (action === 'consultation') {
            openConsultationModal();
          } else if (action === 'catalog') {
            openCatalogModal();
          }
        });
      });

      // Speech Synthesis if enabled
      if (assistantSpeechEnabled && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const cleanText = text.replace(/[*#_•]/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    }

    // Render User Message
    function appendUserMessage(text) {
      if (!assistantMessages) return;

      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const msgDiv = document.createElement('div');
      msgDiv.className = 'msg-bubble msg-user';
      msgDiv.innerHTML = `<div>${escapeHtml(text)}</div><span class="msg-time">${timeStr}</span>`;

      assistantMessages.appendChild(msgDiv);
      assistantMessages.scrollTop = assistantMessages.scrollHeight;
    }

    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Submit Handler
    if (assistantForm) {
      assistantForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = assistantInput.value.trim();
        if (!query) return;

        appendUserMessage(query);
        assistantInput.value = '';

        processUserQuery(query);
      });
    }

    // Quick Suggestion Chips
    chipBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        if (!query) return;

        toggleAssistantWindow(true);
        appendUserMessage(query);
        processUserQuery(query);
      });
    });

    // Expert AI Response Formulator (Guided by System Prompt & Ethics)
    function processUserQuery(query) {
      if (typingIndicator) typingIndicator.classList.remove('hidden');
      if (assistantMessages) assistantMessages.scrollTop = assistantMessages.scrollHeight;

      setTimeout(() => {
        if (typingIndicator) typingIndicator.classList.add('hidden');
        const responseData = generateSalesAssistantResponse(query);
        appendAssistantMessage(responseData.text, responseData.actions);
      }, 700);
    }

    function generateSalesAssistantResponse(q) {
      const lower = q.toLowerCase();

      // 1. Recommendation & Solution Matching
      if (lower.includes('recommend') || lower.includes('best') || lower.includes('solution') || lower.includes('which') || lower.includes('choose')) {
        return {
          text: `Based on your website requirements, here are our top recommendations:

1. **For Single Site & Agencies (Most Popular):**
   👉 **Atelier Commercial License ($799)** — Includes 300 4K Ultra-HD raw frames, multi-domain commercial license, dual canvas/WebGL shaders, and 1-on-1 integration support.

2. **For Independent Developers & Small Projects:**
   👉 **Essential Botanical Kit ($299)** — Complete 300 1080p frames with lightweight LERP canvas engine & Web Audio module.

3. **For High-End Luxury Brands & Bespoke Needs:**
   👉 **Custom Atelier Engineering ($2,499+)** — 300+ frame custom macro studio shoot, bespoke shader physics, and VIP consultation.

Would you like to reserve a kit or schedule a brief consultation to review your setup?`,
          actions: [
            { label: '📅 Book Consultation', action: 'consultation' },
            { label: '🏷️ View Pricing Section', action: 'pricing' }
          ]
        };
      }

      // 2. Pricing & Products Explanation
      if (lower.includes('price') || lower.includes('cost') || lower.includes('kit') || lower.includes('license') || lower.includes('products') || lower.includes('buy') || lower.includes('purchase')) {
        return {
          text: `We maintain **100% transparent pricing** with no hidden recurring subscription fees!

• **Essential Botanical Kit**: **$299** (300 1080p HD Frames, HTML5 Canvas LERP, Web Audio)
• **Atelier Commercial License**: **$799** (300 4K Ultra-HD Raw Sequence, Unlimited Multi-Domain License, Priority Support)
• **Custom Atelier Engineering**: **$2,499+** (Tailor-made macro botanical shoot, bespoke WebGL physics & exclusive ownership)

All assets deliver smooth **60FPS hardware-accelerated canvas motion** with zero video frame drops.`,
          actions: [
            { label: '💳 Select Atelier License ($799)', action: 'pricing' },
            { label: '📅 Book Free Consultation', action: 'consultation' }
          ]
        };
      }

      // 3. Booking Consultation
      if (lower.includes('book') || lower.includes('consultation') || lower.includes('schedule') || lower.includes('call') || lower.includes('meeting') || lower.includes('talk')) {
        return {
          text: `I would be delighted to help you book a consultation with our Atelier specialists! 📅

During our 1-on-1 session, we will:
✔ Analyze your website architecture & design goals
✔ Determine the optimal frame format (WebP/JPG) and resolution (1080p vs 4K)
✔ Demonstrate canvas step interpolation for your framework (React, Next.js, Vue, or Vanilla JS)
✔ Provide custom pricing for bespoke studio shoots if required

You can book directly using our instant booking form below:`,
          actions: [
            { label: '📅 Book Consultation Now', action: 'consultation' }
          ]
        };
      }

      // 4. Performance & Technical Objections (60FPS, lag, load times)
      if (lower.includes('performance') || lower.includes('fps') || lower.includes('lag') || lower.includes('heavy') || lower.includes('speed') || lower.includes('load') || lower.includes('video')) {
        return {
          text: `That is a great technical question! Traditional MP4/WebM videos often stutter or show black gaps when synced to scroll.

Our **300-Frame Botanical Engine** solves this completely:
⚡ **60FPS Hardware Acceleration**: Uses HTML5 Canvas 2D ` + "`requestAnimationFrame`" + ` context.
⚡ **Pre-Buffered Memory Cache**: All 300 micro-frames load once and render instantly without network latency.
⚡ **Sub-Frame LERP**: Linear step interpolation ensures smooth playback whether scrubbing fast or slow.

Would you like to test frame scrubbing live in our Interactive Studio?`,
          actions: [
            { label: '🖼️ Test 300-Frame Catalog', action: 'catalog' },
            { label: '📅 Discuss Tech Integration', action: 'consultation' }
          ]
        };
      }

      // 5. General & Default Helpful Sales Response
      return {
        text: `Thank you for your question! As your sales and business assistant, I want to ensure you have all the information needed to make the right choice for your project.

AURA BLOOM provides high-performance 300-frame botanical kinetic assets and HTML5 canvas engines designed to elevate website conversion, user engagement, and brand perception.

How can I best assist you right now?
• View transparent **product options & pricing**
• Schedule a **1-on-1 consultation**
• Inspect the **300-frame motion catalog**`,
        actions: [
          { label: '🏷️ Products & Pricing', action: 'pricing' },
          { label: '📅 Book Consultation', action: 'consultation' },
          { label: '🖼️ View 300 Catalog', action: 'catalog' }
        ]
      };
    }

    // Consultation Modal Event Handlers
    function openConsultationModal(prefillService = null) {
      if (!consultationModal) return;
      if (prefillService && consultService) {
        consultService.value = prefillService;
      }
      consultationModal.classList.add('active');
    }

    function closeConsultationModal() {
      if (!consultationModal) return;
      consultationModal.classList.remove('active');
    }

    if (openConsultationBtn) openConsultationBtn.addEventListener('click', () => openConsultationModal());
    if (closeConsultationBtn) closeConsultationBtn.addEventListener('click', closeConsultationModal);
    if (consultationModal) {
      consultationModal.addEventListener('click', (e) => {
        if (e.target === consultationModal) closeConsultationModal();
      });
    }

    // Connect Tier Buttons in Products Section to Consultation / Checkout
    selectTierBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tierName = btn.getAttribute('data-tier');
        openConsultationModal(tierName);
      });
    });

    // Form Submission Handling
    if (consultationForm) {
      consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const statusMsg = document.getElementById('consultationStatus');
        const nameVal = document.getElementById('consultName').value;
        const serviceVal = document.getElementById('consultService').value;

        if (statusMsg) {
          statusMsg.className = 'form-status-msg success';
          statusMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${escapeHtml(nameVal)}</strong>! Your consultation request for <strong>${escapeHtml(serviceVal)}</strong> has been confirmed. Our team will reach out via email shortly.`;
        }

        setTimeout(() => {
          consultationForm.reset();
          if (statusMsg) statusMsg.style.display = 'none';
          closeConsultationModal();

          // Inform user in Sales Assistant Chat as well
          toggleAssistantWindow(true);
          appendAssistantMessage(`✅ **Consultation Booking Confirmed!**\n\nThank you, **${nameVal}**! We have received your booking request for **${serviceVal}**. A confirmation details email will arrive shortly. I am available here if you have any additional questions!`, [
            { label: '🏷️ View Atelier Products', action: 'pricing' }
          ]);
        }, 2200);
      });
    }
  }

  initSalesAssistant();

  /* ==========================================================================
     11.5 Transparent Navbar & Smooth Section Scroll Navigation Engine
     ========================================================================== */
  function initNavbarScrollEngine() {
    const mainNavbar = document.getElementById('mainNavbar');
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('a.nav-item[href^="#"], a.nav-brand[href^="#"]');

    // 1. Transparent Navbar Glass Scroll State
    window.addEventListener('scroll', () => {
      if (mainNavbar) {
        if (window.scrollY > 40) {
          mainNavbar.classList.add('scrolled');
        } else {
          mainNavbar.classList.remove('scrolled');
        }
      }
      updateActiveMenuOnScroll();
    }, { passive: true });

    // 2. Smooth Scroll to Target Sections on Click
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          const navHeight = mainNavbar ? mainNavbar.offsetHeight : 70;
          const elemTop = targetElem.getBoundingClientRect().top + window.scrollY;
          const targetOffset = Math.max(0, elemTop - navHeight + 10);

          window.scrollTo({
            top: targetOffset,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          if (navMenu) navMenu.classList.remove('mobile-open');
        }
      });
    });

    // 3. Mobile Hamburger Toggle
    if (mobileNavToggle && navMenu) {
      mobileNavToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
      });
    }

    function updateNavbarIndicator() {
      const activeItem = document.querySelector('a.nav-item.active');
      const indicator = document.getElementById('navActiveIndicator');
      const navMenu = document.getElementById('navMenu');

      if (!activeItem || !indicator || !navMenu) return;

      const linkRect = activeItem.getBoundingClientRect();
      const navRect = navMenu.getBoundingClientRect();

      indicator.style.left = `${linkRect.left - navRect.left}px`;
      indicator.style.width = `${linkRect.width}px`;
      indicator.style.opacity = '1';
    }

    // 4. ScrollSpy Active Menu Item Highlighter
    function updateActiveMenuOnScroll() {
      const scrollPos = window.scrollY + 120;
      const sections = document.querySelectorAll('section[id], header[id]');
      let currentSectionId = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        document.querySelectorAll('a.nav-item').forEach(item => {
          if (item.getAttribute('href') === `#${currentSectionId}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
        updateNavbarIndicator();
      }
    }

    window.addEventListener('resize', updateNavbarIndicator, { passive: true });
    setTimeout(updateNavbarIndicator, 300);
  }

  initNavbarScrollEngine();

  /* ==========================================================================
     12. Screen Resolution & Eye Comfort Accessibility Scaling Engine
     ========================================================================== */
  const navEyeComfortBtn = document.getElementById('navEyeComfortBtn');
  const resolutionSelect = document.getElementById('resolutionSelect');

  // Eye Comfort Toast Notification Element
  let eyeToast = document.createElement('div');
  eyeToast.className = 'eye-toast-notification';
  document.body.appendChild(eyeToast);

  function showEyeToast(msg) {
    eyeToast.innerHTML = `<i class="fa-solid fa-eye"></i> ${msg}`;
    eyeToast.classList.add('show');
    setTimeout(() => {
      eyeToast.classList.remove('show');
    }, 3200);
  }

  function toggleEyeComfortMode(enable) {
    const isCurrentlyComfort = document.documentElement.classList.contains('comfort-eye-mode');
    const targetState = enable !== undefined ? enable : !isCurrentlyComfort;

    if (targetState) {
      document.documentElement.style.zoom = '1.0';
      document.documentElement.classList.add('comfort-eye-mode');
      document.body.classList.add('comfort-eye-mode');
      if (navEyeComfortBtn) navEyeComfortBtn.classList.add('active');
      if (resolutionSelect) resolutionSelect.value = 'comfort';
      showEyeToast('Eye Comfort Mode Active: Text size & contrast boosted for easy reading.');
    } else {
      document.documentElement.classList.remove('comfort-eye-mode');
      document.body.classList.remove('comfort-eye-mode');
      if (navEyeComfortBtn) navEyeComfortBtn.classList.remove('active');
      if (resolutionSelect && resolutionSelect.value === 'comfort') resolutionSelect.value = '90';
    }
  }

  if (navEyeComfortBtn) {
    navEyeComfortBtn.addEventListener('click', () => toggleEyeComfortMode());
  }

  if (resolutionSelect) {
    resolutionSelect.addEventListener('change', (e) => {
      const mode = e.target.value;
      if (mode === 'comfort') {
        toggleEyeComfortMode(true);
      } else {
        toggleEyeComfortMode(false);
        if (mode === '90') {
          document.documentElement.style.zoom = '0.9';
          showEyeToast('🔍 Screen Resolution Set to 90% Scale.');
        } else if (mode === '100') {
          document.documentElement.style.zoom = '1.0';
          showEyeToast('🖥️ Screen Resolution Set to 100% Standard Scale.');
        } else if (mode === '1080p') {
          document.documentElement.style.zoom = '1.0';
          showEyeToast('📺 Locked to 1920×1080 Full HD Viewport Target.');
        } else if (mode === '4k') {
          document.documentElement.style.zoom = '1.0';
          showEyeToast('✨ Ultra-HD 4K High-DPI Sharpness Buffer Active.');
        } else {
          document.documentElement.style.zoom = '0.9';
          showEyeToast('Auto Screen Resolution Scaling Active (90%).');
        }
      }
      setupCanvas();
    });
  }

  /* ==========================================================================
     13. Interactive 3D Card Tilt & Specular Light Reflection Engine
     ========================================================================== */
  function init3DTiltCards() {
    const tiltElements = document.querySelectorAll('.milestone-card, .pricing-card, .spec-card, .process-card, .highlight-item-card, .about-metrics-card, .tilt-3d-target');

    tiltElements.forEach(el => {
      el.classList.add('tilt-3d-enabled');

      if (!el.querySelector('.tilt-shine')) {
        const shine = document.createElement('div');
        shine.className = 'tilt-shine';
        el.appendChild(shine);
      }

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px) scale3d(1.02, 1.02, 1.02)`;

        const shine = el.querySelector('.tilt-shine');
        if (shine) {
          const moveX = (x / rect.width) * 100;
          const moveY = (y / rect.height) * 100;
          shine.style.background = `radial-gradient(circle at ${moveX}% ${moveY}%, rgba(255, 255, 255, 0.22) 0%, rgba(244, 211, 140, 0.08) 45%, transparent 70%)`;
        }
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`;
        const shine = el.querySelector('.tilt-shine');
        if (shine) {
          shine.style.background = 'none';
        }
      });
    });
  }

  init3DTiltCards();

  /* Cookie Consent Handler */
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookieBtn = document.getElementById('acceptCookieBtn');

  if (cookieBanner && acceptCookieBtn) {
    if (localStorage.getItem('roseverse_cookie_consent') === 'accepted') {
      cookieBanner.classList.add('hidden');
    }
    acceptCookieBtn.addEventListener('click', () => {
      localStorage.setItem('roseverse_cookie_consent', 'accepted');
      cookieBanner.classList.add('hidden');
      showEyeToast('Cookie & Privacy Preferences Saved.');
    });
  }

  preloadImages();
});

