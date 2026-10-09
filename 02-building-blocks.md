# 2. The Building Blocks — HTML, CSS, JavaScript

The frontend (everything the user sees) is built from exactly three technologies. React, which you'll meet next, is just a smarter way to organize these three. Understanding this trio tells you *which kind of change you're actually asking for* when you file a design tweak.

## The theatre analogy

- **HTML** = the actors on stage and *where they stand* — the structure and content. "There is a heading, then a paragraph, then a button."
- **CSS** = hair, makeup, costumes, lighting — the *presentation*. "The button is blue, 8px rounded, with 16px of padding."
- **JavaScript** = the script and direction — the *behavior*. "When the button is clicked, open the dialog."

A change to one is usually cheaper and lower-risk than a change to another, and they're often owned by the same dev but mentally in different buckets.

## HTML — structure and meaning

HTML (HyperText Markup Language) defines **what things are**. It's a set of nested "tags."

```html
<article>
  <h1>Liquidity Predictor</h1>
  <p>Your projected cash position for the next 30 days.</p>
  <button>See details</button>
</article>
```

Each tag has *semantic meaning*: `<h1>` is a top-level heading, `<button>` is a button, `<nav>` is navigation. This isn't cosmetic — it's what **screen readers** and **accessibility** tools rely on.

> **Why it matters to you:** When you spec "this should be a heading" vs "this is just big bold text," you're specifying HTML semantics, and that directly affects accessibility and SEO. A dev who says *"that's not a real button, it's a styled div"* is flagging an accessibility smell — a `div` dressed up to look like a button won't be keyboard-focusable or announced correctly. That's a legitimate UX/a11y issue you can now name.

## CSS — the look

CSS (Cascading Style Sheets) controls **how things look and where they sit**: color, spacing, typography, layout, responsive breakpoints, hover states, animations.

```css
button {
  background: #2563eb;   /* blue */
  padding: 8px 16px;     /* spacing inside the button */
  border-radius: 8px;    /* rounded corners */
}
button:hover {
  background: #1d4ed8;   /* darker blue on hover */
}
```

Almost everything in a redline — spacing, color, radius, font size, hover/focus styling, breakpoints — is CSS. These are generally the *least risky* changes to request because they don't touch logic or data.

Key CSS concepts you'll hear:
- **Flexbox / Grid** — the two modern layout systems. When a dev asks "flex or grid?" they're asking how items should arrange and reflow.
- **Responsive / breakpoints** — rules that change layout at certain screen widths (mobile/tablet/desktop).
- **Design tokens / variables** — named values like `--color-primary` instead of a raw `#2563eb`. This is the bridge to your design system (see [Topic 4](04-design-systems-in-code.md)).

## JavaScript — the behavior

JavaScript (JS) makes the page **do things**: respond to clicks, show/hide elements, validate forms, fetch data, run calculations, animate on interaction.

```javascript
// When the "See details" button is clicked, open the drawer.
button.addEventListener('click', () => {
  openDrawer();
});
```

If a change involves *"when the user does X, then Y happens"* — that's JavaScript (logic/behavior). These changes carry more risk than CSS because they can introduce bugs.

**TypeScript** is JavaScript with a safety layer added ("types" — labels that say "this value must be a number" or "this must be a date"). Most modern React codebases, including Coupa's, use TypeScript. When you see `.ts` or `.tsx` files, that's it. You don't need to read it; just know `.tsx` = "a React component file."

## How they work together

```
HTML      →  "There is a button labeled 'See details'."
CSS       →  "It's blue, rounded, with hover styling."
JavaScript →  "Clicking it opens the details drawer and fetches the data."
```

Your typical screen is all three at once. The skill is knowing *which bucket* a given request falls into.

## How to recognize it as a UX designer

Match your request to the right bucket — it predicts effort and risk, and it makes you sound fluent:

| You want to change… | Bucket | Rough effort/risk |
|---|---|---|
| Color, spacing, radius, font, hover look | **CSS** | Low |
| How items wrap/reflow on mobile | **CSS** (layout) | Low–medium |
| Add/remove/reorder content, make something a real heading or button | **HTML** (structure) | Low–medium |
| "When they click X, show Y" / validation / open a modal | **JavaScript** (behavior) | Medium |
| Where the number/data comes from, or it needs new data | **Backend** — not these three at all | Higher, maybe another team |

- If a dev says *"that's just a CSS tweak,"* you've asked for something cheap — good time to also ask for the hover/focus/disabled variants while they're in there.
- If they say *"that's a div, not a button"* — accessibility flag, worth fixing.
- If they say *"the data isn't on the frontend yet,"* your request crossed into backend territory (see [Topic 5](05-apis-and-fetch.md)).

Next: [React — thinking in components →](03-react.md)
