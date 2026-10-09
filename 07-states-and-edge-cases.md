# 7. States & Edge Cases — the part of UX devs care about most

Everything in the last three topics converges here. Because the frontend talks to a backend ([Topic 5](05-apis-and-fetch.md)) and because that conversation takes time and can fail, **a single screen is never one screen — it's a family of states.** The gap between a junior and a senior designer is often just: *did you design all the states, or only the happy one?*

This is also where you'll earn the most respect from devs. Nothing frustrates an engineer more than a beautiful "everything-is-perfect" mockup with no answer for "what if it's empty / loading / broken / too long?" They have to invent those states themselves — and they'll invent them badly.

## The core truth

> A component tied to data has **at least four states**, and usually more. If your handoff shows one, you've handed off ~25% of the work and left the rest to engineering's imagination.

## The essential states for any data-driven screen

| State | When it happens | What the user sees | Common mistake |
|---|---|---|---|
| **Loading** | The `fetch` is in flight | Spinner, skeleton, progress | Blank screen that looks broken |
| **Empty** | Request succeeded but there's **no data** (new user, no results, filtered to nothing) | Helpful empty state + a next action | Showing a bare "0" or nothing |
| **Partial / few** | Only 1–2 items (not the dozens in your mock) | Layout that doesn't look broken | Design only tested with "perfect" 8-card grid |
| **Ideal / success** | Data arrived, everything's fine | The design you probably already made | — |
| **Error** | The request failed (500), timed out, or network died | Clear message + retry | Silent failure, or a scary raw error |
| **No permission** | User isn't allowed (401/403) | "You don't have access" + what to do | Showing the UI but with broken data |
| **Too much / overflow** | Way more data than expected (long names, 500 rows) | Truncation, pagination, "+ 12 more" | Layout explodes with real data |

### The empty state is three different states

Devs will push on this. "No data" isn't one thing:
- **First-time empty** ("You haven't added any suppliers yet") → onboarding opportunity, show a CTA.
- **No-results empty** ("No suppliers match these filters") → offer to clear filters.
- **Error-masquerading-as-empty** (the fetch failed, so there's nothing to show) → must NOT look like the other two; it's an error.

Designing one generic "nothing here" for all three is a classic bug source.

## Loading, done well

Because every `fetch` and every [webhook](06-webhooks.md) wait creates a delay, loading design is high-leverage:
- **Skeletons** (gray placeholder shapes) beat spinners for perceived speed — the user sees the *shape* of what's coming.
- **Optimistic UI** — show the result *immediately* as if it succeeded, then quietly confirm with the server; roll back if it fails. (e.g. a "liked" heart fills instantly.) Devs love when you design this intentionally, but you must also design the **rollback** state for when the server says no.
- **Progressive loading** — show what's ready now, stream in the rest. Requires you to define the order things appear.

## Edge cases devs will ask you about (be ready)

- **Long strings** — a supplier named "Международная Торговая Компания Логистики и Снабжения." Does it wrap? Truncate? Tooltip?
- **Zero / negative / huge numbers** — `$0`, `-$4,000` (a credit?), `$1,250,000,000`. Formatting and color.
- **Missing optional fields** — no avatar, no phone, no description. What fills the gap?
- **Timezones & dates** — "2 minutes ago" vs absolute date; whose timezone?
- **Slow network** — does the whole screen block, or just the one widget?
- **Concurrent edits** — two users change the same thing. Who wins, and how is the loser told?
- **Validation** — inline, on blur, or on submit? What's the error copy? (This ties to the 400 status in [Topic 5](05-apis-and-fetch.md).)

You don't have to design every edge case for every screen — but you should **decide which matter** and say so, rather than leave it silent.

## Why this makes you fluent

When a dev says any of these, they're asking a **design question** and you now recognize it instantly:
- *"What's the empty state?"*
- *"What do we show while it loads?"*
- *"What happens on error / on a 500?"*
- *"What if the name is really long?"*
- *"Do we handle the no-permission case?"*

Answering these *before* being asked is the single clearest signal to engineers that you understand how the thing is actually built. It also massively reduces back-and-forth and mid-sprint surprises.

## A simple habit: the state checklist on every data screen

For each screen that shows data, jot:
1. **Loading** →
2. **Empty** (which kind?) →
3. **Error** (and retry) →
4. **Ideal** →
5. **Overflow / long content** →
6. **Permissions** (if relevant) →

Six lines in your handoff. It changes how devs see you.

## How to recognize it as a UX designer

- Any screen with a spinner, a list, a fetched value, or an external status → it has hidden states. Hunt them.
- A dev "asking a lot of what-if questions" → they're not being difficult; they're enumerating states you can own.
- A QA bug like "layout breaks with long name" or "blank screen on error" → a missing-state problem, preventable at design time.
- A screen fed by a [webhook](06-webhooks.md) → always needs a Pending state and an arrival transition.

Next: [The Dev Workflow & Vocabulary →](08-dev-workflow.md)
