/* Verdanza Garden Estate — shared script. Vanilla JS only. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const page = document.body.dataset.page;
  const html = document.documentElement;
  const U = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

  /* ---------- Shared SVG bits ---------- */
  const LEAF = '<svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M6 27C6 13 14 5 27 5c0 13-8 21-21 22Z"/><path d="M6 27 20 13"/></svg>';
  const FLOWER = '<svg viewBox="0 0 40 40" width="28" height="28" aria-hidden="true"><g fill="currentColor"><circle cx="20" cy="9" r="6.5"/><circle cx="31" cy="17" r="6.5"/><circle cx="27" cy="30" r="6.5"/><circle cx="13" cy="30" r="6.5"/><circle cx="9" cy="17" r="6.5"/></g><circle cx="20" cy="20" r="4.5" fill="#b8985a"/></svg>';
  const BRANCH = `<svg class="deco" viewBox="0 0 200 320" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M100 320C88 240 124 160 100 10"/>${[0, 1, 2, 3, 4, 5].map(i => {
    const y = 290 - i * 46, s = i % 2 ? 1 : -1, x = 100 + s * -5;
    return `<path d="M${x} ${y}Q${x + s * 30} ${y - 34} ${x + s * 62} ${y - 22}Q${x + s * 34} ${y + 4} ${x} ${y}Z"/>`;
  }).join('')}</svg>`;

  /* ---------- Header / footer / widgets (injected so every page shares them) ---------- */
  const links = [['index.html', 'Home', 'home'], ['rates.html', 'Event Rates', 'rates'], ['gallery.html', 'Gallery', 'gallery'], ['inquiry.html', 'Inquiry', 'inquiry']];
  $('#site-header').outerHTML = `<header class="nav" id="nav"><div class="nav-in">
  <a class="logo" href="index.html" aria-label="Verdanza Garden Estate, home">${LEAF}<span>Verdanza<small>Garden Estate</small></span></a>
  <nav id="menu" aria-label="Main">${links.map(l => `<a href="${l[0]}"${l[2] === page ? ' aria-current="page"' : ''}>${l[1]}</a>`).join('')}<a class="btn btn--sm" href="inquiry.html">Plan your event</a></nav>
  <button class="burger" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><span></span><span></span></button></div></header>`;
  $('#site-footer').outerHTML = `<footer class="foot"><div class="wrap"><div class="foot-g">
  <div><a class="logo" href="index.html">${LEAF}<span>Verdanza<small>Garden Estate</small></span></a><p class="tag">Where moments bloom.</p>
    <div class="soc"><a href="#" aria-label="Facebook (placeholder)"><i class="fa-brands fa-facebook-f"></i></a><a href="#" aria-label="Instagram (placeholder)"><i class="fa-brands fa-instagram"></i></a><a href="#" aria-label="TikTok (placeholder)"><i class="fa-brands fa-tiktok"></i></a></div></div>
  <div><h4>Explore</h4><ul>${links.map(l => `<li><a href="${l[0]}">${l[1]}</a></li>`).join('')}</ul></div>
  <div><h4>Celebrations</h4><ul><li><a href="rates.html?cat=prenup">Prenup Photoshoots</a></li><li><a href="rates.html?cat=wedding">Weddings</a></li><li><a href="rates.html?cat=birthday">Birthdays</a></li><li><a href="rates.html?cat=private">Private &amp; Corporate</a></li></ul></div>
  <div><h4>Visit</h4><ul><li>Cavite, Philippines</li><li>+63 900 000 0000</li><li>hello@verdanza.example</li><li>Tue–Sun, 8:00 AM–8:00 PM</li><li>Mondays by appointment</li></ul></div>
  </div><div class="copy"><span>© 2026 Verdanza Garden Estate. All rights reserved.</span><span>A fictional venue for design purposes.</span></div></div></footer>
  <div class="bloom" id="bloom"><div class="bloom-card" role="dialog" aria-label="A garden thought" id="bloomCard"><button class="cl" aria-label="Close" id="bloomX"><i class="fa-solid fa-xmark"></i></button><p id="bloomMsg" aria-live="polite"></p><button class="again" id="bloomMore">Another bloom</button></div>
  <button class="bloom-btn" id="bloomBtn" aria-label="Open garden thoughts" aria-expanded="false" aria-controls="bloomCard">${FLOWER}</button></div>
  <button class="totop" id="totop" aria-label="Back to top"><i class="fa-solid fa-leaf"></i></button>`;
  $$('[data-deco]').forEach(el => el.innerHTML = BRANCH);
  $$('img[data-u]').forEach(i => { i.src = U('1' + i.dataset.u, i.dataset.w || 900); i.addEventListener('error', () => i.classList.add('bad')); });

  /* ---------- Vine intro (once per session, skippable, off for reduced motion) ---------- */
  function intro() {
    const finish = () => { html.classList.remove('pending'); document.body.classList.add('ready'); };
    if (!html.classList.contains('pending')) return finish();
    try { sessionStorage.setItem('vg', '1'); } catch (e) { }
    const NS = 'http://www.w3.org/2000/svg';
    const el = document.createElement('div');
    el.id = 'intro'; el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<div class="half l"></div><div class="half r"></div><div class="intro-mark"><span>Verdanza</span><small>Garden Estate</small></div><button class="skip" tabindex="0">Skip intro</button>';
    document.body.append(el);
    html.classList.add('locked'); html.classList.remove('pending');
    const sv = document.createElementNS(NS, 'svg');
    sv.setAttribute('viewBox', '0 0 500 800'); sv.setAttribute('preserveAspectRatio', 'xMaxYMid slice');
    [80, 200, 330, 450, 580, 710].forEach((y, i) => {
      const ty = 400 + (y - 400) * .12, p = document.createElementNS(NS, 'path');
      p.setAttribute('d', `M-20 ${y}C120 ${y - 130} 230 ${y + 130} 370 ${y - 20}S480 ${ty} 510 ${ty}`);
      p.setAttribute('pathLength', 1); p.setAttribute('class', 'vine'); p.style.setProperty('--d', i * .08 + 's'); sv.append(p);
    });
    $('.l', el).append(sv);
    $$('.vine', sv).forEach((p, i) => {
      const L = p.getTotalLength();
      for (let k = 1; k <= 9; k++) {
        const t = k / 10, a = p.getPointAtLength(L * t), b = p.getPointAtLength(Math.min(L, L * t + 6));
        const ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI + (k % 2 ? -50 : 50);
        const g = document.createElementNS(NS, 'g'), lf = document.createElementNS(NS, 'path');
        g.setAttribute('transform', `translate(${a.x} ${a.y})`);
        lf.setAttribute('d', 'M0 0C9-13 28-13 38 0 28 13 9 13 0 0Z'); lf.setAttribute('class', 'leaf');
        lf.style.setProperty('--r', ang + 'deg'); lf.style.setProperty('--d', (i * .08 + t * 1.1 + .1) + 's');
        g.append(lf); sv.append(g);
      }
    });
    $('.r', el).append(sv.cloneNode(true));
    let done = false;
    const open = fast => {
      if (done) return; done = true;
      el.classList.add('open'); if (fast) el.classList.add('fast');
      setTimeout(() => document.body.classList.add('ready'), fast ? 150 : 700);
      setTimeout(() => { el.remove(); html.classList.remove('locked'); }, fast ? 800 : 1700);
    };
    $('.skip', el).addEventListener('click', () => open(true));
    setTimeout(() => open(false), 2400);
  }

  /* ---------- Nav: solid on scroll, mobile menu ---------- */
  const nav = $('#nav'), burger = $('.burger'), totop = $('#totop');
  const setMenu = o => { nav.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); html.classList.toggle('locked', o); };
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  $$('#menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') { setMenu(false); bloom(false); } });
  totop.addEventListener('click', () => scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' }));

  /* ---------- Scroll: nav state, back-to-top, parallax ---------- */
  const px = $$('[data-parallax]');
  let tick = false;
  function onScroll() {
    nav.classList.toggle('solid', scrollY > 60);
    totop.classList.toggle('on', scrollY > 700);
    if (!RM) px.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      el.firstElementChild.style.transform = `translate3d(0,${(r.top + r.height / 2 - innerHeight / 2) * -el.dataset.parallax}px,0)`;
    });
    tick = false;
  }
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll + animated counters ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
  }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  $$('[data-r]').forEach((el, i) => {
    if (RM) return el.classList.add('in');
    el.style.transitionDelay = (i % 4) * .1 + 's'; io.observe(el);
  });
  const count = el => {
    const end = +el.dataset.count, suf = el.dataset.suf || '';
    if (RM) return el.textContent = end + suf;
    const t0 = performance.now();
    (function step(t) {
      const p = Math.min(1, (t - t0) / 1800), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e) + (p === 1 ? suf : '');
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  };
  const cio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { count(e.target); cio.unobserve(e.target); } }), { threshold: .6 });
  $$('[data-count]').forEach(el => cio.observe(el));

  /* ---------- Hero petals ---------- */
  const pet = $('.petals');
  if (pet && !RM) for (let i = 0; i < 14; i++) {
    const s = document.createElement('span'); s.className = 'petal';
    s.style.cssText = `left:${Math.random() * 100}%;--s:${8 + Math.random() * 9}px;--t:${14 + Math.random() * 14}s;--w:-${Math.random() * 20}s;--x:${(Math.random() - .5) * 220}px`;
    pet.append(s);
  }

  /* ---------- Custom cursor (desktop fine pointers only) ---------- */
  if (matchMedia('(hover:hover) and (pointer:fine)').matches && !RM) {
    const c = document.createElement('div'); c.className = 'cur'; document.body.append(c);
    let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; c.style.opacity = 1; });
    document.addEventListener('mouseover', e => c.classList.toggle('big', !!e.target.closest('a,button,.gi,.ph')));
    document.addEventListener('mouseleave', () => c.style.opacity = 0);
    (function loop() { cx += (x - cx) * .18; cy += (y - cy) * .18; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
  }

  /* ---------- Testimonial carousel ---------- */
  const slides = $$('.slide');
  if (slides.length) {
    let cur = 0; const dots = $('.dots');
    slides.forEach((_, i) => { const b = document.createElement('button'); b.setAttribute('role', 'tab'); b.setAttribute('aria-label', 'Testimonial ' + (i + 1)); b.onclick = () => go(i); dots.append(b); });
    const go = n => {
      cur = (n + slides.length) % slides.length;
      slides.forEach((s, i) => { s.classList.toggle('on', i === cur); s.setAttribute('aria-hidden', i !== cur); });
      $$('button', dots).forEach((b, i) => b.setAttribute('aria-selected', i === cur));
    };
    $('#prev').onclick = () => go(cur - 1); $('#next').onclick = () => go(cur + 1); go(0);
  }

  /* ---------- Event rates: category switcher ---------- */
  const inc = ['Garden venue access', 'Basic garden setup', 'Photo locations', 'Tables and chairs', 'Event preparation area'];
  const RATES = {
    wedding: {
      blurb: 'Ceremony arch, lawn, and lantern-lit reception, all in one garden.', pk: [
        { n: 'Garden Ceremony', p: '₱45,000', d: 'Up to 6 hours', g: 'Up to 80 guests', i: inc.concat('Ceremony arch and aisle') },
        { n: 'Signature Wedding', p: '₱85,000', pop: 1, d: 'Up to 8 hours', g: 'Up to 150 guests', i: inc.concat('Ceremony and reception areas', 'Bridal suite', 'Evening lantern lighting') }]
    },
    prenup: {
      blurb: 'Golden-hour light, stone paths, and flowers for your first shared photographs.', pk: [
        { n: 'Golden Hour Session', p: '₱5,000', d: '2 hours', g: 'Up to 6 people', i: ['Garden access, all photo spots', 'Changing area', 'Props: chairs and lanterns', 'Free parking'] },
        { n: 'Full Garden Day', p: '₱9,000', d: '5 hours', g: 'Up to 10 people', i: ['Garden access, all photo spots', 'Changing and styling room', 'Props and floral accents', 'Free parking'] }]
    },
    birthday: {
      blurb: 'Kids’ parties, milestone birthdays, and long lunches under the trees.', pk: [
        { n: 'Garden Party', p: '₱15,000', d: '4 hours', g: 'Up to 40 guests', i: inc.slice(0, 4).concat('Basic table styling') },
        { n: 'Grand Celebration', p: '₱32,000', d: '6 hours', g: 'Up to 100 guests', i: inc.concat('Styled welcome area', 'Sound system') }]
    },
    private: {
      blurb: 'Reunions, intimate dinners, and company gatherings with room to breathe.', pk: [
        { n: 'Private Gathering', p: '₱20,000', d: '5 hours', g: 'Up to 60 guests', i: inc },
        { n: 'Corporate & Special', p: '₱38,000', d: '8 hours', g: 'Up to 120 guests', i: inc.concat('Stage area and sound system', 'Dedicated coordinator') }]
    }
  };
  const panel = $('#panel');
  if (panel) {
    const tabs = $$('.tab[data-cat]'), blurb = $('#blurb');
    const paint = cat => {
      const d = RATES[cat]; blurb.textContent = d.blurb;
      panel.innerHTML = d.pk.map(k => `<article class="pkg${k.pop ? ' pop' : ''}">${k.pop ? '<span class="badge">Popular</span>' : ''}<h3>${k.n}</h3><p class="from">Starting at</p><div class="price">${k.p}</div>
      <div class="meta"><span><i class="fa-regular fa-clock"></i> ${k.d}</span><span><i class="fa-solid fa-user-group"></i> ${k.g}</span></div>
      <ul>${k.i.map(x => `<li>${x}</li>`).join('')}</ul><a class="btn" href="inquiry.html">Inquire about this</a></article>`).join('');
    };
    const show = (cat, first) => {
      tabs.forEach(t => t.setAttribute('aria-selected', t.dataset.cat === cat));
      if (first || RM) return paint(cat);
      panel.classList.add('swap'); blurb.classList.add('swap');
      setTimeout(() => { paint(cat); panel.classList.remove('swap'); blurb.classList.remove('swap'); }, 350);
    };
    tabs.forEach(t => t.addEventListener('click', () => show(t.dataset.cat)));
    const q = new URLSearchParams(location.search).get('cat');
    show(RATES[q] ? q : 'wedding', true);
  }

  /* ---------- FAQ accordion (one open at a time) ---------- */
  const faq = $('#faq');
  if (faq) {
    const Q = [
      ['How many guests can the garden accommodate?', 'Up to 150 guests for a seated reception, and a few more for cocktail-style events. Intimate gatherings of 20 to 40 are welcome too.'],
      ['Can we bring our own suppliers?', 'Yes. Bring your own florist, stylist, photographer, and caterer. We ask that you share the supplier list a week before your date.'],
      ['Can we have an evening wedding?', 'Absolutely. The garden is lit with warm lanterns after sunset, and many couples hold ceremonies at golden hour followed by an evening reception.'],
      ['Do you allow prenup photoshoots?', 'Yes. Sessions can be booked on their own, and the garden is open to your photographer. Weekday mornings and late afternoons have the softest light.'],
      ['Is catering included?', 'Catering is not part of our sample packages. You can bring your preferred caterer, and we can suggest local partners.'],
      ['Can we decorate the garden?', 'Yes. Flowers, fabric, and lighting are welcome. Please avoid nails, confetti, and open flames outside designated areas.'],
      ['How far in advance should we book?', 'Weddings book 6 to 12 months ahead, especially for weekends from November to May. Smaller events can often be arranged within a few weeks.']
    ];
    faq.innerHTML = Q.map((x, i) => `<div class="faq-item"><h3><button class="faq-q" aria-expanded="false" aria-controls="fa${i}" id="fq${i}">${x[0]}<i class="fa-solid fa-plus"></i></button></h3><div class="faq-a" id="fa${i}" role="region" aria-labelledby="fq${i}"><div><p>${x[1]}</p></div></div></div>`).join('');
    $$('.faq-q', faq).forEach(b => b.addEventListener('click', () => {
      const open = b.getAttribute('aria-expanded') === 'true';
      $$('.faq-q', faq).forEach(o => { o.setAttribute('aria-expanded', 'false'); o.parentElement.nextElementSibling.classList.remove('open'); });
      if (!open) { b.setAttribute('aria-expanded', 'true'); b.parentElement.nextElementSibling.classList.add('open'); }
    }));
  }

  /* ---------- Gallery: masonry, filter, lightbox ---------- */
  const grid = $('#grid');
  if (grid) {
    const G = [
      ['519225421980-715cb0215aed', 'weddings', 'b', 'The floral arch at golden hour', 'Floral wedding arch in a garden'],
      ['490750967868-88aa4486c946', 'garden', 't', 'Morning blooms along the path', 'Fresh flowers in the garden'],
      ['478146896981-b80fe463b330', 'prenup', 's', 'A prenup session under the trees', 'Couple posing in the garden'],
      ['511795409834-ef04bbd61622', 'events', 's', 'Long tables for an evening dinner', 'Outdoor dining table setup'],
      ['530103862676-de8c9debad1d', 'birthdays', 'w', 'A birthday in full colour', 'Garden birthday celebration setup'],
      ['416879595882-3373a0480b5b', 'garden', 's', 'The Secret Garden', 'Flower garden with a stone path'],
      ['469371670807-013ccf25f16a', 'weddings', 't', 'Reception under the lights', 'Outdoor wedding reception'],
      ['465495976277-4387d4b0b4c6', 'weddings', 's', 'Bridal florals, freshly cut', 'Bridal bouquet'],
      ['470252649378-9c29740c9fa8', 'prenup', 'w', 'Last light on the lawn', 'Sunset over a green field'],
      ['464366400600-7168b8af9bc3', 'prenup', 't', 'Walking the garden aisle', 'Couple walking outdoors'],
      ['519741497674-611481863552', 'events', 's', 'Gathering beneath the trees', 'Outdoor celebration among greenery'],
      ['496062031456-07b8f162a322', 'garden', 's', 'Petals and leaves', 'Close-up of garden flowers'],
      ['585320806297-9794b3e4eeae', 'garden', 's', 'Green corners', 'Lush garden greenery'],
      ['504196606672-aef5c9cefc92', 'events', 'w', 'Dusk settles over the garden', 'Garden at dusk']
    ];
    grid.innerHTML = G.map((g, i) => `<button class="gi ${g[2]}" data-c="${g[1]}" data-i="${i}" aria-label="Open image: ${g[3]}"><img loading="lazy" src="${U('1' + g[0], 900)}" alt="${g[4]}"><span>${g[3]}</span></button>`.replace('photo-11', 'photo-1')).join('');
    $$('img', grid).forEach(i => i.addEventListener('error', () => i.classList.add('bad')));
    const btns = $$('.filters .tab'), items = $$('.gi', grid);
    const filter = f => {
      btns.forEach(b => b.setAttribute('aria-pressed', b.dataset.f === f));
      const run = () => { items.forEach(it => { it.hidden = f !== 'all' && it.dataset.c !== f; it.style.animation = 'none'; it.offsetWidth; it.style.animation = ''; }); grid.classList.remove('out'); };
      if (RM) return run();
      grid.classList.add('out'); setTimeout(run, 300);
    };
    btns.forEach(b => b.addEventListener('click', () => filter(b.dataset.f)));
    const q = new URLSearchParams(location.search).get('cat');
    if (q && btns.some(b => b.dataset.f === q)) filter(q);

    const lb = document.createElement('div');
    lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Image viewer');
    lb.innerHTML = '<button class="x" aria-label="Close"><i class="fa-solid fa-xmark"></i></button><button class="p" aria-label="Previous image"><i class="fa-solid fa-chevron-left"></i></button><button class="n" aria-label="Next image"><i class="fa-solid fa-chevron-right"></i></button><figure><img alt=""><figcaption><span class="cap"></span><span class="cnt"></span></figcaption></figure>';
    document.body.append(lb);
    const im = $('img', lb); let list = [], at = 0, last = null;
    const view = n => {
      at = (n + list.length) % list.length; const it = list[at], src = $('img', it);
      im.classList.add('sw');
      setTimeout(() => { im.src = src.src.replace(/w=\d+/, 'w=1800'); im.alt = src.alt; $('.cap', lb).textContent = $('span', it).textContent; $('.cnt', lb).textContent = `${at + 1} / ${list.length}`; im.classList.remove('sw'); }, RM ? 0 : 250);
    };
    const close = () => { lb.classList.remove('on'); html.classList.remove('locked'); last && last.focus(); };
    items.forEach(it => it.addEventListener('click', () => {
      last = it; list = items.filter(x => !x.hidden); at = list.indexOf(it);
      lb.classList.add('on'); html.classList.add('locked'); view(at); $('.x', lb).focus();
    }));
    $('.x', lb).onclick = close; $('.p', lb).onclick = () => view(at - 1); $('.n', lb).onclick = () => view(at + 1);
    lb.addEventListener('click', e => { if (e.target === lb || e.target.tagName === 'FIGURE') close(); });
    addEventListener('keydown', e => {
      if (!lb.classList.contains('on')) return;
      if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') view(at - 1); if (e.key === 'ArrowRight') view(at + 1);
    });
  }

  /* ---------- Inquiry form (UI only: nothing is sent) ---------- */
  const form = $('#inquiry-form');
  if (form) {
    $('#date').min = new Date().toISOString().slice(0, 10);
    form.addEventListener('submit', e => {
      // FORMSUBMIT: remove this handler once the form action is connected to FormSubmit.
      e.preventDefault();
      const m = $('#formMsg');
      if (!form.checkValidity()) { form.reportValidity(); m.textContent = ''; return; }
      m.textContent = 'Form connection coming soon. Nothing has been sent yet.';
    });
  }

  /* ---------- Garden flower widget ---------- */
  const BLOOMS = [
    'Golden hour is one of the most beautiful times for outdoor portraits.',
    'Hydrangeas can change color depending on the soil’s pH.',
    'Some wedding photographers call the hour before sunset the “golden hour” because of its warm, soft light.',
    'Rain can actually create beautiful reflections and richer colors in garden photographs.',
    'Gardenias are known for their fragrant white flowers.',
    'Flowers often become one of the most photographed details at weddings.',
    'Outdoor evening receptions can create a completely different atmosphere once the garden lights come on.',
    'A garden has a funny way of making even ordinary moments feel cinematic.',
    'Every garden has a favorite corner. Ours might become yours.',
    'The tradition of a bridal bouquet began with fragrant herbs carried to ward off bad luck.',
    'Sampaguita, the national flower of the Philippines, is often strung into garlands for celebrations.',
    'Frangipani blossoms smell strongest in the evening.',
    'Overcast skies make soft, even light, which flatters faces in prenup photos.',
    'Peonies and roses are among the most requested wedding flowers around the world.',
    'Guests tend to remember how a place felt long after they forget the menu.',
    'Fairy lights look warmest when they are kept at the same color temperature across the whole garden.',
    'Shooting with the sun behind your subject gives that glowing, hazy edge to hair and petals.',
    'Throwing rice, petals, or bubbles at newlyweds are all ways of wishing them luck.',
    'Lavender is believed to calm the mind, which is why it shows up in so many wedding favors.',
    'A winding path makes a garden feel bigger than it is.',
    'Candlelight and greenery make nearly everyone look a little more relaxed.',
    'Morning dew makes petals shine, which is why early sessions have a gentle glow.',
    'The best seat at any garden dinner is the one facing the setting sun.'
  ];
  const bl = $('#bloom'), msg = $('#bloomMsg'); let lastMsg = -1;
  function bloom(o) {
    bl.classList.toggle('open', o); $('#bloomBtn').setAttribute('aria-expanded', o);
    if (o && !msg.textContent) next(true);
  }
  function next(first) {
    let n; do { n = Math.floor(Math.random() * BLOOMS.length); } while (n === lastMsg);
    lastMsg = n;
    if (first || RM) return msg.textContent = BLOOMS[n];
    msg.classList.add('sw'); setTimeout(() => { msg.textContent = BLOOMS[n]; msg.classList.remove('sw'); }, 300);
  }
  $('#bloomBtn').onclick = () => bloom(!bl.classList.contains('open'));
  $('#bloomX').onclick = () => { bloom(false); $('#bloomBtn').focus(); };
  $('#bloomMore').onclick = () => next();

  intro();
})();
