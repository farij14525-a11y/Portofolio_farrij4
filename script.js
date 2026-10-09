/**
 * ==========================================================================
 * PORTOFOLIO ANTI-GRAVITASI — FARRIJ.PSH
 * NEXT-GEN 0-G INTERACTIVE CORE ENGINE
 * ==========================================================================
 */

// Global physics state
let currentGravityMode = 'zero'; // 'zero', 'moon', 'warp', 'inverted'
let supernovaParticles = [];

// ==========================================================================
// DAFTAR LAGU / MUSIC PLAYLIST
// ==========================================================================
const playlist = [
  {
    title: 'Special Music Mix (Full Version)',
    artist: 'YouTube · 1 Jam 47 Menit 14 Detik',
    tag: '1:47:14',
    youtubeId: 'pXP88QMTxdA',
    youtubeUrl: 'https://youtu.be/pXP88QMTxdA?si=cFx5hTeCTbBuIe3l',
    durationSeconds: 6434, // 1 jam 47 menit 14 detik
    cover: 'https://img.youtube.com/vi/pXP88QMTxdA/hqdefault.jpg'
  },
  {
    title: 'Best Spotify Trending & Slow Acoustic',
    artist: 'JsVibes Music · Positive Pop & Travel Vibes',
    tag: 'Acoustic',
    youtubeId: 'T-aI5j1rIx4',
    youtubeUrl: 'https://youtu.be/T-aI5j1rIx4?si=Ph-F9GegJwFlAN3Z',
    durationSeconds: 0, // Durasi dinamis otomatis diambil dari YouTube API
    cover: 'https://img.youtube.com/vi/T-aI5j1rIx4/hqdefault.jpg'
  }
];

let currentTrackIndex = 0;
let isMusicPlaying = false;
let ytPlayer = null;
let ytProgressInterval = null;
let _playStartedAt = null;   // Date.now() when play started
let _playOffsetSec = 0;      // seconds elapsed before last pause

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initMouseSpotlight();
  initTypingEffect();
  initLiveClock();
  initFpsCounter();
  initNavbar();
  initThemeAccentPicker();
  initAntiGravityCanvas();
  initGravitySimulator();
  initTerminalSimulator();
  initStatsCounter();
  initTiltEffect();
  initProjectFilter();
  initCopyEmail();
  initBackToTop();
  initSupernovaTrigger();
  initMusicPlayer();
  initAutoLocationDetector();
});

/* --------------------------------------------------------------------------
   1. CUSTOM ZERO-G CURSOR FOLLOWER (DYNAMIC AERODYNAMIC & SHOCKWAVE HUD)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isHovering = false;
  let isClicking = false;

  // Track mouse movements smoothly
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Zero-G Physics Render Loop with fluid trailing & velocity elongation
  function renderCursor() {
    const vx = mouseX - ringX;
    const vy = mouseY - ringY;
    const speed = Math.hypot(vx, vy);

    ringX += vx * 0.2;
    ringY += vy * 0.2;

    if (isHovering || isClicking) {
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    } else {
      // Aerodynamic fluid stretch when moving through zero-gravity
      const stretch = Math.min(speed * 0.0028, 0.32);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);
      const scaleX = 1 + stretch;
      const scaleY = 1 - stretch * 0.45;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
    }

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Mouse Down / Up Tactile Shockwave Feedback
  window.addEventListener('mousedown', (e) => {
    isClicking = true;
    ring.classList.add('clicking');
    dot.classList.add('clicking');
    createCursorShockwave(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', () => {
    isClicking = false;
    ring.classList.remove('clicking');
    dot.classList.remove('clicking');
  });

  // Click Shockwave Burst Generator
  function createCursorShockwave(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'cursor-shockwave';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 460);
  }

  // Smooth Window Exit / Enter
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  // Universal Interactive Element Hover Detection (Event Delegation)
  const interactiveSelector = 'a, button, input, textarea, select, .tilt-card, .filter-btn, .orbit-item, .gravity-btn, .playlist-item, .method-item, .accent-btn, [onclick], [role="button"]';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      if (!isHovering) {
        ring.classList.add('active');
        isHovering = true;
        if (typeof playCyberSfx === 'function') playCyberSfx(780, 0.03);
      }
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      // Check if newly entered element is also interactive
      if (!e.relatedTarget || !e.relatedTarget.closest(interactiveSelector)) {
        ring.classList.remove('active');
        isHovering = false;
      }
    }
  });
}

/* --------------------------------------------------------------------------
   2. MOUSE SPOTLIGHT TORCH
   -------------------------------------------------------------------------- */
function initMouseSpotlight() {
  const spotlight = document.getElementById('mouseSpotlight');
  if (!spotlight) return;

  window.addEventListener('mousemove', (e) => {
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  });
}

/* --------------------------------------------------------------------------
   3. TYPING EFFECT WITH ROTATING STRINGS
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingEl = document.getElementById('typingText');
  if (!typingEl) return;

  const words = [
    'Creative Web Developer',
    'Laravel & Vue Specialist',
    'UI/UX Design Artisan',
    'Digital Problem Solver',
    'Zero-Gravity Explorer'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeLoop() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typingEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 85;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 1900;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400;
    }

    setTimeout(typeLoop, typeSpeed);
  }

  typeLoop();
}

/* --------------------------------------------------------------------------
   4. LIVE CLOCK (WIB / UTC+7) & LIVE FPS COUNTER
   -------------------------------------------------------------------------- */
function initLiveClock() {
  const clockEl = document.getElementById('liveClock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const timeString = new Intl.DateTimeFormat('id-ID', options).format(now);
    clockEl.textContent = `${timeString} WIB`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* --------------------------------------------------------------------------
   4b. REAL-TIME CLIENT AUTO LOCATION & ORBIT DETECTOR
   -------------------------------------------------------------------------- */
async function initAutoLocationDetector() {
  const telemetryEl = document.getElementById('telemetryLocation');
  const bentoLocationEl = document.getElementById('bentoLocation');

  // Gunakan cache sessionStorage agar cepat dan hemat request
  const cached = sessionStorage.getItem('farrij_visitor_location');
  if (cached) {
    try {
      const data = JSON.parse(cached);
      applyLocationData(data);
      return;
    } catch (e) {}
  }

  function applyLocationData(data) {
    const city = (data.city || data.region || 'BUMI').toUpperCase();
    const countryCode = (data.country_code || 'ID').toUpperCase();
    const country = data.country || 'Indonesia';
    const latStr = typeof data.latitude === 'number' 
      ? `LAT ${data.latitude > 0 ? '+' : ''}${data.latitude.toFixed(1)}°` 
      : 'LAT 0-G';
    const tzAbbr = data.timezone?.abbr || (data.timezone?.utc ? 'UTC' + data.timezone.utc : 'WIB');

    if (telemetryEl) {
      telemetryEl.textContent = `ORBIT: ${latStr} // ${city}, ${countryCode}`;
      telemetryEl.setAttribute('title', `Lokasi Terdeteksi: ${city}, ${country}`);
    }
    if (bentoLocationEl) {
      bentoLocationEl.innerHTML = `<i class="fa-solid fa-location-dot text-cyan"></i> ${city}, ${country} (${tzAbbr})`;
    }
  }

  function fallbackBrowserLocation() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Jakarta';
      const parts = tz.split('/');
      const cityGuess = parts[parts.length - 1].replace(/_/g, ' ').toUpperCase();
      if (telemetryEl) {
        telemetryEl.textContent = `ORBIT: LAT 0-G // ${cityGuess}, ID`;
      }
      if (bentoLocationEl) {
        bentoLocationEl.innerHTML = `<i class="fa-solid fa-location-dot text-cyan"></i> ${cityGuess}, Indonesia`;
      }
    } catch (e) {
      if (telemetryEl) telemetryEl.textContent = 'ORBIT: LAT 0-G // INDONESIA, ID';
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch('https://ipwho.is/', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        sessionStorage.setItem('farrij_visitor_location', JSON.stringify(data));
        applyLocationData(data);
        return;
      }
    }
    fallbackBrowserLocation();
  } catch (err) {
    fallbackBrowserLocation();
  }
}

function initFpsCounter() {
  const fpsEl = document.getElementById('fpsCount');
  if (!fpsEl) return;

  let lastTime = performance.now();
  let frameCount = 0;

  function loop() {
    frameCount++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (now - lastTime));
      fpsEl.textContent = `${fps} FPS`;
      frameCount = 0;
      lastTime = now;
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

/* --------------------------------------------------------------------------
   5. SOUND EFFECTS (MUTED / DISABLED)
   -------------------------------------------------------------------------- */
function playCyberSfx() {
  // Audio & SFX completely disabled
}

/* --------------------------------------------------------------------------
   6. THEME ACCENT COLOR SWITCHER
   -------------------------------------------------------------------------- */
function initThemeAccentPicker() {
  const buttons = document.querySelectorAll('.theme-accent-picker .accent-btn');
  let savedAccent = localStorage.getItem('farrij_theme_accent');
  if (savedAccent === 'rose') {
    savedAccent = 'neon-green';
    localStorage.setItem('farrij_theme_accent', 'neon-green');
  }

  if (savedAccent) {
    const targetBtn = document.querySelector(`.theme-accent-picker .accent-btn[data-accent="${savedAccent}"]`);
    if (targetBtn) {
      buttons.forEach((b) => b.classList.remove('active'));
      targetBtn.classList.add('active');
      document.body.setAttribute('data-theme-accent', savedAccent);
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const accent = btn.getAttribute('data-accent');
      document.body.setAttribute('data-theme-accent', accent);
      localStorage.setItem('farrij_theme_accent', accent);
      playCyberSfx(620, 0.08);

      const label = btn.getAttribute('title') || accent.toUpperCase();
      showToast(`Tema Warna Nebula diubah ke: ${label.toUpperCase()} ✨`);
    });
  });
}

/* --------------------------------------------------------------------------
   7. NAVBAR SCROLL & ACTIVE LINK SPY
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobileToggle');
  const navContainer = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle && navContainer) {
    mobileToggle.addEventListener('click', () => {
      navContainer.classList.toggle('open');
      const isOpen = navContainer.classList.contains('open');
      mobileToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars-staggered"></i>';
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navContainer.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   8. ANTI-GRAVITY CANVAS & PHYSICS ENGINE
   -------------------------------------------------------------------------- */
function initAntiGravityCanvas() {
  const canvas = document.getElementById('antiGravityCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 16), 85);

  const mouse = {
    x: null,
    y: null,
    radius: 140
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 0.8;
      this.baseSpeedY = -(Math.random() * 0.7 + 0.25);
      this.baseSpeedX = (Math.random() - 0.5) * 0.4;
      this.speedY = this.baseSpeedY;
      this.speedX = this.baseSpeedX;
      this.baseAlpha = Math.random() * 0.5 + 0.25;
      this.alpha = this.baseAlpha;
      this.hue = Math.random() > 0.45 ? 185 : 275;
    }

    update() {
      if (currentGravityMode === 'moon') {
        this.y += this.baseSpeedY * 0.35;
        this.x += Math.sin(this.y * 0.02) * 0.4;
      } else if (currentGravityMode === 'warp') {
        this.y += this.baseSpeedY * 4.5;
        this.x += this.baseSpeedX * 2;
      } else if (currentGravityMode === 'inverted') {
        const centerX = width / 2;
        const centerY = height / 2;
        const angle = Math.atan2(this.y - centerY, this.x - centerX) + 0.04;
        const dist = Math.hypot(this.x - centerX, this.y - centerY);
        this.x = centerX + Math.cos(angle) * dist;
        this.y = centerY + Math.sin(angle) * dist - 0.5;
      } else if (currentGravityMode === 'nebula') {
        // Slow, wavy, dreamy drift
        this.x += Math.sin(this.y * 0.01 + Date.now() * 0.0005) * 0.8;
        this.y += this.baseSpeedY * 0.2;
        this.alpha = this.baseAlpha * (0.6 + Math.sin(Date.now() * 0.002) * 0.4);
      } else if (currentGravityMode === 'galaxy') {
        // Galaxy spiral: particles orbit in logarithmic spiral arms
        const cx = width / 2;
        const cy = height / 2;
        const dx = this.x - cx;
        const dy = this.y - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const angle = Math.atan2(dy, dx);
        const spinSpeed = 0.008 + (1 / (dist * 0.05 + 1)) * 0.02;
        const newAngle = angle + spinSpeed;
        const targetDist = dist + (80 - dist) * 0.002;
        this.x = cx + Math.cos(newAngle) * targetDist;
        this.y = cy + Math.sin(newAngle) * targetDist;
      } else if (currentGravityMode === 'aurora') {
        // Aurora wave: layered sine wave bands drifting upward
        const t = Date.now() * 0.001;
        this.x += Math.sin(this.y * 0.015 + t * 1.2 + this.baseAlpha * 10) * 1.8
                + Math.cos(this.y * 0.008 + t * 0.7) * 1.2;
        this.y += this.baseSpeedY * 0.5;
        this.alpha = 0.4 + Math.abs(Math.sin(t * 0.8 + this.baseAlpha * 5)) * 0.55;
      } else if (currentGravityMode === 'solar') {
        // Radiate outward from center like solar flare
        const centerX = width / 2;
        const centerY = height / 2;
        const dx = this.x - centerX;
        const dy = this.y - centerY;
        const dist = Math.hypot(dx, dy);
        const push = 1.5;
        this.x += (dx / (dist + 1)) * push + Math.sin(Date.now() * 0.003) * 0.5;
        this.y += (dy / (dist + 1)) * push;
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.x = width / 2 + (Math.random() - 0.5) * 80;
          this.y = height / 2 + (Math.random() - 0.5) * 80;
        }
      } else {
        this.y += this.speedY;
        this.x += this.speedX;
      }

      if (this.y < 0) {
        this.y = height + 10;
        this.x = Math.random() * width;
      }
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 4;
          this.y -= Math.sin(angle) * force * 4;
          this.alpha = 0.95;
        } else {
          this.alpha = this.baseAlpha;
        }
      }
    }

    draw() {
      ctx.beginPath();
      if (currentGravityMode === 'warp') {
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - this.size * 9);
        ctx.strokeStyle = `hsla(${this.hue}, 95%, 70%, ${this.alpha})`;
        ctx.lineWidth = this.size;
        ctx.stroke();
      } else if (currentGravityMode === 'blackhole') {
        ctx.arc(this.x, this.y, this.size * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0, 90%, 60%, ${this.alpha})`;
        ctx.shadowColor = `hsla(0, 100%, 50%, 1)`;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (currentGravityMode === 'solar') {
        ctx.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(40, 100%, 65%, ${this.alpha})`;
        ctx.shadowColor = `hsla(40, 100%, 70%, 1)`;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (currentGravityMode === 'nebula') {
        ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(275, 90%, 70%, ${this.alpha})`;
        ctx.shadowColor = `hsla(275, 100%, 75%, 0.9)`;
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (currentGravityMode === 'galaxy') {
        // Star-like with purple-blue spiral glow
        const galaxyHue = 220 + (Math.hypot(this.x - width/2, this.y - height/2) % 80);
        ctx.arc(this.x, this.y, this.size * 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${galaxyHue}, 90%, 72%, ${this.alpha})`;
        ctx.shadowColor = `hsla(${galaxyHue}, 100%, 80%, 0.9)`;
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (currentGravityMode === 'aurora') {
        // Elongated streak with aurora hue (green→cyan→magenta)
        const t = Date.now() * 0.0008;
        const auroraHue = 140 + Math.sin(this.y * 0.01 + t) * 80;
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.size * 0.6, this.size * 2.8, Math.PI / 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${auroraHue}, 95%, 68%, ${this.alpha})`;
        ctx.shadowColor = `hsla(${auroraHue}, 100%, 75%, 1)`;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
      } else {
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 95%, 68%, ${this.alpha})`;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 70%, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    if (currentGravityMode === 'warp') return;

    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 105) {
          const opacity = (1 - dist / 105) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx.lineWidth = 0.75;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function updateSupernova() {
    for (let i = supernovaParticles.length - 1; i >= 0; i--) {
      const p = supernovaParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.alpha -= 0.015;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.alpha})`;
      ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, 1)`;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (p.alpha <= 0) {
        supernovaParticles.splice(i, 1);
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    connectParticles();
    updateSupernova();

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   9. SUPERNOVA TRIGGER ON PROFILE CLICK
   -------------------------------------------------------------------------- */
function initSupernovaTrigger() {
  const trigger = document.getElementById('avatarCardTrigger');
  if (!trigger) return;

  trigger.addEventListener('click', (e) => {
    const rect = trigger.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    playCyberSfx(950, 0.25, 'sawtooth');

    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      supernovaParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3.5 + 1.5,
        alpha: 1,
        hue: Math.random() > 0.5 ? 185 : 45
      });
    }

    showToast('🚀 SUPERNOVA BURST ACTIVATED!');
  });
}

/* --------------------------------------------------------------------------
   10. GRAVITY CONTROLLER SIMULATOR
   -------------------------------------------------------------------------- */
function initGravitySimulator() {
  const buttons = document.querySelectorAll('.gravity-btn');
  const statusText = document.getElementById('gravityStatusText');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-gravity');
      currentGravityMode = mode;

      const descriptions = {
        zero:     'Gravitasi Aktif: 0.0 G (Anti-Gravity Protocol)',
        moon:     'Gravitasi Aktif: 0.16 G (Lunar Drift Orbit)',
        warp:     'Gravitasi Aktif: HYPER WARP SPEED (Light Velocity)',
        inverted: 'Gravitasi Aktif: INVERTED VORTEX (Centrifugal Pull)',
        nebula:   'Gravitasi Aktif: NEBULA DRIFT (Interstellar Cloud Mode)',
        galaxy:   'Gravitasi Aktif: GALAXY SPIRAL (Logarithmic Orbit Arms)',
        aurora:   'Gravitasi Aktif: AURORA WAVE (Northern Lights Simulation)',
        solar:    'Gravitasi Aktif: SOLAR STORM (Coronal Mass Ejection)'
      };

      if (statusText) statusText.textContent = descriptions[mode] || mode;
      playCyberSfx(550, 0.1, 'square');
      showToast(`Mode Fisika Diubah: ${mode.toUpperCase()} 🌌`);
    });
  });
}

/* --------------------------------------------------------------------------
   11. INTERACTIVE TERMINAL SIMULATOR (CLI)
   -------------------------------------------------------------------------- */
function initTerminalSimulator() {
  const input = document.getElementById('termInput');
  const history = document.getElementById('termHistory');
  const screen = document.getElementById('terminalScreen');

  if (!input || !history || !screen) return;

  const commands = {
    help: () => `
      <div class="term-line output text-cyan">Perintah yang tersedia:</div>
      <div class="term-line output">- <span class="cmd-chip">skills</span> : Lihat ringkasan keahlian teknis</div>
      <div class="term-line output">- <span class="cmd-chip">projects</span> : Tampilkan studi kasus proyek</div>
      <div class="term-line output">- <span class="cmd-chip">music</span> : Putar / jeda pemutar musik lofi</div>
      <div class="term-line output">- <span class="cmd-chip">supernova</span> : Picu ledakan partikel antariksa</div>
      <div class="term-line output">- <span class="cmd-chip">whoami</span> : Ringkasan identitas Farrij</div>
      <div class="term-line output">- <span class="cmd-chip">contact</span> : Tampilkan saluran komunikasi</div>
      <div class="term-line output">- <span class="cmd-chip">clear</span> : Bersihkan layar terminal</div>
    `,
    skills: () => `
      <div class="term-line output text-cyan">⚡ Core Stack Matrix:</div>
      <div class="term-line output">▸ Frontend : HTML5, CSS3/Sass, JavaScript ES6+, Vue.js (94%)</div>
      <div class="term-line output">▸ Backend  : PHP, Laravel MVC, MySQL Relational DB (88%)</div>
      <div class="term-line output">▸ UI/UX    : Figma Design Systems, Micro-Interactions (90%)</div>
    `,
    projects: () => `
      <div class="term-line output text-cyan">🚀 Proyek Unggulan:</div>
      <div class="term-line output">1. <span class="text-primary">TugasFRQ</span> — Portal Postingan Pelajar (Laravel + Vue)</div>
      <div class="term-line output">2. <span class="text-primary">EduGravity</span> — Konsep Belajar 3D Hologram (Figma UI/UX)</div>
      <div class="term-line output">3. <span class="text-primary">Smart Presence</span> — Sistem Pemindai Presensi QR Code</div>
    `,
    music: () => {
      togglePlayPauseMusic();
      return `<div class="term-line output text-cyan">🎵 Pemutar musik cosmic dialihkan statusnya!</div>`;
    },
    whoami: () => `
      <div class="term-line output">Operator: <span class="text-cyan">Farid / Farrij</span> | Creative Developer</div>
      <div class="term-line output">Filosofi: <span class="text-gold">Anti-Gravitasi (Berpikir Melampaui Batas)</span></div>
      <div class="term-line output">Status: Terbuka untuk Kolaborasi & Proyek Teknologi</div>
    `,
    contact: () => `
      <div class="term-line output">Email: <span class="text-cyan">contact.farrij@gmail.com</span></div>
      <div class="term-line output">GitHub: <a href="https://github.com" target="_blank" class="text-cyan">github.com/farrij</a></div>
    `,
    supernova: () => {
      const avatar = document.getElementById('avatarCardTrigger');
      if (avatar) avatar.click();
      return `<div class="term-line output text-gold">💥 Supernova partikel berhasil diledakkan ke kanvas!</div>`;
    },
    clear: () => {
      history.innerHTML = '';
      return '';
    },
    cls: () => {
      history.innerHTML = '';
      return '';
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      if (!cmd) return;

      playCyberSfx(700, 0.05);

      const cmdLine = document.createElement('div');
      cmdLine.className = 'term-line';
      cmdLine.innerHTML = `<span class="term-prompt">farrij@zero-g:~$</span> <span>${input.value}</span>`;
      history.appendChild(cmdLine);

      if (commands[cmd]) {
        const result = commands[cmd]();
        if (result) {
          const resDiv = document.createElement('div');
          resDiv.innerHTML = result;
          history.appendChild(resDiv);
        }
      } else {
        const errorLine = document.createElement('div');
        errorLine.className = 'term-line output text-red';
        errorLine.innerHTML = `Perintah tidak dikenali: '${cmd}'. Ketik <span class="cmd-chip">help</span> untuk bantuan.`;
        history.appendChild(errorLine);
      }

      input.value = '';
      screen.scrollTop = screen.scrollHeight;
    }
  });
}



/* --------------------------------------------------------------------------
   13. ANIMATED STATS COUNTER
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  let counted = false;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          statNumbers.forEach((counter) => {
            if (!counter.hasAttribute('data-target')) return;
            const target = +counter.getAttribute('data-target');
            const duration = 1600;
            const step = Math.ceil(target / (duration / 25));
            let current = 0;

            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                counter.innerText = target;
                clearInterval(timer);
              } else {
                counter.innerText = current;
              }
            }, 25);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    observer.observe(heroStats);
  }
}

/* --------------------------------------------------------------------------
   14. 3D CARD TILT WITH PERSPECTIVE
   -------------------------------------------------------------------------- */
function initTiltEffect() {
  const cards = document.querySelectorAll('[data-tilt]');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* --------------------------------------------------------------------------
   15. PROJECT FILTER SYSTEM
   -------------------------------------------------------------------------- */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('#projectFilter .filter-btn');
  const projectCards = document.querySelectorAll('#projectsGrid .project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      playCyberSfx(600, 0.05);

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   16. COPY EMAIL & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBox = document.getElementById('copyEmailBox');
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');

  const copyAction = () => {
    if (!emailText) return;
    playCyberSfx(880, 0.1);
    navigator.clipboard.writeText(emailText.innerText.trim()).then(() => {
      showToast('Alamat email resmi berhasil disalin! 📋');
    }).catch(() => {
      showToast('Berhasil disalin: ' + emailText.innerText.trim());
    });
  };

  if (copyBox) copyBox.addEventListener('click', copyAction);
  if (copyBtn) copyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    copyAction();
  });
}

window.showToast = function (message) {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  if (!toast || !msgEl) return;

  msgEl.innerText = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
};

/* --------------------------------------------------------------------------
   17. CONTACT FORM SUBMISSION (DIRECT TO EMAIL)
   -------------------------------------------------------------------------- */
window.handleFormSubmit = async function (e) {
  e.preventDefault();
  const name = document.getElementById('senderName')?.value || 'Anonim';
  const email = document.getElementById('senderEmail')?.value || '-';
  const message = document.getElementById('senderMessage')?.value || '';
  const submitBtn = document.getElementById('submitMsgBtn');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim Pesan ke Email...';
  }

  try {
    const response = await fetch('https://formsubmit.co/ajax/contact.farrij@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `[Portofolio] Pesan Baru dari ${name}`,
        _template: 'table',
        _captcha: 'false',
        'Nama / Instansi': name,
        'Email Kontak': email,
        'Pesan / Kolaborasi': message
      })
    });

    if (response.ok) {
      showToast('🎉 Pesan Anda berhasil terkirim ke email Farid!');
      const form = document.getElementById('contactForm');
      if (form) form.reset();
    } else {
      throw new Error('Gagal mengirim');
    }
  } catch (error) {
    // Fallback cadangan: membuka aplikasi email (mailto)
    window.location.href = `mailto:contact.farrij@gmail.com?subject=${encodeURIComponent('[Portofolio] Pesan dari ' + name)}&body=${encodeURIComponent(`Halo Farid,\n\nNama / Instansi: ${name}\nEmail: ${email}\n\nPesan:\n${message}`)}`;
    showToast('Membuka aplikasi email Anda... ✉️');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan Sekarang';
    }
  }
};

/* --------------------------------------------------------------------------
   18. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    playCyberSfx(1200, 0.25, 'triangle');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   19. COSMIC MUSIC PLAYER ENGINE & YOUTUBE STREAMING
   -------------------------------------------------------------------------- */
function formatMusicTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs}`;
  }
  return `${mins}:${secs}`;
}

// Global YouTube IFrame API Callback
window.onYouTubeIframeAPIReady = function () {
  const initialTrack = playlist[0];
  const videoId = initialTrack?.youtubeId || 'pXP88QMTxdA';

  try {
    ytPlayer = new YT.Player('ytMusicPlayer', {
      height: '1',
      width: '1',
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        fs: 0,
        rel: 0,
        playsinline: 1
      },
      events: {
        onReady: (e) => {
          e.target.setVolume(75);
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) {
            isMusicPlaying = true;
            startYTProgressTimer();
            updatePlayerUI();
          } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
            isMusicPlaying = false;
            stopYTProgressTimer();
            updatePlayerUI();
            if (e.data === YT.PlayerState.ENDED) nextTrack();
          }
        }
      }
    });
  } catch (err) {
    console.warn('YouTube Player API ready callback error:', err);
  }
};

function startYTProgressTimer() {
  stopYTProgressTimer();
  _playStartedAt = Date.now();
  ytProgressInterval = setInterval(updateYTProgress, 500);
}

function stopYTProgressTimer() {
  if (ytProgressInterval) {
    clearInterval(ytProgressInterval);
    ytProgressInterval = null;
  }
}

function updateYTProgress() {
  const current = playlist[currentTrackIndex];
  if (!current || !current.youtubeId) return;

  const bar = document.getElementById('playerProgressBar');
  const timeEl = document.getElementById('currentTime');

  // Hitung waktu dari local elapsed timer (reliable)
  let curTime = _playOffsetSec;
  if (_playStartedAt !== null && isMusicPlaying) {
    curTime = _playOffsetSec + (Date.now() - _playStartedAt) / 1000;
  }

  // Coba ambil dari ytPlayer jika tersedia dan valid
  if (ytPlayer && typeof ytPlayer.getCurrentTime === 'function') {
    try {
      const ytTime = ytPlayer.getCurrentTime();
      if (ytTime && ytTime > 0) {
        curTime = ytTime;
        _playOffsetSec = ytTime; // sinkronkan offset
      }
    } catch (e) {}
  }

  const totalDuration = (ytPlayer && typeof ytPlayer.getDuration === 'function' &&
    ytPlayer.getDuration() > 0) ? ytPlayer.getDuration() : (current.durationSeconds || 6434);

  const pct = Math.min(100, Math.max(0, (curTime / totalDuration) * 100));
  if (bar) bar.style.width = `${pct}%`;
  if (timeEl) timeEl.textContent = `${formatMusicTime(curTime)} / ${formatMusicTime(totalDuration)}`;
}

function initMusicPlayer() {
  const audio = document.getElementById('bgAudio');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const prevTrackBtn = document.getElementById('prevTrackBtn');
  const nextTrackBtn = document.getElementById('nextTrackBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  const volBtn = document.getElementById('volBtn');
  const playlistToggleBtn = document.getElementById('playlistToggleBtn');
  const progressBarContainer = document.getElementById('playerProgressContainer');

  if (audio) {
    audio.volume = 0.75;
    if (playlist.length > 0 && playlist[currentTrackIndex]?.src) {
      audio.src = playlist[currentTrackIndex].src;
    }
  }

  if (volumeSlider) {
    volumeSlider.value = 0.75;
    updateVolIcon(0.75);
  }

  renderPlaylistDrawer();
  updatePlayerUI();

  if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPauseMusic);
  if (prevTrackBtn) prevTrackBtn.addEventListener('click', prevTrack);
  if (nextTrackBtn) nextTrackBtn.addEventListener('click', nextTrack);
  if (playlistToggleBtn) playlistToggleBtn.addEventListener('click', togglePlaylistDrawer);

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      const vol = parseFloat(e.target.value);
      if (audio) audio.volume = vol;
      if (ytPlayer && typeof ytPlayer.setVolume === 'function') {
        ytPlayer.setVolume(vol * 100);
      }
      updateVolIcon(vol);
    });
  }

  if (volBtn) {
    volBtn.addEventListener('click', () => {
      const curVol = volumeSlider ? parseFloat(volumeSlider.value) : 0.75;
      if (curVol > 0) {
        if (volumeSlider) volumeSlider.dataset.prevVol = curVol;
        if (volumeSlider) volumeSlider.value = 0;
        if (audio) audio.volume = 0;
        if (ytPlayer && typeof ytPlayer.setVolume === 'function') ytPlayer.setVolume(0);
        updateVolIcon(0);
      } else {
        const restored = parseFloat(volumeSlider?.dataset?.prevVol) || 0.75;
        if (volumeSlider) volumeSlider.value = restored;
        if (audio) audio.volume = restored;
        if (ytPlayer && typeof ytPlayer.setVolume === 'function') ytPlayer.setVolume(restored * 100);
        updateVolIcon(restored);
      }
    });
  }

  if (audio) {
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('ended', nextTrack);
  }

  if (progressBarContainer) {
    progressBarContainer.addEventListener('click', (e) => {
      const rect = progressBarContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));

      const current = playlist[currentTrackIndex];
      if (current && current.youtubeId) {
        const total = (ytPlayer && typeof ytPlayer.getDuration === 'function' && ytPlayer.getDuration()) || current.durationSeconds || 6434;
        const targetSec = ratio * total;
        if (ytPlayer && typeof ytPlayer.seekTo === 'function') {
          ytPlayer.seekTo(targetSec, true);
        }
        updateYTProgress();
      } else if (audio && audio.duration) {
        audio.currentTime = ratio * audio.duration;
      }
    });
  }
}

function renderPlaylistDrawer() {
  const list = document.getElementById('playlistItemsList');
  const countBadge = document.getElementById('playlistCountBadge');
  if (!list) return;

  if (countBadge) countBadge.textContent = playlist.length;
  list.innerHTML = '';

  if (playlist.length === 0) {
    list.innerHTML = `
      <div style="padding: 30px 20px; text-align: center; color: var(--text-muted);">
        <i class="fa-solid fa-music" style="font-size: 2rem; margin-bottom: 12px; opacity: 0.5;"></i>
        <p style="font-size: 0.95rem; margin-bottom: 6px; color: var(--text-secondary);">Belum ada lagu di Playlist</p>
        <p style="font-size: 0.8rem; opacity: 0.7;">Klik tombol di bawah untuk menambahkan file MP3 / audio dari komputermu.</p>
      </div>
    `;
    return;
  }

  playlist.forEach((track, index) => {
    const item = document.createElement('div');
    item.className = `playlist-item ${index === currentTrackIndex ? 'active' : ''}`;
    item.onclick = (e) => {
      if (e.target.closest('.spotify-track-link, .youtube-track-link')) return;
      selectTrack(index);
    };

    const coverHtml = track.cover
      ? `<img src="${track.cover}" alt="${track.title}" class="p-track-thumb" />`
      : `<span class="p-index">${index + 1}</span>`;

    let extLinkHtml = '';
    if (track.youtubeUrl) {
      extLinkHtml = `<a href="${track.youtubeUrl}" target="_blank" rel="noopener" class="youtube-track-link" title="Buka di YouTube (1h 47m 14s)" onclick="event.stopPropagation();"><i class="fa-brands fa-youtube text-red"></i></a>`;
    } else if (track.spotifyUrl) {
      extLinkHtml = `<a href="${track.spotifyUrl}" target="_blank" rel="noopener" class="spotify-track-link" title="Buka di Spotify" onclick="event.stopPropagation();"><i class="fa-brands fa-spotify text-emerald"></i></a>`;
    }

    item.innerHTML = `
      <div class="p-item-left">
        ${coverHtml}
        <div class="p-track-details">
          <span class="p-track-title">${track.title}</span>
          <span class="p-track-artist">${track.artist || 'YouTube Audio'}</span>
        </div>
      </div>
      <div class="p-item-right">
        <span class="p-tag">${track.tag || '1:47:14'}</span>
        ${extLinkHtml}
        ${index === currentTrackIndex && isMusicPlaying ? '<i class="fa-solid fa-compact-disc fa-spin p-playing-icon"></i>' : ''}
      </div>
    `;

    list.appendChild(item);
  });
}

function updatePlayerUI() {
  const titleEl = document.getElementById('trackTitle');
  const artistEl = document.getElementById('trackArtist');
  const playIcon = document.getElementById('playIcon');
  const disc = document.getElementById('vinylDisc');
  const eq = document.getElementById('equalizerBars');
  const vinylCenter = document.getElementById('vinylCenter');
  const extBtn = document.getElementById('dockExternalLink');

  if (playlist.length === 0) {
    if (titleEl) titleEl.textContent = 'Playlist Kosong';
    if (artistEl) artistEl.textContent = 'Klik tombol + untuk tambah lagu';
    if (playIcon) playIcon.className = 'fa-solid fa-play';
    if (disc) disc.classList.remove('playing');
    if (eq) eq.classList.remove('playing');
    renderPlaylistDrawer();
    return;
  }

  const current = playlist[currentTrackIndex];
  if (!current) return;

  if (titleEl) titleEl.textContent = current.title;
  if (artistEl) artistEl.textContent = current.artist || 'Musik Portofolio';

  if (vinylCenter) {
    if (current.cover) {
      vinylCenter.innerHTML = `<img src="${current.cover}" alt="${current.title}" class="vinyl-cover-img" />`;
    } else {
      vinylCenter.innerHTML = `<i class="fa-solid fa-music text-cyan"></i>`;
    }
  }

  if (extBtn) {
    if (current.youtubeUrl) {
      extBtn.href = current.youtubeUrl;
      extBtn.title = 'Buka di YouTube';
      extBtn.innerHTML = '<i class="fa-brands fa-youtube"></i>';
      extBtn.style.display = 'flex';
    } else if (current.spotifyUrl) {
      extBtn.href = current.spotifyUrl;
      extBtn.title = 'Buka di Spotify';
      extBtn.innerHTML = '<i class="fa-brands fa-spotify"></i>';
      extBtn.style.display = 'flex';
    } else {
      extBtn.style.display = 'none';
    }
  }

  if (playIcon) {
    playIcon.className = isMusicPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
  }

  if (disc) {
    disc.classList.toggle('playing', isMusicPlaying);
  }

  if (eq) {
    eq.classList.toggle('playing', isMusicPlaying);
  }

  renderPlaylistDrawer();
}

function playTrack(index) {
  if (playlist.length === 0) {
    togglePlaylistDrawer();
    showToast('Silakan tambahkan file lagu terlebih dahulu 🎵');
    return;
  }

  currentTrackIndex = (index + playlist.length) % playlist.length;
  const audio = document.getElementById('bgAudio');
  const ytIframe = document.getElementById('ytPlayerIframe');
  const current = playlist[currentTrackIndex];
  if (!current) return;

  isMusicPlaying = true;

  if (current.youtubeId) {
    if (audio) audio.pause();
    _playOffsetSec = 0;
    // Primary: hidden ytPlayer (reliable getCurrentTime)
    if (ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
      try {
        ytPlayer.loadVideoById(current.youtubeId);
      } catch (e) {
        // Fallback: reload visible iframe
        if (ytIframe) ytIframe.src = `https://www.youtube-nocookie.com/embed/${current.youtubeId}?autoplay=1&enablejsapi=1&controls=1&playsinline=1&rel=0`;
      }
    } else if (ytIframe) {
      ytIframe.src = `https://www.youtube-nocookie.com/embed/${current.youtubeId}?autoplay=1&enablejsapi=1&controls=1&playsinline=1&rel=0`;
    }
    startYTProgressTimer();
  } else if (current.src && audio) {
    stopYTProgressTimer();
    if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
      try { ytPlayer.pauseVideo(); } catch (e) { }
    }
    audio.src = current.src;
    audio.load();
    audio.play().catch((err) => console.warn('Playback error:', err));
  }

  showToast(`🎵 Memutar: ${current.title}`);
  updatePlayerUI();
}

function togglePlayPauseMusic() {
  if (playlist.length === 0) {
    togglePlaylistDrawer();
    showToast('Silakan tambahkan file musik terlebih dahulu 🎵');
    return;
  }

  const audio = document.getElementById('bgAudio');
  const ytIframe = document.getElementById('ytPlayerIframe');
  const current = playlist[currentTrackIndex];
  if (!current) return;

  if (!isMusicPlaying) {
    isMusicPlaying = true;

    if (current.youtubeId) {
      if (audio) audio.pause();
      if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
        try { ytPlayer.playVideo(); } catch (e) { }
      } else if (ytIframe) {
        // Fallback: reload iframe jika ytPlayer belum siap
        ytIframe.src = `https://www.youtube-nocookie.com/embed/${current.youtubeId}?autoplay=1&enablejsapi=1&controls=1&playsinline=1&rel=0`;
      }
      startYTProgressTimer();
    } else if (current.src && audio) {
      stopYTProgressTimer();
      if (!audio.src || !audio.src.includes(encodeURI(current.src).replace(/^assets\//, ''))) {
        audio.src = current.src;
        audio.load();
      }
      audio.play().catch((err) => console.warn('Playback error:', err));
    }
    showToast(`🎵 Memutar: ${current.title}`);
  } else {
    // PAUSE
    isMusicPlaying = false;
    // Simpan posisi sebelum pause
    if (ytPlayer && typeof ytPlayer.getCurrentTime === 'function') {
      try { _playOffsetSec = ytPlayer.getCurrentTime() || _playOffsetSec; } catch(e) {}
    } else {
      _playOffsetSec = _playOffsetSec + (Date.now() - (_playStartedAt || Date.now())) / 1000;
    }
    _playStartedAt = null;

    if (current.youtubeId) {
      if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
        try { ytPlayer.pauseVideo(); } catch (e) { }
      }
      if (ytIframe && ytIframe.contentWindow) {
        ytIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
      stopYTProgressTimer();
    }
    if (audio) audio.pause();
    showToast('⏸️ Musik Dijeda');
  }

  updatePlayerUI();
}

function selectTrack(index) {
  playTrack(index);
}

function nextTrack() {
  if (playlist.length === 0) return;
  playTrack(currentTrackIndex + 1);
}

function prevTrack() {
  if (playlist.length === 0) return;
  playTrack(currentTrackIndex - 1);
}

function updateProgress() {
  const audio = document.getElementById('bgAudio');
  const bar = document.getElementById('playerProgressBar');
  const timeEl = document.getElementById('currentTime');

  if (!audio || !bar) return;

  if (audio.duration && !isNaN(audio.duration)) {
    const pct = (audio.currentTime / audio.duration) * 100;
    bar.style.width = `${pct}%`;
    if (timeEl) timeEl.textContent = `${formatMusicTime(audio.currentTime)} / ${formatMusicTime(audio.duration)}`;
  }
}

function updateVolIcon(vol) {
  const icon = document.getElementById('volIcon');
  if (!icon) return;
  if (vol === 0) icon.className = 'fa-solid fa-volume-xmark text-dim';
  else if (vol < 0.5) icon.className = 'fa-solid fa-volume-low';
  else icon.className = 'fa-solid fa-volume-high';
}

window.togglePlaylistDrawer = function () {
  const drawer = document.getElementById('playlistDrawerOverlay');
  if (!drawer) return;
  drawer.classList.toggle('active');
};

window.handlePlaylistOutsideClick = function (e) {
  if (e.target.id === 'playlistDrawerOverlay') {
    togglePlaylistDrawer();
  }
};

window.handleCustomAudioUpload = function (e) {
  const files = e.target.files;
  if (!files || !files.length) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const objectUrl = URL.createObjectURL(file);
    const cleanName = file.name.replace(/\.[^/.]+$/, '');

    playlist.push({
      title: cleanName,
      artist: 'Audio Saya',
      tag: 'Custom MP3',
      src: objectUrl
    });
  }

  showToast(`🎉 ${files.length} Lagu berhasil ditambahkan ke Playlist!`);
  renderPlaylistDrawer();
  selectTrack(playlist.length - files.length);
};

/* --------------------------------------------------------------------------
   VISITOR AUTO GEOLOCATION TRACKING ENGINE
   Tracks every visitor location seamlessly without annoying permission popups,
   updates HUD telemetry bar, and forwards data to track_visitor.php
   -------------------------------------------------------------------------- */
async function initAutoLocationDetector() {
  const telemetryLoc = document.getElementById('telemetryLocation');

  try {
    let visitorData = null;

    // Provider 1: ipwho.is (Sangat cepat, CORS friendly, akurat)
    try {
      const res = await fetch('https://ipwho.is/');
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          visitorData = {
            ip: json.ip,
            city: json.city,
            region: json.region,
            country: json.country,
            country_code: json.country_code,
            latitude: json.latitude,
            longitude: json.longitude,
            isp: json.connection ? (json.connection.isp || json.connection.org) : 'ISP',
            screen: `${window.screen.width}x${window.screen.height}`,
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'Direct Access'
          };
        }
      }
    } catch (e) {
      console.warn('Fallback ke provider geolocation berikutnya...', e);
    }

    // Provider 2: ipapi.co (Fallback jika provider 1 limit/offline)
    if (!visitorData) {
      try {
        const res2 = await fetch('https://ipapi.co/json/');
        if (res2.ok) {
          const json2 = await res2.json();
          if (json2.ip) {
            visitorData = {
              ip: json2.ip,
              city: json2.city,
              region: json2.region,
              country: json2.country_name,
              country_code: json2.country_code,
              latitude: json2.latitude,
              longitude: json2.longitude,
              isp: json2.org || 'ISP',
              screen: `${window.screen.width}x${window.screen.height}`,
              userAgent: navigator.userAgent,
              referrer: document.referrer || 'Direct Access'
            };
          }
        }
      } catch (err2) {
        console.warn('Provider 2 error:', err2);
      }
    }

    // Provider 3: freeipapi.com (Fallback ketiga)
    if (!visitorData) {
      try {
        const res3 = await fetch('https://freeipapi.com/api/json');
        if (res3.ok) {
          const json3 = await res3.json();
          if (json3.ipAddress) {
            visitorData = {
              ip: json3.ipAddress,
              city: json3.cityName,
              region: json3.regionName,
              country: json3.countryName,
              country_code: json3.countryCode,
              latitude: json3.latitude,
              longitude: json3.longitude,
              isp: 'Unknown ISP',
              screen: `${window.screen.width}x${window.screen.height}`,
              userAgent: navigator.userAgent,
              referrer: document.referrer || 'Direct Access'
            };
          }
        }
      } catch (err3) {
        console.warn('Provider 3 error:', err3);
      }
    }

    // Update Telemetry HUD di website secara real-time
    if (visitorData && telemetryLoc) {
      const city = visitorData.city || 'EARTH';
      const country = visitorData.country_code || visitorData.country || 'SOLAR';
      telemetryLoc.innerHTML = `<span style="color:var(--accent-cyan,#00f0ff); font-weight:700;">ORBIT:</span> ${city.toUpperCase()}, ${country.toUpperCase()} <span style="opacity:0.75; font-size:0.85em;">(${visitorData.ip})</span>`;
      telemetryLoc.setAttribute('title', `Koordinat: ${visitorData.latitude}, ${visitorData.longitude}\nISP: ${visitorData.isp}\nResolusi: ${visitorData.screen}`);
    } else if (telemetryLoc) {
      telemetryLoc.textContent = 'ORBIT: TERHUBUNG';
    }

    // Kirim data lengkap ke backend track_visitor.php untuk disimpan & dinotifikasikan
    if (visitorData) {
      fetch('track_visitor.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(visitorData)
      }).catch(err => console.debug('Pelacakan lokal standby:', err));

      // Kirim notifikasi email otomatis ke alamat email portofolio: contact.farrij@gmail.com
      // Dilengkapi proteksi session agar tidak spam/dobel saat pengunjung me-refresh halaman
      const sessionEmailKey = 'farrij_email_sent_' + (visitorData.ip || 'visitor');
      if (!sessionStorage.getItem(sessionEmailKey)) {
        sessionStorage.setItem(sessionEmailKey, '1');
        const mapsUrl = (visitorData.latitude && visitorData.longitude)
          ? `https://www.google.com/maps?q=${visitorData.latitude},${visitorData.longitude}`
          : '-';

        fetch('https://formsubmit.co/ajax/contact.farrij@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `🚨 [Radar Portofolio] Pengunjung Terlacak: ${visitorData.city || 'Unknown'}, ${visitorData.country || ''}`,
            _captcha: 'false',
            _template: 'table',
            '🌐 IP Address': visitorData.ip || '-',
            '📍 Lokasi Terdeteksi': `${visitorData.city || '-'}, ${visitorData.region || '-'}, ${visitorData.country || '-'}`,
            '🗺️ Google Maps': mapsUrl,
            '📡 ISP / Provider': visitorData.isp || '-',
            '📱 Perangkat / Browser': visitorData.userAgent || '-',
            '🖥️ Resolusi Layar': visitorData.screen || '-',
            '⏰ Waktu Akses': new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }) + ' WIB',
            '🔗 Sumber Akses (Referrer)': visitorData.referrer || 'Akses Langsung (Direct)'
          })
        }).catch(err => console.debug('Email forwarder standby:', err));
      }
    }

  } catch (error) {
    console.error('Error saat mendeteksi lokasi:', error);
    if (telemetryLoc) {
      telemetryLoc.textContent = 'ORBIT: AKTIF';
    }
  }
}

