/* Burhan Nexus - site behaviour (no dependencies) */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header: scrolled shadow + mobile menu ---------- */
  var header = $('.site-header');
  var onScroll = function () { header && header.classList.toggle('scrolled', window.scrollY > 8); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var btn = $('.menu-btn');
  var nav = $('#primary-nav');
  function setMenu(open) {
    if (!btn || !nav) return;
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (btn && nav) {
    btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { setMenu(false); btn.focus(); }
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('click', function (e) {
      if (btn.getAttribute('aria-expanded') === 'true' && !e.target.closest('.nav-bar')) setMenu(false);
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) setMenu(false); });
  }

  /* ---------- reveal on scroll ---------- */
  var reveals = $$('.reveal');
  if (!('IntersectionObserver' in window) || reduce) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        // also reveal blocks the visitor jumped past (anchor links, End key), so nothing stays hidden
        if (en.isIntersecting || en.boundingClientRect.top < 0) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- screenshot placeholders (when an image file is not there yet) ---------- */
  var phIcon = '<svg class="icon" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>';
  function toPlaceholder(img) {
    if (img.__ph) return;
    img.__ph = true;
    var ph = document.createElement('div');
    ph.className = 'ph';
    ph.setAttribute('role', 'img');
    ph.setAttribute('aria-label', (img.alt || 'Screenshot') + ' (coming soon)');
    ph.innerHTML = phIcon + '<span>Screenshot coming soon</span>';
    var a = img.closest('a[data-lightbox]');
    img.replaceWith(ph);
    if (a) {
      a.removeAttribute('href');
      a.removeAttribute('data-lightbox');
      a.removeAttribute('aria-label');
      a.classList.add('is-ph');
    }
  }
  $$('img[data-shot]').forEach(function (img) {
    img.addEventListener('error', function () { toPlaceholder(img); });
    if (img.complete && img.naturalWidth === 0 && img.currentSrc !== '') toPlaceholder(img);
  });

  /* ---------- lightbox ---------- */
  var lb = $('#lightbox');
  if (lb) {
    var lbImg = $('.lb-img', lb), lbCap = $('.lb-cap', lb);
    var items = [], idx = 0, lastFocus = null;
    var collect = function (group) { return $$('a[data-lightbox="' + group + '"]').filter(function (a) { return a.hasAttribute('data-lightbox'); }); };
    var show = function () {
      var a = items[idx];
      lbImg.src = a.getAttribute('href');
      lbImg.alt = (a.querySelector('img') && a.querySelector('img').alt) || '';
      lbCap.textContent = a.getAttribute('data-caption') || '';
      lb.classList.toggle('single', items.length < 2);
    };
    var open = function (a) {
      items = collect(a.getAttribute('data-lightbox'));
      idx = Math.max(0, items.indexOf(a));
      lastFocus = document.activeElement;
      show();
      lb.hidden = false;
      document.body.classList.add('lb-open');
      $('.lb-close', lb).focus();
    };
    var close = function () {
      lb.hidden = true;
      document.body.classList.remove('lb-open');
      lbImg.removeAttribute('src');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    var step = function (d) { if (items.length > 1) { idx = (idx + d + items.length) % items.length; show(); } };
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-lightbox]');
      if (a) { e.preventDefault(); open(a); }
    });
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.closest('.lb-close')) close();
      else if (e.target.closest('.lb-prev')) step(-1);
      else if (e.target.closest('.lb-next')) step(1);
    });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'Tab') { // keep focus inside the dialog
        var f = $$('button', lb).filter(function (b) { return b.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- product code decoder (illustrative example only) ---------- */
  $$('[data-decoder]').forEach(function (box) {
    var key = (box.getAttribute('data-key') || '').toUpperCase();
    var inP = $('[data-in-price]', box), inC = $('[data-in-code]', box);
    var outC = $('[data-out-code]', box), outP = $('[data-out-price]', box);
    inP.addEventListener('input', function () {
      var digits = inP.value.replace(/\D/g, '');
      outC.textContent = digits ? digits.split('').map(function (d) { return key[+d]; }).join('') : '-';
    });
    inC.addEventListener('input', function () {
      var letters = inC.value.toUpperCase().replace(/[^A-Z]/g, '');
      if (!letters) { outP.textContent = '-'; return; }
      var out = '', bad = false;
      for (var i = 0; i < letters.length; i++) { var p = key.indexOf(letters[i]); if (p < 0) { bad = true; break; } out += p; }
      outP.textContent = bad ? 'Letter not in the example key' : out;
    });
  });

  /* ---------- contact form (never shows success unless the server confirms it) ---------- */
  var form = $('form[name="contact"]');
  if (form) {
    var status = $('.form-status', form), submit = $('button[type="submit"]', form);
    var say = function (cls, html) { status.hidden = false; status.className = 'form-status ' + cls; status.innerHTML = html; };
    form.addEventListener('submit', function (e) {
      if (form.getAttribute('data-live') !== '1') { e.preventDefault(); return; }
      e.preventDefault();
      var bad = false;
      $$('input[required], textarea[required]', form).forEach(function (f) {
        var ok = f.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()) : f.value.trim() !== '';
        f.classList.toggle('invalid', !ok);
        f.setAttribute('aria-invalid', ok ? 'false' : 'true');
        if (!ok && !bad) { bad = true; f.focus(); }
      });
      if (bad) { say('err', 'Please fill in your name, a valid email, a subject and a message.'); return; }
      submit.disabled = true; submit.classList.add('loading');
      say('ok', 'Sending...');
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)).toString() })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          form.reset();
          say('ok', 'Thank you! Your message has been sent. We will reply soon.');
        })
        .catch(function () {
          say('err', 'Sorry, your message could not be sent. Please message us on <a href="https://wa.me/' + (document.querySelector('a[href^="https://wa.me/"]') || { href: '' }).href.split('wa.me/')[1].split('?')[0] + '" target="_blank" rel="noopener">WhatsApp</a> or send an email instead.');
        })
        .then(function () { submit.disabled = false; submit.classList.remove('loading'); });
    });
  }

  /* ---------- analytics events (only if Google Analytics is configured) ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-track]');
    if (el && typeof window.gtag === 'function') {
      window.gtag('event', el.getAttribute('data-track'), { page_path: location.pathname, link_url: el.href || '' });
    }
  });
})();
