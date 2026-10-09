/* ============================================================
   Course content. Each lesson: { id, num, title, subtitle,
   html, quizzes[] }. The html may contain:
     <div data-widget="name"></div>            → animated widget
     <div data-widget="quiz" data-qi="0"></div> → quiz (uses quizzes[0])
   ============================================================ */

const LESSONS = [
  /* ---------------------------------------------------------- */
  {
    id: 'big-picture', num: 1,
    title: 'The Big Picture',
    subtitle: 'How a web app actually runs — frontend, backend, and the trip between them.',
    quizzes: [{
      q: 'A dev says a price calculation “has to happen on the server.” What does that usually imply for your design?',
      options: [
        'It will be instant, so no loading state is needed',
        'There is a round-trip, so you should design a loading (and error) state',
        'It can only run on the user’s phone',
        'It is purely a CSS change'
      ],
      answer: 1,
      explain: 'Server-side means a round-trip to the backend, which takes time and can fail — so plan the waiting and failure states.'
    }],
    html: `
      <p>Before any single term makes sense, you need the map. Everything else in this course is a pin on this map.</p>

      <h2>The two sides: frontend and backend</h2>
      <p>Every web app has two halves that talk to each other.</p>
      <div class="table-wrap"><table>
        <tr><th></th><th>Frontend</th><th>Backend</th></tr>
        <tr><td>Also called</td><td>client, client-side, “the UI”</td><td>server, server-side, “the API”</td></tr>
        <tr><td>Where it runs</td><td>in the user’s <strong>browser</strong></td><td>on a <strong>server</strong> in a data center</td></tr>
        <tr><td>What it is</td><td>your designs made real — buttons, layout, motion</td><td>logic, databases, calculations, security</td></tr>
        <tr><td>User can see it?</td><td><strong>Yes</strong> — it’s on their screen</td><td><strong>No</strong> — invisible, behind the scenes</td></tr>
      </table></div>

      <div class="callout tip"><span class="ico">🍽️</span><div><span class="label">Analogy — a restaurant</span>
        The <strong>frontend</strong> is the dining room (menu, lighting, the waiter). The <strong>backend</strong> is the kitchen (recipes, ingredients). The guest never enters the kitchen — they ask the waiter, who walks over and brings a plate back. That “waiter trip” is the single most important idea in this course. It gets names later: <strong>API, request, response, fetch, webhook</strong>.</div></div>

      <p>Watch one trip happen — press the button:</p>
      <div data-widget="waiter-trip"></div>

      <h2>Client vs server (the words you’ll hear)</h2>
      <ul>
        <li><strong>Client</strong> = the frontend, running on <em>one user’s</em> device. Millions of clients (one per tab).</li>
        <li><strong>Server</strong> = the backend, running centrally, serving many clients at once.</li>
      </ul>
      <p>When a dev says <em>“that has to happen on the server,”</em> they mean it needs data or secrets the browser shouldn’t have, or it can’t be trusted to the browser (users can tamper with anything on their own machine). <strong>Pricing, permissions, payments, anything security-sensitive → server.</strong></p>
      <p>When they say <em>“we can do that client-side,”</em> they mean it happens instantly in the browser with no server trip — show/hide a panel, check a field isn’t empty, filter an already-loaded list.</p>

      <div class="callout why"><span class="ico">🎯</span><div><span class="label">Why it matters to you</span>
        “Can we show the discount instantly as the user types?” might be a client-side <em>yes</em> (instant, cheap) or a server-side <em>no</em> (needs a round-trip, so a tiny delay and a loading state). The answer shapes your microinteraction — now you know why to ask.</div></div>

      <h2>The browser is the runtime</h2>
      <p>The <strong>browser</strong> downloads your frontend and runs it (“runtime” just means “where the code runs”). It draws the pixels, runs the JavaScript, and makes the waiter trips. <strong>DevTools</strong> (right-click → Inspect) is your window into all of it — the <strong>Network tab</strong> literally shows the trips happening. You’ll use it in Topic 5.</p>

      <h2>How a page loads, start to finish</h2>
      <ol>
        <li>You type a URL; the browser asks a server for the page.</li>
        <li>The server sends back <strong>HTML</strong> (structure), <strong>CSS</strong> (style), <strong>JavaScript</strong> (behavior).</li>
        <li>The browser draws the initial page.</li>
        <li>The JavaScript (often a <strong>React</strong> app) wakes up and takes over — now it’s interactive.</li>
        <li>As the user clicks, the app makes more trips (<strong>fetch</strong>) to get fresh data <em>without reloading the whole page</em>.</li>
      </ol>
      <p>That last step — updating parts of the page without a full reload — is what makes a <strong>single-page application (SPA)</strong>, which most React apps are.</p>

      <div class="recognize"><h3>🔎 How to recognize it as a UX designer</h3>
        <ul>
          <li>A <strong>spinner or skeleton</strong> = a waiter trip is in progress → design <em>waiting, success, failure</em>.</li>
          <li><strong>“Saves automatically”</strong> = each change may trigger a server trip → design the “saving…/saved” feedback.</li>
          <li><strong>“That number is wrong”</strong> → ask: calculated on the frontend (display bug) or from the backend (data bug, maybe another team)?</li>
          <li>A dev <strong>pushing back on an instant interaction</strong> → it probably needs the server, so “instant” isn’t free. Design the loading state instead.</li>
        </ul>
      </div>
      <div data-widget="quiz" data-qi="0"></div>
    `
  },

  /* ---------------------------------------------------------- */
  {
    id: 'building-blocks', num: 2,
    title: 'The Building Blocks',
    subtitle: 'HTML, CSS & JavaScript — and which one owns each part of your design.',
    quizzes: [{
      q: 'You want to change a button’s color, corner radius, and hover style. Which bucket is that, and what does it predict?',
      options: [
        'JavaScript — high risk, likely a bug source',
        'Backend — needs a new endpoint',
        'CSS — low-risk, cheap change',
        'HTML — changes the page structure'
      ],
      answer: 2,
      explain: 'Color, radius, spacing, and hover appearance are all CSS — the least risky kind of change because it touches look, not logic or data.'
    }],
    html: `
      <p>The frontend is built from exactly three technologies. React (next topic) is just a smarter way to organize them. Knowing this trio tells you <em>which kind of change you’re actually asking for</em>.</p>

      <div class="callout tip"><span class="ico">🎭</span><div><span class="label">The theatre analogy</span>
        <strong>HTML</strong> = the actors and where they stand (structure &amp; content). <strong>CSS</strong> = costumes, makeup, lighting (presentation). <strong>JavaScript</strong> = the script &amp; direction (behavior).</div></div>

      <h2>HTML — structure &amp; meaning</h2>
      <p>HTML defines <strong>what things are</strong> using nested “tags”.</p>
      <pre><code>&lt;article&gt;
  &lt;h1&gt;Liquidity Predictor&lt;/h1&gt;
  &lt;p&gt;Your projected cash position for 30 days.&lt;/p&gt;
  &lt;button&gt;See details&lt;/button&gt;
&lt;/article&gt;</code></pre>
      <p>Each tag carries <em>semantic meaning</em>: <code>&lt;h1&gt;</code> is a heading, <code>&lt;button&gt;</code> is a button. This is what <strong>screen readers</strong> and accessibility tools rely on.</p>
      <div class="callout why"><span class="ico">🎯</span><div><span class="label">Why it matters to you</span>
        When a dev says <em>“that’s not a real button, it’s a styled div,”</em> they’re flagging an accessibility smell — a <code>div</code> dressed as a button won’t be keyboard-focusable or announced correctly. That’s a real UX/a11y issue you can now name.</div></div>

      <h2>CSS — the look</h2>
      <p>CSS controls <strong>how things look and where they sit</strong>: color, spacing, type, layout, responsive breakpoints, hover/focus, animation.</p>
      <pre><code>button {
  background: #2563eb;   /* blue */
  padding: 8px 16px;     /* inner spacing */
  border-radius: 8px;    /* rounded corners */
}
button:hover { background: #1d4ed8; }</code></pre>
      <p>Almost everything in a redline — spacing, color, radius, font size, hover/focus, breakpoints — is CSS, and generally the <em>least risky</em> change. Words you’ll hear: <strong>Flexbox / Grid</strong> (layout systems), <strong>responsive / breakpoints</strong> (layout changes by screen width), <strong>design tokens</strong> (named values like <code>--color-primary</code> — the bridge to your design system).</p>

      <h2>JavaScript — the behavior</h2>
      <p>JS makes the page <strong>do things</strong>: respond to clicks, show/hide, validate, fetch data, animate on interaction.</p>
      <pre><code>button.addEventListener('click', () => {
  openDrawer();   // when clicked, open the drawer
});</code></pre>
      <p>Anything shaped like <em>“when the user does X, then Y happens”</em> is JavaScript — more risk than CSS because it can introduce bugs. <strong>TypeScript</strong> is JS plus a safety layer; a <code>.tsx</code> file = “a React component file.” You never need to read it.</p>

      <h2>Match your request to the right bucket</h2>
      <div class="table-wrap"><table>
        <tr><th>You want to change…</th><th>Bucket</th><th>Effort / risk</th></tr>
        <tr><td>Color, spacing, radius, font, hover look</td><td>CSS</td><td>Low</td></tr>
        <tr><td>How items wrap/reflow on mobile</td><td>CSS (layout)</td><td>Low–med</td></tr>
        <tr><td>Add/reorder content, make a real heading/button</td><td>HTML</td><td>Low–med</td></tr>
        <tr><td>“When they click X, show Y” / validation / open modal</td><td>JavaScript</td><td>Medium</td></tr>
        <tr><td>Where the data comes from / needs new data</td><td>Backend</td><td>Higher</td></tr>
      </table></div>

      <div class="recognize"><h3>🔎 How to recognize it as a UX designer</h3>
        <ul>
          <li><strong>“Just a CSS tweak”</strong> → cheap; good moment to also request hover/focus/disabled variants.</li>
          <li><strong>“That’s a div, not a button”</strong> → accessibility flag worth fixing.</li>
          <li><strong>“The data isn’t on the frontend yet”</strong> → your request crossed into backend territory.</li>
        </ul>
      </div>
      <div data-widget="quiz" data-qi="0"></div>
    `
  },

  /* ---------------------------------------------------------- */
  {
    id: 'react', num: 3,
    title: 'React — thinking in components',
    subtitle: 'Component, props, state — the three words that explain 80% of React.',
    quizzes: [{
      q: 'In React terms, your Figma component’s variant properties and overrides map most directly to…',
      options: ['state', 'props', 'endpoints', 'tokens'],
      answer: 1,
      explain: 'Props are the inputs you pass into a component to configure it — exactly like variant properties and overrides on a Figma instance.'
    }],
    html: `
      <p>React is the most popular way to build frontends, and it’s what Coupa uses. Good news: you already think the way React thinks. React is <strong>component-based</strong> — just like every Figma library you’ve built. Three words unlock the whole model: <strong>component, props, state</strong>.</p>

      <h2>1. Components = your Figma components</h2>
      <p>A <strong>component</strong> is a self-contained, reusable piece of UI. A button. A card. A whole page is components nested in components.</p>
      <pre><code>&lt;PageLayout&gt;
  &lt;Header /&gt;
  &lt;LiquidityCard /&gt;
  &lt;LiquidityCard /&gt;
  &lt;Footer /&gt;
&lt;/PageLayout&gt;</code></pre>
      <p>This is identical to nesting components in Figma. <code>&lt;LiquidityCard /&gt;</code> = an <em>instance</em> of your “Liquidity Card” component.</p>

      <h2>2. Props = your Figma variants &amp; overrides</h2>
      <p><strong>Props</strong> (“properties”) are inputs passed <em>into</em> a component to configure it.</p>
      <pre><code>&lt;Button label="See details" variant="primary" size="large" disabled={false} /&gt;</code></pre>
      <p>Compare to the Figma side panel: <code>label</code> → text override, <code>variant</code> → Variant property, <code>size</code> → Size property, <code>disabled</code> → a Boolean state. <strong>Props flow downward</strong> — a parent configures its children.</p>
      <div class="callout why"><span class="ico">🎯</span><div><span class="label">Why it matters to you</span>
        “What props should this take?” literally means “define its variants and configurable parts” — the same decision you make building a Figma component set. Clean, well-named variants → clean props → fewer bugs. Your component hygiene has a real downstream cost or benefit.</div></div>

      <h2>3. State = what changes over time</h2>
      <p><strong>State</strong> is data a component remembers and can change while the user interacts: is this dropdown open? what has the user typed? which tab is selected? is the data still loading?</p>
      <p><strong>The magic of React:</strong> when state changes, React automatically <strong>re-renders</strong> — it redraws just the parts that depend on that state. You never manually “update the screen”; you change state and the UI follows. That’s why it’s called <em>reactive</em>. Try it:</p>
      <div data-widget="react-state"></div>

      <div class="callout why"><span class="ico">🎯</span><div><span class="label">This is where UX lives</span>
        Every state is a design decision. <code>isOpen</code> → design open, closed, and the transition. “what the user typed” → empty, typing, valid, invalid. “is it loading” → loading, loaded, failed. When a dev says <em>“we need to handle that state,”</em> they’re asking a <strong>design question</strong>. “State” is your word too.</div></div>

      <h2>A few more React words you’ll hear</h2>
      <ul>
        <li><strong>Render / re-render</strong> — React drawing (or redrawing) the UI.</li>
        <li><strong>Hook</strong> — a packaged bit of logic; names start with <code>use</code> (<code>useState</code>, <code>useEffect</code>).</li>
        <li><strong><code>useEffect</code></strong> — “do something when the component appears or data changes” — most often <em>fetching data when a screen opens</em>.</li>
        <li><strong>Shared component</strong> — one used in many places; changing it ripples everywhere (like editing a main component in Figma).</li>
      </ul>

      <div class="recognize"><h3>🔎 How to recognize it as a UX designer</h3>
        <ul>
          <li><strong>“What are the props?”</strong> → “Give me the variants.” Answer with your component spec.</li>
          <li><strong>“We need to handle the loading / empty / error state”</strong> → a design request in disguise.</li>
          <li><strong>“That’s a shared component”</strong> → one change affects every usage. Be precise.</li>
        </ul>
      </div>
      <div data-widget="quiz" data-qi="0"></div>
    `
  },

  /* ---------------------------------------------------------- */
  {
    id: 'design-systems', num: 4,
    title: 'Design Systems in Code',
    subtitle: 'How your Figma components, variants & tokens become real code (Clarity included).',
    quizzes: [{
      q: 'Best way to spec a value so a dev implements it with zero ambiguity and it still works in dark mode?',
      options: [
        'Give the raw hex and pixel values (#2563eb, 16px)',
        'Give the design token names (color-action-primary, space-md)',
        'Attach a screenshot and let them eyeball it',
        'Leave it to the developer to decide'
      ],
      answer: 1,
      explain: 'Token names are identical in Figma and code, so there’s no guessing — and tokens re-theme automatically (light/dark). Raw values force a guess and can break theming.'
    }],
    html: `
      <p>This is your home turf translated into dev terms — and the biggest point of contact between what you make and what ships.</p>

      <h2>One source, two faces</h2>
      <p>A mature design system defines the <em>same</em> components in two synced places: <strong>in Figma</strong> (what you design with) and <strong>in code</strong> (what devs build with). The goal is a 1:1 match. At Coupa the code library is <strong>Clarity</strong> (<code>CuiButton</code>, <code>CuiCard</code>… the <code>Cui</code> prefix = “Clarity UI”).</p>

      <h2>Tokens — the vocabulary connecting both sides</h2>
      <p>A <strong>design token</strong> is a named design decision instead of a raw value.</p>
      <div class="table-wrap"><table>
        <tr><th>Raw value (avoid)</th><th>Token (use)</th></tr>
        <tr><td><code>#2563eb</code></td><td><code>color-action-primary</code></td></tr>
        <tr><td><code>16px</code></td><td><code>space-md</code></td></tr>
        <tr><td><code>8px</code></td><td><code>radius-default</code></td></tr>
      </table></div>
      <p>Tokens give you <strong>consistency</strong> (one blue, not seven), <strong>theming</strong> (change once → everything updates; light/dark), and a <strong>shared language</strong> (the token name is identical in Figma and code).</p>
      <div class="callout why"><span class="ico">🎯</span><div><span class="label">The practical punchline</span>
        Spec in <strong>tokens</strong>, not raw values. “Primary action color, <code>space-md</code> gap, default radius” is a spec a dev implements with zero guessing. “#2563eb / 16px / 8px” forces a guess or a hardcoded value that breaks theming. Fluent handoff = speaking in tokens.</div></div>

      <h2>Props mapping — your variants become their props</h2>
      <p>A Figma Button with Variant / Size / State / Icon becomes:</p>
      <pre><code>&lt;CuiButton variant="primary" size="medium" disabled={false} iconLeading="plus"&gt;
  Add supplier
&lt;/CuiButton&gt;</code></pre>
      <p>Same object, described twice. When Figma variants and code props line up, handoff is nearly automatic. When they drift (a variant exists in one but not the other, or is named differently), that’s a <strong>gap</strong> — real work to reconcile.</p>

      <h2>“Component-first” — why devs push back on custom pixels</h2>
      <p>The rule: <strong>compose from existing components first; build custom only when nothing fits</strong> — the same discipline as designing from your library. A one-off custom component means more code to maintain, no automatic theming/accessibility, and drift over time.</p>
      <div class="callout warn"><span class="ico">⚠️</span><div><span class="label">Expect a conversation</span>
        If your design tweaks a system component’s padding or radius, either the tweak becomes a <strong>new approved variant</strong> (added to Figma <em>and</em> code) or the design bends back to standard. Knowing it’s coming lets you justify the tweak up front — or avoid it.</div></div>

      <h2>Code Connect — the literal bridge</h2>
      <p>Some teams use <strong>Figma Code Connect</strong>: a mapping that tells Figma “this component = this code with these props,” so in Dev Mode a developer sees the exact snippet to use. Clean Figma components → copy-pasteable, correct code. The most direct reward for component hygiene.</p>

      <div class="recognize"><h3>🔎 How to recognize it as a UX designer</h3>
        <ul>
          <li><strong>“Is there a token for that?”</strong> → yes; spec in token names.</li>
          <li><strong>“Is there a Clarity component for this?”</strong> → component-first; reach for the library before custom.</li>
          <li><strong>“Figma and code don’t match”</strong> → a gap; reconcile variants/props. Clean naming prevents most gaps.</li>
          <li><strong>A light/dark bug</strong> → almost always a hardcoded value where a token belonged.</li>
        </ul>
      </div>
      <div data-widget="quiz" data-qi="0"></div>
    `
  },

  /* ---------------------------------------------------------- */
  {
    id: 'apis-fetch', num: 5,
    title: 'APIs & fetch',
    subtitle: 'How the frontend talks to the backend — requests, responses, JSON, status codes.',
    quizzes: [{
      q: 'A dev says “we fetch the suppliers when the page loads.” What must your design include?',
      options: [
        'Nothing extra — fetch is instant',
        'Only a success layout',
        'A loading state, a success state, and an error state',
        'A new Figma component library'
      ],
      answer: 2,
      explain: 'Every fetch takes time and can fail, so the screen needs loading, success, and error states — at minimum.'
    }],
    html: `
      <p>This is the waiter trip from Topic 1, with proper names. Nearly every “where does this data come from?” question lands here.</p>

      <h2>API — the menu of things you can ask for</h2>
      <p>An <strong>API</strong> (Application Programming Interface) is the <strong>list of requests the backend will answer</strong>, in an agreed format.</p>
      <div class="callout tip"><span class="ico">📋</span><div><span class="label">Analogy — a menu</span>
        The kitchen can make many things, but the <strong>menu</strong> defines what you may order and how. You don’t walk into the kitchen. <em>“We need a new API / endpoint”</em> = “that’s not on the menu yet; the backend team has to add it” → usually cross-team work and more time.</div></div>

      <h2>Endpoint — one item on the menu</h2>
      <pre><code>GET    /api/suppliers        → "give me the list"
GET    /api/suppliers/42     → "give me supplier #42"
POST   /api/suppliers        → "create a new supplier"</code></pre>
      <p>These verbs are <strong>HTTP methods</strong>: <strong>GET</strong> = read (looking), <strong>POST/PUT/PATCH/DELETE</strong> = change. Changing-things requests are the ones that need confirmation dialogs, undo, and careful error handling in your designs.</p>

      <h2>Request &amp; response, and JSON</h2>
      <p>Every trip is a <strong>request</strong> (frontend → backend) and a <strong>response</strong> (backend → frontend). The response is usually <strong>JSON</strong> — labeled values, very readable:</p>
      <pre><code>{
  "id": 42,
  "name": "Acme Co",
  "status": "active",
  "balance": 125000
}</code></pre>
      <div class="callout why"><span class="ico">🎯</span><div><span class="label">Why it matters to you</span>
        This JSON is the <strong>raw material of your screen</strong>. If your design shows a “preferred payment method” but that field isn’t in the JSON, it can’t be shown without new backend work. Peeking at the JSON tells you exactly what you can design with.</div></div>

      <h2>fetch — the act of asking</h2>
      <p><strong>fetch</strong> is the command that makes the request. “We fetch the suppliers when the page loads” = “on open, send a GET and wait for the JSON.”</p>
      <pre><code>const response = await fetch('/api/suppliers/42');
const supplier = await response.json();  // JSON → usable data</code></pre>
      <p>The key word is <strong>await</strong> — “wait for the answer.” That wait is <em>not instant</em> (tens of milliseconds to several seconds). <strong>This is the origin of every loading state.</strong> Related terms, same idea: AJAX, XHR, “making a call,” “hitting the endpoint,” “async.”</p>

      <h2>Status codes — did the trip succeed?</h2>
      <p>Every response carries a 3-digit <strong>status code</strong>. Each one is a different screen you should design. Tap to explore:</p>
      <div data-widget="status-codes"></div>

      <h2>One screen, many states</h2>
      <p>Because fetch takes time and can fail, a single screen is really a family of states. Press the scenarios:</p>
      <div data-widget="fetch-states"></div>

      <div class="callout tip"><span class="ico">🔧</span><div><span class="label">Designer superpower — the Network tab</span>
        In Chrome: right-click → <strong>Inspect</strong> → <strong>Network</strong>, then reload. Each row is a request — click one to see the request, the <strong>response JSON</strong>, the status code, and the timing. Ten minutes here makes APIs concrete.</div></div>

      <div class="recognize"><h3>🔎 How to recognize it as a UX designer</h3>
        <ul>
          <li>Any spinner/skeleton = a fetch → design loading, success, <em>and</em> error.</li>
          <li>“New endpoint / new API” = backend work, likely another team, more time.</li>
          <li>“That field isn’t in the response” = design within available JSON or request a backend change.</li>
          <li>“It’s a POST/PUT/DELETE” = something changes → design confirm, success, undo/error.</li>
          <li>A status code in a bug (404, 500, 403) = tells you which error state fired.</li>
        </ul>
      </div>
      <div data-widget="quiz" data-qi="0"></div>
    `
  },

  /* ---------------------------------------------------------- */
  {
    id: 'webhooks', num: 6,
    title: 'Webhooks',
    subtitle: 'The “don’t call us, we’ll call you” pattern — and how to spot one in a design.',
    quizzes: [{
      q: 'On a supplier screen, a status flips from “Offer sent” to “Approved” with no action by the supplier, triggered by the buyer elsewhere. What should you design?',
      options: [
        'Just the “Approved” state — the rest is engineering’s job',
        'A pending state, a noticeable arrival transition, and a “never arrives” fallback',
        'Only a loading spinner',
        'Nothing — webhooks are invisible so there’s no UX'
      ],
      answer: 1,
      explain: 'A webhook arrives after an unpredictable delay, so you must design the wait (pending), the live update when it arrives, and the fallback if it never does.'
    }],
    html: `
      <p>You asked specifically what a webhook does and how to recognize one. Webhooks confuse people because they’re the <strong>reverse</strong> of the normal waiter trip — so let’s anchor on that contrast.</p>

      <h2>First, the normal pattern (polling)</h2>
      <p>Normally the frontend <em>asks</em> and the backend <em>answers</em>. If you need to know when something happens, the naive way is <strong>polling</strong> — asking over and over: “ready yet? ready yet?” It works but is wasteful, and the user still waits after it’s actually done. It’s the kid in the back seat asking “are we there yet?”</p>

      <h2>What a webhook does</h2>
      <p>A <strong>webhook flips the direction.</strong> Instead of you asking repeatedly, you leave your number: <em>“call me the moment it happens.”</em> The other system <strong>pushes</strong> the news to you, unprompted, exactly when the event occurs.</p>
      <div class="callout why"><span class="ico">🪝</span><div><span class="label">In one sentence</span>
        A webhook is an automated message one system sends to another the instant an event happens, by calling a pre-agreed URL. It’s event-driven and real-time — no asking, no waiting, no polling. “Don’t call us, we’ll call you.”</div></div>

      <p>Watch the difference — polling asks four times to get one answer; the webhook stays silent, then pushes once at the moment of the event:</p>
      <div data-widget="polling-vs-webhook"></div>

      <h2>Everyday webhooks you already rely on</h2>
      <ul>
        <li><strong>Stripe/PayPal</strong> → “payment succeeded” the instant it clears, so the UI updates without a refresh.</li>
        <li><strong>GitHub → Slack</strong> → “a pull request was opened” → the Slack message appears on its own.</li>
        <li><strong>Calendly</strong> → “someone booked” → your calendar updates instantly.</li>
        <li><strong>Shipping carrier</strong> → “package delivered” → the order flips to “Delivered” + a push notification.</li>
      </ul>
      <p>In every case, <strong>something appeared or updated without the user doing anything</strong>, triggered by an event elsewhere. That’s the fingerprint.</p>

      <h2>Webhook vs API/fetch — the one-line distinction</h2>
      <div class="table-wrap"><table>
        <tr><th></th><th>API / fetch (pull)</th><th>Webhook (push)</th></tr>
        <tr><td>Who starts it</td><td>The frontend asks</td><td>The other system tells you</td></tr>
        <tr><td>Trigger</td><td>User action (open, click)</td><td>An event happening elsewhere</td></tr>
        <tr><td>Timing</td><td>On demand, now</td><td>Whenever the event occurs — seconds or days</td></tr>
        <tr><td>Analogy</td><td>You call to check your order</td><td>They text “your table is ready”</td></tr>
      </table></div>
      <p><strong>Rule of thumb:</strong> if the UI updates <em>because the user did something</em>, it’s probably fetch. If it updates <em>because something happened elsewhere, on its own</em>, a webhook is likely behind it.</p>

      <h2>How to recognize a webhook as a UX designer</h2>
      <p>Webhooks are invisible, but they produce recognizable <strong>design signatures</strong>:</p>
      <ol>
        <li><strong>Something updates on its own</strong>, no user action — a badge flips, a counter ticks, a row appears, a toast slides in.</li>
        <li><strong>A status depends on an external system</strong> — payment, shipment, “signature received,” third-party approval, “accepted by buyer.”</li>
        <li><strong>“Real-time” or “automatically”</strong> in the spec — “updates in real time when a supplier accepts.”</li>
        <li><strong>Notifications/emails that fire off events</strong> — “email the supplier when the payment clears.”</li>
        <li><strong>The delay you don’t control</strong> — the biggest UX consequence (below).</li>
      </ol>

      <div class="callout warn"><span class="ico">⏳</span><div><span class="label">The in-between you must design</span>
        A webhook arrives whenever the external event happens — 2 seconds or 2 days later. So design: the <strong>pending state</strong> (“Payment submitted — we’ll update this when it clears”), a visible <strong>transition</strong> when it arrives (badge animates, toast, row re-sorts), and a <strong>fallback</strong> if it never arrives (“still pending after 24h — contact support”).</div></div>

      <h2>Worked example — recognizing it in a flow</h2>
      <p>A buyer approves an early-payment discount. The supplier should see status change from <strong>“Offer sent”</strong> to <strong>“Approved — funds on the way,”</strong> and get an email. Reasoning like a fluent designer:</p>
      <ul>
        <li>The supplier’s screen updates <em>because the buyer acted on a different screen</em> → not a fetch the supplier triggered → <strong>webhook signatures #1 and #2</strong>.</li>
        <li>So design <strong>three states</strong>: <code>Offer sent / Pending</code> (the wait), <code>Approved</code> (the arrival, with a noticeable transition), <code>Expired / Declined</code> (the other outcome).</li>
        <li>Ask the dev: “Is the approval coming via a webhook? What’s the realistic delay? What does the supplier see while waiting? What if it never fires?”</li>
      </ul>
      <p>Those questions prevent the classic bug where the UI sits on “Offer sent” forever while the real status changed hours ago.</p>

      <div class="callout tip"><span class="ico">🔌</span><div><span class="label">A subtlety worth knowing</span>
        The browser can’t receive a webhook directly (webhooks are server-to-server). The chain is: event → webhook hits <strong>your backend</strong> → your backend pushes it to the browser via a <strong>WebSocket</strong>/live connection, or the frontend sees it on its next fetch. “Webhook” explains why the news exists; a WebSocket/refresh explains how it reaches the screen. “We get the webhook but the UI only shows it on refresh” is a real UX gap you can flag.</div></div>

      <div class="recognize"><h3>🔎 Quick checklist</h3>
        <ul>
          <li>Does something change <strong>without the user acting</strong>? → push/webhook.</li>
          <li>Does the status depend on an <strong>external system or another person</strong>? → likely webhook.</li>
          <li>Do the words <strong>“real-time,” “automatically,” “notify,” “when X happens”</strong> appear? → webhook flag.</li>
          <li>Is there an <strong>unpredictable delay</strong>? → design pending + arrival transition + never-arrives fallback.</li>
        </ul>
      </div>
      <div data-widget="quiz" data-qi="0"></div>
    `
  },

  /* ---------------------------------------------------------- */
  {
    id: 'states', num: 7,
    title: 'States & Edge Cases',
    subtitle: 'The part of UX devs care about most — loading, empty, error, overflow.',
    quizzes: [{
      q: 'Which three “empty” situations should look different from each other?',
      options: [
        'They’re all the same — one empty state is enough',
        'First-time empty, no-results empty, and error-masquerading-as-empty',
        'Loading, success, and hover',
        'Mobile empty, tablet empty, desktop empty'
      ],
      answer: 1,
      explain: 'First-time (onboarding + CTA), no-results (offer to clear filters), and a failed fetch (an error, not “nothing here”) are genuinely different and need different designs.'
    }],
    html: `
      <p>Everything so far converges here. Because the frontend talks to a backend, and that takes time and can fail, <strong>a single screen is never one screen — it’s a family of states.</strong> The gap between junior and senior is often: did you design all the states, or only the happy one?</p>

      <div class="callout why"><span class="ico">🎯</span><div><span class="label">The core truth</span>
        A component tied to data has <strong>at least four states</strong>, usually more. If your handoff shows one, you’ve handed off ~25% of the work and left the rest to engineering’s imagination.</div></div>

      <h2>The essential states for any data screen</h2>
      <div class="table-wrap"><table>
        <tr><th>State</th><th>When</th><th>Common mistake</th></tr>
        <tr><td>Loading</td><td>The fetch is in flight</td><td>Blank screen that looks broken</td></tr>
        <tr><td>Empty</td><td>Success but no data</td><td>A bare “0” or nothing</td></tr>
        <tr><td>Partial / few</td><td>Only 1–2 items</td><td>Only tested with a perfect 8-card grid</td></tr>
        <tr><td>Ideal / success</td><td>Data arrived</td><td>— (the one you already made)</td></tr>
        <tr><td>Error</td><td>Request failed / timed out</td><td>Silent failure or a scary raw error</td></tr>
        <tr><td>No permission</td><td>401 / 403</td><td>Showing UI with broken data</td></tr>
        <tr><td>Overflow</td><td>Long names, 500 rows</td><td>Layout explodes with real data</td></tr>
      </table></div>

      <h2>The empty state is three different states</h2>
      <ul>
        <li><strong>First-time empty</strong> (“You haven’t added any suppliers yet”) → onboarding + CTA.</li>
        <li><strong>No-results empty</strong> (“No suppliers match these filters”) → offer to clear filters.</li>
        <li><strong>Error-masquerading-as-empty</strong> (the fetch failed) → must NOT look like the other two; it’s an error.</li>
      </ul>

      <h2>Loading, done well</h2>
      <ul>
        <li><strong>Skeletons</strong> beat spinners for perceived speed — the user sees the <em>shape</em> of what’s coming.</li>
        <li><strong>Optimistic UI</strong> — show the result immediately as if it succeeded, confirm after, roll back on failure (e.g. a heart fills instantly). Design the rollback too.</li>
        <li><strong>Progressive loading</strong> — show what’s ready now, stream the rest; define the order.</li>
      </ul>

      <h2>Edge cases devs will ask you about</h2>
      <ul>
        <li><strong>Long strings</strong> — a very long supplier name: wrap? truncate? tooltip?</li>
        <li><strong>Extreme numbers</strong> — $0, −$4,000 (a credit?), $1,250,000,000: formatting &amp; color.</li>
        <li><strong>Missing optional fields</strong> — no avatar, no phone. What fills the gap?</li>
        <li><strong>Timezones &amp; dates</strong> — “2 min ago” vs absolute; whose timezone?</li>
        <li><strong>Concurrent edits</strong> — two users edit the same thing. Who wins, how is the loser told?</li>
        <li><strong>Validation</strong> — inline, on blur, or on submit? What’s the error copy?</li>
      </ul>

      <div class="callout tip"><span class="ico">✅</span><div><span class="label">A habit that makes you fluent</span>
        For every data screen, jot six lines in your handoff: <strong>Loading → Empty (which kind?) → Error (+ retry) → Ideal → Overflow → Permissions.</strong> It changes how devs see you — and prevents most QA bugs.</div></div>

      <div class="recognize"><h3>🔎 How to recognize it as a UX designer</h3>
        <ul>
          <li>Any spinner, list, fetched value, or external status → hidden states. Hunt them.</li>
          <li>A dev asking lots of “what-if” questions → they’re enumerating states you can own.</li>
          <li>A QA bug like “blank screen on error” → a missing-state problem, preventable at design time.</li>
          <li>A screen fed by a webhook → always needs a pending state and an arrival transition.</li>
        </ul>
      </div>
      <div data-widget="quiz" data-qi="0"></div>
    `
  },

  /* ---------------------------------------------------------- */
  {
    id: 'workflow', num: 8,
    title: 'The Dev Workflow',
    subtitle: 'Git, PRs, environments, deploys, feature flags — what happens after handoff.',
    quizzes: [{
      q: 'A dev says your design is “in review / waiting on PR approval.” What does that mean?',
      options: [
        'The work was rejected',
        'The code is done but not yet merged — a normal review step; you can offer visual QA',
        'It’s already live for all users',
        'It needs a new Figma file'
      ],
      answer: 1,
      explain: 'A pull request is a proposed change under peer review — done but not merged, like a design critique. A great moment to catch visual drift on a preview link.'
    }],
    html: `
      <p>You know <em>what</em> devs build. Here’s <em>how</em> they work — the words in standups, Jira, and Slack — so you can time feedback well and understand why a “tiny change” still takes until next week.</p>

      <h2>Git — the time machine for code</h2>
      <p><strong>Git</strong> tracks every change to the code — think Figma version history + branching, for code.</p>
      <ul>
        <li><strong>Repository (“repo”)</strong> — the codebase + history. Like a Figma project file.</li>
        <li><strong>Commit</strong> — a saved, named snapshot. Like a named version.</li>
        <li><strong>Branch</strong> — a parallel copy to work in safely. Like duplicating a page to explore. The stable one is usually <code>main</code>.</li>
        <li><strong>Merge</strong> — folding a finished branch back into <code>main</code>.</li>
        <li><strong>GitHub</strong> — the website where repos live (Coupa uses it). Git is the system; GitHub is the home.</li>
      </ul>

      <h2>Pull request (PR) — the critique of code</h2>
      <p>A <strong>pull request</strong> proposes a change: “here’s what I changed; review before it hits <code>main</code>.” Peers comment, request changes, approve — exactly like a design critique.</p>
      <div class="callout why"><span class="ico">🎯</span><div><span class="label">Why it matters to you</span>
        “It’s in review” means <em>done but not merged</em> — normal, often multi-day. You may be asked to review the PR <strong>visually</strong> (does it match the design?). Some teams give a <strong>preview link</strong> per PR so you can click the real thing before it ships.</div></div>

      <h2>Environments — where the app runs at each stage</h2>
      <div class="table-wrap"><table>
        <tr><th>Environment</th><th>For</th><th>Break it?</th></tr>
        <tr><td>Local</td><td>a dev’s own laptop</td><td>Totally fine</td></tr>
        <tr><td>Dev</td><td>shared early integration</td><td>Expected to be messy</td></tr>
        <tr><td>Staging / QA</td><td>production-like testing &amp; your design QA</td><td>Try to break it <em>here</em></td></tr>
        <tr><td>Production (“prod”)</td><td>the real app real users use</td><td><strong>Never</strong></td></tr>
      </table></div>
      <p>“Works on staging but not prod” is a real class of bug. <strong>Do your design QA on staging</strong> — never assume the mock equals the build.</p>

      <h2>Deploy, release, feature flags</h2>
      <ul>
        <li><strong>Deploy</strong> — push code to an environment. <strong>Release/ship</strong> — make it live for users. <strong>Rollback</strong> — undo a bad deploy. <strong>Hotfix</strong> — an urgent fix outside the normal cycle.</li>
        <li><strong>Feature flag / toggle</strong> — turn a feature on/off <em>without</em> a deploy. Enables <strong>A/B tests</strong> and <strong>gradual rollouts</strong> (“10% of users see the new flow”). So “it’s shipped” ≠ “everyone sees it” — design both the on and off experiences.</li>
      </ul>

      <h2>Tickets, bugs, sprints</h2>
      <ul>
        <li><strong>Jira / ticket / issue</strong> — a tracked unit of work (Coupa uses Jira).</li>
        <li><strong>Bug</strong> — behavior vs intended. A good report: steps to reproduce, what happened, what you expected, environment, screenshot.</li>
        <li><strong>Sprint</strong> — a fixed window (often 2 weeks). “Not in this sprint” = scheduled later, not refused.</li>
        <li><strong>Refinement / grooming</strong> — where tickets get clarified &amp; estimated. <strong>The best place to raise design questions early</strong>, before estimates lock in.</li>
        <li><strong>CI/CD</strong> — automation that runs <strong>tests</strong> and builds/deploys on every change (e.g. TeamCity). “The build is red” = a test broke; nothing ships until it’s green. This is why even a one-line change isn’t instant.</li>
      </ul>

      <h2>The journey of your design into the product</h2>
      <ol>
        <li>You design in Figma with the system/tokens → handoff with all states.</li>
        <li>Dev picks up the <strong>Jira ticket</strong>, creates a <strong>branch</strong>.</li>
        <li>Builds from <strong>Clarity</strong>, wiring up <strong>fetch</strong>/APIs and the <strong>states</strong>.</li>
        <li>Opens a <strong>PR</strong>; peers review; you do visual QA on a preview link.</li>
        <li>Merged to <code>main</code>; <strong>CI</strong> runs <strong>tests</strong>.</li>
        <li>Deployed to <strong>staging</strong> → your design QA.</li>
        <li>Released to <strong>prod</strong>, maybe behind a <strong>feature flag</strong>, maybe rolled out gradually.</li>
      </ol>
      <p>Knowing this map tells you <em>when</em> to insert feedback — early (refinement, PR) is cheap; after prod is expensive.</p>

      <div class="recognize"><h3>🔎 How to recognize it as a UX designer</h3>
        <ul>
          <li><strong>“In review / waiting on PR”</strong> → done, not merged. Offer visual QA.</li>
          <li><strong>“Behind a flag”</strong> → shipped ≠ visible to all. Design on/off states.</li>
          <li><strong>“Bigger story than it looks”</strong> → often a new endpoint, states, or custom component you specified.</li>
          <li>Raise concerns at <strong>refinement</strong>, not after the PR — the cheapest point to change course.</li>
        </ul>
      </div>
      <div data-widget="quiz" data-qi="0"></div>
    `
  },

  /* ---------------------------------------------------------- */
  {
    id: 'phrasebook', num: 9,
    title: 'Phrasebook & Wrap-up',
    subtitle: 'What devs say → what it means → how you respond, plus five senior questions.',
    quizzes: [{
      q: 'Which single question best reveals effort, hidden delays, and whether a webhook is involved?',
      options: [
        'What color should the button be?',
        'Where does this data come from — frontend, our backend, or an external system?',
        'Can you make it pop more?',
        'Is this done yet?'
      ],
      answer: 1,
      explain: 'Tracing the data source exposes round-trips (loading/error states), cross-team work (new endpoints), and external events (webhooks → pending + arrival states).'
    }],
    html: `
      <p>Keep this handy during standups, refinement, and handoff.</p>

      <h2>Where things live</h2>
      <div class="table-wrap"><table>
        <tr><th>Dev says</th><th>Means</th><th>You respond</th></tr>
        <tr><td>“That’s a backend thing.”</td><td>Needs the server; more effort.</td><td>“Does that add a round-trip? Then I’ll design loading + error.”</td></tr>
        <tr><td>“We can do that client-side.”</td><td>Instant, cheap.</td><td>“Great — it can feel instant; let me spec the microinteraction.”</td></tr>
        <tr><td>“That field isn’t in the response.”</td><td>The data isn’t being sent.</td><td>“Can the backend add it, or should I design within what we have?”</td></tr>
        <tr><td>“We’d need a new endpoint.”</td><td>Backend builds a new menu item.</td><td>“Let’s flag it in refinement so it’s scoped.”</td></tr>
      </table></div>

      <h2>Data &amp; timing</h2>
      <div class="table-wrap"><table>
        <tr><th>Dev says</th><th>Means</th><th>You respond</th></tr>
        <tr><td>“We fetch it when the page loads.”</td><td>A request fires; there’s a wait.</td><td>“Then it needs loading, success, and error — here they are.”</td></tr>
        <tr><td>“It’s a POST.”</td><td>Something gets created/changed.</td><td>“I’ll design confirm, success, and undo/error.”</td></tr>
        <tr><td>“We get a webhook when X happens.”</td><td>External push, unpredictable delay.</td><td>“What does the user see while waiting, and the transition when it arrives? And if it never fires?”</td></tr>
        <tr><td>“It’s real-time.”</td><td>Push/webhook/WebSocket.</td><td>“Let me design the live update + the pending state before it.”</td></tr>
      </table></div>

      <h2>States &amp; the design system</h2>
      <div class="table-wrap"><table>
        <tr><th>Dev says</th><th>You respond</th></tr>
        <tr><td>“What’s the empty state?”</td><td>“Which kind — first-time, no-results, or error? Here’s each.”</td></tr>
        <tr><td>“What do we show on a 500?”</td><td>“Here’s the message + Retry (and a different one for 404).”</td></tr>
        <tr><td>“What props should this take?”</td><td>“Same as my Figma variants — here’s the mapping.”</td></tr>
        <tr><td>“Is there a Clarity component for this?”</td><td>“Yes, use CuiX; the only delta is spacing — can we use space-md?”</td></tr>
        <tr><td>“That’s a shared component.”</td><td>“Then let’s confirm it’s safe everywhere before we tweak it.”</td></tr>
      </table></div>

      <h2>Workflow &amp; timing</h2>
      <div class="table-wrap"><table>
        <tr><th>Dev says</th><th>You respond</th></tr>
        <tr><td>“It’s in review / waiting on PR.”</td><td>“Want me to do visual QA on the preview link?”</td></tr>
        <tr><td>“That’s not in this sprint.”</td><td>“Makes sense — let’s refine it so it’s ready to pull in.”</td></tr>
        <tr><td>“It’s behind a feature flag.”</td><td>“I’ll make sure both the on and off experiences are designed.”</td></tr>
        <tr><td>“The build is red.”</td><td>“No rush — ping me when it’s green and I’ll review.”</td></tr>
      </table></div>

      <h2>Five questions that make you sound senior</h2>
      <ol>
        <li><strong>“Where does this data come from — frontend, our backend, or an external system?”</strong></li>
        <li><strong>“Is there a round-trip here? If so, what are the loading and error states?”</strong></li>
        <li><strong>“What data does the response actually include?”</strong></li>
        <li><strong>“Is there a Clarity component and token for this, or is it custom?”</strong></li>
        <li><strong>“Does anything update on its own via a webhook/real-time? What’s the delay, and the fallback if it never comes?”</strong></li>
      </ol>

      <div class="callout why"><span class="ico">🏁</span><div><span class="label">The whole course in one paragraph</span>
        The frontend (your UI, in the browser, built from <strong>React components</strong> configured by <strong>props</strong> and driven by <strong>state</strong>) talks to the backend by making <strong>API</strong> requests with <strong>fetch</strong> and getting <strong>JSON</strong> back — which takes time and can fail, so every data screen needs <strong>loading, empty, error, and success</strong> states. Sometimes the backend <strong>pushes</strong> news the other way when an event happens elsewhere — that’s a <strong>webhook</strong>, meaning design for an unpredictable wait and a live update. Your designs become real through a <strong>Clarity</strong>-based system (speak in <strong>tokens</strong> and <strong>props</strong>) and travel to users through <strong>branches, PRs, environments, and deploys</strong>. Recognize which bucket any request falls into, and you can talk to devs in their language.</div></div>

      <p style="text-align:center;margin-top:30px;color:var(--text-faint)">🎉 That’s the course. Revisit any topic from the sidebar, or replay the animations anytime.</p>
      <div data-widget="quiz" data-qi="0"></div>
    `
  }
];

window.LESSONS = LESSONS;
