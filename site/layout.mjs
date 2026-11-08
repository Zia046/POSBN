// Shared building blocks: HTML helper, icons, header, footer, page shell.
import cfg from './config.mjs';
import icons from './icons.mjs';

const { company, contact } = cfg;

// ---------- tiny safe-HTML helper ----------
class Raw { constructor(s) { this.s = s; } toString() { return this.s; } }
export const raw = (s) => new Raw(String(s));
export const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const part = (v) => (v instanceof Raw ? v.s : Array.isArray(v) ? v.map(part).join('') : v === false || v == null ? '' : esc(v));
export const html = (strings, ...vals) => raw(strings.reduce((o, s, i) => o + s + (i < vals.length ? part(vals[i]) : ''), ''));

// ---------- helpers ----------
export const icon = (name, { size = 20, cls = '' } = {}) =>
  raw(
    `<svg class="icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${icons[name] || ''}</svg>`,
  );

export const waLink = (msg = 'Hello, I would like to know more about Burhan Nexus.') =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(msg)}`;
export const mailLink = (subject = 'Burhan Nexus inquiry') => `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;
export const telLink = () => `tel:+${contact.whatsapp}`;
export const productUrl = (p) => `/products/${p.slug}/`;
export const realProducts = () => cfg.products.filter((p) => p.slug);

export const arrow = icon('arrowRight', { size: 18, cls: 'arrow' });

// ---------- navigation ----------
const NAV = [
  ['Home', '/'],
  ['Products', '/products/'],
  ['Solutions', '/solutions/'],
  ['Services', '/services/'],
  ['About Us', '/about/'],
];
const isActive = (href, path) => (href === '/' ? path === '/' : path.startsWith(href));

const header = (path) => html`
<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header" id="top">
  <div class="container nav-bar">
    <a class="brand" href="/" aria-label="${company.brand} - home">
      <img src="${company.logoSmall}" alt="${company.brand} logo" width="164" height="42" decoding="async">
    </a>
    <nav class="primary-nav" id="primary-nav" aria-label="Primary">
      <ul>
        ${NAV.map(([label, href]) => html`<li><a href="${href}"${isActive(href, path) ? raw(' aria-current="page"') : ''}>${label}</a></li>`)}
      </ul>
      <a class="btn btn-primary nav-cta-mobile" href="/contact/">Contact Us</a>
    </nav>
    <a class="btn btn-primary btn-sm nav-cta" href="/contact/"${path.startsWith('/contact') ? raw(' aria-current="page"') : ''}>Contact Us</a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">
      <span class="when-closed">${icon('menu', { size: 24 })}</span><span class="when-open">${icon('x', { size: 24 })}</span>
    </button>
  </div>
</header>`;

// ---------- footer ----------
const footer = () => html`
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a href="/" aria-label="${company.brand} - home"><img src="${company.logoSmall}" alt="${company.brand} logo" width="150" height="38" loading="lazy" decoding="async"></a>
      <p class="footer-tag">${company.tagline}</p>
      <p class="footer-sub">${company.statement}</p>
    </div>
    <div>
      <h3>Quick Links</h3>
      <ul>
        <li><a href="/">Home</a></li><li><a href="/products/">Products</a></li><li><a href="/solutions/">Solutions</a></li>
        <li><a href="/services/">Services</a></li><li><a href="/about/">About Us</a></li><li><a href="/downloads/">Downloads</a></li>
        <li><a href="/faq/">FAQ</a></li><li><a href="/contact/">Contact</a></li>
      </ul>
    </div>
    <div>
      <h3>Products</h3>
      <ul>
        ${realProducts().map((p) => html`<li><a href="${productUrl(p)}">${p.short}</a></li>`)}
      </ul>
    </div>
    <div>
      <h3>Contact</h3>
      <ul>
        <li><a href="${waLink()}" target="_blank" rel="noopener" data-track="whatsapp_click">WhatsApp: <span class="ltr">${contact.phoneDisplay}</span></a></li>
        <li><a href="${mailLink()}" data-track="email_click">${contact.email}</a></li>
        ${contact.facebook ? html`<li><a href="${contact.facebook}" target="_blank" rel="noopener" data-track="facebook_click">Facebook</a></li>` : ''}
      </ul>
    </div>
    <div>
      <h3>Legal</h3>
      <ul>
        <li><a href="/privacy-policy/">Privacy Policy</a></li>
        <li><a href="/terms/">Terms &amp; Conditions</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>&copy; ${new Date().getFullYear()} ${company.brand}. All Rights Reserved.</p>
  </div>
</footer>
<a class="wa-float" href="${waLink()}" target="_blank" rel="noopener" data-track="whatsapp_float_click" aria-label="Chat with us on WhatsApp">${icon('whatsapp', { size: 26 })}<span>WhatsApp</span></a>
<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Image preview" hidden>
  <button class="lb-btn lb-close" type="button" aria-label="Close preview">${icon('x', { size: 24 })}</button>
  <button class="lb-btn lb-prev" type="button" aria-label="Previous image">${icon('chevLeft', { size: 28 })}</button>
  <figure class="lb-figure"><img class="lb-img" alt=""><figcaption class="lb-cap"></figcaption></figure>
  <button class="lb-btn lb-next" type="button" aria-label="Next image">${icon('chevRight', { size: 28 })}</button>
</div>`;

// ---------- page shell ----------
export function page({ path, title, description, body, image, schema = [], noindex = false }) {
  const url = cfg.siteUrl.replace(/\/$/, '') + path;
  const fullTitle = path === '/' ? title : `${title} | ${company.brand}`;
  const img = cfg.siteUrl.replace(/\/$/, '') + (image || company.ogImage);
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.brand,
    url: cfg.siteUrl,
    logo: cfg.siteUrl.replace(/\/$/, '') + company.logo,
    slogan: company.tagline,
    description: company.intro,
    email: contact.email,
    ...(contact.facebook ? { sameAs: [contact.facebook] } : {}),
    ...(cfg.founder ? { founder: { '@type': 'Person', name: cfg.founder.name, jobTitle: cfg.founder.role } } : {}),
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer support', email: contact.email, telephone: '+' + contact.whatsapp }],
  };
  const ld = [org, ...schema].map((s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`).join('\n');
  const ga = cfg.analytics.ga4Id
    ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(cfg.analytics.ga4Id)}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(cfg.analytics.ga4Id)}');</script>`
    : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="canonical" href="${esc(url)}">
<meta name="theme-color" content="#0B1630">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(company.brand)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(img)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="48x48" href="/assets/img/favicon.png">
<link rel="icon" type="image/png" sizes="512x512" href="/assets/img/favicon-512.png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css">
<script>document.documentElement.classList.add('js')</script>
${ld}
${ga}
</head>
<body>
${header(path).s}
<main id="main">
${body.s}
</main>
${footer().s}
<script src="/assets/js/main.js" defer></script>
</body>
</html>
`;
}

// ---------- reusable components ----------
export const sectionHead = ({ eyebrow, title, text, light = false }) => html`
<div class="section-head reveal${light ? ' on-dark' : ''}">
  ${eyebrow ? html`<span class="eyebrow">${eyebrow}</span>` : ''}
  <h2>${title}</h2>
  ${text ? html`<p>${text}</p>` : ''}
</div>`;

export const pageHero = ({ eyebrow, title, text, crumbs = [] }) => html`
<section class="page-hero">
  <div class="hero-bg" aria-hidden="true"><span class="orb o1"></span><span class="orb o2"></span><span class="grid-lines"></span></div>
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a>${crumbs.map(([l, h]) => html`<span aria-hidden="true">/</span>${h ? html`<a href="${h}">${l}</a>` : html`<span aria-current="page">${l}</span>`}`)}</nav>
    ${eyebrow ? html`<span class="eyebrow">${eyebrow}</span>` : ''}
    <h1>${title}</h1>
    ${text ? html`<p class="lead">${text}</p>` : ''}
  </div>
</section>`;

export const ctaBand = ({ title, text, primary, secondary }) => html`
<section class="cta-band">
  <div class="container">
    <div class="cta-card reveal">
      <h2>${title}</h2>
      <p>${text}</p>
      <div class="btn-row center">
        <a class="btn btn-primary btn-lg" href="${primary[1]}">${primary[0]} ${arrow}</a>
        <a class="btn btn-ghost btn-lg" href="${secondary[1]}">${secondary[0]}</a>
      </div>
    </div>
  </div>
</section>`;

export const featureCard = (f) => html`
<article class="card feature reveal">
  <span class="icon-chip">${icon(f.icon, { size: 24 })}</span>
  <h3>${f.title}</h3>
  <p>${f.text}</p>
</article>`;

export const statusBadge = (p) =>
  p.status === 'available' ? html`<span class="pill pill-ok">Available</span>` : html`<span class="pill pill-soon">${p.statusLabel || 'Coming Soon'}</span>`;

// Screenshot item: real image if the file exists at runtime, otherwise a clean placeholder (handled by main.js)
export const shot = (s, { group = 'gallery', eager = false } = {}) => html`
<figure class="shot reveal">
  <a class="shot-frame" href="${s.src}" data-lightbox="${group}" data-caption="${s.title}" aria-label="Enlarge: ${s.title}">
    <img src="${s.src}" alt="${s.alt}" width="1366" height="728" ${eager ? '' : raw('loading="lazy"')} decoding="async" data-shot>
  </a>
  <figcaption>${s.title}</figcaption>
</figure>`;
