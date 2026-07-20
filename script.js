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
  `  <span class="tok-key">nickName</span><span class="tok-punct">:</span> <span class="tok-string">'Dhost'</span><span class="tok-punct">,</span>`,
  `  <span class="tok-key">fullName</span><span class="tok-punct">:</span> <span class="tok-string">'Diego Armando'</span><span class="tok-punct">,</span>`,
  `  <span class="tok-key">rol</span><span class="tok-punct">:</span> <span class="tok-string">'Desarrollador de Sistemas Informáticos'</span><span class="tok-punct">,</span>`,
  `  <span class="tok-key">ubicacion</span><span class="tok-punct">:</span> <span class="tok-string">'Panamá'</span><span class="tok-punct">,</span>`,
  `  <span class="tok-key">alcance</span><span class="tok-punct">:</span> <span class="tok-string">'Remoto - Internacional'</span><span class="tok-punct">,</span>`,
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
    {
      src: 'assets/proyecto-inventario.png',
      alt: 'Captura del dashboard del Sistema de Inventario',
      caption: 'Dashboard: apenas entras, ves el estado real del negocio — cuánto stock hay y qué se está por acabar — sin tener que revisar hoja por hoja para saberlo.',
    },
    {
      src: 'assets/inventario-productos.png',
      alt: 'Captura del listado de productos del Sistema de Inventario',
      caption: 'Catálogo de productos: cada producto con su stock y su precio, en un solo lugar. Encontrar algo toma segundos, no te toca recordar en qué hoja de cálculo lo anotaste.',
    },
    {
      src: 'assets/inventario-nuevo-producto.png',
      alt: 'Captura del formulario para agregar un producto nuevo',
      caption: 'Agregar producto: cuando llega mercancía nueva, se registra en segundos — nada de anotarlo en papel para pasarlo después a una planilla que nadie más revisa.',
    },
    {
      src: 'assets/inventario-bodegas.png',
      alt: 'Captura del listado de bodegas del Sistema de Inventario',
      caption: 'Bodegas: si tienes más de un local o depósito, cada uno lleva su propio stock, pero tú lo ves todo junto — sin llamar a cada sucursal a preguntar qué queda.',
    },
    {
      src: 'assets/inventario-usuarios.png',
      alt: 'Captura del listado de usuarios del Sistema de Inventario',
      caption: 'Usuarios: cada empleado entra con su propia cuenta. Tú decides quién solo puede ver y quién puede modificar, así siempre sabes quién hizo qué.',
    },
  ],
  facturacion: [
    { src: 'assets/proyecto-facturacion.png', alt: 'Captura del detalle de factura del Sistema de Facturación' },
  ],
};

const projectInfo = {
  inventario: {
    title: 'Sistema de Inventario',
    fin: 'Centralizar en un solo sistema el control de stock de un negocio con más de una bodega o sucursal, para dejar de depender de hojas de cálculo sueltas.',
    paraQueSirve: 'Es un sistema pensado para llevar el control de todo lo que manejas en tu negocio: qué productos tienes, cuánto queda de cada uno y cuándo es momento de reponer. El dueño puede crear accesos para empleados de confianza, así ellos también registran entradas y salidas sin que todo dependa de una sola persona.',
    porQueEsNecesario: 'Muchos negocios todavía llevan el inventario a mano, en cuadernos o papeles sueltos — y basta un número mal escrito, una hoja perdida o confiar en la memoria para que el conteo real deje de coincidir con lo que hay en el negocio. Este sistema elimina ese margen de error: cada movimiento queda registrado, y siempre puedes confiar en lo que ves en pantalla.',
  },
  facturacion: {
    title: 'Sistema de Facturación',
    fin: 'Darle a un negocio pequeño (tienda de barrio, minimarket, taller) un solo sistema para llevar catálogo, stock y facturación electrónica, calculando el ITBMS automáticamente en vez de a mano.',
    paraQueSirve: 'Inventario con stock derivado de movimientos (nunca editable a mano), facturación con ITBMS calculado según la tasa real de cada producto (0% / 7% / 10% / 15%), descuento automático del inventario al facturar, generación de CUFE y QR por factura, y reportes de ventas, ITBMS recaudado e inventario con gráficos.',
    porQueEsNecesario: 'A partir de 2026 más negocios en Panamá quedan obligados a facturar electrónicamente. Un negocio chico sin este tipo de sistema termina facturando a mano o pagando de más por una solución genérica que no conoce su operación.',
  },
};

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxInfoList = document.getElementById('lightboxInfoList');
const lightboxZoomTrigger = document.getElementById('lightboxZoomTrigger');
const lightboxZoom = document.getElementById('lightboxZoom');
const lightboxZoomImage = document.getElementById('lightboxZoomImage');
const galleryTriggers = document.querySelectorAll('[data-gallery]');

const INFO_FIELDS = [
  ['fin', 'Fin del proyecto'],
  ['paraQueSirve', 'Para qué sirve'],
  ['porQueEsNecesario', 'Por qué es necesario'],
];

function renderLightboxInfo(key) {
  const info = projectInfo[key];
  if (!info || !lightboxTitle || !lightboxInfoList) return;

  lightboxTitle.textContent = info.title;

  lightboxInfoList.innerHTML = INFO_FIELDS.map(([field, label]) => {
    const value = info[field];
    if (!value) return '';
    const body = Array.isArray(value)
      ? `<ul>${value.map((item) => `<li>${item}</li>`).join('')}</ul>`
      : `<p>${value}</p>`;
    return `<dt>${label}</dt><dd>${body}</dd>`;
  }).join('');
}

if (lightbox && lightboxImage && galleryTriggers.length) {
  let currentGallery = [];
  let currentIndex = 0;
  let lastFocusedEl = null;

  function renderLightboxImage() {
    const item = currentGallery[currentIndex];
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    lightboxCaption.textContent = item.caption || '';
    lightboxCaption.hidden = !item.caption;
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
    renderLightboxInfo(key);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeZoom() {
    lightboxZoom.hidden = true;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    closeZoom();
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    closeZoom();
    renderLightboxImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    closeZoom();
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

  if (lightboxZoomTrigger && lightboxZoom && lightboxZoomImage) {
    lightboxZoomTrigger.addEventListener('click', () => {
      lightboxZoomImage.src = lightboxImage.src;
      lightboxZoomImage.alt = lightboxImage.alt;
      lightboxZoom.hidden = false;
    });

    lightboxZoom.addEventListener('click', closeZoom);
  }

  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') {
      if (!lightboxZoom.hidden) {
        closeZoom();
        return;
      }
      closeLightbox();
    }
    if (event.key === 'ArrowRight') showNext();
    if (event.key === 'ArrowLeft') showPrev();
  });
}
