/* ============================================================
   App shell: hash routing, progress (localStorage), theme,
   rendering lessons, mounting interactive widgets.
   ============================================================ */
(function () {
  const KEY_DONE = 'devcourse.completed';
  const KEY_THEME = 'devcourse.theme';
  const lessons = window.LESSONS;
  const total = lessons.length;

  const sidebar = document.getElementById('sidebar');
  const nav = document.getElementById('nav');
  const content = document.getElementById('content');
  const crumb = document.getElementById('crumb');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const scrim = document.getElementById('scrim');

  function getDone() {
    try { return new Set(JSON.parse(localStorage.getItem(KEY_DONE) || '[]')); }
    catch { return new Set(); }
  }
  function setDone(set) { localStorage.setItem(KEY_DONE, JSON.stringify([...set])); }

  /* ---------- theme ---------- */
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(KEY_THEME, t);
    const btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = t === 'dark' ? '☀️' : '🌙';
  }
  const savedTheme = localStorage.getItem(KEY_THEME) ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);
  document.getElementById('themeBtn').onclick = () =>
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');

  /* ---------- sidebar nav ---------- */
  function buildNav() {
    const done = getDone();
    nav.innerHTML = '';
    // home item
    const home = document.createElement('li');
    home.innerHTML = `<a href="#/" data-route="/"><span class="num" style="background:transparent;color:var(--accent)">★</span> Course home</a>`;
    nav.appendChild(home);
    lessons.forEach(l => {
      const li = document.createElement('li');
      const isDone = done.has(l.id);
      li.innerHTML = `<a href="#/${l.id}" data-route="/${l.id}">
        <span class="num"><span>${l.num}</span></span>${l.title}</a>`;
      if (isDone) li.querySelector('a').classList.add('done');
      nav.appendChild(li);
    });
    updateProgress();
  }

  function updateProgress() {
    const done = getDone();
    const pct = Math.round((done.size / total) * 100);
    progressBar.style.width = pct + '%';
    progressText.textContent = `${done.size} / ${total} topics`;
  }

  function setActive(route) {
    nav.querySelectorAll('a').forEach(a =>
      a.classList.toggle('active', a.getAttribute('data-route') === route));
  }

  /* ---------- widget mounting ---------- */
  function mountWidgets(root, lesson) {
    root.querySelectorAll('[data-widget]').forEach(el => {
      const name = el.getAttribute('data-widget');
      const fn = window.Widgets[name];
      if (!fn) return;
      if (name === 'quiz') {
        const qi = parseInt(el.getAttribute('data-qi') || '0', 10);
        fn(el, lesson.quizzes && lesson.quizzes[qi]);
      } else {
        fn(el);
      }
    });
  }

  /* ---------- render home ---------- */
  function renderHome() {
    crumb.textContent = 'Course home';
    setActive('/');
    content.innerHTML = `
      <div class="lesson">
        <div class="home-hero">
          <span class="eyebrow">Interactive e-learning</span>
          <h1>Dev Literacy for UX Designers</h1>
          <p class="subtitle">Understand how developers build with React — and the vocabulary (webhooks, fetch, APIs, state) — so you can talk to engineers in their own language. No coding required.</p>
        </div>
        <div class="callout tip"><span class="ico">🧭</span><div><span class="label">How to use this</span>
          Work through the topics in order the first time — each builds on the last. Play the <strong>animations</strong>, take the end-of-topic <strong>quiz</strong>, and hit <strong>“Mark complete”</strong> to track progress (saved in your browser). Every topic ends with “How to recognize it as a UX designer.”</div></div>
        <div class="home-grid" id="homeGrid"></div>
        <div class="callout why" style="margin-top:26px"><span class="ico">🍽️</span><div><span class="label">One mental model for the whole course</span>
          A web app is a conversation: the <strong>frontend</strong> (your UI) politely <em>asks</em> for things; the <strong>backend</strong> (servers, data) <em>answers</em>. Almost every term here is a detail about how that conversation happens — who talks first, in what format, and what the UI shows while it waits.</div></div>
      </div>`;
    const grid = document.getElementById('homeGrid');
    const done = getDone();
    lessons.forEach(l => {
      const a = document.createElement('a');
      a.href = '#/' + l.id;
      a.className = 'home-card';
      a.innerHTML = `<div class="n">Topic ${l.num}${done.has(l.id) ? ' · ✓ done' : ''}</div>
        <div class="t">${l.title}</div><div class="d">${l.subtitle}</div>`;
      grid.appendChild(a);
    });
    window.scrollTo(0, 0);
  }

  /* ---------- render a lesson ---------- */
  function renderLesson(lesson) {
    const idx = lessons.indexOf(lesson);
    const prev = lessons[idx - 1];
    const next = lessons[idx + 1];
    const done = getDone();
    const isDone = done.has(lesson.id);
    crumb.textContent = `Topic ${lesson.num} — ${lesson.title}`;
    setActive('/' + lesson.id);

    content.innerHTML = `
      <article class="lesson">
        <span class="eyebrow">Topic ${lesson.num} of ${total}</span>
        <h1>${lesson.title}</h1>
        <p class="subtitle">${lesson.subtitle}</p>
        ${lesson.html}
      </article>
      <div class="lesson-footer">
        <div class="complete-row">
          <button class="btn ${isDone ? 'done' : 'btn-primary'}" id="completeBtn">
            ${isDone ? '✓ Completed' : 'Mark complete'}</button>
          <span style="color:var(--text-faint);font-size:13px">${isDone ? 'Nice — revisit anytime.' : 'Mark it done to track your progress.'}</span>
        </div>
        <div class="pager">
          ${prev
            ? `<a href="#/${prev.id}"><div class="dir">← Previous</div><div class="ttl">${prev.title}</div></a>`
            : `<a class="disabled"></a>`}
          ${next
            ? `<a class="next" href="#/${next.id}"><div class="dir">Next →</div><div class="ttl">${next.title}</div></a>`
            : `<a class="next" href="#/"><div class="dir">Finish →</div><div class="ttl">Back to course home</div></a>`}
        </div>
      </div>`;

    mountWidgets(content, lesson);

    document.getElementById('completeBtn').onclick = function () {
      const d = getDone();
      if (d.has(lesson.id)) { d.delete(lesson.id); }
      else { d.add(lesson.id); }
      setDone(d);
      buildNav();
      // refresh button state without full re-render
      const nowDone = d.has(lesson.id);
      this.className = 'btn ' + (nowDone ? 'done' : 'btn-primary');
      this.textContent = nowDone ? '✓ Completed' : 'Mark complete';
      this.nextElementSibling.textContent = nowDone ? 'Nice — revisit anytime.' : 'Mark it done to track your progress.';
    };
    window.scrollTo(0, 0);
  }

  /* ---------- router ---------- */
  function route() {
    const hash = location.hash.replace(/^#/, '') || '/';
    closeSidebar();
    if (hash === '/' || hash === '') { renderHome(); return; }
    const id = hash.replace(/^\//, '');
    const lesson = lessons.find(l => l.id === id);
    if (lesson) renderLesson(lesson);
    else renderHome();
  }

  /* ---------- mobile sidebar ---------- */
  function openSidebar() { sidebar.classList.add('open'); scrim.classList.add('show'); }
  function closeSidebar() { sidebar.classList.remove('open'); scrim.classList.remove('show'); }
  document.getElementById('menuBtn').onclick = openSidebar;
  scrim.onclick = closeSidebar;

  window.addEventListener('hashchange', route);
  buildNav();
  route();
})();
