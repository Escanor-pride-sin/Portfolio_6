/**
 * Advanced 3D Interactive Portfolio Engine
 * Features: Tilt, parallax, particle effects, scroll animations, dynamic lighting
 */
(function(){
  if(typeof window === 'undefined') return;
  
  // Respect reduced motion preference
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('Reduced motion enabled; interactive effects disabled');
    return;
  }

  console.log('3D Portfolio Engine: initializing');
  document.documentElement.dataset.tilt = 'init';

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ===== ADVANCED TILT ENGINE ===== */
  function attachAdvancedTilt(el, opts) {
    opts = Object.assign({
      max: 15,
      scale: 1.02,
      perspective: 900,
      rotationScale: 1,
      depth: 40,
      enableGloss: true
    }, opts || {});

    let rect = null;
    let mouseX = 0, mouseY = 0;
    let isActive = false;

    function onMove(e) {
      if (!rect) rect = el.getBoundingClientRect();
      
      const clientX = e.clientX ?? (e.touches?.[0]?.clientX);
      const clientY = e.clientY ?? (e.touches?.[0]?.clientY);
      
      if (clientX === undefined || clientY === undefined) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      mouseX = x;
      mouseY = y;

      const halfW = rect.width / 2;
      const halfH = rect.height / 2;
      
      const rx = clamp((y - halfH) / halfH, -1, 1);
      const ry = clamp((x - halfW) / halfW, -1, 1);
      
      const rotX = -rx * opts.max * opts.rotationScale;
      const rotY = ry * opts.max * opts.rotationScale;
      
      const gloss = opts.enableGloss ? `perspective(${opts.perspective}px)` : '';
      el.style.transform = `
        ${gloss}
        rotateX(${rotX.toFixed(2)}deg)
        rotateY(${rotY.toFixed(2)}deg)
        scale(${opts.scale})
        translateZ(${opts.depth}px)
      `;
      
      el.classList.add('tilt-active');
      
      // Lift inner image with parallax depth
      const img = el.querySelector('img');
      if (img) {
        const imgDepth = opts.depth * 0.7;
        img.style.transform = `translateZ(${imgDepth}px) scale(1.05)`;
      }
      
      isActive = true;
    }

    function reset() {
      if (!isActive) return;
      el.style.transform = `perspective(${opts.perspective}px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0)`;
      el.classList.remove('tilt-active');
      
      const img = el.querySelector('img');
      if (img) img.style.transform = 'translateZ(0) scale(1)';
      
      isActive = false;
      rect = null;
    }

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerenter', () => { isActive = true; });
    el.addEventListener('pointerleave', reset);
    el.addEventListener('touchmove', onMove, { passive: true });
    el.addEventListener('touchend', reset);
  }

  // Apply tilt to interactive elements
  const tiltElements = [
    { selector: '.project', opts: { max: 4, scale: 1.016, depth: 12, rotationScale: 1.08 } },
    { selector: '.project .cover', opts: { max: 3.6, scale: 1.024, depth: 10, rotationScale: 1.06 } },
    { selector: '.skill-card', opts: { max: 12, scale: 1.015, depth: 30 } },
    { selector: '.cert-item', opts: { max: 10, scale: 1.01, depth: 20 } },
    { selector: '.logo', opts: { max: 20, scale: 1.05, depth: 50 } },
    { selector: '.skill-icon', opts: { max: 18, scale: 1.08, depth: 35, rotationScale: 1.3 } }
  ];

  tiltElements.forEach(({ selector, opts }) => {
    document.querySelectorAll(selector).forEach((el, idx) => {
      attachAdvancedTilt(el, opts);
      el.style.setProperty('--index', idx);
    });
  });

  /* ===== HERO PARALLAX & LIGHTING ===== */
  const graph = document.querySelector('.graph-elements');
  if (graph) {
    const parallaxStrength = 25;
    const lightStrength = 1.2;
    
    function onMouseMove(e) {
      const x = e.clientX ?? (e.touches?.[0]?.clientX) ?? (window.innerWidth / 2);
      const y = e.clientY ?? (e.touches?.[0]?.clientY) ?? (window.innerHeight / 2);
      
      const rx = ((x / window.innerWidth) - 0.5) * parallaxStrength;
      const ry = ((y / window.innerHeight) - 0.5) * parallaxStrength;
      
      graph.style.transform = `translate3d(${-rx}px, ${-ry}px, 0)`;
      
      // Dynamic light effect on hero
      const hue = ((x / window.innerWidth) * 360).toFixed(0);
      graph.style.filter = `hue-rotate(${hue}deg) brightness(${1 + (ry / parallaxStrength) * 0.05})`;
    }
    
    window.addEventListener('pointermove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onMouseMove, { passive: true });
  }

  /* ===== PROJECT CARD GLOW TRACKING ===== */
  function setupProjectGlow() {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
      project.addEventListener('pointermove', (e) => {
        const rect = project.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate distance from center for glow intensity
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
        const intensity = Math.max(0, 1 - (distance / maxDistance));
        
        // Create dynamic background glow based on cursor
        const bgX = (x / rect.width) * 100;
        const bgY = (y / rect.height) * 100;
        
        project.style.setProperty('--glow-x', `${bgX}%`);
        project.style.setProperty('--glow-y', `${bgY}%`);
        project.style.setProperty('--glow-intensity', intensity);
      }, { passive: true });
      
      project.addEventListener('pointerleave', () => {
        project.style.setProperty('--glow-intensity', '0');
      });
    });
  }

  /* ===== SCROLL-TRIGGERED ANIMATIONS ===== */
  function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in, .project, .skill-card, .t-item, .cert-item').forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  /* ===== FLOATING PARTICLE SYSTEM ===== */
  function createParticles() {
    const particleCount = 8;
    const container = document.body;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.width = (Math.random() * 6 + 2) + 'px';
      particle.style.height = particle.style.width;
      particle.style.animation = `float-slow ${Math.random() * 4 + 6}s ease-in-out infinite`;
      particle.style.animationDelay = (i * 0.3) + 's';
      container.appendChild(particle);
    }
  }

  /* ===== DYNAMIC SECTION HEADERS ===== */
  function setupDynamicHeaders() {
    document.querySelectorAll('section h2').forEach((h2, idx) => {
      const letters = h2.textContent.split('');
      h2.innerHTML = letters.map((letter, i) => 
        `<span style="animation-delay: ${i * 0.05}s; display: inline-block; animation: fadeInUp 0.6s ease-out both">${letter}</span>`
      ).join('');
    });
  }

  /* ===== SCROLL DEPTH INDICATOR ===== */
  function setupScrollDepth() {
    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      document.documentElement.style.setProperty('--scroll-depth', scrolled + '%');
    }, { passive: true });
  }

  /* ===== INITIALIZE ALL ===== */
  function init() {
    setupScrollAnimations();
    setupProjectGlow();
    createParticles();
    setupDynamicHeaders();
    setupScrollDepth();
    
    document.documentElement.dataset.tilt = 'ready';
    console.log('3D Portfolio Engine: fully initialized with unique project effects');
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }


  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Re-initialize on resize if needed
    }, 250);
  });

  /* ===== PROJECT INFO TOGGLE ===== */
  function setupProjectToggle() {
    document.querySelectorAll('.project').forEach(projectCard => {
      const viewBtn = projectCard.querySelector('.btn-view-info');
      const closeBtn = projectCard.querySelector('.btn-close-info');
      const projectInfo = projectCard.querySelector('.project-info');
      
      if (!viewBtn || !closeBtn || !projectInfo) return;
      // View Info button click
      viewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Close any other open projects first
        document.querySelectorAll('.project.info-visible').forEach(card => {
          if (card !== projectCard) {
            const otherBtn = card.querySelector('.btn-view-info');
            const otherInfo = card.querySelector('.project-info');
            card.classList.remove('info-visible');
            otherInfo.setAttribute('hidden', '');
            if (otherBtn) {
              otherBtn.setAttribute('aria-expanded', 'false');
              otherBtn.style.display = '';
            }
          }
        });

        // Toggle current project
        const isVisible = projectCard.classList.contains('info-visible');

        if (!isVisible) {
          projectCard.classList.add('info-visible');
          projectInfo.removeAttribute('hidden');
          viewBtn.setAttribute('aria-expanded', 'true');
          // hide the original view button (we keep the Close button inside info)
          viewBtn.style.display = 'none';
        } else {
          projectCard.classList.remove('info-visible');
          projectInfo.setAttribute('hidden', '');
          viewBtn.setAttribute('aria-expanded', 'false');
          viewBtn.style.display = '';
        }
      });

      // Close Info button click (inside the info panel)
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        projectCard.classList.remove('info-visible');
        projectInfo.setAttribute('hidden', '');
        viewBtn.setAttribute('aria-expanded', 'false');
        viewBtn.style.display = '';
      });

      // When pointer enters another project, auto-close any open info panels
      projectCard.addEventListener('pointerenter', () => {
        document.querySelectorAll('.project.info-visible').forEach(card => {
          if (card !== projectCard) {
            const otherBtn = card.querySelector('.btn-view-info');
            const otherInfo = card.querySelector('.project-info');
            card.classList.remove('info-visible');
            otherInfo.setAttribute('hidden', '');
            if (otherBtn) {
              otherBtn.setAttribute('aria-expanded', 'false');
              otherBtn.style.display = '';
            }
          }
        });
      });

      // Also close on touchstart of a different project (mobile)
      projectCard.addEventListener('touchstart', () => {
        document.querySelectorAll('.project.info-visible').forEach(card => {
          if (card !== projectCard) {
            const otherBtn = card.querySelector('.btn-view-info');
            const otherInfo = card.querySelector('.project-info');
            card.classList.remove('info-visible');
            otherInfo.setAttribute('hidden', '');
            if (otherBtn) {
              otherBtn.setAttribute('aria-expanded', 'false');
              otherBtn.style.display = '';
            }
          }
        });
      });

      // Prevent accidental closes when interacting with links or buttons inside the card
      projectCard.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.closest('button')) {
          return;
        }
      });
    });
  }

  // Initialize project toggle on load
  setupProjectToggle();

})();

