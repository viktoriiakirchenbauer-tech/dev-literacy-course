/* ============================================================
   Interactive animated widgets.
   Each widget is a function mount(el) that fills the given
   container. app.js scans lessons for [data-widget="name"]
   and calls Widgets[name](el).
   ============================================================ */

const Widgets = {};

/* small helper */
function h(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ------------------------------------------------------------
   1. Waiter trip — request / response animation
   ------------------------------------------------------------ */
Widgets['waiter-trip'] = function (el) {
  el.innerHTML = `
  <div class="widget">
    <div class="widget-head"><span class="tag">Try it</span><span class="title">A request &amp; response — the "waiter trip"</span></div>
    <div class="widget-body">
      <div class="trip-stage">
        <div class="node frontend" data-fe>Frontend<div class="sub">your UI, in the browser</div></div>
        <div class="trip-track">
          <div class="trip-line"></div>
          <div class="packet request" data-req>GET /api/supplier/42</div>
          <div class="packet response" data-res>200 · JSON data</div>
          <div class="packet error" data-err>500 · failed</div>
        </div>
        <div class="node backend" data-be>Backend<div class="sub">server + database</div></div>
      </div>
      <div class="trip-log" data-log>Press “Send request” to watch the frontend ask the backend for data.</div>
      <div class="widget-controls">
        <button class="btn btn-primary" data-go>▶ Send request</button>
        <button class="btn btn-ghost" data-fail>Simulate failure</button>
      </div>
    </div>
  </div>`;

  const req = el.querySelector('[data-req]');
  const res = el.querySelector('[data-res]');
  const err = el.querySelector('[data-err]');
  const fe = el.querySelector('[data-fe]');
  const be = el.querySelector('[data-be]');
  const log = el.querySelector('[data-log]');
  const go = el.querySelector('[data-go]');
  const fail = el.querySelector('[data-fail]');
  let busy = false;

  function animatePacket(node, from, to) {
    return new Promise(resolve => {
      node.style.transition = 'none';
      node.style.left = from + '%';
      node.style.opacity = '0';
      requestAnimationFrame(() => {
        node.style.transition = 'left 1.1s cubic-bezier(.4,0,.2,1), opacity .3s';
        node.style.opacity = '1';
        node.style.left = to + '%';
        setTimeout(() => { node.style.opacity = '0'; resolve(); }, 1150);
      });
    });
  }

  async function run(isFail) {
    if (busy) return; busy = true; go.disabled = fail.disabled = true;
    log.textContent = '→ Frontend: "Hey backend, give me supplier #42."';
    fe.classList.add('pulse'); setTimeout(() => fe.classList.remove('pulse'), 600);
    await animatePacket(req, 0, 100);
    be.classList.add('pulse'); setTimeout(() => be.classList.remove('pulse'), 600);
    log.textContent += '\n   Backend: looking it up in the database…';
    await sleep(700);
    if (isFail) {
      log.textContent += '\n← Backend: "Something broke on my side (500)."';
      await animatePacket(err, 100, 0);
      fe.classList.add('pulse'); setTimeout(() => fe.classList.remove('pulse'), 600);
      log.textContent += '\n→ UI job: show a friendly error + a Retry button.';
    } else {
      log.textContent += '\n← Backend: "Here you go (200): { name, status, balance } as JSON."';
      await animatePacket(res, 100, 0);
      fe.classList.add('pulse'); setTimeout(() => fe.classList.remove('pulse'), 600);
      log.textContent += '\n→ UI job: swap the loading skeleton for the real data.';
    }
    busy = false; go.disabled = fail.disabled = false;
  }
  go.onclick = () => run(false);
  fail.onclick = () => run(true);
};

/* ------------------------------------------------------------
   2. Polling vs Webhook — side-by-side animation
   ------------------------------------------------------------ */
Widgets['polling-vs-webhook'] = function (el) {
  el.innerHTML = `
  <div class="widget">
    <div class="widget-head"><span class="tag">Compare</span><span class="title">Polling vs. Webhook — who starts the conversation?</span></div>
    <div class="widget-body">
      <div class="vs-grid">
        <div class="vs-col">
          <h4>🔁 Polling (asking)</h4>
          <p class="desc">The frontend keeps asking “ready yet?”. Lots of wasted trips; the user still waits.</p>
          <div class="vs-scene" data-poll>
            <div class="vs-side left">APP</div><div class="vs-side right">SERVER</div>
            <div class="counter-badge" data-pcount>0 requests sent</div>
          </div>
        </div>
        <div class="vs-col">
          <h4>🪝 Webhook (being told)</h4>
          <p class="desc">Silence… then the instant the event happens, the server pushes the news. One message.</p>
          <div class="vs-scene" data-hook>
            <div class="vs-side left">APP</div><div class="vs-side right">SERVER</div>
            <div class="counter-badge" data-hcount>waiting…</div>
          </div>
        </div>
      </div>
      <div class="widget-controls">
        <button class="btn btn-primary" data-go>▶ Play both</button>
      </div>
    </div>
  </div>`;

  const pollScene = el.querySelector('[data-poll]');
  const hookScene = el.querySelector('[data-hook]');
  const pcount = el.querySelector('[data-pcount]');
  const hcount = el.querySelector('[data-hcount]');
  const go = el.querySelector('[data-go]');
  let busy = false;

  function flyMsg(scene, cls, text, fromLeft, dur) {
    const m = h(`<div class="msg ${cls}">${text}</div>`);
    scene.appendChild(m);
    const start = fromLeft ? 54 : null, end = fromLeft ? null : 54;
    if (fromLeft) { m.style.left = '54px'; } else { m.style.right = '54px'; }
    requestAnimationFrame(() => {
      m.style.transition = `all ${dur}ms ease`;
      m.style.opacity = '1';
      if (fromLeft) { m.style.left = 'calc(100% - 110px)'; }
      else { m.style.right = 'calc(100% - 110px)'; }
      setTimeout(() => { m.style.opacity = '0'; setTimeout(() => m.remove(), 300); }, dur);
    });
    return sleep(dur);
  }

  async function run() {
    if (busy) return; busy = true; go.disabled = true;
    let n = 0;
    hcount.textContent = 'waiting…';
    // polling: ask repeatedly
    for (let i = 0; i < 4; i++) {
      n++; pcount.textContent = `${n} request${n > 1 ? 's' : ''} sent`;
      await flyMsg(pollScene, 'ask', 'ready?', true, 650);
      const answer = i < 3 ? 'nope' : 'yes!';
      await flyMsg(pollScene, i < 3 ? 'nope' : 'push', answer, false, 650);
    }
    pcount.textContent = `4 requests to get 1 answer`;
    busy = false; go.disabled = false;
  }

  async function runHook() {
    // webhook: quiet, then one push at the moment of the event
    hcount.textContent = 'waiting for the event…';
    await sleep(2600);
    hcount.textContent = '⚡ event happened!';
    await flyMsg(hookScene, 'push', 'payment cleared ⚡', false, 800);
    hcount.textContent = '1 push, delivered instantly';
  }

  go.onclick = () => { run(); runHook(); };
};

/* ------------------------------------------------------------
   3. React state → re-render
   ------------------------------------------------------------ */
Widgets['react-state'] = function (el) {
  el.innerHTML = `
  <div class="widget">
    <div class="widget-head"><span class="tag">Try it</span><span class="title">State changes → React re-renders the UI</span></div>
    <div class="widget-body">
      <div class="react-demo">
        <div class="state-box">
          <div style="color:var(--text-faint);font-size:11px;margin-bottom:6px">component state</div>
          <div class="kv"><span>liked</span><span class="val" data-liked>false</span></div>
          <div class="kv"><span>likeCount</span><span class="val" data-count>128</span></div>
        </div>
        <div class="ui-preview" data-ui>
          <div class="like-heart" data-heart>🤍</div>
          <div data-label style="font-size:13px;color:var(--text-soft);margin-top:6px">128 likes</div>
          <div class="rerender-tag" data-tag>⟳ re-rendered</div>
        </div>
      </div>
      <div class="widget-controls">
        <button class="btn btn-primary" data-toggle>Click the like button</button>
        <button class="btn btn-ghost" data-reset>Reset</button>
      </div>
    </div>
  </div>`;

  const liked = el.querySelector('[data-liked]');
  const count = el.querySelector('[data-count]');
  const heart = el.querySelector('[data-heart]');
  const label = el.querySelector('[data-label]');
  const ui = el.querySelector('[data-ui]');
  const tag = el.querySelector('[data-tag]');
  let isLiked = false, c = 128;

  function flash(node) { node.classList.remove('flash'); void node.offsetWidth; node.classList.add('flash'); }

  function render() {
    liked.textContent = String(isLiked); flash(liked);
    count.textContent = String(c); flash(count);
    heart.textContent = isLiked ? '❤️' : '🤍';
    heart.classList.toggle('on', isLiked);
    label.textContent = c + ' likes';
    ui.classList.remove('rerender'); void ui.offsetWidth; ui.classList.add('rerender');
    tag.classList.add('show'); setTimeout(() => tag.classList.remove('show'), 900);
  }
  el.querySelector('[data-toggle]').onclick = () => { isLiked = !isLiked; c += isLiked ? 1 : -1; render(); };
  el.querySelector('[data-reset]').onclick = () => { isLiked = false; c = 128; render(); };
};

/* ------------------------------------------------------------
   4. Fetch states — loading / success / error
   ------------------------------------------------------------ */
Widgets['fetch-states'] = function (el) {
  el.innerHTML = `
  <div class="widget">
    <div class="widget-head"><span class="tag">Try it</span><span class="title">The same screen has many states</span></div>
    <div class="widget-body">
      <div class="fetch-screen" data-screen></div>
      <div class="widget-controls">
        <button class="btn btn-primary" data-ok>Load (success)</button>
        <button class="btn btn-ghost" data-slow>Slow network</button>
        <button class="btn btn-ghost" data-empty>Empty result</button>
        <button class="btn btn-ghost" data-err>Server error</button>
      </div>
    </div>
  </div>`;
  const screen = el.querySelector('[data-screen]');
  let token = 0;

  const loading = `<div class="state-msg"><div class="spinner"></div><div style="color:var(--text-faint);font-size:13px">Fetching…</div><div class="skel" style="width:70%;margin:14px auto 0"></div><div class="skel" style="width:50%;margin:8px auto 0"></div></div>`;
  const success = `<div class="data-card"><div class="row"><span style="color:var(--text-faint)">Supplier</span><strong>Acme Co</strong></div><div class="row"><span style="color:var(--text-faint)">Status</span><strong style="color:var(--success)">Active</strong></div><div class="row"><span style="color:var(--text-faint)">Balance</span><strong>$125,000</strong></div></div>`;
  const empty = `<div class="state-msg"><div class="big">📭</div><strong>No suppliers yet</strong><div style="color:var(--text-faint);font-size:13px;margin-top:4px">Add your first supplier to get started.</div><div class="code">200 OK · empty list</div></div>`;
  const error = `<div class="state-msg err"><div class="big">⚠️</div><strong>Something went wrong</strong><div style="color:var(--text-faint);font-size:13px;margin-top:4px">We couldn’t load this. Please try again.</div><div class="code">500 · server error</div></div>`;

  async function flow(result, delay) {
    const myToken = ++token;
    screen.innerHTML = loading;
    await sleep(delay);
    if (myToken !== token) return;
    screen.innerHTML = result;
  }
  el.querySelector('[data-ok]').onclick = () => flow(success, 1100);
  el.querySelector('[data-slow]').onclick = () => flow(success, 3200);
  el.querySelector('[data-empty]').onclick = () => flow(empty, 1100);
  el.querySelector('[data-err]').onclick = () => flow(error, 1300);
  screen.innerHTML = `<div class="state-msg"><div style="color:var(--text-faint);font-size:14px">Pick a scenario below to see how one screen must handle each outcome.</div></div>`;
};

/* ------------------------------------------------------------
   5. Status code explorer
   ------------------------------------------------------------ */
Widgets['status-codes'] = function (el) {
  const codes = {
    '200': ['OK — success', 'Show the data. This is the happy path (success state).'],
    '201': ['Created', 'Your POST worked and something new exists. Confirm the creation to the user.'],
    '400': ['Bad request', 'The frontend sent something invalid. Design inline validation / “check your input”.'],
    '401': ['Not logged in', 'The user needs to authenticate. Show a login prompt.'],
    '403': ['Forbidden', 'Logged in but not allowed. Show a clear “you don’t have access” state.'],
    '404': ['Not found', 'That thing doesn’t exist. Design a specific empty/not-found state — not a generic error.'],
    '500': ['Server error', 'The backend broke. Show a friendly “something went wrong” + Retry. Never show raw errors.']
  };
  el.innerHTML = `
  <div class="widget">
    <div class="widget-head"><span class="tag">Explore</span><span class="title">Status codes = different screens to design</span></div>
    <div class="widget-body">
      <div class="chips" data-chips></div>
      <div class="chip-explain" data-explain>Tap a status code to see what it means and the UI state it implies.</div>
    </div>
  </div>`;
  const chips = el.querySelector('[data-chips]');
  const explain = el.querySelector('[data-explain]');
  Object.keys(codes).forEach(code => {
    const chip = h(`<button class="chip">${code}</button>`);
    chip.onclick = () => {
      chips.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      explain.innerHTML = `<strong>${code} — ${codes[code][0]}</strong><br>${codes[code][1]}`;
    };
    chips.appendChild(chip);
  });
};

/* ------------------------------------------------------------
   6. Quiz (data-driven)
   ------------------------------------------------------------ */
Widgets['quiz'] = function (el, cfg) {
  if (!cfg) return;
  const q = cfg;
  el.innerHTML = `
  <div class="widget">
    <div class="widget-head"><span class="tag">Check yourself</span><span class="title">Quick quiz</span></div>
    <div class="widget-body quiz">
      <div class="q">${q.q}</div>
      <div class="opts" data-opts></div>
      <div class="feedback" data-fb></div>
    </div>
  </div>`;
  const opts = el.querySelector('[data-opts]');
  const fb = el.querySelector('[data-fb]');
  let answered = false;
  q.options.forEach((opt, i) => {
    const b = h(`<button class="opt">${opt}</button>`);
    b.onclick = () => {
      if (answered) return; answered = true;
      if (i === q.answer) { b.classList.add('correct'); fb.textContent = '✓ ' + q.explain; }
      else {
        b.classList.add('wrong');
        opts.children[q.answer].classList.add('correct');
        fb.textContent = '✗ ' + q.explain;
      }
    };
    opts.appendChild(b);
  });
};

window.Widgets = Widgets;
