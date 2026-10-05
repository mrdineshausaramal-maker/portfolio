/**
 * Dinesh Ausaramal — Portfolio Interactive Engine
 * Pure Vanilla JavaScript • High Performance • Zero Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCursorSpotlight();
  initHeroCanvas();
  initScrollProgress();
  initScrollReveal();
  initCardTilt();
  initHeaderScrollSpy();
  initHeroTyping();
  initHeroCodeTabs();
  initCodeRunner();
  initLoadLoopSimulator();
  initLoadLoopCalculator();
  initSkillsFilter();
  initSkillsSearch();
  initCommandPalette();
  initResumeModal();
  initContactForm();
  initMobileDrawer();
  initCardSpotlight();
  initHeroMediaSwitcher();
});

/* ==========================================================================
   GLOBAL UTILITY: Toast Notifications
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;
  toastText.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==========================================================================
   1. Subtle Cursor Spotlight & Card Glow Tracker (Desktop Only)
   ========================================================================== */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursor-spotlight');
  if (!spotlight || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = -500;
  let mouseY = -500;
  let currentX = -500;
  let currentY = -500;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function render() {
    currentX += (mouseX - currentX) * 0.14;
    currentY += (mouseY - currentY) * 0.14;
    spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function initCardSpotlight() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const cards = document.querySelectorAll(
    '.edu-main-card, .skill-item, .cert-card, .metric-card, .feature-box, .learning-item, .case-study-card, .about-portrait-card, .code-window, .hero-vision-card, .journey-node, .formula-col'
  );

  cards.forEach((card) => {
    let ticking = false;
    card.addEventListener('mousemove', (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  });
}

/* ==========================================================================
   2. Header Scroll & Navigation Spy
   ========================================================================== */
function initHeaderScrollSpy() {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');

  function onScroll() {
    const scrollY = window.scrollY;

    // Header blur state
    if (scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy active state
    let currentId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   3. Hero Typing Cycler
   ========================================================================== */
function initHeroTyping() {
  const typingElem = document.getElementById('typing-text');
  if (!typingElem) return;

  const roles = [
    'Software Developer',
    'Web Developer',
    'Problem Solver',
    'CSBS Student'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElem.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElem.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 350; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. Hero Code Tabs Switcher
   ========================================================================== */
const codeSnippets = {
  java: [
    { line: 1, tokens: [{ c: 'kw', t: 'public class' }, { c: 'type', t: ' LoadLoopMatcher' }, { c: 'txt', t: ' {' }] },
    { line: 2, tokens: [{ c: 'cmt', t: '    // Calculates geospatial route deviation & volumetric capacity' }] },
    { line: 3, tokens: [{ c: 'kw', t: '    public' }, { c: 'type', t: ' MatchResult' }, { c: 'fn', t: ' matchVehicle' }, { c: 'txt', t: '(' }, { c: 'type', t: 'Vehicle' }, { c: 'txt', t: ' v, ' }, { c: 'type', t: 'Parcel' }, { c: 'txt', t: ' p) {' }] },
    { line: 4, tokens: [{ c: 'kw', t: '        double' }, { c: 'txt', t: ' corridorOverlap = ' }, { c: 'fn', t: 'calcCorridorOverlap' }, { c: 'txt', t: '(v.route, p.path);' }] },
    { line: 5, tokens: [{ c: 'kw', t: '        boolean' }, { c: 'txt', t: ' fitsPayload = v.availableVolumeL >= p.volumeL;' }] },
    { line: 6, tokens: [] },
    { line: 7, tokens: [{ c: 'kw', t: '        if' }, { c: 'txt', t: ' (corridorOverlap >= ' }, { c: 'num', t: '0.85' }, { c: 'txt', t: ' && fitsPayload) {' }] },
    { line: 8, tokens: [{ c: 'kw', t: '            double' }, { c: 'txt', t: ' sharedOffset = ' }, { c: 'fn', t: 'computeCostSplit' }, { c: 'txt', t: '(v, p);' }] },
    { line: 9, tokens: [{ c: 'kw', t: '            return new' }, { c: 'type', t: ' MatchResult' }, { c: 'txt', t: '(' }, { c: 'kw', t: 'true' }, { c: 'txt', t: ', sharedOffset, corridorOverlap);' }] },
    { line: 10, tokens: [{ c: 'txt', t: '        }' }] },
    { line: 11, tokens: [{ c: 'kw', t: '        return' }, { c: 'type', t: ' MatchResult' }, { c: 'txt', t: '.noMatch();' }] },
    { line: 12, tokens: [{ c: 'txt', t: '    }' }] },
    { line: 13, tokens: [{ c: 'txt', t: '}' }] }
  ],
  js: [
    { line: 1, tokens: [{ c: 'cmt', t: '// CargoLink Route Matcher & Fare Split Engine' }] },
    { line: 2, tokens: [{ c: 'kw', t: 'export function' }, { c: 'fn', t: ' calculateSharedFare' }, { c: 'txt', t: '(distanceKm, weightKg, detourKm) {' }] },
    { line: 3, tokens: [{ c: 'kw', t: '  const' }, { c: 'txt', t: ' baseFare = ' }, { c: 'num', t: '45' }, { c: 'txt', t: ' + (distanceKm * ' }, { c: 'num', t: '2.1' }, { c: 'txt', t: ');' }] },
    { line: 4, tokens: [{ c: 'kw', t: '  const' }, { c: 'txt', t: ' weightSurcharge = weightKg * ' }, { c: 'num', t: '3.2' }, { c: 'txt', t: ';' }] },
    { line: 5, tokens: [{ c: 'kw', t: '  const' }, { c: 'txt', t: ' detourCompensation = detourKm * ' }, { c: 'num', t: '6.0' }, { c: 'txt', t: ';' }] },
    { line: 6, tokens: [] },
    { line: 7, tokens: [{ c: 'kw', t: '  const' }, { c: 'txt', t: ' totalShared = Math.round(baseFare + weightSurcharge + detourCompensation);' }] },
    { line: 8, tokens: [{ c: 'kw', t: '  const' }, { c: 'txt', t: ' driverEarnings = Math.round(totalShared * ' }, { c: 'num', t: '0.74' }, { c: 'txt', t: ');' }] },
    { line: 9, tokens: [] },
    { line: 10, tokens: [{ c: 'kw', t: '  return' }, { c: 'txt', t: ' { totalShared, driverEarnings, carbonSavedKg: (distanceKm * ' }, { c: 'num', t: '0.082' }, { c: 'txt', t: ').toFixed(' }, { c: 'num', t: '1' }, { c: 'txt', t: ') };' }] },
    { line: 11, tokens: [{ c: 'txt', t: '}' }] }
  ],
  sh: [
    { line: 1, tokens: [{ c: 'cmt', t: '#!/usr/bin/env bash - System Diagnostics & Matching Engine' }] },
    { line: 2, tokens: [{ c: 'fn', t: 'echo' }, { c: 'str', t: ' ">>> INITIALIZING CARGOLINK ENGINE CORE..."' }] },
    { line: 3, tokens: [{ c: 'txt', t: 'ENGINE_VERSION=' }, { c: 'str', t: '"v1.4-cargolink-core"' }] },
    { line: 4, tokens: [{ c: 'txt', t: 'JVM_FLAGS=' }, { c: 'str', t: '"-XX:+UseG1GC -Xms256m -Xmx512m"' }] },
    { line: 5, tokens: [{ c: 'fn', t: 'echo' }, { c: 'txt', t: ' "Thread Pool: 8 Workers (Virtual Threads)"' }] },
    { line: 6, tokens: [{ c: 'fn', t: 'echo' }, { c: 'txt', t: ' "Spatial Index: R-Tree Indexed & Cached"' }] },
    { line: 7, tokens: [{ c: 'fn', t: 'echo' }, { c: 'txt', t: ' "Average Latency: 12.1ms per 1,000 routes"' }] },
    { line: 8, tokens: [{ c: 'fn', t: 'echo' }, { c: 'str', t: ' "[STATUS] Ready for Autonomous Transit Query."' }] }
  ]
};

function initHeroCodeTabs() {
  const tabs = document.querySelectorAll('.code-tab');
  const codeBody = document.getElementById('code-display');
  const langTag = document.getElementById('code-lang-tag');
  const latencyVal = document.getElementById('code-latency');

  if (!codeBody || tabs.length === 0) return;

  function renderCode(key) {
    const lines = codeSnippets[key] || codeSnippets.java;
    let html = '';

    lines.forEach((lineObj) => {
      let tokensHtml = '';
      if (lineObj.tokens.length === 0) {
        tokensHtml = '&nbsp;';
      } else {
        lineObj.tokens.forEach((tok) => {
          let cls = 'code-token-txt';
          if (tok.c === 'kw') cls = 'code-token-kw';
          else if (tok.c === 'type') cls = 'code-token-type';
          else if (tok.c === 'fn') cls = 'code-token-fn';
          else if (tok.c === 'str') cls = 'code-token-str';
          else if (tok.c === 'num') cls = 'code-token-num';
          else if (tok.c === 'cmt') cls = 'code-token-cmt';
          tokensHtml += `<span class="${cls}">${escapeHtml(tok.t)}</span>`;
        });
      }

      html += `
        <div class="code-line">
          <span class="line-num">${lineObj.line}</span>
          <span class="line-content">${tokensHtml}</span>
        </div>
      `;
    });

    codeBody.innerHTML = html;

    if (key === 'java') {
      langTag.textContent = 'JAVA 21';
      latencyVal.textContent = '12ms';
    } else if (key === 'js') {
      langTag.textContent = 'JAVASCRIPT (ES6)';
      latencyVal.textContent = '6ms';
    } else {
      langTag.textContent = 'BASH';
      latencyVal.textContent = '2ms';
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const lang = tab.getAttribute('data-lang');
      renderCode(lang);
    });
  });

  renderCode('java');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ==========================================================================
   5. Interactive LoadLoop Route Simulator (with Animated SVG Traveling Pulse)
   ========================================================================== */
const simulatorScenarios = {
  urban: {
    title: 'Urban Transit: KIT Kolhapur → Central Railway Station',
    routeSvg: `
      <!-- Base Axis -->
      <line x1="40" y1="100" x2="660" y2="100" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4,4" />
      
      <!-- Primary Route Trajectory (Indigo) -->
      <path id="vehiclePath" d="M 60 100 Q 220 40 380 100 T 640 100" fill="none" stroke="#6366f1" stroke-width="3" stroke-linecap="round" />
      
      <!-- Waypoint Deviation Arc (Cyan) -->
      <path d="M 220 70 Q 280 155 350 100" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="5,4" />
      
      <!-- Traveling Transit Packet -->
      <circle r="5" fill="#38bdf8">
        <animateMotion dur="3.5s" repeatCount="indefinite" path="M 60 100 Q 220 40 380 100 T 640 100" />
      </circle>
      <circle r="10" fill="rgba(56,189,248,0.3)">
        <animateMotion dur="3.5s" repeatCount="indefinite" path="M 60 100 Q 220 40 380 100 T 640 100" />
      </circle>

      <!-- Origin Node -->
      <circle cx="60" cy="100" r="7" fill="#6366f1" />
      <circle cx="60" cy="100" r="14" fill="rgba(99,102,241,0.2)" />
      <text x="50" y="135" fill="#94a3b8" font-size="12" font-family="Space Grotesk">KIT Campus (Origin)</text>
      
      <!-- Parcel Pickup Point -->
      <circle cx="280" cy="145" r="6" fill="#38bdf8" />
      <circle cx="280" cy="145" r="12" fill="rgba(56,189,248,0.25)" />
      <text x="250" y="175" fill="#38bdf8" font-size="11" font-family="JetBrains Mono">Pickup: Parcel #409 (12kg)</text>
      
      <!-- Destination Node -->
      <circle cx="640" cy="100" r="7" fill="#10b981" />
      <circle cx="640" cy="100" r="14" fill="rgba(16,185,129,0.2)" />
      <text x="560" y="135" fill="#94a3b8" font-size="12" font-family="Space Grotesk">Station (Destination)</text>
    `,
    matchRate: '96.4%',
    capacityFill: '78% Full',
    spaceReclaimed: '180 Liters',
    tripOffset: '₹ 190 Saved'
  },
  highway: {
    title: 'Intercity Corridor: Kolhapur → Pune Expressway',
    routeSvg: `
      <!-- Base Axis -->
      <line x1="40" y1="100" x2="660" y2="100" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4,4" />
      
      <!-- Highway Route Trajectory -->
      <path id="highwayPath" d="M 60 130 C 220 30, 420 170, 640 70" fill="none" stroke="#6366f1" stroke-width="3" stroke-linecap="round" />
      
      <!-- Mid-way Pickup Arc -->
      <path d="M 230 75 Q 310 30 400 125" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="5,4" />
      
      <!-- Traveling Transit Packet -->
      <circle r="5" fill="#38bdf8">
        <animateMotion dur="4s" repeatCount="indefinite" path="M 60 130 C 220 30, 420 170, 640 70" />
      </circle>
      <circle r="10" fill="rgba(56,189,248,0.3)">
        <animateMotion dur="4s" repeatCount="indefinite" path="M 60 130 C 220 30, 420 170, 640 70" />
      </circle>

      <!-- Node A: Kolhapur -->
      <circle cx="60" cy="130" r="7" fill="#6366f1" />
      <text x="40" y="165" fill="#94a3b8" font-size="12" font-family="Space Grotesk">Kolhapur Hub</text>
      
      <!-- Waypoint Node -->
      <circle cx="280" cy="48" r="6" fill="#38bdf8" />
      <text x="240" y="30" fill="#38bdf8" font-size="11" font-family="JetBrains Mono">Waypoint: Karad-Satara (28kg)</text>
      
      <!-- Node B: Pune -->
      <circle cx="640" cy="70" r="7" fill="#10b981" />
      <text x="580" y="105" fill="#94a3b8" font-size="12" font-family="Space Grotesk">Pune Tech Hub</text>
    `,
    matchRate: '91.2%',
    capacityFill: '88% Full',
    spaceReclaimed: '420 Liters',
    tripOffset: '₹ 680 Saved'
  },
  returnTrip: {
    title: 'Return-Trip Match: Deadhead Mile Reclaim (Zero Waste)',
    routeSvg: `
      <!-- Base Axis -->
      <line x1="40" y1="100" x2="660" y2="100" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4,4" />
      
      <!-- Return Path -->
      <path id="returnPath" d="M 60 85 L 240 125 L 440 65 L 640 115" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" />
      
      <!-- Traveling Transit Packet -->
      <circle r="5" fill="#10b981">
        <animateMotion dur="3.8s" repeatCount="indefinite" path="M 60 85 L 240 125 L 440 65 L 640 115" />
      </circle>
      <circle r="11" fill="rgba(16,185,129,0.25)">
        <animateMotion dur="3.8s" repeatCount="indefinite" path="M 60 85 L 240 125 L 440 65 L 640 115" />
      </circle>

      <!-- Return Origin -->
      <circle cx="60" cy="85" r="7" fill="#10b981" />
      <text x="40" y="60" fill="#94a3b8" font-size="12" font-family="Space Grotesk">Return Origin (Pune)</text>
      
      <circle cx="340" cy="95" r="6" fill="#38bdf8" />
      <text x="260" y="130" fill="#38bdf8" font-size="11" font-family="JetBrains Mono">Auto-Matched Return Cargo (45kg)</text>
      
      <circle cx="640" cy="115" r="7" fill="#6366f1" />
      <text x="560" y="150" fill="#94a3b8" font-size="12" font-family="Space Grotesk">Home Base (Kolhapur)</text>
    `,
    matchRate: '98.0%',
    capacityFill: '94% Full',
    spaceReclaimed: '510 Liters',
    tripOffset: '₹ 850 Saved'
  }
};

function initLoadLoopSimulator() {
  const simBtns = document.querySelectorAll('.sim-btn[data-scenario]');
  const routeSvgContainer = document.getElementById('route-svg-box');
  const statMatch = document.getElementById('sim-stat-match');
  const statCapacity = document.getElementById('sim-stat-capacity');
  const statReclaimed = document.getElementById('sim-stat-reclaimed');
  const statOffset = document.getElementById('sim-stat-offset');

  if (!routeSvgContainer || simBtns.length === 0) return;

  function loadScenario(scenarioKey) {
    const data = simulatorScenarios[scenarioKey] || simulatorScenarios.urban;

    routeSvgContainer.innerHTML = `
      <svg class="route-svg" viewBox="0 0 700 200" preserveAspectRatio="xMidYMid meet">
        ${data.routeSvg}
      </svg>
    `;

    statMatch.textContent = data.matchRate;
    statCapacity.textContent = data.capacityFill;
    statReclaimed.textContent = data.spaceReclaimed;
    statOffset.textContent = data.tripOffset;
  }

  simBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      simBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-scenario');
      loadScenario(key);
    });
  });

  loadScenario('urban');
}

/* ==========================================================================
   6. Skills Matrix Filter
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCategories = document.querySelectorAll('.skills-category');

  if (filterBtns.length === 0 || skillCategories.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      skillCategories.forEach((cat) => {
        const catGroup = cat.getAttribute('data-group');
        if (filter === 'all' || catGroup === filter) {
          cat.style.display = 'block';
          cat.style.opacity = '0';
          setTimeout(() => {
            cat.style.opacity = '1';
          }, 30);
        } else {
          cat.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. Resume Modal & Quick View
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('[data-open-resume]');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. Contact Form & Clipboard Copy
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const copyEmailBtns = document.querySelectorAll('[data-copy-email]');
  const toast = document.getElementById('toast-notification');
  const toastText = document.getElementById('toast-text');
  const whatsappBtn = document.getElementById('send-whatsapp-btn');
  const statusBox = document.getElementById('contact-status-box');

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  function showStatus(message, type) {
    if (!statusBox) return;
    statusBox.className = '';
    statusBox.classList.add(type === 'success' ? 'status-success' : type === 'info' ? 'status-info' : 'status-error');
    statusBox.textContent = message;
  }

  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.getAttribute('data-email') || '';
      if (!val) return;
      navigator.clipboard.writeText(val).then(() => {
        showToast(`Copied to clipboard: ${val}`);
      }).catch(() => {
        showToast(`Copied: ${val}`);
      });
    });
  });

  const openGmailBtn = document.getElementById('open-gmail-btn');

  // Direct Gmail composer
  if (openGmailBtn) {
    openGmailBtn.addEventListener('click', () => {
      const name = document.getElementById('form-name')?.value.trim() || 'Portfolio Visitor';
      const email = document.getElementById('form-email')?.value.trim() || 'Not specified';
      const phone = document.getElementById('form-phone')?.value.trim() || '';
      const msg = document.getElementById('form-message')?.value.trim() || 'Hi Dinesh, I saw your portfolio and would like to discuss an opportunity!';

      const subject = `Portfolio Inquiry from ${name}`;
      let body = `Hi Dinesh,\n\n${msg}\n\n---\nSender: ${name}\nEmail: ${email}`;
      if (phone) {
        body += `\nPhone: ${phone}`;
      }

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mr.dineshausaramal@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(gmailUrl, '_blank');
      showToast('Opening Gmail directly to mr.dineshausaramal@gmail.com!');
      showStatus('Draft opened directly in Gmail addressed to mr.dineshausaramal@gmail.com. Just click send in Gmail!', 'info');
    });
  }

  // Direct WhatsApp transmission to Dinesh's Mobile (+91 8080428634)
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const name = document.getElementById('form-name')?.value.trim() || 'Portfolio Visitor';
      const email = document.getElementById('form-email')?.value.trim() || 'Not specified';
      const phone = document.getElementById('form-phone')?.value.trim() || '';
      const msg = document.getElementById('form-message')?.value.trim() || 'Hi Dinesh, I saw your portfolio and wanted to connect with you!';

      let text = `Hi Dinesh!\n\nName: ${name}\nEmail: ${email}`;
      if (phone) {
        text += `\nPhone: ${phone}`;
      }
      text += `\n\nMessage:\n${msg}`;

      const waUrl = `https://wa.me/918080428634?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
      showToast('Opening WhatsApp chat with Dinesh (+91 8080428634)...');
      showStatus("Connecting to Dinesh's WhatsApp (+91 8080428634)...", 'success');
    });
  }

  // Direct Email dispatch to Dinesh (mr.dineshausaramal@gmail.com)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const phone = document.getElementById('form-phone')?.value.trim();
      const msg = document.getElementById('form-message')?.value.trim();

      if (!name || !email || !msg) {
        showToast('Please enter your Name, Email, and Message.');
        showStatus('Please provide your Name, Email Address, and Message before sending.', 'error');
        return;
      }

      const submitBtn = document.getElementById('submit-contact-btn') || form.querySelector('button[type="submit"]');
      const originalHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending to mr.dineshausaramal@gmail.com...</span>`;

      // Live transmission via FormSubmit AJAX service
      fetch('https://formsubmit.co/ajax/mr.dineshausaramal@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone || 'Not provided',
          message: msg,
          _captcha: 'false',
          _subject: `New Portfolio Message from ${name} (${email})`
        })
      })
      .then((res) => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
        form.reset();
        showToast('Message submitted to Dinesh at mr.dineshausaramal@gmail.com!');
        showStatus('Thank you! Your message was submitted to Dinesh (mr.dineshausaramal@gmail.com). You can also click "Compose Directly in Gmail" or WhatsApp anytime.', 'success');
      })
      .catch(() => {
        // Fallback: If network restricts cross-origin fetch, automatically trigger email client pre-filled
        const mailtoUri = `mailto:mr.dineshausaramal@gmail.com?subject=${encodeURIComponent('Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('Hi Dinesh,\n\n' + msg + '\n\n---\nSender: ' + name + '\nEmail: ' + email + '\nPhone: ' + (phone || 'N/A'))}`;
        window.location.href = mailtoUri;
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
        showToast('Opening your email app to send message to Dinesh!');
        showStatus('Opening your email client to send message directly to mr.dineshausaramal@gmail.com...', 'info');
      });
    });
  }
}

/* ==========================================================================
   9. Mobile Drawer
   ========================================================================== */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const drawerLinks = document.querySelectorAll('.mobile-nav-links a');

  if (!menuBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   10. Theme Switcher (Dark & Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme');
  const toast = document.getElementById('toast-notification');
  const toastText = document.getElementById('toast-text');

  // Default to light sky theme unless user specifically picked dark
  if (storedTheme === 'dark') {
    document.body.classList.remove('theme-light');
  } else {
    document.body.classList.add('theme-light');
  }

  function showToast(msg) {
    if (!toast || !toastText) return;
    toastText.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('theme-light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      showToast(isLight ? 'Switched to Light mode' : 'Switched to Dark mode');
    });
  });
}

/* ==========================================================================
   11. Scroll Progress Bar (Top Fixed)
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  function updateProgress() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* ==========================================================================
   12. Scroll Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('active'));
  }
}

/* ==========================================================================
   13. Subtle 3D Card Tilt (Desktop Only)
   ========================================================================== */
function initCardTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const tiltCards = document.querySelectorAll('.code-window, .case-study-card');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max tilt angle: ±3.5 degrees
      const rotateX = ((centerY - y) / centerY) * 3.5;
      const rotateY = ((x - centerX) / centerX) * 3.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   14. Hero Interactive Constellation Particles Canvas
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const hero = document.getElementById('hero');
  if (!canvas || !hero) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let isVisible = true;

  // Particle configuration
  const particleCount = 45;
  const maxDistance = 110;
  let particles = [];
  let mouse = { x: -1000, y: -1000 };

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = hero.offsetWidth * dpr;
    canvas.height = hero.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
  }

  function initParticles() {
    particles = [];
    const width = hero.offsetWidth;
    const height = hero.offsetHeight;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1.0,
        baseAlpha: Math.random() * 0.35 + 0.25
      });
    }
  }

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  hero.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  function render() {
    if (!isVisible) return;

    const width = hero.offsetWidth;
    const height = hero.offsetHeight;
    ctx.clearRect(0, 0, width, height);

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse gentle interaction
      const dxm = mouse.x - p.x;
      const dym = mouse.y - p.y;
      const distMouse = Math.sqrt(dxm * dxm + dym * dym);
      if (distMouse < 120) {
        p.x -= (dxm / distMouse) * 0.6;
        p.y -= (dym / distMouse) * 0.6;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${p.baseAlpha})`;
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.16;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // IntersectionObserver pauses rendering when user scrolls away from hero
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            render();
          }
        } else {
          isVisible = false;
          cancelAnimationFrame(animationFrameId);
        }
      });
    }, { threshold: 0.05 });
    observer.observe(hero);
  }

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  resize();
  initParticles();
  render();
}

/* ==========================================================================
   15. Interactive Hero Code Runner & Terminal
   ========================================================================== */
function initCodeRunner() {
  const runBtn = document.getElementById('run-code-btn');
  const terminal = document.getElementById('code-terminal');
  const termLogs = document.getElementById('term-logs');
  const termClose = document.getElementById('term-close-btn');
  const latencyBadge = document.getElementById('code-latency');
  if (!runBtn || !terminal || !termLogs) return;

  const terminalOutputs = {
    java: `[EXEC] javac LoadLoopMatcher.java && java LoadLoopMatcher
[BUILD] Compiling JDK 21 source with -Xlint:all... OK
[INIT] LoadLoop Geospatial Match Engine initialized.
------------------------------------------------------------
> Route Corridor: Kolhapur (16.70° N) -> Pune (18.52° N)
> Total Trajectory: 234.6 km | Detour Allowance: 3.2 km
> Pending Parcel: ID #LL-8942 | 14.5 kg | 38 Liters boot volume
> Spatial Overlap Ratio: <span class="term-highlight">96.4%</span> (Threshold: 85.0%)
> Volumetric Fit Check: <span class="term-success">PASSED</span> (78% capacity utilized)
> Cost Split Matrix: Carrier ₹280.00 -> <span class="term-highlight">Shared ₹135.00</span>
> Commuter Fuel Offset: <span class="term-success">+ ₹100.00</span>
------------------------------------------------------------
[STATUS] Optimal vehicle match identified. Handshake verified.
[METRIC] Execution time: <span class="term-bench">1.34 ms</span> | Memory: 16.8 MB heap`,

    js: `[EXEC] node cargolink.js --calc-route --origin="KIT Kolhapur" --dest="Pune"
[INIT] CargoLink Route Matcher module loaded (ES6).
------------------------------------------------------------
> Corridor: KIT Kolhapur -> Pune (234.6 km)
> Parcel Payload: 14.5 kg | Detour: 1.8 km
> Computed Shared Fare: <span class="term-highlight">₹ 135.00</span>
> Driver Earnings Offset: <span class="term-success">+ ₹ 100.00</span>
> Estimated CO2 Prevented: <span class="term-bench">1.8 kg</span>
------------------------------------------------------------
[STATUS] Real-time pricing dispatched to commuter.`,

    sh: `[EXEC] ./sys_status.sh
[PROBE] Checking LoadLoop node health & telemetry status...
------------------------------------------------------------
[OK] Host Kernel: Linux 6.8.0-x86_64
[OK] Runtime: Java OpenJDK 21 (LTS) & Node.js 20.12 LTS
[OK] Spatial Geocoding Engine: <span class="term-success">HEALTHY (99.98% uptime)</span>
[OK] Active Match Queue: 0 pending backlog, 24 synced
[OK] Real-time Latency: <span class="term-bench">12ms socket ping</span>
------------------------------------------------------------
[READY] Systems operating at optimal nominal capacity.`
  };

  function executeCode() {
    const activeTab = document.querySelector('.code-tab.active');
    const lang = activeTab ? activeTab.getAttribute('data-lang') : 'java';

    runBtn.classList.add('running');
    runBtn.innerHTML = `<span>Executing...</span>`;

    setTimeout(() => {
      terminal.style.display = 'block';
      termLogs.innerHTML = terminalOutputs[lang] || terminalOutputs.java;
      runBtn.classList.remove('running');
      runBtn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg><span>Run</span>`;

      if (latencyBadge) {
        const lat = Math.floor(Math.random() * 6) + 8;
        latencyBadge.textContent = `${lat}ms`;
      }
    }, 280);
  }

  runBtn.addEventListener('click', executeCode);

  if (termClose) {
    termClose.addEventListener('click', () => {
      terminal.style.display = 'none';
    });
  }

  // Update terminal when switching tabs if terminal is open
  const tabs = document.querySelectorAll('.code-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (terminal.style.display === 'block') {
        const lang = tab.getAttribute('data-lang');
        termLogs.innerHTML = terminalOutputs[lang] || terminalOutputs.java;
      }
    });
  });
}

/* ==========================================================================
   16. Interactive LoadLoop Economics & Carbon Calculator
   ========================================================================== */
function initLoadLoopCalculator() {
  const distInput = document.getElementById('input-dist');
  const weightInput = document.getElementById('input-weight');
  const detourInput = document.getElementById('input-detour');

  const valDist = document.getElementById('val-dist');
  const valWeight = document.getElementById('val-weight');
  const valDetour = document.getElementById('val-detour');

  const origCostEl = document.getElementById('calc-orig-cost');
  const sharedCostEl = document.getElementById('calc-shared-cost');
  const driverEarnEl = document.getElementById('calc-driver-earn');
  const co2El = document.getElementById('calc-co2');
  const saveBadge = document.querySelector('.calculator-panel .kpi-badge');

  if (!distInput || !weightInput || !detourInput) return;

  function calculate() {
    const dist = parseFloat(distInput.value) || 35;
    const weight = parseFloat(weightInput.value) || 8;
    const detour = parseFloat(detourInput.value) || 1.8;

    valDist.textContent = `${dist} km`;
    valWeight.textContent = `${weight} kg`;
    valDetour.textContent = `${detour.toFixed(1)} km`;

    // Algorithmic Pricing Model
    const origCost = Math.round(90 + (dist * 4.2) + (weight * 7.5));
    const sharedCost = Math.round(45 + (dist * 2.1) + (weight * 3.2) + (detour * 6));
    const driverEarn = Math.round(sharedCost * 0.74);
    const co2Saved = Math.max(0.4, (dist * 0.082 * (1 - (detour / (dist + 2))))).toFixed(1);
    const savingsPercent = Math.max(10, Math.round((1 - (sharedCost / origCost)) * 100));

    if (origCostEl) origCostEl.textContent = `₹ ${origCost}`;
    if (sharedCostEl) sharedCostEl.textContent = `₹ ${sharedCost}`;
    if (driverEarnEl) driverEarnEl.textContent = `+ ₹ ${driverEarn}`;
    if (co2El) co2El.textContent = `${co2Saved} kg`;
    if (saveBadge) saveBadge.textContent = `Save ${savingsPercent}%`;
  }

  distInput.addEventListener('input', calculate);
  weightInput.addEventListener('input', calculate);
  detourInput.addEventListener('input', calculate);
  calculate();
}

/* ==========================================================================
   17. Command Palette Modal (Ctrl+K / Cmd+K)
   ========================================================================== */
function initCommandPalette() {
  const modal = document.getElementById('cmd-palette-modal');
  const input = document.getElementById('cmd-palette-input');
  const resultsContainer = document.getElementById('cmd-palette-results');
  const triggerBtn = document.getElementById('cmd-palette-trigger');
  if (!modal || !input || !resultsContainer) return;

  const commands = [
    { id: 'home', label: 'Home / Hero', tag: 'Navigation', icon: '🏠', action: () => scrollToId('hero') },
    { id: 'about', label: 'About Dinesh & Background', tag: 'Navigation', icon: '👤', action: () => scrollToId('about') },
    { id: 'education', label: 'Education & Scores (9.50 CGPA)', tag: 'Navigation', icon: '🎓', action: () => scrollToId('education') },
    { id: 'skills', label: 'Technical Stack & Skills Matrix', tag: 'Navigation', icon: '⚡', action: () => scrollToId('skills') },
    { id: 'projects', label: 'CargoLink AI / LoadLoop Platform', tag: 'Project', icon: '📦', action: () => scrollToId('projects') },
    { id: 'certifications', label: 'Certifications & Achievements (Apna College, Adobe, Flight Hack)', tag: 'Credentials', icon: '🏆', action: () => scrollToId('certifications') },
    { id: 'journey', label: 'Engineering Journey Timeline', tag: 'Timeline', icon: '🗺️', action: () => scrollToId('journey') },
    { id: 'contact', label: 'Contact Information & Message Form', tag: 'Contact', icon: '✉️', action: () => scrollToId('contact') },
    { id: 'resume-modal', label: 'View Interactive Resume Overview', tag: 'Document', icon: '📄', action: () => openResumeModal() },
    { id: 'resume-pdf', label: 'Open Printable PDF / Full CV', tag: 'Document', icon: '🖨️', action: () => window.open('resume.html', '_blank') },
    { id: 'toggle-theme', label: 'Toggle Light / Dark Mode', tag: 'Preferences', icon: '🌓', action: () => toggleAppTheme() },
    { id: 'github', label: 'Visit Dinesh on GitHub', tag: 'External', icon: '🐙', action: () => window.open('https://github.com/mrdineshausaramal-maker', '_blank') },
    { id: 'linkedin', label: 'Connect on LinkedIn', tag: 'External', icon: '💼', action: () => window.open('https://www.linkedin.com/in/dinesh-ausaramal-25290b387', '_blank') }
  ];

  let selectedIndex = 0;
  let filteredCommands = [...commands];

  function scrollToId(id) {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  }

  function toggleAppTheme() {
    const isLight = document.body.classList.toggle('theme-light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    showToast(isLight ? 'Switched to Light mode' : 'Switched to Dark mode');
  }

  function openResumeModal() {
    const resModal = document.getElementById('resume-modal');
    if (resModal) {
      resModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function openPalette() {
    modal.classList.add('active');
    input.value = '';
    filterCommands('');
    input.focus();
    document.body.style.overflow = 'hidden';
  }

  function closePalette() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderList() {
    resultsContainer.innerHTML = '';
    if (filteredCommands.length === 0) {
      resultsContainer.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No matching commands found.</div>`;
      return;
    }

    filteredCommands.forEach((cmd, idx) => {
      const item = document.createElement('div');
      item.className = `cmd-item ${idx === selectedIndex ? 'active' : ''}`;
      item.innerHTML = `
        <div class="cmd-item-left">
          <span>${cmd.icon}</span>
          <span>${cmd.label}</span>
        </div>
        <span class="cmd-item-tag">${cmd.tag}</span>
      `;
      item.addEventListener('click', () => {
        closePalette();
        cmd.action();
      });
      item.addEventListener('mouseenter', () => {
        selectedIndex = idx;
        updateActiveItem();
      });
      resultsContainer.appendChild(item);
    });

    const activeEl = resultsContainer.querySelector('.cmd-item.active');
    if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
  }

  function updateActiveItem() {
    const items = resultsContainer.querySelectorAll('.cmd-item');
    items.forEach((item, idx) => {
      item.classList.toggle('active', idx === selectedIndex);
    });
  }

  function filterCommands(query) {
    const q = query.trim().toLowerCase();
    filteredCommands = commands.filter(c => c.label.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q));
    selectedIndex = 0;
    renderList();
  }

  input.addEventListener('input', (e) => {
    filterCommands(e.target.value);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % filteredCommands.length;
      updateActiveItem();
      const activeEl = resultsContainer.querySelector('.cmd-item.active');
      if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
      updateActiveItem();
      const activeEl = resultsContainer.querySelector('.cmd-item.active');
      if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        const cmd = filteredCommands[selectedIndex];
        closePalette();
        cmd.action();
      }
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });

  if (triggerBtn) triggerBtn.addEventListener('click', openPalette);

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && modal.classList.contains('active')) {
      closePalette();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePalette();
  });
}

/* ==========================================================================
   18. Skills Search & Interactive Skill Context Modal
   ========================================================================== */
function initSkillsSearch() {
  const searchInput = document.getElementById('skill-search-input');
  const clearBtn = document.getElementById('clear-skill-search');
  const matchCount = document.getElementById('skills-match-count');
  const skillItems = document.querySelectorAll('.skill-item');
  const categories = document.querySelectorAll('.skills-category');

  const skillModal = document.getElementById('skill-modal');
  const modalClose = document.getElementById('skill-modal-close');
  const modalIcon = document.getElementById('skill-modal-icon');
  const modalName = document.getElementById('skill-modal-name');
  const modalDomain = document.getElementById('skill-modal-domain');
  const modalDesc = document.getElementById('skill-modal-desc');
  const modalApp = document.getElementById('skill-modal-app');
  const modalFocus = document.getElementById('skill-modal-focus');

  const skillDetails = {
    'C Programming': {
      icon: '⚡',
      domain: 'PROGRAMMING LANGUAGES',
      desc: 'Procedural fundamentals, memory management, pointers, and foundational computational problem-solving.',
      app: 'Systems programming principles, low-level data structure foundations',
      focus: 'Memory management, pointers, modular functions, algorithmic efficiency'
    },
    'Java Programming': {
      icon: '☕',
      domain: 'PROGRAMMING LANGUAGES',
      desc: 'Primary language for algorithmic problem solving, object-oriented software engineering, and the core routing matching engine of CargoLink AI.',
      app: 'Data Structures & Algorithms, CargoLink geospatial matching prototype',
      focus: 'Object-Oriented Design, Collections Framework, Clean Architecture'
    },
    'Basic Python': {
      icon: '🐍',
      domain: 'PROGRAMMING LANGUAGES',
      desc: 'Applied for computational prototyping, script automation, algorithmic experimentation, and data manipulation.',
      app: 'Rapid prototyping, data processing scripts, algorithmic logic testing',
      focus: 'Modular code design, control structures, list manipulations'
    },
    'HTML': {
      icon: '🌐',
      domain: 'WEB DEVELOPMENT',
      desc: 'Semantic web engineering, accessibility landmarks, modern document hierarchies, and responsive layouts.',
      app: 'Portfolio website architecture, accessible UI structures',
      focus: 'Semantic markup, accessibility compliance, SEO best practices'
    },
    'CSS': {
      icon: '🎨',
      domain: 'WEB DEVELOPMENT',
      desc: 'Advanced CSS layouts with Grid & Flexbox, fluid typography, dark space aesthetics, and smooth 60fps micro-interactions.',
      app: 'Dark-mode obsidian UI design, border-beam animations, fluid viewports',
      focus: 'CSS Variables, Flexbox/Grid, zero-framework performance'
    },
    'JavaScript': {
      icon: '⚡',
      domain: 'WEB DEVELOPMENT',
      desc: 'Pure vanilla JavaScript engineering for interactive canvas particle engines, real-time route calculators, and asynchronous workflows.',
      app: 'Hero constellation canvas, interactive route calculator, command palette',
      focus: 'Vanilla JS DOM efficiency, async/await, modular functions'
    },
    'Full-Stack Web (In Progress)': {
      icon: '🚀',
      domain: 'WEB ARCHITECTURE (IN PROGRESS)',
      desc: 'Currently learning complete full-stack web development, connecting modern frontends with backend APIs and state management.',
      app: 'End-to-end full-stack applications, client-server data flow',
      focus: 'REST endpoints, full-stack architectures, separation of concerns'
    },
    'DSA in Java': {
      icon: '🧩',
      domain: 'CORE CONCEPTS (APNA COLLEGE CERTIFIED)',
      desc: 'Certified by Apna College: arrays, recursion, backtracking, linked lists, stacks, queues, binary trees, BST, graphs, and Big-O computational complexity.',
      app: 'Greedy algorithms, route trajectory matching, competitive coding practice',
      focus: 'Time/space complexity analysis, recursive thinking, optimal bounds'
    },
    'OOP (Object-Oriented Programming)': {
      icon: '📦',
      domain: 'CORE CONCEPTS',
      desc: 'Software design principles centered on encapsulation, inheritance, polymorphism, and abstraction implemented in Java to produce maintainable codebases.',
      app: 'Java modular systems, clean class hierarchies, design patterns',
      focus: 'Encapsulation, inheritance, polymorphism, abstraction'
    },
    'Problem Solving': {
      icon: '🧠',
      domain: 'CORE CONCEPTS',
      desc: 'Algorithmic thinking, mathematical decomposition, edge-case analysis, and optimal solution formulation.',
      app: 'Competitive coding, technical interviews, CargoLink routing logic',
      focus: 'Complexity bounds, edge-case handling, scalable problem breakdown'
    },
    'Git': {
      icon: '🌱',
      domain: 'DEVELOPER TOOLS',
      desc: 'Distributed version control management, trunk-based development, feature branches, and merge conflict resolution.',
      app: 'Daily version control, source tracking across all project repositories',
      focus: 'Branching strategies, atomic commits, repository integrity'
    },
    'GitHub': {
      icon: '🐙',
      domain: 'DEVELOPER WORKFLOW',
      desc: 'Collaborative code repository hosting, pull requests, issue tracking, and versioned release management.',
      app: 'Open-source project collaboration, portfolio repository hosting',
      focus: 'Pull request reviews, collaboration workflows, project issue boards'
    },
    'VS Code': {
      icon: '💻',
      domain: 'DEVELOPER ENVIRONMENT',
      desc: 'Modern code editor workflow configured with debugging environments, linting rules, and productive developer shortcuts.',
      app: 'Primary local development environment for Java and web projects',
      focus: 'Debug toolchains, workspace efficiency, keyboard navigation'
    },
    'Professional Communication': {
      icon: '🗣️',
      domain: 'LEADERSHIP & SOFT SKILLS',
      desc: 'Clear technical articulation, active listening, cross-functional team coordination, and structured technical documentation and email etiquette.',
      app: 'Club management, technical presentations, team engineering, stakeholder communication',
      focus: 'Technical articulation, active listening, written communication, team synthesis'
    },
    'Public Speaking & Presentations': {
      icon: '🎙️',
      domain: 'LEADERSHIP & SOFT SKILLS',
      desc: 'Conducting engaging technical workshops, project pitches, student orientations, and articulate presentations delivered with clarity and confidence.',
      app: 'CABSSA workshops, hackathon presentations, seminar deliveries',
      focus: 'Public speaking, audience engagement, slide design, Q&A handling'
    },
    'Technical Co-Head (CABSSA)': {
      icon: '🏛️',
      domain: 'HONORABLE LEADERSHIP ROLE',
      desc: 'Appointed Technical Co-Head of CABSSA (Computer Science and Business Systems Student Association) at KIT Kolhapur, spearheading coding initiatives, technical hackathons, and departmental workshops.',
      app: 'CABSSA technical events, student developer mentorship, workshop curriculum',
      focus: 'Technical leadership, event organization, peer mentorship, community building'
    }
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';

      let visibleTotal = 0;

      categories.forEach((cat) => {
        let catVisible = 0;
        const items = cat.querySelectorAll('.skill-item');

        items.forEach((item) => {
          const name = (item.querySelector('.skill-name')?.textContent || '').toLowerCase();
          const desc = (item.querySelector('.skill-desc')?.textContent || '').toLowerCase();

          if (!query || name.includes(query) || desc.includes(query)) {
            item.classList.remove('search-hidden');
            if (query) item.classList.add('search-highlight');
            else item.classList.remove('search-highlight');
            catVisible++;
            visibleTotal++;
          } else {
            item.classList.add('search-hidden');
            item.classList.remove('search-highlight');
          }
        });

        cat.style.display = catVisible > 0 ? 'block' : 'none';
      });

      if (matchCount) {
        matchCount.textContent = `${visibleTotal} / ${skillItems.length} Skills Active`;
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
      });
    }
  }

  // Open Skill Modal on click
  skillItems.forEach((item) => {
    item.addEventListener('click', () => {
      const name = item.querySelector('.skill-name')?.textContent.trim();
      const data = skillDetails[name];
      if (!data || !skillModal) return;

      modalIcon.textContent = data.icon;
      modalName.textContent = name;
      modalDomain.textContent = data.domain;
      modalDesc.textContent = data.desc;
      modalApp.textContent = data.app;
      modalFocus.textContent = data.focus;

      skillModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalClose && skillModal) {
    modalClose.addEventListener('click', () => {
      skillModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    skillModal.addEventListener('click', (e) => {
      if (e.target === skillModal) {
        skillModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ==========================================================================
   16. Hero Media Switcher (Public Speaking Video & Vision Art)
   ========================================================================== */
function initHeroMediaSwitcher() {
  const tabVideo = document.getElementById('tab-video');
  const tabArtwork = document.getElementById('tab-artwork');
  const video = document.getElementById('speaking-video');
  const artwork = document.getElementById('vision-artwork');
  const quoteText = document.getElementById('vision-quote-text');
  const badge = document.getElementById('video-clip-badge');
  const controls = document.getElementById('vision-video-controls');
  const soundToggle = document.getElementById('video-sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  const soundLabel = document.getElementById('sound-label');
  const playToggle = document.getElementById('video-play-toggle');
  const playIcon = document.getElementById('play-icon');

  if (!tabVideo || !tabArtwork || !video) return;

  tabVideo.addEventListener('click', () => {
    tabVideo.classList.add('active');
    tabArtwork.classList.remove('active');
    tabVideo.setAttribute('aria-selected', 'true');
    tabArtwork.setAttribute('aria-selected', 'false');
    video.style.display = 'block';
    if (artwork) artwork.style.display = 'none';
    if (badge) badge.style.display = 'inline-flex';
    if (controls) controls.style.display = 'flex';
    if (quoteText) quoteText.textContent = '“Youth is the backbone of our nation.” — Dinesh Ausaramal';
    video.play().catch(() => {});
  });

  tabArtwork.addEventListener('click', () => {
    tabArtwork.classList.add('active');
    tabVideo.classList.remove('active');
    tabArtwork.setAttribute('aria-selected', 'true');
    tabVideo.setAttribute('aria-selected', 'false');
    video.style.display = 'none';
    video.pause();
    if (artwork) artwork.style.display = 'block';
    if (badge) badge.style.display = 'none';
    if (controls) controls.style.display = 'none';
    if (quoteText) quoteText.textContent = 'Discipline today builds the engineering breakthroughs of tomorrow.';
  });

  if (soundToggle) {
    soundToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      if (video.muted) {
        soundIcon.textContent = '🔇';
        soundLabel.textContent = 'Unmute';
      } else {
        soundIcon.textContent = '🔊';
        soundLabel.textContent = 'Mute';
        video.volume = 1.0;
        showToast('Playing speech audio: "Youth is the backbone of our nation"');
      }
    });
  }

  if (playToggle) {
    playToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (video.paused) {
        video.play();
        playIcon.textContent = '⏸';
      } else {
        video.pause();
        playIcon.textContent = '▶';
      }
    });
  }
}



