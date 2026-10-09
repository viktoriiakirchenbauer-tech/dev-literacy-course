# 10. Phrasebook — talking to devs

Keep this open during standups, refinement, and handoff. Three columns: **what a dev says → what it actually means → a good designer response.** The response is what makes you sound fluent *and* moves the work forward.

## About where things live

| Dev says | Means | You respond |
|---|---|---|
| "That's a backend thing." | It needs the server — data, logic, or security. More effort, maybe another team. | "Got it — does that add a round-trip? Then I'll design the loading and error states." |
| "We can do that client-side." | It's instant, in the browser, cheap. | "Great, so it can feel instant — let me spec the exact microinteraction." |
| "That field isn't in the response." | The data you want to show isn't being sent. | "Can the backend add it, or should I design within what we have?" |
| "We'd need a new endpoint / new API." | Backend has to build a new 'menu item'. Significant. | "Understood — let's flag that in refinement so it's scoped." |

## About data and timing

| Dev says | Means | You respond |
|---|---|---|
| "We fetch it when the page loads." | A request fires on open; there's a wait. | "Then it needs loading, success, and error states — here they are." |
| "It's a POST." / "That changes data." | Something gets created/updated/deleted on the server. | "I'll design the confirm, success, and undo/error states." |
| "We get a webhook when X happens." | An external event pushes an update, on its own, with an unpredictable delay. | "So what does the user see *while waiting*, and what's the transition when it arrives? And if it never arrives?" |
| "It's real-time." / "updates automatically." | Push/webhook/WebSocket. UI changes with no user action. | "Let me design the live update + the pending state before it." |
| "We're polling for that." | Repeatedly asking the server; may lag or waste calls. | "Is the delay noticeable? Should I design a 'checking…' state?" |

## About states (your home turf)

| Dev says | Means | You respond |
|---|---|---|
| "What's the empty state?" | No data to show. | "Which kind — first-time, no-results, or error? Here's each." |
| "What do we show on error / on a 500?" | The request failed. | "Here's the message + retry. (And a different one for 404 'not found'.)" |
| "What if the name is really long?" | Overflow/edge case. | "Truncate with a tooltip past N chars — spec'd." |
| "Do we handle no-permission?" | 401/403 case. | "Yes — here's the 'no access' state and the next action." |

## About components and the design system

| Dev says | Means | You respond |
|---|---|---|
| "What props should this take?" | Define its configurable variants. | "Same as my Figma variants: variant, size, state, icon — here's the mapping." |
| "Is there a Clarity component for this?" | Prefer the system over custom. | "Yes, use `CuiX`; the only delta is spacing — can we use `space-md`?" |
| "That's a custom/one-off component." | More cost, no free theming/a11y. | "Is it worth a new approved variant, or should I use the standard?" |
| "That's a shared component." | Changing it affects every usage. | "Then let's confirm it's safe everywhere before we tweak it." |
| "The Figma and code don't match." | A gap in the system. | "Let's reconcile — I'll fix the Figma variant names to match the props." |

## About workflow and timing

| Dev says | Means | You respond |
|---|---|---|
| "It's in review / waiting on PR." | Done but not merged; normal. | "Want me to do visual QA on the preview link?" |
| "That's not in this sprint." | Scheduled later, not refused. | "Makes sense — let's refine it so it's ready to pull in." |
| "That's a bigger story than it looks." | New endpoint/states/custom work hiding under a 'simple' ask. | "What's driving the size? If it's states or data, I can adjust the design." |
| "It works on staging, not prod." | Environment-specific bug. | "I'll keep doing QA on staging; ping me to re-verify after the fix." |
| "It's behind a feature flag." | Shipped but not visible to all. | "I'll make sure both the on and off experiences are designed." |
| "The build is red." | Tests failing; nothing ships. | "No rush from me — ping when it's green and I'll review." |

## Five questions that make you sound senior

Ask these early (refinement/kickoff), and you'll pre-empt most handoff friction:

1. **"Where does this data come from — frontend, our backend, or an external system?"** (Reveals effort, delays, and webhooks.)
2. **"Is there a round-trip here? If so, what are the loading and error states?"** (Owns the states before they're bugs.)
3. **"What data does the response actually include?"** (Design within reality, not wishes.)
4. **"Is there a Clarity component and token for this, or is it custom?"** (System-first; predicts cost.)
5. **"Does anything update on its own via a webhook/real-time? What's the delay, and the fallback if it never comes?"** (The classic missed states.)

## The one-paragraph summary of the whole course

The frontend (your UI, running in the browser, built from **React components** configured by **props** and driven by **state**) talks to the backend by making **API** requests with **fetch** and getting **JSON** back, which takes time and can fail — so every data screen needs **loading, empty, error, and success states**. Sometimes the backend **pushes** news the other way, unprompted, when an event happens elsewhere — that's a **webhook**, and it means designing for an unpredictable wait and a live update. Your designs become real through a **Clarity**-based component system (speak in **tokens** and **props**), and travel to users through **branches, PRs, environments, and deploys**. Recognize which bucket any request falls into, and you can talk to devs in their language — and design the things they'd otherwise have to invent.

← Back to [course home](README.md)
