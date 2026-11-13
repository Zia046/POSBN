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
        <a class="btn btn-primary btn-lg" href="${productUrl(p)}#trial" data-track="trial_jump_click">${icon('download', { size: 18 })} Get the 7-Day Free Trial</a>
        <a class="btn btn-ghost btn-lg" href="${productUrl(p)}">Explore Burhan Nexus LMS ${arrow}</a>
      </div>
    </div>
    <div class="reveal">${labFlow(p.workflow)}</div>
  </div>
</section>`;

const founderSection = () => {
  const f = cfg.founder;
  return html`
<section class="section founder" id="founder">
  <div class="container founder-grid">
    <figure class="founder-photo reveal">
      <img src="${f.photo}" srcset="${f.photoSmall} 600w, ${f.photo} 1000w" sizes="(max-width: 900px) 92vw, 520px" width="1000" height="750" alt="${f.alt}" decoding="async">
      <figcaption><b>${f.name}</b><span>${f.role}</span></figcaption>
    </figure>
    <div class="reveal">
      <span class="eyebrow">Meet the founder</span>
      <h2>${f.title}</h2>
      ${f.paragraphs.map((t, i) => html`<p class="${i === 0 ? 'big' : ''}">${t}</p>`)}
      <div class="btn-row">
        <a class="btn btn-primary" href="${waLink()}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp', { size: 18 })} Talk to me on WhatsApp</a>
        <a class="btn btn-outline" href="${mailLink()}" data-track="email_click">${icon('mail', { size: 18 })} Email</a>
      </div>
    </div>
  </div>
</section>`;
};

export function home() {
  const showcase = [desktop.screenshots[0], desktop.screenshots[1], desktop.screenshots[3], desktop.screenshots[4], desktop.screenshots[5], P('product-code-decoder').screenshots[0]];
  const body = html`
<section class="hero">
  <div class="hero-bg" aria-hidden="true"><span class="orb o1"></span><span class="orb o2"></span><span class="orb o3"></span><span class="grid-lines"></span></div>
  <div class="container hero-grid">
    <div class="hero-copy">
      <a class="announce" href="/products/lms/"><span class="pill pill-new">NEW</span> Laboratory Management System: 7-day free trial ${arrow}</a>
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

${founderSection()}

${lmsFeature(lms)}
${hmsTeaser()}

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
    <div class="grid grid-3 products-grid">${cfg.products.filter((p) => !p.featured).map((p) => productCard(p, { maxFeatures: p.slug === 'pos-desktop' ? 7 : 5 }))}</div>
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

function trialSections(p, dl) {
  const full = waLink(p.fullMessage);
  const tut = p.tutorial || {};
  return html`
<section class="section trial" id="trial">
  <div class="hero-bg" aria-hidden="true"><span class="orb o1"></span><span class="grid-lines"></span></div>
  <div class="container trial-grid">
    <div class="reveal">
      <span class="pill pill-trial">${p.trial.days}-DAY FREE TRIAL</span>
      <h2>Burhan Nexus LMS – 7 Days Free Trial</h2>
      <p class="big">Experience the power of Burhan Nexus LMS with our 7-day free trial. Download, install, and explore its features to discover how it can improve your laboratory's daily operations.</p>
      <div class="btn-row"><a class="btn btn-primary btn-lg btn-download btn-xl" href="${dl.url}" download data-track="download_click">${icon('download', { size: 20 })}<span>DOWNLOAD 7-DAY FREE TRIAL (WINDOWS EXE)</span></a></div>
      <p class="trial-notice">${icon('info', { size: 18 })}<span>This is a limited 7-day trial version. After the trial period, contact Burhan Nexus to obtain the full licensed version.</span></p>
    </div>
    <div class="card trial-facts reveal">
      <h3>Trial details</h3>
      <dl>
        <div><dt>Free Trial Duration</dt><dd>7 Days</dd></div>
        <div><dt>Operating System</dt><dd>Windows</dd></div>
        <div><dt>File Type</dt><dd>EXE Installer</dd></div>
        <div><dt>Developer</dt><dd>Burhan Nexus</dd></div>
        <div><dt>Version</dt><dd>${dl.version}</dd></div>
        <div><dt>File Size</dt><dd>${dl.size}</dd></div>
        <div><dt>License Type</dt><dd>7-Day Free Trial</dd></div>
        <div><dt>Full Version</dt><dd>Available on request</dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="section full-version" id="full-version">
  <div class="container fv-box reveal">
    <span class="icon-chip lg">${icon('key', { size: 28 })}</span>
    <h2>Want the Full Version?</h2>
    <p class="big">Enjoying Burhan Nexus LMS? Upgrade to the complete licensed version and continue managing your laboratory with confidence. Contact Burhan Nexus for full-version pricing, licensing information, and purchase details.</p>
    <div class="btn-row center"><a class="btn btn-primary btn-lg btn-xl" href="${full}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp', { size: 20 })} CONTACT FOR FULL VERSION</a><a class="btn btn-outline btn-lg" href="${mailLink()}" data-track="email_click">${icon('mail', { size: 18 })} Email us</a></div>
  </div>
</section>

<section class="section section-alt" id="tutorial">
  <div class="container narrow">
    ${sectionHead({ eyebrow: 'Video tutorial', title: tut.title || 'Burhan Nexus LMS – Complete Video Tutorial' })}
    ${tut.url
      ? html`<div class="video reveal"><iframe src="${tut.url}" title="${tut.title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
      : html`<div class="video video-empty reveal">${icon('play', { size: 40 })}<p><strong>Complete video tutorial coming soon!</strong></p><p>A step-by-step YouTube guide will be available shortly to help you install, configure, and use Burhan Nexus LMS.</p></div>`}
  </div>
</section>`;
}

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
        ${p.trial && demoUrl
          ? html`<a class="btn btn-primary btn-lg" href="#trial" data-track="trial_jump_click">${icon('download', { size: 18 })} 7-Day Free Trial</a>
        <a class="btn btn-outline-light btn-lg" href="${waLink(p.fullMessage)}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp', { size: 18 })} Contact for Full Version</a>`
          : html`<a class="btn btn-primary btn-lg" href="${waLink(p.waMessage)}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp', { size: 18 })} ${available ? 'Purchase Inquiry on WhatsApp' : 'Ask on WhatsApp'}</a>
        ${demoBtn}`}
      </div>
    </div>
    <div class="hero-visual">${p.workflow ? labFlow(p.workflow) : isDesktop ? laptop(hero) : phone(hero)}</div>
  </div>
</section>

${p.trial && dl ? trialSections(p, dl) : ''}

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
        <dt>Availability</dt><dd>${p.trial ? '7-day free trial' : available ? 'Available' : (p.statusLabel || 'Coming soon')}</dd>
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

${p.trial ? '' : html`<section class="${alt()}" id="video">
  <div class="container narrow">
    ${sectionHead({ eyebrow: 'Demonstration', title: 'Product demonstration video' })}
    ${p.video.url
      ? html`<div class="video reveal"><iframe src="${p.video.url}" title="${p.video.title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
      : html`<div class="video video-empty reveal">${icon('play', { size: 40 })}<p><strong>Demonstration video coming soon</strong></p><p>Want to see it working? <a href="${waLink(p.waMessage)}" target="_blank" rel="noopener">Ask us for a live demo on WhatsApp</a>.</p></div>`}
  </div>
</section>`}

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

${p.trial ? '' : html`<section class="${alt()}" id="pricing">
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
</section>`}

<section class="${alt()}" id="faq">
  <div class="container narrow">
    ${sectionHead({ eyebrow: 'FAQ', title: 'Frequently asked questions' })}
    ${faqList(p.faqs)}
  </div>
</section>

${ctaBand({ title: `Interested in ${p.short}?`, text: p.trial ? 'Try it free for 7 days, then message us for the full licensed version.' : 'Message us and we will answer your questions, show you a demo and help you get started.', primary: ['Contact Our Team', '/contact/'], secondary: ['All Products', '/products/'] })}`;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: p.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: isDesktop ? 'Windows' : 'Android',
      description: p.summary,
      publisher: { '@type': 'Organization', name: company.brand },
      ...(p.trial && dl ? { softwareVersion: dl.version, fileFormat: 'application/vnd.microsoft.portable-executable', downloadUrl: cfg.siteUrl.replace(/\/$/, '') + dl.url, offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR', description: '7-day free trial. Contact Burhan Nexus for the full licensed version.' } } : {}),
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
//  STOPWATCH (free download page)
// =====================================================================
export function stopwatchPage(p) {
  const dl = cfg.downloads.find((d) => d.product === 'stopwatch');
  const abs = cfg.siteUrl.replace(/\/$/, '');
  const shot = '/assets/img/stopwatch-screenshot.webp';
  const shotSm = '/assets/img/stopwatch-screenshot-768.webp';
  const btn = (extra = '') => html`<a class="btn btn-primary btn-lg btn-download ${extra}" href="${dl.url}" download data-track="download_click">${icon('download', { size: 20 })}<span>DOWNLOAD FOR FREE</span></a>`;
  const features = [
    { icon: 'monitor', title: 'Clean, modern interface', text: 'A classic digital LCD-style display inspired by Casio watches, with large, easy-to-read digits.' },
    { icon: 'timer', title: 'Accurate stopwatch', text: 'High-precision timing that shows hours, minutes, seconds and milliseconds.' },
    { icon: 'play', title: 'Easy-to-use controls', text: 'Just three buttons: Start, Pause and Reset. Nothing to learn.' },
    { icon: 'pin', title: 'Always on top', text: 'Keep the stopwatch floating above your other windows while you work.' },
    { icon: 'maximize', title: 'Compact and resizable', text: 'A small desktop-friendly window that you can resize with your mouse.' },
    { icon: 'clock', title: 'Live clock and date', text: 'See the current time, date and day right above the stopwatch.' },
    { icon: 'palette', title: 'Themes and settings', text: 'Choose the Classic LCD, Dark or Light theme and adjust your display preferences.' },
    { icon: 'monitor', title: 'Remembers your window', text: 'Your preferred window position and size are remembered next time.' },
    { icon: 'wifiOff', title: 'Works offline', text: 'No internet connection and no account needed. Extract the ZIP and run it.' },
  ];
  const faqs = [
    { q: 'Is it really free?', a: 'Yes. Burhan Nexus Stopwatch is free to download and use. There is no registration, login or payment.' },
    { q: 'How do I install it?', a: 'Download the ZIP file, extract it to any folder, then double-click BurhanNexusStopwatch.exe. No separate installation is needed.' },
    { q: 'Which Windows versions are supported?', a: 'It is designed for Windows 10 and Windows 11 (64-bit).' },
    { q: 'Windows says "Windows protected your PC". Is that normal?', a: 'The app is not yet code-signed, so Windows may show this message. Click "More info" and then "Run anyway".' },
    { q: 'Does it need the internet?', a: 'No. It works fully offline.' },
  ];
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: p.name,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Windows 10, Windows 11',
    description: 'A free Windows stopwatch with a classic digital display, always-on-top window, themes and simple Start, Pause and Reset controls.',
    image: abs + '/assets/img/stopwatch-og.jpg',
    downloadUrl: abs + dl.url,
    fileFormat: 'application/zip',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
    author: { '@type': 'Organization', name: company.brand, url: cfg.siteUrl },
  };
  const body = html`
<section class="page-hero product-hero sw-hero">
  <div class="hero-bg" aria-hidden="true"><span class="orb o1"></span><span class="orb o2"></span><span class="grid-lines"></span></div>
  <div class="container sw-hero-grid">
    <div class="sw-copy">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/products/">Products</a><span aria-hidden="true">/</span><span aria-current="page">Stopwatch</span></nav>
      <div class="pill-row"><span class="pill pill-free">FREE</span><span class="pill pill-light">Windows</span></div>
      <h1>Burhan Nexus Stopwatch</h1>
      <p class="sw-tagline">Precision Timing. Simple Design. Complete Control.</p>
      <p class="lead">Meet Burhan Nexus Stopwatch, a lightweight, modern, and easy-to-use Windows stopwatch designed for accuracy, convenience, and everyday productivity.</p>
      <div class="btn-row">${btn()}<a class="btn btn-ghost btn-lg" href="#features">See features</a></div>
      <ul class="sw-assure"><li>${icon('check', { size: 16 })} 100% free</li><li>${icon('check', { size: 16 })} No registration</li><li>${icon('check', { size: 16 })} Direct ZIP download</li></ul>
    </div>
    <figure class="sw-shot">
      <img src="${shot}" srcset="${shotSm} 768w, ${shot} 1536w" sizes="(max-width: 900px) 92vw, 640px" width="1536" height="1024" alt="Burhan Nexus Stopwatch showing the digital stopwatch display with Start, Pause and Reset buttons" fetchpriority="high" decoding="async">
    </figure>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div class="reveal">
      <span class="eyebrow">About the software</span>
      <h2>Timing made simple and effortless</h2>
      <p class="big">Whether you need to track working hours, measure performance, manage tasks, conduct experiments, or simply keep track of time, Burhan Nexus Stopwatch makes timing simple and effortless.</p>
    </div>
    <div class="reveal sw-uses">
      <div class="card"><span class="icon-chip">${icon('clock', { size: 22 })}</span><b>Working hours</b></div>
      <div class="card"><span class="icon-chip">${icon('trend', { size: 22 })}</span><b>Performance</b></div>
      <div class="card"><span class="icon-chip">${icon('clipboard', { size: 22 })}</span><b>Tasks</b></div>
      <div class="card"><span class="icon-chip">${icon('flask', { size: 22 })}</span><b>Experiments</b></div>
    </div>
  </div>
</section>

<section class="section section-alt" id="features">
  <div class="container">
    ${sectionHead({ eyebrow: 'Key features', title: 'Everything you need, nothing you do not' })}
    <div class="grid grid-3">${features.map(featureCard)}</div>
  </div>
</section>

<section class="section sw-download" id="download">
  <div class="hero-bg" aria-hidden="true"><span class="orb o1"></span><span class="grid-lines"></span></div>
  <div class="container sw-dl-grid">
    <div class="reveal">
      <span class="eyebrow">Free download</span>
      <h2>Get Burhan Nexus Stopwatch – FREE</h2>
      <p class="big">Download your free copy of Burhan Nexus Stopwatch and enjoy a simple, reliable, and convenient timing experience.</p>
      <div class="btn-row">${btn('btn-xl')}</div>
      <ol class="sw-steps">
        <li><b>1</b><span>Download the ZIP file.</span></li>
        <li><b>2</b><span>Extract it to any folder.</span></li>
        <li><b>3</b><span>Run <code>BurhanNexusStopwatch.exe</code>.</span></li>
      </ol>
      <p class="sw-note">${icon('info', { size: 16 })}<span>If Windows shows "Windows protected your PC", click <b>More info</b> and then <b>Run anyway</b>. The app is not yet code-signed.</span></p>
    </div>
    <div class="card sw-facts reveal">
      <h3>Software details</h3>
      <dl>
        <div><dt>Software Name</dt><dd>Burhan Nexus Stopwatch</dd></div>
        <div><dt>Developer</dt><dd>Burhan Nexus</dd></div>
        <div><dt>Platform</dt><dd>Windows 10 / 11</dd></div>
        <div><dt>File Format</dt><dd>ZIP</dd></div>
        <div><dt>Price</dt><dd><span class="pill pill-free">FREE</span></dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    ${sectionHead({ eyebrow: 'Questions', title: 'Frequently asked questions' })}
    ${faqList(faqs)}
  </div>
</section>

<section class="sw-brand">
  <div class="container">
    <img src="${company.logo}" alt="${company.brand} logo" width="220" height="56" loading="lazy" decoding="async">
    <p class="sw-made">Developed with ❤️ by Burhan Nexus</p>
    <p class="sw-slogan">Smart Software. Better Solutions.</p>
    <div class="btn-row center"><a class="btn btn-outline-light" href="/products/">More Burhan Nexus software</a><a class="btn btn-ghost" href="/contact/">Contact us</a></div>
  </div>
</section>`;
  return page({
    path: '/products/stopwatch/',
    title: 'Burhan Nexus Stopwatch: Free Windows Stopwatch Download',
    description: 'Download Burhan Nexus Stopwatch for free: a modern Windows stopwatch with a classic digital display, always-on-top window, themes and simple Start, Pause and Reset controls.',
    image: '/assets/img/stopwatch-og.jpg',
    schema: [ld],
    body,
  });
}


// =====================================================================
//  BALL BOUNCE (free Android game, dark/neon theme)
// =====================================================================
export function ballBouncePage(p) {
  const dl = cfg.downloads.find((d) => d.product === 'ball-bounce');
  const abs = cfg.siteUrl.replace(/\/$/, '');
  const I = '/assets/img/ballbounce/';
  const btn = (extra = '') => html`<a class="btn btn-primary btn-lg btn-download bb-btn ${extra}" href="${dl.url}" download="BurhanNexus-BallBounce-v1.0.0.apk" data-track="download_click">${icon('download', { size: 20 })}<span>DOWNLOAD APK – FREE</span></a>`;
  const features = [
    { icon: 'hand', title: 'Smooth, responsive controls', text: 'Slide your finger anywhere on the screen and the paddle follows.' },
    { icon: 'zap', title: 'Increasing difficulty', text: 'The ball gets faster with time and score, so every run feels different.' },
    { icon: 'target', title: 'One-life survival', text: 'Miss the ball once and it is game over. No continues, no second chances.' },
    { icon: 'chart', title: 'Real-time scoring', text: 'Every paddle hit adds a point, shown live on screen.' },
    { icon: 'badge', title: 'Permanent Top 3 leaderboard', text: 'Your three best scores are saved on your phone, even after you close the game.' },
    { icon: 'sparkles', title: 'Neon arcade graphics', text: 'A glowing dark arcade look with particles and smooth animation.' },
    { icon: 'headphones', title: 'Exciting sound effects', text: 'Bounce, game over and high-score sounds. You can switch sound off any time.' },
    { icon: 'wifiOff', title: 'Completely offline', text: 'No internet connection, no account and no permissions needed.' },
    { icon: 'gift', title: 'Free to download and play', text: 'No payment, no registration and no advertisements.' },
  ];
  const shots = [
    { n: 'menu', t: 'Main menu' },
    { n: 'play', t: 'Gameplay' },
    { n: 'top3', t: 'Top 3 high scores' },
    { n: 'howto', t: 'How to play' },
  ];
  const how = [
    'Slide your finger left and right anywhere on the screen to move the paddle.',
    'Keep the ball in the air. Every paddle hit scores 1 point.',
    'Hit the ball with the edge of the paddle for a sharp angle, or the centre for a straight bounce.',
    'The ball gets faster the longer you survive, and the paddle becomes a little shorter.',
    'You have only ONE life. Miss the ball once and the game is over.',
    'Beat your personal best and claim a place in the Top 3!',
  ];
  const faqs = [
    { q: 'Is Ball Bounce really free?', a: 'Yes. It is free to download and play. There is no payment, registration or login, and no advertisements.' },
    { q: 'Does it need the internet?', a: 'No. The game works completely offline.' },
    { q: 'How do I install the APK?', a: 'Download the APK on your Android phone and open it. If Android asks, allow installing apps from your browser or file manager just for this install, then tap Install.' },
    { q: 'Which Android versions are supported?', a: 'Android 8.0 or newer.' },
    { q: 'Are my high scores saved?', a: 'Yes. Your personal best and Top 3 scores are saved on your phone and stay after you close the game or restart the phone.' },
    { q: 'Why does Android warn me before installing?', a: 'The game is not installed from Google Play, so Android shows a standard warning for any APK downloaded from a website. The game itself asks for no permissions.' },
  ];
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Burhan Nexus Ball Bounce',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Android 8.0+',
    softwareVersion: dl.version,
    fileSize: dl.size,
    description: 'A free offline neon arcade game for Android. Control the paddle, keep the ball bouncing and reach the Top 3 high scores.',
    image: abs + I + 'og.jpg',
    downloadUrl: abs + dl.url,
    fileFormat: 'application/vnd.android.package-archive',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
    author: { '@type': 'Organization', name: company.brand, url: cfg.siteUrl },
  };
  const body = html`
<div class="bb">
<section class="bb-hero">
  <div class="bb-glow" aria-hidden="true"></div>
  <div class="container bb-hero-grid">
    <div class="bb-copy">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/products/">Products</a><span aria-hidden="true">/</span><span aria-current="page">Ball Bounce</span></nav>
      <div class="bb-title-row"><img class="bb-icon" src="${I}icon-192.png" width="84" height="84" alt="Ball Bounce game icon"><span class="bb-label">FREE ANDROID GAME</span></div>
      <h1>BURHAN NEXUS<br><span>BALL BOUNCE</span></h1>
      <p class="bb-lead">Get ready for an exciting arcade challenge! One ball, one life, and endless excitement.</p>
      <div class="btn-row">${btn('btn-xl')}</div>
      <ul class="bb-meta">
        <li><b>Version</b> ${dl.version}</li>
        <li><b>Size</b> ${dl.size}</li>
        <li><b>Android</b> 8.0+</li>
        <li><b>Price</b> FREE</li>
      </ul>
      <p class="bb-offline">${icon('wifiOff', { size: 18 })}<span>Works offline. No internet connection required.</span></p>
    </div>
    <div class="bb-phones" aria-hidden="false">
      <img class="bb-phone bb-phone-a" src="${I}menu-450.webp" srcset="${I}menu-450.webp 450w, ${I}menu-810.webp 810w" sizes="(max-width: 900px) 40vw, 260px" width="450" height="800" alt="Ball Bounce main menu screen" fetchpriority="high" decoding="async">
      <img class="bb-phone bb-phone-b" src="${I}top3-450.webp" srcset="${I}top3-450.webp 450w, ${I}top3-810.webp 810w" sizes="(max-width: 900px) 40vw, 260px" width="450" height="800" alt="Ball Bounce Top 3 high scores screen" decoding="async">
    </div>
  </div>
</section>

<section class="bb-section">
  <div class="container bb-about">
    <span class="bb-eyebrow">About the game</span>
    <h2>Get ready for an exciting arcade challenge!</h2>
    <p>Introducing <b>Ball Bounce</b>, a fun and addictive arcade game developed by Burhan Nexus. Your mission is simple: control the paddle, keep the ball bouncing, and survive as long as possible!</p>
    <p>But don't get too comfortable! As time passes and your score increases, the game becomes progressively more challenging.</p>
    <p class="bb-quote">One ball, one life, and endless excitement!</p>
    <p>Challenge yourself, beat your personal best, and secure your place among the Top 3 high scores.</p>
  </div>
</section>

<section class="bb-section bb-alt" id="features">
  <div class="container">
    <div class="bb-head"><span class="bb-eyebrow">Game features</span><h2>Simple to learn. Hard to put down.</h2></div>
    <div class="bb-grid">${features.map((f) => html`<div class="bb-card"><span class="bb-chip">${icon(f.icon, { size: 22 })}</span><h3>${f.title}</h3><p>${f.text}</p></div>`)}</div>
  </div>
</section>

<section class="bb-section" id="screenshots">
  <div class="container">
    <div class="bb-head"><span class="bb-eyebrow">Screenshots</span><h2>See the game in action</h2></div>
    <div class="bb-gallery">${shots.map((s) => html`
      <figure class="bb-shot">
        <a href="${I}${s.n}-810.webp" data-lightbox="ballbounce" data-caption="${s.t}" aria-label="Enlarge: ${s.t}"><img src="${I}${s.n}-450.webp" width="450" height="800" alt="Ball Bounce screenshot: ${s.t}" loading="lazy" decoding="async"></a>
        <figcaption>${s.t}</figcaption>
      </figure>`)}</div>
  </div>
</section>

<section class="bb-section bb-alt" id="how-to-play">
  <div class="container bb-how">
    <div><span class="bb-eyebrow">How to play</span><h2>Six simple steps</h2></div>
    <ol class="bb-steps">${how.map((h, i) => html`<li><b>${i + 1}</b><span>${h}</span></li>`)}</ol>
  </div>
</section>

<section class="bb-section bb-dl" id="download">
  <div class="container bb-dl-grid">
    <div>
      <span class="bb-eyebrow">Free download</span>
      <h2>Download Ball Bounce – FREE</h2>
      <p>Direct APK download. No registration, no login and no advertisements.</p>
      <div class="btn-row">${btn('btn-xl')}</div>
      <ol class="bb-install">
        <li>Download the APK on your Android phone.</li>
        <li>Open the downloaded file.</li>
        <li>If Android asks, allow installing from your browser or file manager, then tap <b>Install</b>.</li>
      </ol>
    </div>
    <div class="bb-facts">
      <img src="${I}icon-192.png" width="96" height="96" alt="" loading="lazy">
      <dl>
        <div><dt>Game</dt><dd>Burhan Nexus Ball Bounce</dd></div>
        <div><dt>Developer</dt><dd>Burhan Nexus</dd></div>
        <div><dt>Platform</dt><dd>Android 8.0+</dd></div>
        <div><dt>Version</dt><dd>${dl.version}</dd></div>
        <div><dt>File size</dt><dd>${dl.size}</dd></div>
        <div><dt>File format</dt><dd>APK</dd></div>
        <div><dt>Internet</dt><dd>Not required</dd></div>
        <div><dt>Price</dt><dd>FREE</dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="bb-section">
  <div class="container narrow">
    <div class="bb-head"><span class="bb-eyebrow">Questions</span><h2>Frequently asked questions</h2></div>
    ${faqList(faqs)}
  </div>
</section>

<section class="bb-brand">
  <div class="container">
    <img src="${company.logo}" alt="${company.brand} logo" width="220" height="56" loading="lazy" decoding="async">
    <p class="bb-made">Developed by Burhan Nexus</p>
    <p class="bb-slogan">Smart Software. Better Solutions.</p>
    <div class="btn-row center"><a class="btn btn-ghost" href="/products/">More Burhan Nexus software</a><a class="btn btn-ghost" href="/contact/">Contact us</a></div>
  </div>
</section>
</div>`;
  return page({
    path: '/products/ball-bounce/',
    title: 'Burhan Nexus Ball Bounce: Free Android Arcade Game (APK)',
    description: 'Download Burhan Nexus Ball Bounce for free: an offline neon arcade game for Android. Keep the ball bouncing, survive as long as you can and reach the Top 3.',
    image: I + 'og.jpg',
    schema: [ld],
    body,
  });
}


// =====================================================================
//  HOSPITAL MANAGEMENT (coming soon showcase)
// =====================================================================
const HMS = '/assets/img/hms/';
const hmsMonitor = (eager) => html`
<div class="hm-monitor">
  <div class="hm-bezel">
    <div class="hm-bar" aria-hidden="true"><i></i><i></i><i></i><span>Burhan Nexus HMS</span></div>
    <a class="hm-screen" href="${HMS}dashboard-1120.webp" data-lightbox="hms" data-caption="Burhan Nexus Hospital Management: dashboard" aria-label="Enlarge the dashboard screenshot">
      <img src="${HMS}dashboard-700.webp" srcset="${HMS}dashboard-700.webp 700w, ${HMS}dashboard-1120.webp 1120w" sizes="(max-width: 900px) 92vw, 560px" width="1120" height="1089" alt="Burhan Nexus Hospital Management dashboard showing users, license, database status, quick access and recent system activity" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
    </a>
  </div>
  <div class="hm-neck" aria-hidden="true"></div><div class="hm-foot" aria-hidden="true"></div>
</div>`;

export function hmsTeaser() {
  return html`
<section class="section hm-teaser" id="hospital">
  <div class="container hm-teaser-grid">
    <div class="reveal">
      <div class="pill-row"><span class="pill pill-soon-gold">COMING SOON</span></div>
      <span class="eyebrow">Hospital Management</span>
      <h2>Burhan Nexus Hospital Management</h2>
      <p class="big">A web-based hospital management solution that runs on your own network. One central server and database, and every computer opens it in a browser.</p>
      <div class="btn-row">
        <a class="btn btn-primary btn-lg" href="/products/hospital-management/">See what is coming ${arrow}</a>
        <a class="btn btn-ghost-dark btn-lg" href="${waLink('Hello, I would like to know more about Burhan Nexus Hospital Management.')}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp', { size: 18 })} Ask on WhatsApp</a>
      </div>
    </div>
    <div class="reveal">${hmsMonitor(false)}</div>
  </div>
</section>`;
}

export function hospitalPage(p) {
  const wa = waLink('Hello, I would like to know more about Burhan Nexus Hospital Management and be informed when it is ready.');
  const abs = cfg.siteUrl.replace(/\/$/, '');
  const features = [
    { icon: 'globe', title: 'Web-Based Management', text: 'Open the system in a normal web browser. Nothing to install on each computer.' },
    { icon: 'monitor', title: 'Multi-Computer Connectivity', text: 'One server, and as many client computers as the hospital needs.' },
    { icon: 'database', title: 'Centralized Database', text: 'All data lives in one central PostgreSQL database, so every computer sees the same records.' },
    { icon: 'cpu', title: 'LAN / Wi-Fi Network Support', text: 'Connect over your local network. The server address and port can be set to suit your hospital.' },
    { icon: 'building', title: 'Multiple Departments and Counters', text: 'Set up hospital departments and assign each staff member to one or more of them.' },
    { icon: 'users', title: 'Multi-User Management', text: 'Separate accounts for every person. Activate, deactivate, reset passwords and unlock accounts.' },
    { icon: 'userCog', title: 'Role-Based Permissions', text: 'Give roles and responsibilities, with extra allow or deny rules for a single user. Enforced on the server, not just hidden on screen.' },
    { icon: 'wallet', title: 'Financial Management Controls', text: 'Decide who may see financial figures, so amounts stay with the right people.' },
    { icon: 'receipt', title: 'Receipt and Refund Management', text: 'A separate refund permission, and receipt printing set-up: header, footer and paper size.' },
    { icon: 'fileText', title: 'Activity Logs and Audit History', text: 'Important actions are recorded with who, when and from which computer. Login history is kept too.' },
    { icon: 'wifiOff', title: 'Offline Local Network Operation', text: 'Works inside your hospital network. No internet connection is needed.' },
  ];
  const why = [
    { icon: 'shield', title: 'Built for control', text: 'Permissions are checked on the server, and the audit log cannot be quietly edited.' },
    { icon: 'wifiOff', title: 'Works without the internet', text: 'Your hospital keeps working even when the internet is down.' },
    { icon: 'database', title: 'One central record', text: 'A single database for all computers means no scattered files.' },
    { icon: 'drive', title: 'Backup and restore', text: 'Back up the database, download the backup, and restore with an automatic safety copy first.' },
    { icon: 'key', title: 'Your data is never held hostage', text: 'If a licence expires, the system becomes read-only. Data is never deleted.' },
    { icon: 'handshake', title: 'Local support', text: 'Made by Burhan Nexus, with direct support on WhatsApp and email.' },
  ];
  const shows = [
    ['Administration', 'Users, Departments, Responsibilities, Login History and Audit Log'],
    ['System', 'Hospital Settings, License and Backup & Restore'],
    ['Dashboard', 'Registered, active and inactive users, license status, database and server status'],
    ['Quick access', 'Shortcuts to user management, permissions, settings, backup, audit log and license'],
    ['Recent system activity', 'A live list of logins and setup events'],
    ['Hospital configuration', 'Hospital type, location, currency, time zone and the address other computers use to connect'],
  ];
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Burhan Nexus Hospital Management',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Windows server, any web browser for clients',
    description: 'A web-based hospital management solution for local networks. Coming soon.',
    image: abs + HMS + 'og.jpg',
    publisher: { '@type': 'Organization', name: company.brand, url: cfg.siteUrl },
  };
  const body = html`
<div class="hm">
<section class="hm-hero">
  <div class="hm-bg" aria-hidden="true"><span class="hm-orb a"></span><span class="hm-orb b"></span><span class="hm-grid"></span></div>
  <div class="container hm-hero-grid">
    <div class="hm-copy">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/products/">Products</a><span aria-hidden="true">/</span><span aria-current="page">Hospital Management</span></nav>
      <span class="hm-soon">${icon('clock', { size: 16 })} COMING SOON</span>
      <h1>BURHAN NEXUS <span>HOSPITAL MANAGEMENT</span></h1>
      <p class="hm-sub">Smart Hospital Management. Simplified Healthcare Operations.</p>
      <p class="hm-lead">A powerful web-based hospital management solution designed to streamline hospital operations, centralize management, and simplify everyday healthcare administration.</p>
      <div class="btn-row">
        <a class="btn btn-primary btn-lg hm-btn" href="${wa}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp', { size: 18 })} Get Launch Updates</a>
        <a class="btn btn-outline-light btn-lg" href="#features">Explore Features</a>
      </div>
      <ul class="hm-chips"><li>Government Hospitals</li><li>Private Hospitals</li><li>Healthcare Facilities</li></ul>
    </div>
    <div class="hm-visual">${hmsMonitor(true)}</div>
  </div>
</section>

<section class="hm-announce" id="coming-soon">
  <div class="container hm-announce-box reveal">
    <span class="hm-soon gold">${icon('rocket', { size: 16 })} COMING SOON</span>
    <h2>Something new for hospital administration is on the way</h2>
    <p>Burhan Nexus Hospital Management is under development. The core system is ready: setup, login, users, departments, permissions, branding, licensing, audit log and backup. Clinical modules such as OPD, Emergency, Laboratory and X-Ray will follow in later phases.</p>
    <div class="btn-row center"><a class="btn btn-primary btn-lg hm-btn" href="${wa}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp', { size: 18 })} Ask on WhatsApp</a><a class="btn btn-ghost-dark btn-lg" href="${mailLink()}" data-track="email_click">${icon('mail', { size: 18 })} Email us</a></div>
  </div>
</section>

<section class="hm-section" id="features">
  <div class="container">
    <div class="hm-head"><span class="hm-eyebrow">Key features</span><h2>Everything your hospital administration needs to start with</h2></div>
    <div class="hm-cards">${features.map((f) => html`<article class="hm-card reveal"><span class="hm-chip">${icon(f.icon, { size: 24 })}</span><h3>${f.title}</h3><p>${f.text}</p></article>`)}</div>
  </div>
</section>

<section class="hm-section hm-alt" id="why">
  <div class="container">
    <div class="hm-head"><span class="hm-eyebrow">Why choose Burhan Nexus</span><h2>Technology that simplifies your business</h2></div>
    <div class="hm-why">${why.map((f) => html`<div class="hm-why-item reveal"><span class="hm-chip sm">${icon(f.icon, { size: 22 })}</span><div><h3>${f.title}</h3><p>${f.text}</p></div></div>`)}</div>
  </div>
</section>

<section class="hm-section" id="screenshot">
  <div class="container hm-show">
    <div class="hm-show-visual reveal">${hmsMonitor(false)}</div>
    <div class="reveal">
      <span class="hm-eyebrow">Software preview</span>
      <h2>A clear dashboard from the first login</h2>
      <p class="hm-lead dark">This is the real software screen. Click it to enlarge. The names and figures shown are sample data from a test setup.</p>
      <dl class="hm-shows">${shows.map(([t, d]) => html`<div><dt>${t}</dt><dd>${d}</dd></div>`)}</dl>
    </div>
  </div>
</section>

<section class="hm-contact" id="contact">
  <div class="container hm-contact-grid">
    <div>
      <img class="hm-logo" src="${company.logo}" alt="${company.brand} logo" width="220" height="56" loading="lazy" decoding="async">
      <h2>Interested in Burhan Nexus Hospital Management?</h2>
      <p>Contact Burhan Nexus to know more and to be informed as soon as it is ready.</p>
      <p class="hm-tag">Technology That Simplifies Your Business.</p>
    </div>
    <div class="hm-contact-card">
      <a class="btn btn-primary btn-lg hm-btn" href="${wa}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp', { size: 20 })} WhatsApp: ${contact.phoneDisplay}</a>
      <a class="btn btn-outline-light btn-lg" href="${mailLink()}" data-track="email_click">${icon('mail', { size: 20 })} ${contact.email}</a>
      <a class="btn btn-ghost-light" href="/contact/">Contact page</a>
    </div>
  </div>
</section>
</div>`;
  return page({
    path: '/products/hospital-management/',
    title: 'Burhan Nexus Hospital Management: Web-Based Hospital Software (Coming Soon)',
    description: 'Burhan Nexus Hospital Management is a web-based hospital management solution for your local network: central database, multi-user access, role-based permissions and audit history. Coming soon.',
    image: HMS + 'og.jpg',
    schema: [ld],
    body,
  });
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
          ${d.format ? html`<div><dt>File format</dt><dd>${d.format}</dd></div>` : ''}
          ${d.price ? html`<div><dt>Price</dt><dd>${d.price}</dd></div>` : ''}
          ${(d.version || !d.url) ? html`<div><dt>Current version</dt><dd>${d.version || tba}</dd></div>` : ''}
          ${(d.releaseDate || !d.url) ? html`<div><dt>Release date</dt><dd>${d.releaseDate || tba}</dd></div>` : ''}
          ${(d.size || !d.url) ? html`<div><dt>File size</dt><dd>${d.size || tba}</dd></div>` : ''}
        </dl>
        <h3>System requirements</h3>${checkList(d.requirements)}
        ${(d.notes.length || !d.url) ? html`<h3>Release notes</h3>
        ${d.notes.length ? html`<ul class="plain">${d.notes.map((n) => html`<li>${n}</li>`)}</ul>` : html`<p class="muted">Release notes will be shown here when the first version is released.</p>`}` : ''}
        <div class="btn-row">
          ${d.url
            ? html`<a class="btn btn-primary btn-lg" href="${d.url}" data-track="download_click" download>${icon('download', { size: 18 })} ${d.ctaLabel || (d.price === 'Free' ? 'Download for free' : `Download ${d.platform} version`)}</a>`
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
<p>We may offer a free trial period (currently one month for Burhan Nexus POS — Desktop and 7 days for Burhan Nexus LMS). When the trial ends you need to buy the software to continue using it. We may change or withdraw trial offers at any time.</p>
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
