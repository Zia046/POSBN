// All page templates. Content comes from site/config.mjs.
import cfg from './config.mjs';
import icons from './icons.mjs';
import {
  html, raw, icon, arrow, page, sectionHead, pageHero, ctaBand, featureCard, statusBadge, shot,
  waLink, mailLink, telLink, productUrl, realProducts,
} from './layout.mjs';

const { company, contact } = cfg;
const P = (slug) => cfg.products.find((p) => p.slug === slug);
const desktop = P('pos-desktop');
const lms = P('lms');
const LEGAL_DATE = '6 November 2026';

// ---------- small pieces ----------
const checkList = (items, cls = '') => html`<ul class="check-list ${cls}">${items.map((i) => html`<li>${icon('check', { size: 18 })}<span>${i}</span></li>`)}</ul>`;

const nested = (name, x, y, s, stroke = '#fff') =>
  raw(`<svg x="${x}" y="${y}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`);

// "Nexus" illustration: three product nodes connected to a central node
const nexusArt = () => html`
<div class="nexus-art" role="img" aria-label="Illustration: Burhan Nexus connects desktop, mobile and utility software">
<svg viewBox="0 0 480 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1769E0"/><stop offset="1" stop-color="#38A5FF"/></linearGradient>
    <radialGradient id="g2" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#38A5FF" stop-opacity=".35"/><stop offset="1" stop-color="#38A5FF" stop-opacity="0"/></radialGradient>
  </defs>
  <circle cx="240" cy="200" r="190" fill="url(#g2)"/>
  <circle cx="240" cy="200" r="120" fill="none" stroke="#1769E0" stroke-opacity=".25" stroke-dasharray="4 8"/>
  <circle cx="240" cy="200" r="170" fill="none" stroke="#1769E0" stroke-opacity=".15"/>
  <g stroke="#1769E0" stroke-opacity=".5" stroke-width="2" stroke-dasharray="6 8" class="flow">
    <line x1="240" y1="200" x2="95" y2="95"/><line x1="240" y1="200" x2="385" y2="95"/><line x1="240" y1="200" x2="240" y2="335"/>
  </g>
  <circle cx="240" cy="200" r="52" fill="url(#g1)"/>
  ${nested('sparkles', 218, 178, 44)}
  <g>
    <rect x="55" y="55" width="80" height="80" rx="20" fill="#fff" stroke="#E3E9F3"/>${nested('monitor', 77, 77, 36, '#1769E0')}
    <rect x="345" y="55" width="80" height="80" rx="20" fill="#fff" stroke="#E3E9F3"/>${nested('smartphone', 367, 77, 36, '#1769E0')}
    <rect x="200" y="295" width="80" height="80" rx="20" fill="#fff" stroke="#E3E9F3"/>${nested('key', 222, 317, 36, '#1769E0')}
  </g>
  <g font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#152238" text-anchor="middle">
    <text x="95" y="160">Desktop</text><text x="385" y="160">Mobile</text><text x="240" y="395">Utilities</text>
  </g>
</svg></div>`;

const laptop = (s, { eager = true } = {}) => html`
<div class="laptop">
  <div class="laptop-screen"><img src="${s.src}" alt="${s.alt}" width="1366" height="728" ${eager ? raw('fetchpriority="high"') : raw('loading="lazy"')} decoding="async" data-shot></div>
  <div class="laptop-base" aria-hidden="true"></div>
</div>`;

const phone = (s) => html`
<div class="phone"><div class="phone-screen"><img src="${s.src}" alt="${s.alt}" width="720" height="1440" loading="lazy" decoding="async" data-shot></div></div>`;

const productCard = (p, { maxFeatures = 7 } = {}) => {
  if (!p.slug)
    return html`
<article class="card product-card upcoming reveal">
  <div class="pc-top"><span class="icon-chip lg">${icon(p.icon, { size: 28 })}</span><span class="pill pill-soon">${p.badge}</span></div>
  <h3>${p.name}</h3><p class="pc-cat">${p.category}</p>
  <p>${p.summary}</p>
  <p class="stay-tuned">${icon('rocket', { size: 18 })} Stay tuned for what comes next.</p>
</article>`;
  return html`
<article class="card product-card reveal${p.featured ? ' featured' : ''}">
  <div class="pc-top"><span class="icon-chip lg">${icon(p.icon, { size: 28 })}</span><span class="pill-pair">${p.featured ? html`<span class="pill pill-new">NEW</span>` : ''}<span class="pill">${p.badge}</span></span></div>
  <h3>${p.name}</h3><p class="pc-cat">${p.category}</p>
  <p>${p.summary}</p>
  ${checkList(p.features.slice(0, maxFeatures).map((f) => f.title))}
  <a class="btn btn-outline" href="${productUrl(p)}">Explore Product ${arrow}</a>
</article>`;
};

// =====================================================================
//  HOME
// =====================================================================
const labFlow = (steps) => html`
<div class="flow-card" role="img" aria-label="Laboratory workflow: ${steps.map((x) => x.title).join(', ')}">
  <div class="flow-head"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><b>Lab workflow</b></div>
  <ol class="flow-list">${steps.map((x, i) => html`<li><span class="flow-ic">${icon(x.icon, { size: 20 })}</span><span class="flow-t"><b>${x.title}</b><small>${x.short}</small></span><span class="flow-n">${i + 1}</span></li>`)}</ol>
</div>`;

const lmsFeature = (p) => html`
<section class="section lms-feature" id="lms">
  <div class="hero-bg" aria-hidden="true"><span class="orb o1"></span><span class="grid-lines"></span></div>
  <div class="container lms-grid">
    <div class="reveal">
      <div class="pill-row"><span class="pill pill-new">NEW</span><span class="pill pill-light">${p.statusLabel || 'Coming Soon'}</span></div>
      <span class="eyebrow">Laboratory Management System</span>
      <h2>${p.name}</h2>
      <p class="lms-sub">Software for medical laboratories, from booking to a verified report.</p>
      <p class="big">${p.intro}</p>
      ${checkList(['Patient registration, booking and billing', 'Result entry with automatic units, ranges and flags', 'Verification before release, with QR-checked reports', 'Samples, accounts, inventory, users and daily backup', 'Works offline on your own computer'])}
      <div class="btn-row">
        <a class="btn btn-primary btn-lg" href="${productUrl(p)}">Explore Burhan Nexus LMS ${arrow}</a>
        <a class="btn btn-ghost btn-lg" href="${waLink(p.waMessage)}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp', { size: 18 })} Ask on WhatsApp</a>
      </div>
    </div>
    <div class="reveal">${labFlow(p.workflow)}</div>
  </div>
</section>`;

export function home() {
  const showcase = [desktop.screenshots[0], desktop.screenshots[1], desktop.screenshots[3], desktop.screenshots[4], desktop.screenshots[5], P('product-code-decoder').screenshots[0]];
  const body = html`
<section class="hero">
  <div class="hero-bg" aria-hidden="true"><span class="orb o1"></span><span class="orb o2"></span><span class="orb o3"></span><span class="grid-lines"></span></div>
  <div class="container hero-grid">
    <div class="hero-copy">
      <a class="announce" href="/products/lms/"><span class="pill pill-new">NEW</span> Laboratory Management System, coming soon ${arrow}</a>
      <span class="eyebrow">Software Technology Company</span>
      <h1>${company.tagline}</h1>
      <p class="lead">Empowering businesses and individuals through intelligent software, innovative digital solutions, and technology designed to make everyday operations simpler, smarter, and more efficient.</p>
      <div class="btn-row">
        <a class="btn btn-primary btn-lg" href="/products/">Explore Our Products ${arrow}</a>
        <a class="btn btn-ghost btn-lg" href="/contact/">Get in Touch</a>
      </div>
      <ul class="hero-points">
        <li>${icon('wifiOff', { size: 18 })} Works offline</li>
        <li>${icon('lock', { size: 18 })} Encrypted local data</li>
        <li>${icon('headphones', { size: 18 })} Support on WhatsApp</li>
      </ul>
    </div>
    <div class="hero-visual">
      ${laptop(desktop.screenshots[0])}
      <span class="hero-caption">Burhan Nexus POS — Desktop</span>
    </div>
  </div>
</section>

${lmsFeature(lms)}

<section class="section" id="about-intro">
  <div class="container split">
    <div class="split-text reveal">
      <span class="eyebrow">Who we are</span>
      <h2>Welcome to Burhan Nexus</h2>
      <p class="big">${company.intro}</p>
      <p class="statement">${company.statement}</p>
      <a class="btn btn-outline" href="/about/">About Us ${arrow}</a>
    </div>
    <div class="reveal">${nexusArt()}</div>
  </div>
</section>

<section class="section section-alt" id="products">
  <div class="container">
    ${sectionHead({ eyebrow: 'Our Products', title: 'Software built for real businesses', text: 'Practical products you can start using today, and new ones on the way.' })}
    <div class="grid grid-4 products-grid">${cfg.products.filter((p) => !p.featured).map((p) => productCard(p, { maxFeatures: p.slug === 'pos-desktop' ? 7 : 5 }))}</div>
  </div>
</section>

<section class="section" id="services">
  <div class="container">
    ${sectionHead({ eyebrow: 'Our Services', title: 'From idea to working software', text: 'We build the software your business needs, and help you choose it.' })}
    <div class="grid grid-5">${cfg.services.map((s) => html`
      <article class="card service-mini reveal"><span class="icon-chip">${icon(s.icon, { size: 24 })}</span><h3>${s.title}</h3><p>${s.text}</p></article>`)}</div>
    <p class="center-link"><a class="link-arrow" href="/services/">See all services ${arrow}</a></p>
  </div>
</section>

<section class="section section-alt" id="why">
  <div class="container">
    ${sectionHead({ eyebrow: 'Why Choose Burhan Nexus?', title: 'Technology Built Around Your Needs.' })}
    <div class="grid grid-3">${cfg.why.map(featureCard)}</div>
  </div>
</section>

<section class="section" id="showcase">
  <div class="container">
    ${sectionHead({ eyebrow: 'Software Showcase', title: 'See the software', text: 'Real screens from our products. Click any image to enlarge.' })}
    <div class="gallery">${showcase.map((s) => shot(s, { group: 'home' }))}</div>
  </div>
</section>

<section class="mission" id="mission">
  <div class="hero-bg" aria-hidden="true"><span class="orb o1"></span><span class="orb o2"></span></div>
  <div class="container reveal">
    <span class="eyebrow">Our Mission</span>
    <h2>Our Mission</h2>
    <p class="mission-text">${company.mission}</p>
  </div>
</section>

${ctaBand({
  title: 'Ready to Make Your Business Smarter?',
  text: 'Discover how Burhan Nexus can simplify your business operations through innovative software solutions.',
  primary: ['Explore Products', '/products/'],
  secondary: ['Contact Our Team', '/contact/'],
})}`;
  return page({
    path: '/',
    title: `${company.brand} | ${company.tagline}`,
    description: 'Burhan Nexus builds practical software: offline POS and business management for Windows, Android apps and custom business software. ' + company.statement,
    body,
  });
}

// =====================================================================
//  PRODUCTS LIST
// =====================================================================
export function products() {
  const body = html`
${pageHero({ eyebrow: 'Products', title: 'Our Products', text: 'Desktop and mobile software that simplifies sales, stock and everyday business work.', crumbs: [['Products']] })}
<section class="section">
  <div class="container">
    <div class="grid grid-2 products-grid">${cfg.products.map((p) => productCard(p, { maxFeatures: p.slug === 'pos-desktop' ? 7 : 5 }))}</div>
  </div>
</section>
${ctaBand({ title: 'Not sure which product fits?', text: 'Tell us about your business and we will point you in the right direction.', primary: ['Contact Our Team', '/contact/'], secondary: ['View Downloads', '/downloads/'] })}`;
  return page({ path: '/products/', title: 'Products', description: 'Burhan Nexus products: POS Desktop, POS Mobile and the Product Code Decoder. Practical software for shops and small businesses.', body });
}

// =====================================================================
//  PRODUCT DETAIL
// =====================================================================
export function productPage(p) {
  const dl = cfg.downloads.find((d) => d.product === p.slug);
  const available = p.status === 'available';
  const plan = p.pricing.plans[0];
  const demoUrl = dl && dl.url;
  const isDesktop = p.badge.includes('Desktop');
  const hero = p.screenshots[0];

  const demoBtn = demoUrl
    ? html`<a class="btn btn-outline-light btn-lg" href="${demoUrl}" data-track="download_click" download>${icon('download', { size: 18 })} Download Demo</a>`
    : html`<span class="btn btn-disabled btn-lg" aria-disabled="true" title="Not published yet">${icon('download', { size: 18 })} ${available ? 'Demo download: on request' : 'Download: not available yet'}</span>`;

  let n = 0;
  const alt = () => (n++ % 2 === 0 ? 'section' : 'section section-alt');

  const body = html`
<section class="page-hero product-hero">
  <div class="hero-bg" aria-hidden="true"><span class="orb o1"></span><span class="orb o2"></span><span class="grid-lines"></span></div>
  <div class="container product-hero-grid">
    <div>
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/products/">Products</a><span aria-hidden="true">/</span><span aria-current="page">${p.short}</span></nav>
      <div class="pill-row"><span class="pill pill-light">${p.badge}</span>${statusBadge(p)}</div>
      <h1>${p.name}</h1>
      <p class="pc-cat light">${p.category}</p>
      <p class="lead">${p.summary}</p>
      ${plan ? html`<p class="price-chip"><strong>${plan.price}</strong> ${plan.period}${plan.highlight ? html` <span class="dot">•</span> <b>${plan.highlight}</b>` : ''}</p>` : ''}
      <div class="btn-row">
        <a class="btn btn-primary btn-lg" href="${waLink(p.waMessage)}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp', { size: 18 })} ${available ? 'Purchase Inquiry on WhatsApp' : 'Ask on WhatsApp'}</a>
        ${demoBtn}
      </div>
    </div>
    <div class="hero-visual">${p.workflow ? labFlow(p.workflow) : isDesktop ? laptop(hero) : phone(hero)}</div>
  </div>
</section>

<section class="${alt()}" id="overview">
  <div class="container overview">
    <div class="reveal">
      <span class="eyebrow">Overview</span>
      <h2>${p.name}</h2>
      <p class="big">${p.intro}</p>
    </div>
    <aside class="card facts reveal" aria-label="Product facts">
      <h3>At a glance</h3>
      <dl>
        <dt>Platform</dt><dd>${dl ? dl.platform : ''}</dd>
        <dt>Category</dt><dd>${p.category}</dd>
        <dt>Availability</dt><dd>${available ? 'Available' : (p.statusLabel || 'Coming soon')}</dd>
        ${plan ? html`<dt>Price</dt><dd>${plan.price} (${plan.period})</dd>` : ''}
        ${p.offline && p.offline.title ? html`<dt>Internet</dt><dd>Not required</dd>` : ''}
      </dl>
    </aside>
  </div>
</section>

${p.concept ? html`<section class="${alt()}" id="concept">${decoderConcept(p)}</section>` : ''}

<section class="${alt()}" id="features">
  <div class="container">
    ${sectionHead({ eyebrow: 'Key Features', title: `What ${p.short} does` })}
    <div class="grid grid-3">${p.features.map(featureCard)}</div>
    ${p.moreFeatures.length ? html`
      <h3 class="subhead reveal">${p.moreTitle}</h3>
      <div class="grid grid-4 compact">${p.moreFeatures.map(featureCard)}</div>` : ''}
  </div>
</section>

${p.workflow ? html`
<section class="${alt()}" id="workflow">
  <div class="container">
    ${sectionHead({ eyebrow: 'How it works', title: p.workflowTitle, text: p.workflowText })}
    <div class="grid grid-3">${p.workflow.map((x, i) => html`<article class="card step reveal"><span class="step-no">${i + 1}</span><h3>${x.title}</h3><p>${x.text}</p></article>`)}</div>
  </div>
</section>` : ''}

<section class="${alt()}" id="screenshots">
  <div class="container">
    ${sectionHead({ eyebrow: 'Screenshots', title: available ? 'See it in action' : 'Preview', text: available ? 'Real screens from the software. Click any image to enlarge.' : 'Screenshots will be added when the product is ready.' })}
    <div class="gallery">${p.screenshots.map((s) => shot(s, { group: p.slug }))}</div>
  </div>
</section>

<section class="${alt()}" id="video">
  <div class="container narrow">
    ${sectionHead({ eyebrow: 'Demonstration', title: 'Product demonstration video' })}
    ${p.video.url
      ? html`<div class="video reveal"><iframe src="${p.video.url}" title="${p.video.title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
      : html`<div class="video video-empty reveal">${icon('play', { size: 40 })}<p><strong>Demonstration video coming soon</strong></p><p>Want to see it working? <a href="${waLink(p.waMessage)}" target="_blank" rel="noopener">Ask us for a live demo on WhatsApp</a>.</p></div>`}
  </div>
</section>

${p.offline && p.offline.title ? html`
<section class="${alt()}" id="offline">
  <div class="container split">
    <div class="reveal"><span class="eyebrow">Offline functionality</span><h2>${p.offline.title}</h2><p class="big">${p.offline.text}</p></div>
    <div class="card reveal offline-card"><span class="icon-chip lg">${icon('wifiOff', { size: 28 })}</span>${checkList(p.offline.points)}</div>
  </div>
</section>` : ''}

${p.safety ? html`
<section class="${alt()}" id="safety">
  <div class="container split">
    <div class="reveal"><span class="eyebrow">Safety</span><h2>${p.safety.title}</h2><p class="big">${p.safety.text}</p></div>
    <div class="card reveal offline-card"><span class="icon-chip lg">${icon('shield', { size: 28 })}</span>${checkList(p.safety.points)}</div>
  </div>
</section>` : ''}

${p.roadmap ? html`
<section class="${alt()}" id="roadmap">
  <div class="container">
    ${sectionHead({ eyebrow: 'Roadmap', title: p.roadmap.title, text: p.roadmap.text })}
    <div class="grid grid-3">${p.roadmap.items.map((x) => html`<article class="card reveal"><div class="pc-top"><span class="icon-chip">${icon(x.icon, { size: 24 })}</span><span class="pill pill-plan">Planned</span></div><h3>${x.title}</h3><p>${x.text}</p></article>`)}</div>
  </div>
</section>` : ''}

<section class="${alt()}" id="requirements">
  <div class="container narrow">
    ${sectionHead({ eyebrow: 'Requirements', title: 'System requirements' })}
    <div class="card reveal">${checkList(p.requirements)}</div>
  </div>
</section>

<section class="${alt()}" id="pricing">
  <div class="container narrow">
    ${sectionHead({ eyebrow: 'Pricing', title: p.pricing.title, text: p.pricing.text })}
    ${p.pricing.plans.length
      ? p.pricing.plans.map((pl) => html`
      <div class="plan reveal">
        ${pl.highlight ? html`<div class="plan-flag">${pl.highlight}</div>` : ''}
        <h3>${pl.name}</h3>
        <div class="plan-price">${pl.price}</div><div class="plan-period">${pl.period}</div>
        ${checkList(pl.includes)}
        <a class="btn btn-primary btn-lg" href="${waLink(p.waMessage)}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp', { size: 18 })} Start on WhatsApp</a>
        ${p.pricing.note ? html`<p class="fine">${p.pricing.note}</p>` : ''}
      </div>`)
      : html`<div class="plan reveal plan-soon"><p>Pricing will be shared at launch.</p><a class="btn btn-primary" href="${waLink(p.waMessage)}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp', { size: 18 })} Ask on WhatsApp</a></div>`}
  </div>
</section>

<section class="${alt()}" id="faq">
  <div class="container narrow">
    ${sectionHead({ eyebrow: 'FAQ', title: 'Frequently asked questions' })}
    ${faqList(p.faqs)}
  </div>
</section>

${ctaBand({ title: `Interested in ${p.short}?`, text: 'Message us and we will answer your questions, show you a demo and help you get started.', primary: ['Contact Our Team', '/contact/'], secondary: ['All Products', '/products/'] })}`;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: p.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: isDesktop ? 'Windows' : 'Android',
      description: p.summary,
      publisher: { '@type': 'Organization', name: company.brand },
      ...(available && plan ? { offers: { '@type': 'Offer', price: plan.price.replace(/[^0-9.]/g, ''), priceCurrency: 'PKR' } } : {}),
    },
  ];
  return page({ path: productUrl(p), title: p.name, description: p.summary, body, schema });
}

function decoderConcept(p) {
  const c = p.concept;
  const key = c.exampleKey;
  return html`
<div class="container">
  ${sectionHead({ eyebrow: 'The concept', title: c.title, text: c.text })}
  <div class="grid grid-3 steps">${c.steps.map((s, i) => html`<article class="card step reveal"><span class="step-no">${i + 1}</span><h3>${s.title}</h3><p>${s.text}</p></article>`)}</div>
  <div class="card decoder reveal" data-decoder data-key="${key}">
    <h3>Try the idea</h3>
    <p class="fine">Illustrative example only. This is <strong>not</strong> a real shop code. In the app you choose your own letters.</p>
    <div class="key-table" role="table" aria-label="Example key">
      <div role="row"><span role="columnheader">Digit</span>${[...key].map((_, i) => html`<span role="cell">${i}</span>`)}</div>
      <div role="row" class="letters"><span role="columnheader">Letter</span>${[...key].map((l) => html`<span role="cell">${l}</span>`)}</div>
    </div>
    <div class="decoder-io">
      <label>Purchase price (numbers)<input type="text" inputmode="numeric" autocomplete="off" placeholder="e.g. 4500" data-in-price></label>
      <div class="out" aria-live="polite"><span>Code</span><output data-out-code>-</output></div>
      <label>Code (letters)<input type="text" autocomplete="off" placeholder="e.g. KHBB" data-in-code></label>
      <div class="out" aria-live="polite"><span>Price</span><output data-out-price>-</output></div>
    </div>
  </div>
</div>`;
}

// =====================================================================
//  SOLUTIONS
// =====================================================================
export function solutions() {
  const body = html`
${pageHero({ eyebrow: 'Solutions', title: 'Solutions for the way you work', text: 'Software shaped around the everyday needs of different kinds of businesses.', crumbs: [['Solutions']] })}
<section class="section">
  <div class="container">
    <div class="grid grid-2">${cfg.solutions.map((s) => html`
      <article class="card solution reveal">
        <span class="icon-chip lg">${icon(s.icon, { size: 28 })}</span>
        <h3>${s.title}</h3><p>${s.text}</p>
        ${checkList(s.points)}
        <a class="link-arrow" href="${productUrl(P(s.product))}">${P(s.product).short} ${arrow}</a>
      </article>`)}</div>
  </div>
</section>
<section class="section section-alt">
  <div class="container narrow center-text reveal">
    <span class="eyebrow">Something different?</span>
    <h2>We can build it for you</h2>
    <p class="big">If your business has its own way of working, we can design custom software around it.</p>
    <a class="btn btn-primary btn-lg" href="/services/">Our Services ${arrow}</a>
  </div>
</section>
${ctaBand({ title: 'Ready to Make Your Business Smarter?', text: 'Tell us about your business and we will suggest the right solution.', primary: ['Contact Our Team', '/contact/'], secondary: ['Explore Products', '/products/'] })}`;
  return page({ path: '/solutions/', title: 'Solutions', description: 'Software solutions for mobile phone shops, retail stores, credit and installment businesses, and repair centers from Burhan Nexus.', body });
}

// =====================================================================
//  SERVICES
// =====================================================================
export function services() {
  const body = html`
${pageHero({ eyebrow: 'Services', title: 'Software services', text: 'We design, build and support software for businesses that want to work smarter.', crumbs: [['Services']] })}
<section class="section">
  <div class="container">
    <div class="grid grid-3">${cfg.services.map((s) => html`
      <article class="card service reveal">
        <span class="icon-chip lg">${icon(s.icon, { size: 28 })}</span>
        <h3>${s.title}</h3><p>${s.text}</p>${checkList(s.points)}
      </article>`)}
      <article class="card service service-cta reveal"><h3>Have a different idea?</h3><p>Tell us what you need and we will tell you honestly how we can help.</p><a class="btn btn-primary" href="/contact/">Talk to us ${arrow}</a></article>
    </div>
  </div>
</section>
<section class="section section-alt">
  <div class="container">
    ${sectionHead({ eyebrow: 'How we work', title: 'A simple, clear process' })}
    <div class="grid grid-4 steps">${cfg.process.map((s, i) => html`<article class="card step reveal"><span class="step-no">${i + 1}</span><h3>${s.title}</h3><p>${s.text}</p></article>`)}</div>
  </div>
</section>
${ctaBand({ title: 'Let us build something useful together', text: 'Share your idea or your problem. We will get back to you.', primary: ['Contact Our Team', '/contact/'], secondary: ['See Our Products', '/products/'] })}`;
  return page({ path: '/services/', title: 'Services', description: 'Desktop software development, Android app development, custom business software, automation and consultation from Burhan Nexus.', body });
}

// =====================================================================
//  ABOUT
// =====================================================================
export function about() {
  const body = html`
${pageHero({ eyebrow: 'About Us', title: 'About Burhan Nexus', text: company.statement, crumbs: [['About Us']] })}
<section class="section">
  <div class="container split">
    <div class="reveal"><span class="eyebrow">Our story</span><h2>Smart software for everyday business</h2><p class="big">${company.intro}</p>
      <p>We build software the practical way: we listen to how a business works, we make the tool simple, and we stand behind it with real support.</p></div>
    <div class="reveal">${nexusArt()}</div>
  </div>
</section>
<section class="mission" id="mission">
  <div class="hero-bg" aria-hidden="true"><span class="orb o1"></span><span class="orb o2"></span></div>
  <div class="container reveal"><span class="eyebrow">Our Mission</span><h2>Our Mission</h2><p class="mission-text">${company.mission}</p></div>
</section>
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: 'What we value', title: 'Technology Built Around Your Needs.' })}
    <div class="grid grid-3">${cfg.why.map(featureCard)}</div>
  </div>
</section>
<section class="section section-alt">
  <div class="container">
    ${sectionHead({ eyebrow: 'What we build', title: 'Our products' })}
    <div class="grid grid-3">${realProducts().map((p) => html`
      <a class="card link-card reveal" href="${productUrl(p)}"><span class="icon-chip">${icon(p.icon, { size: 24 })}</span><h3>${p.name}</h3><p>${p.summary}</p><span class="link-arrow">Learn more ${arrow}</span></a>`)}</div>
    ${(contact.address || contact.hours) ? html`<div class="card reveal company-info"><h3>Company information</h3><dl>
      ${contact.address ? html`<dt>Address</dt><dd>${contact.address}</dd>` : ''}${contact.hours ? html`<dt>Hours</dt><dd>${contact.hours}</dd>` : ''}</dl></div>` : ''}
  </div>
</section>
${ctaBand({ title: 'Ready to Make Your Business Smarter?', text: 'Discover how Burhan Nexus can simplify your business operations through innovative software solutions.', primary: ['Explore Products', '/products/'], secondary: ['Contact Our Team', '/contact/'] })}`;
  return page({ path: '/about/', title: 'About Us', description: 'Burhan Nexus is a technology-focused software company building practical, reliable and user-friendly software for businesses.', body });
}

// =====================================================================
//  CONTACT
// =====================================================================
export function contactPage() {
  const formOn = cfg.form.mode === 'netlify';
  const cards = [
    html`<a class="card contact-card" href="${waLink()}" target="_blank" rel="noopener" data-track="whatsapp_click"><span class="icon-chip">${icon('whatsapp', { size: 24 })}</span><div><h3>WhatsApp</h3><p class="ltr">${contact.phoneDisplay}</p><span class="link-arrow">Chat now ${arrow}</span></div></a>`,
    html`<a class="card contact-card" href="${mailLink()}" data-track="email_click"><span class="icon-chip">${icon('mail', { size: 24 })}</span><div><h3>Email</h3><p class="ltr">${contact.email}</p><span class="link-arrow">Send an email ${arrow}</span></div></a>`,
    html`<a class="card contact-card" href="${telLink()}" data-track="call_click"><span class="icon-chip">${icon('phone', { size: 24 })}</span><div><h3>Call</h3><p class="ltr">${contact.phoneDisplay}</p><span class="link-arrow">Call now ${arrow}</span></div></a>`,
  ];
  if (contact.facebook) cards.push(html`<a class="card contact-card" href="${contact.facebook}" target="_blank" rel="noopener" data-track="facebook_click"><span class="icon-chip">${icon('facebook', { size: 24 })}</span><div><h3>Facebook</h3><p>Visit our page</p><span class="link-arrow">Open Facebook ${arrow}</span></div></a>`);
  const body = html`
${pageHero({ eyebrow: 'Contact Us', title: 'Get in touch', text: 'Ask a question, request a demo or tell us about your project. We are happy to help.', crumbs: [['Contact Us']] })}
<section class="section">
  <div class="container contact-grid">
    <div class="contact-cards">${cards}
      ${(contact.address || contact.hours) ? html`<div class="card"><h3>Visit / hours</h3>${contact.address ? html`<p>${contact.address}</p>` : ''}${contact.hours ? html`<p>${contact.hours}</p>` : ''}</div>` : ''}
    </div>
    <div class="card form-card reveal">
      <h2>Send us a message</h2>
      ${formOn ? '' : html`<div class="notice notice-warn" role="note">${icon('info', { size: 20 })}<p><strong>The contact form is not connected yet.</strong> A contact service must be configured before this form can send messages. Please use WhatsApp or email above.</p></div>`}
      <form name="contact" method="POST" ${formOn ? raw('data-netlify="true" netlify-honeypot="bot-field" data-live="1"') : raw('data-live="0"')} novalidate>
        <input type="hidden" name="form-name" value="contact">
        <p class="hp" aria-hidden="true"><label>Do not fill this out <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <div class="field"><label for="f-name">Full Name</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
        <div class="field-row">
          <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
          <div class="field"><label for="f-phone">Phone Number</label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>
        </div>
        <div class="field"><label for="f-subject">Subject</label><input id="f-subject" name="subject" type="text" required></div>
        <div class="field"><label for="f-message">Message</label><textarea id="f-message" name="message" rows="5" required></textarea></div>
        <button class="btn btn-primary btn-lg" type="submit"${formOn ? '' : raw(' disabled')}><span class="btn-label">Send Message</span></button>
        <div class="form-status" role="status" aria-live="polite" hidden></div>
      </form>
    </div>
  </div>
</section>`;
  return page({ path: '/contact/', title: 'Contact Us', description: 'Contact Burhan Nexus on WhatsApp, email or through the contact form.', body });
}

// =====================================================================
//  DOWNLOADS
// =====================================================================
export function downloads() {
  const tba = 'To be announced';
  const body = html`
${pageHero({ eyebrow: 'Downloads', title: 'Download Center', text: 'Official downloads for Burhan Nexus software. Files appear here as soon as they are published.', crumbs: [['Downloads']] })}
<section class="section">
  <div class="container narrow">
    <div class="stack">${cfg.downloads.map((d) => {
      const prod = P(d.product);
      return html`
      <article class="card download reveal" id="${d.product}">
        <div class="dl-head">
          <span class="icon-chip lg">${icon(prod.icon, { size: 28 })}</span>
          <div><h2>${d.name}</h2><p class="pc-cat">${d.platform} • ${prod.badge}</p></div>
          ${d.url ? html`<span class="pill pill-ok">Available</span>` : html`<span class="pill pill-soon">Not published yet</span>`}
        </div>
        <dl class="dl-meta">
          <div><dt>Platform</dt><dd>${d.platform}</dd></div>
          <div><dt>Current version</dt><dd>${d.version || tba}</dd></div>
          <div><dt>Release date</dt><dd>${d.releaseDate || tba}</dd></div>
          <div><dt>File size</dt><dd>${d.size || tba}</dd></div>
        </dl>
        <h3>System requirements</h3>${checkList(d.requirements)}
        <h3>Release notes</h3>
        ${d.notes.length ? html`<ul class="plain">${d.notes.map((n) => html`<li>${n}</li>`)}</ul>` : html`<p class="muted">Release notes will be shown here when the first version is released.</p>`}
        <div class="btn-row">
          ${d.url
            ? html`<a class="btn btn-primary btn-lg" href="${d.url}" data-track="download_click" download>${icon('download', { size: 18 })} Download ${d.platform} version</a>`
            : html`<span class="btn btn-disabled btn-lg" aria-disabled="true">${icon('download', { size: 18 })} Download not available yet</span>`}
          <a class="btn btn-outline" href="${waLink(d.waMessage)}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp', { size: 18 })} Request on WhatsApp</a>
          <a class="link-arrow" href="${productUrl(prod)}">Product details ${arrow}</a>
        </div>
      </article>`;
    })}</div>
  </div>
</section>`;
  return page({ path: '/downloads/', title: 'Downloads', description: 'Download center for Burhan Nexus software: versions, requirements and release notes.', body });
}

// =====================================================================
//  FAQ
// =====================================================================
const faqList = (items) => html`<div class="faq">${items.map((i) => html`<details class="reveal"><summary>${i.q}${icon('chevDown', { size: 20, cls: 'chev' })}</summary><div class="faq-a"><p>${i.a}</p></div></details>`)}</div>`;

export function faq() {
  const all = cfg.faqGroups.flatMap((g) => g.items);
  const body = html`
${pageHero({ eyebrow: 'FAQ', title: 'Frequently asked questions', text: 'Quick answers about Burhan Nexus and our software.', crumbs: [['FAQ']] })}
<section class="section">
  <div class="container narrow">
    ${cfg.faqGroups.map((g) => html`<h2 class="faq-group reveal">${g.title}</h2>${faqList(g.items)}`)}
    <div class="card center-text reveal faq-more"><h3>Still have a question?</h3><p>We are happy to help.</p><div class="btn-row center"><a class="btn btn-primary" href="${waLink()}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp', { size: 18 })} WhatsApp</a><a class="btn btn-outline" href="/contact/">Contact Us</a></div></div>
  </div>
</section>`;
  const schema = [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: all.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })) }];
  return page({ path: '/faq/', title: 'FAQ', description: 'Frequently asked questions about Burhan Nexus and the POS software: trial, price, offline use, printers and support.', body, schema });
}

// =====================================================================
//  LEGAL
// =====================================================================
const legal = (path, title, description, content) =>
  page({
    path, title, description,
    body: html`${pageHero({ eyebrow: 'Legal', title, text: `Last updated: ${LEGAL_DATE}`, crumbs: [[title]] })}
<section class="section"><div class="container narrow prose">${content}</div></section>`,
  });

export function privacy() {
  return legal('/privacy-policy/', 'Privacy Policy', 'How Burhan Nexus collects, uses and protects information on this website and in its software.', html`
<p>This Privacy Policy explains how ${company.brand} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles information when you visit this website or contact us. By using the website you agree to this policy.</p>
<h2>Information we collect</h2>
<ul>
<li><strong>Information you send us:</strong> when you use the contact form we receive your name, email, phone number (optional), subject and message. When you message us on WhatsApp or email, we receive whatever you choose to send.</li>
<li><strong>Technical information:</strong> like most websites, our hosting provider may log technical data such as IP address, browser type and pages visited.</li>
<li><strong>Analytics:</strong> we may use an analytics service (for example Google Analytics) to understand how many people visit the website and which pages they use. This is only used to improve the website.</li>
</ul>
<h2>How we use information</h2>
<ul><li>To reply to your questions and requests.</li><li>To provide demos, trial keys and support for our software.</li><li>To improve this website and our products.</li></ul>
<h2>Our software and your business data</h2>
<p>Burhan Nexus POS — Desktop stores your business data on your own computer. We do not receive or have access to that data. To activate the software we may ask you for the Machine Code shown on first start, which we use only to create your Activation Key.</p>
<h2>Sharing information</h2>
<p>We do not sell your personal information. We share it only with service providers needed to run the website and communication (for example website hosting, form handling, WhatsApp, email and analytics), or when required by law.</p>
<h2>Retention and your choices</h2>
<p>We keep messages for as long as needed to help you and to keep a record of support. You may ask us to correct or delete your information by contacting us.</p>
<h2>Children</h2>
<p>This website is intended for business users and is not directed to children.</p>
<h2>Changes to this policy</h2>
<p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>
<h2>Contact</h2>
<p>Questions about this policy? Email <a href="${mailLink('Privacy question')}">${contact.email}</a> or message us on <a href="${waLink()}" target="_blank" rel="noopener">WhatsApp</a>.</p>`);
}

export function terms() {
  return legal('/terms/', 'Terms & Conditions', 'Terms and conditions for using the Burhan Nexus website and software.', html`
<p>These Terms &amp; Conditions apply to your use of the ${company.brand} website and software. By using them you agree to these terms.</p>
<h2>Website</h2>
<p>The information on this website is provided for general information. We try to keep it accurate, but features, prices and availability may change without notice.</p>
<h2>Software licence</h2>
<ul>
<li>When you buy or trial our software you receive a licence to use it. It is not a transfer of ownership.</li>
<li>An Activation Key is issued for one computer (identified by its Machine Code) and may not be shared, copied or resold.</li>
<li>You may not copy, modify, reverse engineer, resell or distribute the software or its Activation Keys without our written permission.</li>
</ul>
<h2>Free trial</h2>
<p>We may offer a free trial period (currently one month for Burhan Nexus POS — Desktop). When the trial ends you need to buy the software to continue using it. We may change or withdraw trial offers at any time.</p>
<h2>Pricing and payment</h2>
<p>Prices shown on the website are for guidance and may change. The price agreed with you when you buy applies to your purchase.</p>
<h2>Your data and backups</h2>
<p>Your business data is stored on your own computer. You are responsible for keeping backups, protecting your password and keeping your computer secure. We recommend regular backups, including a copy on USB.</p>
<h2>Support</h2>
<p>We provide support by WhatsApp and email as described on this website. Support does not include problems caused by hardware failure, other software or changes you make outside the software.</p>
<h2>Disclaimer and limitation of liability</h2>
<p>We work hard to make our software reliable, but it is provided &ldquo;as is&rdquo; without warranties of any kind. To the fullest extent allowed by law, ${company.brand} is not liable for any indirect or consequential loss, loss of profit or loss of data arising from the use of the website or software.</p>
<h2>Changes</h2>
<p>We may update these terms from time to time. Continued use after a change means you accept the updated terms.</p>
<h2>Governing law</h2>
<p>These terms are governed by the applicable laws of Pakistan.</p>
<h2>Contact</h2>
<p>For questions about these terms, email <a href="${mailLink('Terms question')}">${contact.email}</a> or message us on <a href="${waLink()}" target="_blank" rel="noopener">WhatsApp</a>.</p>`);
}

// =====================================================================
//  404
// =====================================================================
export function notFound() {
  return page({
    path: '/404.html',
    title: 'Page not found',
    description: 'The page you are looking for could not be found.',
    noindex: true,
    body: html`
<section class="page-hero not-found">
  <div class="hero-bg" aria-hidden="true"><span class="orb o1"></span><span class="orb o2"></span><span class="grid-lines"></span></div>
  <div class="container center-text">
    <span class="eyebrow">Error 404</span>
    <h1>Page not found</h1>
    <p class="lead">Sorry, we could not find the page you were looking for. It may have moved or the link may be wrong.</p>
    <div class="btn-row center"><a class="btn btn-primary btn-lg" href="/">Go to Home ${arrow}</a><a class="btn btn-ghost btn-lg" href="/products/">View Products</a><a class="btn btn-ghost btn-lg" href="/contact/">Contact Us</a></div>
  </div>
</section>`,
  });
}
