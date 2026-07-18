// ===== Nav toggle (mobile) =====
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

function setNavOpen(isOpen) {
  nav.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
}

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    setNavOpen(!nav.classList.contains('open'));
  });

  nav.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => setNavOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setNavOpen(false);
      navToggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (
      nav.classList.contains('open') &&
      !nav.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      setNavOpen(false);
    }
  });
}

// ===== "desarrollador.js" code block =====
const codeLines = [
  `<span class="tok-kw">const</span> <span class="tok-plain">desarrollador</span> <span class="tok-punct">=</span> <span class="tok-punct">{</span>`,
  `  <span class="tok-key">nickName</span><span class="tok-punct">:</span> <span class="tok-string">'diegohost'</span><span class="tok-punct">,</span>`,
  `  <span class="tok-key">fullName</span><span class="tok-punct">:</span> <span class="tok-string">'Diego Armando'</span><span class="tok-punct">,</span>`,
  `  <span class="tok-key">fechaNacimiento</span><span class="tok-punct">:</span> <span class="tok-kw">new</span> <span class="tok-fn">Date</span><span class="tok-punct">(</span><span class="tok-plain">2006, 9, 5</span><span class="tok-punct">),</span> <span class="tok-comment">// 5 de Octubre, 2006</span>`,
  `  <span class="tok-key">rol</span><span class="tok-punct">:</span> <span class="tok-string">'Desarrollador de Sistemas Informáticos'</span><span class="tok-punct">,</span>`,
  `  <span class="tok-key">ubicacion</span><span class="tok-punct">:</span> <span class="tok-string">'Panamá'</span><span class="tok-punct">,</span>`,
  `  <span class="tok-key">especialidad</span><span class="tok-punct">:</span> <span class="tok-punct">[</span><span class="tok-string">'Páginas web'</span><span class="tok-punct">,</span> <span class="tok-string">'Sistemas de gestión'</span><span class="tok-punct">,</span> <span class="tok-string">'Bases de datos'</span><span class="tok-punct">,</span> <span class="tok-string">'Automatización'</span><span class="tok-punct">],</span>`,
  `  <span class="tok-key">email</span><span class="tok-punct">:</span> <span class="tok-string">'diegoarmando17k@gmail.com'</span><span class="tok-punct">,</span>`,
  `  <span class="tok-key">idiomas</span><span class="tok-punct">:</span> <span class="tok-punct">[</span><span class="tok-string">'Español (nativo)'</span><span class="tok-punct">,</span> <span class="tok-string">'Inglés (técnico/conversacional)'</span><span class="tok-punct">],</span>`,
  `  <span class="tok-key">ofrece</span><span class="tok-punct">:</span> <span class="tok-punct">[</span>`,
  `    <span class="tok-string">'Sistemas de inventario y facturación'</span><span class="tok-punct">,</span>`,
  `    <span class="tok-string">'Páginas web y landing pages'</span><span class="tok-punct">,</span>`,
  `    <span class="tok-string">'Automatización de procesos'</span>`,
  `  <span class="tok-punct">],</span>`,
  `  <span class="tok-key">proximamente</span><span class="tok-punct">:</span> <span class="tok-punct">[</span>`,
  `    <span class="tok-string">'Sistema de reservas para salones de belleza'</span><span class="tok-punct">,</span>`,
  `    <span class="tok-string">'Páginas web personalizadas según necesidades del cliente'</span>`,
  `  <span class="tok-punct">],</span>`,
  `  <span class="tok-key">disponible</span><span class="tok-punct">:</span> <span class="tok-kw">true</span><span class="tok-punct">,</span>`,
  `  <span class="tok-key">trabajemos</span><span class="tok-punct">:</span> <span class="tok-kw">function</span><span class="tok-punct">()</span> <span class="tok-punct">{</span>`,
  `    <span class="tok-kw">return</span> <span class="tok-string">'¡Cuéntame tu proyecto y hagámoslo funcionar!'</span><span class="tok-punct">;</span>`,
  `  <span class="tok-punct">}</span>`,
  `<span class="tok-punct">};</span>`,
];

const codeBlock = document.getElementById('codeBlock');
const codeWindow = document.getElementById('codeWindow');
let codeAnimated = false;

function buildCodeLines() {
  codeBlock.innerHTML = codeLines
    .map((html) => `<span class="code-line">${html}</span>\n`)
    .join('');
}

function revealCodeLines() {
  if (codeAnimated) return;
  codeAnimated = true;

  const lineEls = codeBlock.querySelectorAll('.code-line');
  lineEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
      if (i === lineEls.length - 1) {
        el.insertAdjacentHTML('beforeend', ' <span class="cursor"></span>');
      }
    }, i * 90);
  });
}

if (codeBlock && codeWindow) {
  buildCodeLines();

  const codeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealCodeLines();
          codeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  codeObserver.observe(codeWindow);
}

// ===== Generic scroll reveal for future sections =====
const revealTargets = document.querySelectorAll('.reveal');

if (revealTargets.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
}

// ===== Contact form (Formspree) =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    formStatus.textContent = 'Enviando...';
    formStatus.className = 'form-status';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('request failed');

      formStatus.textContent = '¡Mensaje enviado! Te responderé pronto.';
      formStatus.classList.add('form-status--ok');
      contactForm.reset();
    } catch (err) {
      formStatus.textContent = 'No se pudo enviar. Escríbeme directo a diegoarmando17k@gmail.com';
      formStatus.classList.add('form-status--error');
    }
  });
}

// ===== Footer year =====
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===== Header shadow on scroll =====
const header = document.querySelector('.header');

if (header) {
  window.addEventListener('scroll', () => {
    header.style.borderBottomColor = window.scrollY > 10 ? 'var(--accent-dim)' : 'var(--border)';
  });
}

// ===== Galería de proyectos (lightbox) =====
// Para agregar más capturas a un proyecto, solo agrega más entradas al array correspondiente.
const projectGalleries = {
  inventario: [
    { src: 'assets/proyecto-inventario.png', alt: 'Captura del dashboard del Sistema de Inventario' },
  ],
  facturacion: [
    { src: 'assets/proyecto-facturacion.png', alt: 'Captura del detalle de factura del Sistema de Facturación' },
  ],
};

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxClose = document.getElementById('lightboxClose');
const galleryTriggers = document.querySelectorAll('[data-gallery]');

if (lightbox && lightboxImage && galleryTriggers.length) {
  let currentGallery = [];
  let currentIndex = 0;
  let lastFocusedEl = null;

  function renderLightboxImage() {
    const item = currentGallery[currentIndex];
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    lightboxCounter.textContent = currentGallery.length > 1
      ? `${currentIndex + 1} / ${currentGallery.length}`
      : '';
    const hasMultiple = currentGallery.length > 1;
    lightboxPrev.hidden = !hasMultiple;
    lightboxNext.hidden = !hasMultiple;
  }

  function openLightbox(key, triggerEl) {
    const gallery = projectGalleries[key];
    if (!gallery || !gallery.length) return;

    currentGallery = gallery;
    currentIndex = 0;
    lastFocusedEl = triggerEl;

    renderLightboxImage();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    renderLightboxImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    renderLightboxImage();
  }

  galleryTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openLightbox(trigger.dataset.gallery, trigger);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox__backdrop').addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', showNext);
  lightboxPrev.addEventListener('click', showPrev);

  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') showNext();
    if (event.key === 'ArrowLeft') showPrev();
  });
}
