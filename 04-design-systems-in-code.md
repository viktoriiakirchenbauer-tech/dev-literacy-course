# 4. Design Systems in Code

This is your home turf translated into dev terms. A design system in code is the single biggest point of contact between what you make and what devs ship. Understanding how it works makes you dramatically more effective in handoff — and this is where your existing Clarity/Figma knowledge pays off directly.

## The core idea: one source, two faces

A mature design system has the *same* components defined in two synchronized places:

- **In Figma** — what you design with (components, variants, styles, variables).
- **In code** — what devs build with (React components, props, tokens).

The goal is that they **match 1:1**, so a design made from library components can be built from code components with no guesswork. At Coupa this code library is **Clarity** (`CuiButton`, `CuiCard`, etc. — the `Cui` prefix = "Clarity UI").

## Tokens — the vocabulary that connects both sides

A **design token** is a named design decision stored as a variable, instead of a raw value.

| Raw value (bad) | Token (good) |
|---|---|
| `#2563eb` | `color-action-primary` |
| `16px` | `space-md` |
| `8px` | `radius-default` |

Why tokens matter:
- **Consistency** — everyone uses `color-action-primary`, not seven slightly different blues.
- **Theming** — change the token once, every component updates (light/dark mode, rebrands).
- **Shared language** — the token name is identical in Figma variables and in code. When you say "use `space-md` here," the dev knows *exactly* what you mean. No pixel-peeping.

> **This is the practical punchline:** specify designs in **tokens**, not raw values. "Primary action color, `space-md` gap, default radius" is a spec a dev can implement with zero ambiguity. "#2563eb, 16px, 8px" forces them to guess which token you meant — or hardcode a value that breaks theming. Fluent handoff = speaking in tokens.

## Props mapping — your variants become their props

From [Topic 3](03-react.md): a Figma component's **variant properties and overrides** become a React component's **props**. In a design-system component this mapping is explicit and documented.

Figma "Button" component:
- Variant: `Primary / Secondary / Tertiary`
- Size: `Small / Medium / Large`
- State: `Default / Hover / Disabled`
- Icon: `None / Leading / Trailing`

Clarity `CuiButton` in code:
```
<CuiButton variant="primary" size="medium" disabled={false} iconLeading="plus">
  Add supplier
</CuiButton>
```

They're the *same object* described twice. When your Figma variants and the code props line up, handoff is nearly automatic. When they drift (a variant exists in Figma but not in code, or is named differently), that's a **gap** — and reconciling gaps is real work for both sides.

## "Component-first" — why devs push back on custom pixels

Design systems are built on a rule: **compose from existing components first; only build custom when nothing fits.** This is identical to the discipline of designing from your library instead of drawing one-off rectangles.

So when a dev says *"is there a Clarity component for this?"* or *"can we use the standard card instead of a custom one?"*, they're applying the same principle you apply in Figma. A one-off custom component is:
- more code to write and maintain,
- not automatically themed or accessible,
- a thing that drifts from the system over time.

> **Why it matters to you:** If your design uses a component that *almost* matches a system component but tweaks the padding or radius, expect a conversation. Either the tweak becomes a **new approved variant** (added to both Figma and code), or the design bends back to the standard. Deciding which is a design-system governance call — and knowing it's coming lets you justify the tweak up front or avoid it.

## Code Connect — the literal bridge

Some teams use **Figma Code Connect**: a small mapping file that tells Figma "this Figma component = this code component with these props." In Dev Mode, a developer selecting your component sees the *exact* code snippet to use. If your team has it, your clean Figma components produce copy-pasteable, correct code. It's the most direct reward for component hygiene.

## How to recognize it as a UX designer

- **"Is there a token for that?"** → yes, use it; specify in token names, not hex/px.
- **"Is there a Clarity component for this?"** → component-first governance. Reach for the library before custom.
- **"That's a one-off / custom component"** → higher cost, no free theming/a11y. Decide consciously if it's worth it.
- **"The Figma and the code don't match"** → a *gap*. Someone (often you + a dev) needs to reconcile variants/props. Clean, well-named Figma variants prevent most gaps.
- **A visual bug across light/dark mode** → almost always a hardcoded value where a token should be. You can now name the likely cause.

Next: [APIs & `fetch` →](05-apis-and-fetch.md)
