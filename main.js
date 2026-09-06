/**
 * Custom Digital Design - Custom Digital Design & AI Services
 * Modern Interactive Engine, WhatsApp Direct Order & Search System
 */

// Configurable Business Details (Replace '1234567890' with your real phone number with country code)
const BUSINESS_CONFIG = {
  whatsappNumber: '1234567890',
  whatsappDefaultMsg: 'Hello Custom Digital Design! I would like to inquire about your services.',
  instagramUrl: 'https://instagram.com/customdigitaldesign'
};

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initNavigation();
  initGlobalSearch();
  initPortfolio();
  initPricingToggle();
  initFaqAccordion();
  initContactForm();
  initNewsletter();
  initCounters();
  initServiceSelectLinks();
});

/* ==========================================================================
   1. NEURAL MESH / PARTICLE CANVAS ANIMATION (HERO)
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 45;
  const maxDistance = 140;
  let mouse = { x: null, y: null, radius: 150 };

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
    createParticles();
  }

  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.2,
        color: Math.random() > 0.4 ? 'rgba(0, 242, 254,' : 'rgba(112, 0, 255,'
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse gentle interaction
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          p.x -= (dx / dist) * 0.8;
          p.y -= (dy / dist) * 0.8;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + ' 0.8)';
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          let alpha = (1 - dist / maxDistance) * 0.25;
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  resizeCanvas();
  draw();
}

/* ==========================================================================
   2. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header scroll appearance
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Highlight active nav links on scroll
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Mobile Drawer Toggle
  function openDrawer() {
    drawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. GLOBAL SEARCH ENGINE & SPOTLIGHT MODAL
   ========================================================================== */
const searchDatabase = [
  // Services
  {
    type: 'service',
    title: 'AI Image Generation',
    desc: 'Midjourney v6, Flux.1 Pro & Custom LoRA photorealistic art & branding assets. Order via WhatsApp.',
    icon: 'fa-solid fa-image',
    badge: 'Service • From $149',
    url: '#services',
    tags: ['midjourney', 'flux', 'art', 'graphics', 'image', 'lora', 'stable diffusion', 'photos', 'concept', 'order']
  },
  {
    type: 'service',
    title: 'AI Video Generation',
    desc: 'Runway Gen-3 & Kling AI cinematic videos, commercials & video synthesis. Order via WhatsApp.',
    icon: 'fa-solid fa-video',
    badge: 'Service • From $399',
    url: '#services',
    tags: ['video', 'runway', 'sora', 'kling', 'motion', 'cinematic', 'commercial', 'animation', 'order']
  },
  {
    type: 'service',
    title: 'Prompt Engineering',
    desc: 'Scientific prompt architecture for GPT-4o, Claude 3.5 & Agent directives.',
    icon: 'fa-solid fa-terminal',
    badge: 'Service • From $199',
    url: '#services',
    tags: ['prompt', 'llm', 'gpt', 'claude', 'system prompt', 'json schema', 'agent', 'engineering']
  },
  {
    type: 'service',
    title: 'Python Automation & AI',
    desc: 'Bespoke Python scripts, APIs, web scraping, bots, and AI model pipelines.',
    icon: 'fa-brands fa-python',
    badge: 'Service • From $349',
    url: '#services',
    tags: ['python', 'script', 'bot', 'scraping', 'automation', 'backend', 'api', 'fastapi', 'code']
  },
  {
    type: 'service',
    title: 'Scratch Programming',
    desc: 'Educational Scratch 3.0 games, STEM curriculums, sprite logic & simulations.',
    icon: 'fa-solid fa-puzzle-piece',
    badge: 'Service • From $99',
    url: '#services',
    tags: ['scratch', 'kids', 'games', 'education', 'stem', 'visual code', 'mit', 'sprites']
  },
  {
    type: 'service',
    title: 'Web Development',
    desc: 'High-speed modern websites, landing pages, dark AI SaaS dashboards & UI/UX.',
    icon: 'fa-solid fa-globe',
    badge: 'Service • From $599',
    url: '#services',
    tags: ['web', 'website', 'frontend', 'html', 'css', 'javascript', 'responsive', 'development', 'landing page']
  },
  {
    type: 'service',
    title: 'AI Video Editing',
    desc: 'Dynamic subtitle animation, neural color grading, 4K upscaling, audio cleanup.',
    icon: 'fa-solid fa-wand-magic-sparkles',
    badge: 'Service • From $249',
    url: '#services',
    tags: ['editing', 'reels', 'tiktok', 'captions', 'video cut', 'upscaling', 'subtitles', 'youtube']
  },

  // WhatsApp & Instagram Channels
  {
    type: 'section',
    title: 'Direct WhatsApp Business Chat',
    desc: 'Chat directly with our lead developer on WhatsApp for instant quotes & orders.',
    icon: 'fa-brands fa-whatsapp',
    badge: 'Direct Chat',
    url: 'https://wa.me/1234567890?text=Hello%20Custom%20Digital%20Design!%20I%20would%20like%20to%20discuss%20a%20project.',
    tags: ['whatsapp', 'chat', 'direct', 'phone', 'order', 'instant']
  },
  {
    type: 'section',
    title: 'Official Instagram Profile',
    desc: 'Follow @customdigitaldesign for daily AI art drops, video reels, and direct messages.',
    icon: 'fa-brands fa-instagram',
    badge: 'Social DM',
    url: 'https://instagram.com/customdigitaldesign',
    tags: ['instagram', 'ig', 'dm', 'social', 'art drops', 'reels']
  },

  // Portfolio Projects
  {
    type: 'portfolio',
    title: 'Neo-Tokyo 2099: Cyber Architecture',
    desc: 'Photorealistic 8K sci-fi city concept render series using custom LoRA weights.',
    icon: 'fa-solid fa-city',
    badge: 'Portfolio • AI Visuals',
    url: '#portfolio',
    tags: ['portfolio', 'tokyo', 'cyberpunk', 'concept art', '8k', 'architecture', 'renders']
  },
  {
    type: 'portfolio',
    title: 'AURA: Synthetic Luxury Commercial',
    desc: '45-second commercial teaser featuring AI-generated hyper-cars and physics.',
    icon: 'fa-solid fa-clapperboard',
    badge: 'Portfolio • AI Video',
    url: '#portfolio',
    tags: ['portfolio', 'aura', 'commercial', 'hypercar', 'runway', 'video teaser']
  },
  {
    type: 'portfolio',
    title: 'Vortex AI: Neural Analytics Portal',
    desc: 'Ultra-responsive dark-mode SaaS analytics landing interface with live graphs.',
    icon: 'fa-solid fa-chart-line',
    badge: 'Portfolio • Web Dev',
    url: '#portfolio',
    tags: ['portfolio', 'vortex', 'analytics', 'dashboard', 'web portal', 'frontend']
  },
  {
    type: 'portfolio',
    title: 'OmniScrape & Synthesizer Bot',
    desc: 'Asynchronous Python crawler scraping financial metrics and compiling AI summaries.',
    icon: 'fa-brands fa-python',
    badge: 'Portfolio • Python',
    url: '#portfolio',
    tags: ['portfolio', 'crawler', 'scraper', 'bot', 'python script', 'finance']
  },
  {
    type: 'portfolio',
    title: 'Cosmic Orbit: Physics Simulator',
    desc: 'Scratch 3.0 educational game with gravity mechanics and custom sprites.',
    icon: 'fa-solid fa-gamepad',
    badge: 'Portfolio • Scratch',
    url: '#portfolio',
    tags: ['portfolio', 'scratch game', 'physics', 'cosmic orbit', 'space', 'stem']
  },
  {
    type: 'portfolio',
    title: 'Viral Reels Studio: 10M+ Impression Pack',
    desc: 'Viral short-form editing pack with auto-animated subtitles & sound design.',
    icon: 'fa-solid fa-scissors',
    badge: 'Portfolio • Video Edit',
    url: '#portfolio',
    tags: ['portfolio', 'viral reels', 'shorts', 'tiktok', 'social media', 'video editing']
  },

  // Pricing
  {
    type: 'pricing',
    title: 'Starter AI Pack Plan',
    desc: '$299 / project. 20 AI Images, 1 Video Clip, Prompt recipes. Order via WhatsApp.',
    icon: 'fa-solid fa-tag',
    badge: 'Pricing • Starter',
    url: '#pricing',
    tags: ['pricing', 'starter', 'cheap', 'budget', '299', 'plan', 'package', 'order']
  },
  {
    type: 'pricing',
    title: 'Pro AI & Web Suite Plan',
    desc: '$799 / project. 60+ 8K Images, 3 Videos, Web Landing Page & Python Bot.',
    icon: 'fa-solid fa-crown',
    badge: 'Pricing • Popular',
    url: '#pricing',
    tags: ['pricing', 'pro', 'professional', '799', 'suite', 'web page', 'best', 'order']
  },
  {
    type: 'pricing',
    title: 'Enterprise Custom Plan',
    desc: '$1,899+ / project. Custom LoRA models, dedicated full-stack app, 24h SLA.',
    icon: 'fa-solid fa-building',
    badge: 'Pricing • Enterprise',
    url: '#pricing',
    tags: ['pricing', 'enterprise', 'custom', 'sla', 'unlimited', 'corporate', 'order']
  },

  // Core Sections
  {
    type: 'section',
    title: 'About Custom Digital Design',
    desc: 'Where human creative vision meets computational neural precision.',
    icon: 'fa-solid fa-circle-info',
    badge: 'Company',
    url: '#about',
    tags: ['about', 'company', 'team', 'engineers', 'philosophy', 'mission', 'tech stack', 'custom digital design']
  },
  {
    type: 'section',
    title: 'Contact & Direct WhatsApp Inquiries',
    desc: 'Get a custom proposal within 2 hours or chat directly on WhatsApp.',
    icon: 'fa-solid fa-paper-plane',
    badge: 'Direct Contact',
    url: '#contact',
    tags: ['contact', 'hire', 'email', 'quote', 'proposal', 'touch', 'message', 'whatsapp', 'instagram']
  }
];

function initGlobalSearch() {
  const openSearchBtn = document.getElementById('openSearchBtn');
  const drawerSearchBtn = document.getElementById('drawerSearchBtn');
  const heroSearchBar = document.getElementById('heroSearchBar');
  const heroSearchTrigger = document.getElementById('heroSearchTrigger');
  const searchModal = document.getElementById('searchModal');
  const searchBackdrop = document.getElementById('searchBackdrop');
  const searchInput = document.getElementById('globalSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const resultsList = document.getElementById('searchResultsList');
  const filterChips = document.querySelectorAll('.search-filter-chips .chip');

  let currentFilter = 'all';
  let activeIndex = -1;

  function openSearchModal() {
    searchModal.classList.add('open');
    searchBackdrop.classList.add('open');
    searchModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      searchInput.focus();
      renderResults(searchInput.value.trim());
    }, 100);
  }

  function closeSearchModal() {
    searchModal.classList.remove('open');
    searchBackdrop.classList.remove('open');
    searchModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Trigger Openers
  if (openSearchBtn) openSearchBtn.addEventListener('click', openSearchModal);
  if (drawerSearchBtn) drawerSearchBtn.addEventListener('click', () => {
    const drawer = document.getElementById('mobileDrawer');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    drawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    openSearchModal();
  });
  if (heroSearchBar) heroSearchBar.addEventListener('click', openSearchModal);
  if (heroSearchTrigger) heroSearchTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    openSearchModal();
  });

  // Hotkey: Ctrl+K / Cmd+K / Escape
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchModal.classList.contains('open')) {
        closeSearchModal();
      } else {
        openSearchModal();
      }
    } else if (e.key === 'Escape' && searchModal.classList.contains('open')) {
      closeSearchModal();
    }
  });

  if (searchBackdrop) searchBackdrop.addEventListener('click', closeSearchModal);

  // Clear Input
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    renderResults('');
    searchInput.focus();
  });

  // Filter Chips Click
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-filter');
      renderResults(searchInput.value.trim());
    });
  });

  // Input Typing
  searchInput.addEventListener('input', () => {
    const val = searchInput.value.trim();
    clearSearchBtn.style.display = val.length > 0 ? 'block' : 'none';
    renderResults(val);
  });

  // Keyboard navigation through search results
  searchInput.addEventListener('keydown', (e) => {
    const items = resultsList.querySelectorAll('.search-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      updateHighlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      updateHighlight(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < items.length) {
        items[activeIndex].click();
      } else if (items.length > 0) {
        items[0].click();
      }
    }
  });

  function updateHighlight(items) {
    items.forEach((item, index) => {
      item.classList.toggle('highlighted', index === activeIndex);
      if (index === activeIndex) {
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  function renderResults(query) {
    activeIndex = -1;
    const q = query.toLowerCase();

    const filtered = searchDatabase.filter(item => {
      // Type Filter
      if (currentFilter !== 'all' && item.type !== currentFilter) {
        return false;
      }
      if (!q) return true; // Show initial recommended items

      // Query match
      const titleMatch = item.title.toLowerCase().includes(q);
      const descMatch = item.desc.toLowerCase().includes(q);
      const tagMatch = item.tags && item.tags.some(tag => tag.toLowerCase().includes(q));

      return titleMatch || descMatch || tagMatch;
    });

    if (filtered.length === 0) {
      resultsList.innerHTML = `
        <div class="search-empty">
          <i class="fa-solid fa-magnifying-glass"></i>
          <p>No results found for "<strong>${escapeHtml(query)}</strong>"</p>
          <span style="font-size: 0.8rem; color: var(--text-dim);">Try searching for "WhatsApp", "AI Video", "Python", "Pricing", or "Instagram"</span>
        </div>
      `;
      return;
    }

    resultsList.innerHTML = filtered.map(item => `
      <div class="search-item" data-url="${item.url}" tabindex="0">
        <div class="search-item-left">
          <div class="search-item-icon">
            <i class="${item.icon}"></i>
          </div>
          <div>
            <div class="search-item-title">${highlightMatch(item.title, q)}</div>
            <div class="search-item-desc">${highlightMatch(item.desc, q)}</div>
          </div>
        </div>
        <span class="search-badge">${item.badge}</span>
      </div>
    `).join('');

    // Attach click handlers to items
    resultsList.querySelectorAll('.search-item').forEach(el => {
      el.addEventListener('click', () => {
        const targetUrl = el.getAttribute('data-url');
        closeSearchModal();
        if (targetUrl.startsWith('#')) {
          const targetEl = document.querySelector(targetUrl);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          window.open(targetUrl, '_blank', 'noopener,noreferrer');
        }
      });
    });
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);
    const regex = new RegExp(`(${query})`, 'gi');
    return escapeHtml(text).replace(regex, '<mark style="background: rgba(0,242,254,0.3); color: #fff; padding: 0 2px; border-radius: 2px;">$1</mark>');
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[m]);
  }
}

/* ==========================================================================
   4. PORTFOLIO FILTERING & CASE STUDY MODAL
   ========================================================================== */
const portfolioDetails = {
  p1: {
    title: 'Neo-Tokyo 2099: Cyber Architecture',
    category: 'AI Image Generation & LoRA Training',
    year: '2026',
    client: 'Apex Cyber Studios (Gaming)',
    turnaround: '48 Hours',
    description: 'Developed a collection of 50+ 8K ultra-resolution architectural concept arts visualizing a dystopian Neo-Tokyo cyberpunk city. We trained a customized Stable Diffusion XL LoRA model on proprietary art direction guides to ensure exact neon color spectrums, wet asphalt reflections, and volumetric light coherence across all shots.',
    tools: ['Midjourney v6', 'ComfyUI', 'SDXL LoRA', 'Photoshop Neural Filters'],
    deliverables: '50 Raw 8K PSD renders, proprietary .safetensors model weights, prompt bible',
    serviceTarget: 'AI Image Generation'
  },
  p2: {
    title: 'AURA: Synthetic Luxury Commercial',
    category: 'AI Video Generation & Synthesis',
    year: '2026',
    client: 'AURA Hyper-Mobility Concept',
    turnaround: '3 Days',
    description: 'Synthesized a broadcast-ready 45-second speculative vehicle launch video completely through artificial intelligence. Utilizing Runway Gen-3 Alpha and Kling AI camera direction prompt controls, we directed tracking, pan, and drone fly-over camera motions that feel tangibly physical.',
    tools: ['Runway Gen-3 Alpha', 'Kling AI', 'Topaz Video AI 4K', 'Premiere Pro'],
    deliverables: '4K Master ProRes video, 9:16 vertical TikTok cut, sound effects track',
    serviceTarget: 'AI Video Generation'
  },
  p3: {
    title: 'Vortex AI: Neural Analytics Portal',
    category: 'Full-Stack Web Development',
    year: '2026',
    client: 'Vortex Data Intelligence',
    turnaround: '6 Days',
    description: 'Engineered a modern, responsive web application and marketing portal featuring a dark cyber aesthetic, real-time simulated AI graph visualizations, interactive KPI calculators, and sub-second load times. 100% lighthouse performance rating.',
    tools: ['HTML5 / CSS3', 'Modern JavaScript', 'SVG Visualizer', 'Tailwind Grid'],
    deliverables: 'Full source repository, responsive design assets, automated deployment scripts',
    serviceTarget: 'Web Development'
  },
  p4: {
    title: 'OmniScrape & Synthesizer Bot',
    category: 'Python Automation & AI Engineering',
    year: '2026',
    client: 'FinPulse Capital',
    turnaround: '4 Days',
    description: 'Designed and deployed an automated asynchronous Python crawler. It scans real-time financial market announcements, uses OpenAI GPT-4o JSON structured outputs to summarize critical risks, and automatically drafts formatted briefings to a private Telegram and Discord channel.',
    tools: ['Python 3.12', 'Asyncio', 'Playwright', 'OpenAI API', 'Discord Webhooks'],
    deliverables: 'Modular Python codebase, Dockerfile, Cron scheduler, error monitoring log',
    serviceTarget: 'Python Development'
  },
  p5: {
    title: 'Cosmic Orbit: Physics Simulator',
    category: 'Scratch 3.0 Interactive Coding',
    year: '2026',
    client: 'Starlight Academy of STEM',
    turnaround: '3 Days',
    description: 'Created a multi-body celestial gravitational simulator in Scratch 3.0. Features real-time orbital trajectory predictions, custom vector sprite assets, level progression, and comprehensive classroom lesson notes for educators teaching computational physics.',
    tools: ['Scratch 3.0', 'Vector Graphic Design', 'Mathematical Algorithm Logic'],
    deliverables: '.sb3 Source Project File, Educator Teacher PDF Guide, Sprite Asset Library',
    serviceTarget: 'Scratch Programming'
  },
  p6: {
    title: 'Viral Reels Studio: 10M+ Impression Pack',
    category: 'AI Video Editing & Neural Enhancement',
    year: '2026',
    client: 'TechVibe Media Network',
    turnaround: '48 Hours',
    description: 'Processed a high-volume batch of 20 podcast & talk show clips into viral-optimized TikTok and YouTube Shorts formats. Integrated AI speaker re-framing, dynamic kinetic animated captions, neural background noise removal, and custom sound design hooks.',
    tools: ['AI Whisper Transcription', 'DaVinci Resolve Neural Engine', 'Topaz AI'],
    deliverables: '20 Formatted 9:16 MP4 Reels, SRT Subtitle files, thumbnail art',
    serviceTarget: 'AI Video Editing'
  }
};

function initPortfolio() {
  const filterTabs = document.querySelectorAll('.portfolio-filter-tabs .filter-tab');
  const cards = document.querySelectorAll('.portfolio-grid .portfolio-card');
  const modal = document.getElementById('portfolioModal');
  const backdrop = document.getElementById('portfolioBackdrop');
  const closeBtn = document.getElementById('closePortfolioModal');
  const modalBody = document.getElementById('portfolioModalBody');

  // Category Filtering
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // Modal Open
  document.querySelectorAll('.preview-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = btn.getAttribute('data-modal');
      const data = portfolioDetails[pId];
      if (!data) return;

      const waMsg = encodeURIComponent(`Hello Custom Digital Design! I am interested in ordering a project similar to: ${data.title} (${data.category}).`);

      modalBody.innerHTML = `
        <span class="modal-project-badge"><i class="fa-solid fa-sparkles"></i> ${data.category}</span>
        <h3 class="modal-project-title">${data.title}</h3>

        <div class="modal-project-meta-grid">
          <div>
            <div class="meta-item-label">Client / Scope</div>
            <div class="meta-item-val">${data.client}</div>
          </div>
          <div>
            <div class="meta-item-label">Delivery Timeline</div>
            <div class="meta-item-val">${data.turnaround}</div>
          </div>
          <div>
            <div class="meta-item-label">Release Year</div>
            <div class="meta-item-val">${data.year}</div>
          </div>
        </div>

        <p class="modal-project-description">${data.description}</p>

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 0.95rem; margin-bottom: 8px; color: var(--text-main);"><i class="fa-solid fa-screwdriver-wrench" style="color: var(--cyan);"></i> Tech Stack & Pipeline:</h4>
          <div class="tech-tags">
            ${data.tools.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>

        <div style="margin-bottom: 26px; padding: 14px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: var(--radius-sm);">
          <span style="font-size: 0.8rem; color: var(--cyan); font-weight: 700; text-transform: uppercase;">Delivered Assets:</span>
          <p style="font-size: 0.88rem; color: var(--text-main); margin-top: 4px; margin-bottom: 0;">${data.deliverables}</p>
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${waMsg}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp modal-wa-btn">
            <i class="fa-brands fa-whatsapp"></i>
            <span>Order Similar on WhatsApp</span>
          </a>
          <a href="#contact" class="btn btn-secondary modal-action-btn" data-service-select="${data.serviceTarget}">
            <span>Inquire via Form</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
          <button class="btn btn-outline close-modal-secondary-btn">Close</button>
        </div>
      `;

      modal.classList.add('open');
      backdrop.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Attach listener to newly rendered action button
      modalBody.querySelector('.modal-action-btn').addEventListener('click', () => {
        closePortfolioModal();
        selectServiceInForm(data.serviceTarget);
      });

      modalBody.querySelector('.close-modal-secondary-btn').addEventListener('click', closePortfolioModal);
    });
  });

  function closePortfolioModal() {
    modal.classList.remove('open');
    backdrop.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closePortfolioModal);
  if (backdrop) backdrop.addEventListener('click', closePortfolioModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closePortfolioModal();
    }
  });
}

/* ==========================================================================
   5. PRICING TOGGLE (PROJECT VS MONTHLY)
   ========================================================================== */
function initPricingToggle() {
  const toggle = document.getElementById('pricingToggle');
  const amounts = document.querySelectorAll('.pricing-card .amount');
  const periods = document.querySelectorAll('.pricing-card .period');

  if (!toggle) return;

  toggle.addEventListener('change', () => {
    const isMonthly = toggle.checked;

    amounts.forEach(amountEl => {
      const targetVal = isMonthly ? amountEl.getAttribute('data-monthly') : amountEl.getAttribute('data-onetime');
      
      // Animate number change
      amountEl.style.opacity = '0';
      setTimeout(() => {
        amountEl.textContent = targetVal;
        amountEl.style.opacity = '1';
      }, 150);
    });

    periods.forEach(periodEl => {
      periodEl.textContent = isMonthly ? '/ month' : '/ project';
    });
  });

  // Attach plan select button handlers
  document.querySelectorAll('.plan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const planName = btn.getAttribute('data-plan');
      const detailsField = document.getElementById('projectDetails');
      if (detailsField) {
        detailsField.value = `Hello Custom Digital Design team, I would like to move forward with the [${planName}] tier. Let's discuss requirements and kickoff.`;
      }
    });
  });
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all others
      items.forEach(other => other.classList.remove('active'));

      // Toggle current
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. CONTACT FORM & TOAST NOTIFICATIONS
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const serviceSelect = document.getElementById('serviceSelect');
    const detailsInput = document.getElementById('projectDetails');
    const submitBtn = document.getElementById('submitContactBtn');

    // Reset previous errors
    form.querySelectorAll('.form-group').forEach(fg => fg.classList.remove('has-error'));

    // Name Validation
    if (!nameInput.value.trim()) {
      nameInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Service Select Validation
    if (!serviceSelect.value) {
      serviceSelect.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Details Validation
    if (!detailsInput.value.trim() || detailsInput.value.trim().length < 8) {
      detailsInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate sending proposal request with glowing loading animation
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <i class="fa-solid fa-circle-notch fa-spin"></i>
      <span>Securing Transmission...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      showToast(
        'Proposal Dispatched Successfully',
        `Thank you ${nameInput.value || 'Visionary'}! The Custom Digital Design engineering team will respond to ${emailInput.value} within 2 hours.`,
        'success'
      );
    }, 750);
  });
}

function showToast(title, desc, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const icon = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-info';

  toast.innerHTML = `
    <div class="toast-icon"><i class="${icon}"></i></div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-desc">${desc}</div>
    </div>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4500);
}

/* ==========================================================================
   8. NEWSLETTER SUBSCRIPTION
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('newsletterEmail');
  const statusEl = document.getElementById('newsletterStatus');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!email || !email.includes('@')) {
      statusEl.style.color = 'var(--rose)';
      statusEl.textContent = 'Please provide a valid email.';
      return;
    }

    emailInput.value = '';
    statusEl.style.color = 'var(--emerald)';
    statusEl.textContent = 'Subscribed to Neural Dispatch.';

    showToast('Subscribed to Neural Dispatch', 'You will receive our bi-weekly AI breakdown.', 'success');

    setTimeout(() => {
      statusEl.textContent = '';
    }, 4000);
  });
}

/* ==========================================================================
   9. METRIC HIGHLIGHT COUNTERS ANIMATION
   ========================================================================== */
function initCounters() {
  const statsSection = document.querySelector('.hero-stats-grid');
  if (!statsSection) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      document.querySelectorAll('.stat-number').forEach(stat => {
        const target = stat.getAttribute('data-target');
        if (!target) return;

        if (target === '24') {
          stat.textContent = '24/7';
          return;
        }

        const numTarget = parseFloat(target);
        let start = 0;
        const duration = 1200;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = numTarget / totalSteps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= numTarget) {
            clearInterval(timer);
            if (numTarget === 99) {
              stat.textContent = '99.4%';
            } else if (numTarget === 320) {
              stat.textContent = '320+';
            } else {
              stat.textContent = numTarget;
            }
          } else {
            stat.textContent = Math.floor(start) + (numTarget === 99 ? '%' : '+');
          }
        }, stepTime);
      });
    }
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

/* ==========================================================================
   10. AUTO-PRESELECT SERVICE IN FORM ON BUTTON CLICK
   ========================================================================== */
function initServiceSelectLinks() {
  document.querySelectorAll('[data-service-select]').forEach(link => {
    link.addEventListener('click', () => {
      const serviceName = link.getAttribute('data-service-select');
      selectServiceInForm(serviceName);
    });
  });
}

function selectServiceInForm(serviceName) {
  const select = document.getElementById('serviceSelect');
  if (!select) return;

  for (let option of select.options) {
    if (option.value.toLowerCase().includes(serviceName.toLowerCase()) || 
        serviceName.toLowerCase().includes(option.value.toLowerCase())) {
      option.selected = true;
      break;
    }
  }

  // Smooth scroll to form
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      select.focus();
    }, 400);
  }
}
