# 3. React — thinking in components

React is the most popular way to build frontends today, and it's what Coupa uses. The good news: as a designer, you already think the way React thinks. React is **component-based**, and so is every design system you've ever used in Figma.

If you understand three words — **component**, **props**, **state** — you understand the mental model of React. Everything else is detail.

## What React actually is

React is a **JavaScript library for building user interfaces out of reusable components**. Instead of writing one giant page, you build small pieces (components) and compose them, exactly like assembling a screen from a Figma component library.

## 1. Components = your Figma components

A **component** is a self-contained, reusable piece of UI with its own structure, style, and behavior. A button. A card. A modal. A whole page is just components nested inside components.

```
<PageLayout>
  <Header />
  <LiquidityCard />
  <LiquidityCard />
  <Footer />
</PageLayout>
```

This is *identical* to how you nest components in Figma. `<LiquidityCard />` in code = an instance of your "Liquidity Card" component in Figma.

> **Mental mapping:** Figma component → React component. Figma instance → `<Component />` used in code. You already design in the unit React builds in. That's why "component-first" design systems like Clarity translate so cleanly to code.

## 2. Props = your Figma variants and overrides

**Props** (short for "properties") are the inputs you pass *into* a component to configure it — exactly like **variant properties and overrides** on a Figma instance.

```
<Button label="See details" variant="primary" size="large" disabled={false} />
```

Compare to the Figma side panel for a button instance:
- `label` → the text override
- `variant="primary"` → the Variant property
- `size="large"` → the Size property
- `disabled={false}` → the State property (Boolean)

**Props flow downward** — a parent gives props to its children. A parent can hand data down; a child can't reach up and change the parent directly. (It can send a *signal* up via a callback, but it can't reach into the parent's data — the data flows one way.)

> **Why it matters to you:** When a dev asks *"what props should this component take?"* they're literally asking you to define its **variants and configurable parts** — the same decision you make when you build a Figma component set. If your Figma variants are clean and well-named, the props usually mirror them. Messy, inconsistent variants → messy props → bugs. Your component hygiene in Figma has a real downstream cost or benefit.

## 3. State = what can change over time

**State** is data a component *remembers and can change* while the user interacts with it. Props come from outside and don't change on their own; state is internal and *does* change.

Examples of state:
- Is this dropdown open or closed?
- What has the user typed into this field so far?
- Which tab is selected?
- Is the data still loading?

```
// Pseudocode for the idea
const [isOpen, setIsOpen] = useState(false);   // starts closed
// clicking the button flips it:
onClick = () => setIsOpen(true);                // now open → UI updates
```

**The magic of React:** when state changes, React automatically **re-renders** — it redraws just the parts of the UI that depend on that state. You never manually "update the screen"; you change the state and the UI follows. This is called being **reactive** (hence "React").

> **This is where UX lives.** Every state is a design decision:
> - `isOpen` → you must design the open *and* closed states, plus the transition.
> - "what the user typed" → you must design empty, typing, valid, and invalid states.
> - "is it loading" → you must design loading, loaded, and failed states (see [Topic 7](07-states-and-edge-cases.md)).
>
> When a dev says *"we need to handle that state,"* they're asking: what should the UI look like in that condition? That is a **design question**, not just an engineering one. "State" is your word too.

## Putting it together

```
<LiquidityCard
  title="Projected cash"        // prop (data in)
  amount={125000}               // prop (data in)
  trend="up"                    // prop → picks a variant
/>
```

Inside, the card might hold state like `isExpanded` (does the user want the detailed breakdown?). Props configure it from outside; state tracks what changes inside.

## A few more React words you'll hear

- **Render / re-render** — React drawing (or redrawing) the UI. "It re-renders when state changes."
- **Hook** — a reusable bit of React logic; the ones starting with `use` (`useState`, `useEffect`). You'll hear "we use a hook for that." Just means "a packaged piece of behavior."
- **`useEffect`** — the hook for "do something when the component appears or when some data changes" — most commonly *fetching data when the screen loads*. When a dev says "we fetch in a `useEffect`," they mean "we ask the backend for data as soon as this screen opens." (See [Topic 5](05-apis-and-fetch.md).)
- **Component library / design system in code** — the set of pre-built components devs assemble from, e.g. Clarity. (See [Topic 4](04-design-systems-in-code.md).)
- **Props drilling, lifting state up** — plumbing details about *where* data lives. You don't need these, but now they won't scare you: they're about which component "owns" a piece of state.

## How to recognize it as a UX designer

- **"What are the props?"** → "Give me the variants and configurable parts." Answer it with your component spec.
- **"We need to handle the loading state / empty state / error state"** → a design request in disguise. Have those designs ready.
- **A component behaving inconsistently across screens** → likely the *same* React component getting different props. One fix can ripple everywhere (good) — or one careless prop change can break three screens (be precise).
- **"That's a shared component"** → changing it affects every place it's used. Treat it like editing a main component in Figma: powerful and risky.
- **Clean Figma variants = clean props = fewer bugs.** Your naming discipline matters to engineering.

Next: [Design Systems in Code →](04-design-systems-in-code.md)
