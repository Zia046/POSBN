// Static site generator for Burhan Nexus. No dependencies: only Node built-ins.
//   node build.mjs      ->  writes the finished website into ./dist
import { rmSync, mkdirSync, writeFileSync, cpSync, existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import cfg from './site/config.mjs';
import * as pg from './site/pages.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');
rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(join(ROOT, 'public'), DIST, { recursive: true });

// ---- pages ----
const pages = [
  ['/', pg.home()],
  ['/products/', pg.products()],
  ...cfg.products.filter((p) => p.slug).map((p) => [`/products/${p.slug}/`, pg.productPage(p)]),
  ['/solutions/', pg.solutions()],
  ['/services/', pg.services()],
  ['/about/', pg.about()],
  ['/contact/', pg.contactPage()],
  ['/downloads/', pg.downloads()],
  ['/faq/', pg.faq()],
  ['/privacy-policy/', pg.privacy()],
  ['/terms/', pg.terms()],
];
for (const [path, content] of pages) {
  const file = join(DIST, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}
writeFileSync(join(DIST, '404.html'), pg.notFound());

// ---- sitemap + robots ----
const base = cfg.siteUrl.replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    pages.map(([p]) => `  <url><loc>${base}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
    `\n</urlset>\n`,
);
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);

// ---- link + asset check ----
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const exists = (url) => {
  const clean = url.split('#')[0].split('?')[0];
  if (!clean) return true;
  const p = join(DIST, clean);
  if (existsSync(p) && statSync(p).isFile()) return true;
  return existsSync(join(p, 'index.html'));
};
const missing = new Map();
const placeholders = new Set();
for (const f of walk(DIST).filter((f) => extname(f) === '.html')) {
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const u = m[1];
    if (u.startsWith('//')) continue;
    if (!exists(u)) {
      if (u.startsWith('/assets/screenshots/')) placeholders.add(u);
      else missing.set(u, f.replace(DIST, ''));
    }
  }
}
// in-page anchors that point to ids which do not exist
for (const f of walk(DIST).filter((f) => extname(f) === '.html')) {
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(/href="#([^"]+)"/g)) if (!new RegExp(`id="${m[1]}"`).test(src)) missing.set('#' + m[1], f.replace(DIST, ''));
}

console.log(`Built ${pages.length + 1} pages into dist/`);
if (placeholders.size) console.log(`Screenshot placeholders (add these files to public/assets/screenshots/):\n  ${[...placeholders].map((p) => p.replace('/assets/screenshots/', '')).join('\n  ')}`);
const warn = [];
if (!cfg.contact.facebook) warn.push('contact.facebook is empty: the Facebook link is hidden');
if (!cfg.analytics.ga4Id) warn.push('analytics.ga4Id is empty: Google Analytics is off');
for (const d of cfg.downloads) if (!d.url) warn.push(`downloads: "${d.name}" has no url: the download button is disabled`);
for (const p of cfg.products) if (p.slug && !p.video.url) warn.push(`product "${p.short}" has no demo video url`);
if (warn.length) console.log('Config notes:\n  - ' + warn.join('\n  - '));
if (missing.size) {
  console.error('\nBROKEN LINKS:');
  for (const [u, f] of missing) console.error(`  ${u}   (in ${f})`);
  process.exit(1);
}
console.log('Link check: OK');
