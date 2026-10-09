# 1. The Big Picture — how a web app actually runs

Before any single term makes sense, you need the map. Everything else in this course is a pin on this map.

## The two sides: frontend and backend

Every web app has two halves that talk to each other.

| | **Frontend** | **Backend** |
|---|---|---|
| Also called | client, client-side, "the UI" | server, server-side, "the API" |
| Where it runs | in the user's **browser** (Chrome, Safari…) | on a **server** (a computer in a data center) |
| What it is | your designs, made real — buttons, layout, animations | business logic, databases, calculations, security |
| Can the user see it? | **Yes** — it's literally on their screen | **No** — it's invisible, behind the scenes |
| A designer touches it via | React components, CSS, design tokens | almost never directly — but your designs *trigger* it |

**Analogy:** A restaurant.
- The **frontend** is the dining room — tables, menu design, lighting, the waiter. It's everything the guest experiences.
- The **backend** is the kitchen — where food is actually made, where the recipes and ingredients live.
- The guest (user) never goes into the kitchen. They ask the waiter, the waiter goes to the kitchen, and brings back a plate.

That "waiter walking between dining room and kitchen" is the single most important idea in this course. In the next topics it gets names: **API**, **request**, **response**, **fetch**, **webhook**. They're all variations of the waiter trip.

## Client vs server (the words you'll hear)

- **Client** = the frontend, running on *one user's* device. There are millions of clients (one per browser tab).
- **Server** = the backend, running centrally. One server handles many clients at once.

When a dev says *"that has to happen on the server"*, they mean: it can't be trusted to the browser (because users can tamper with anything in their own browser), or it needs data/secrets the browser shouldn't have. **Pricing calculations, permissions, payments, and anything security-sensitive live on the server.**

When a dev says *"we can do that client-side"*, they mean: it can happen instantly in the browser without asking the server — e.g. showing/hiding a panel, validating that a field isn't empty, filtering a list that's already loaded.

> **Why this matters to you:** "Can we show the discount instantly as the user types?" might be a *client-side* yes (instant, cheap) or a *server-side* no (needs a round-trip, so there'll be a tiny delay and you must design a loading state). The answer shapes your microinteraction. Now you know *why* to ask.

## The browser is the runtime

The **browser** is the program that downloads your frontend and runs it. "Runtime" just means "the environment where the code runs." The browser:

- Downloads the HTML, CSS, and JavaScript (your app).
- Draws the pixels (renders).
- Runs the JavaScript that makes things interactive.
- Makes the "waiter trips" to the server when the app asks it to.

**DevTools** (right-click → Inspect in Chrome) is the window into all of this. You'll meet it again in [Topic 5](05-apis-and-fetch.md) — the **Network tab** is where you can literally *watch* the waiter trips happen. It's a superpower for designers.

## How a page loads, start to finish

1. You type a URL. The browser asks a server for the page.
2. The server sends back **HTML** (structure), **CSS** (styling), and **JavaScript** (behavior).
3. The browser draws the initial page.
4. The JavaScript (often a **React** app) wakes up and takes over — now the page is interactive.
5. As the user clicks around, the app makes more waiter trips (**fetch** calls) to get fresh data, without reloading the whole page. This is what makes modern apps feel like apps, not documents.

That step 5 — updating parts of the page without a full reload — is the heart of a "**single-page application** (SPA)," which is what most React apps are.

## How to recognize it as a UX designer

- **A spinner or skeleton in a design** = a waiter trip is happening (frontend asked the backend, waiting for the answer). If there's a trip, there must be states for *waiting*, *success*, and *failure*. (See [Topic 7](07-states-and-edge-cases.md).)
- **"This field saves automatically"** = each change may trigger a server trip. Design the "saving…/saved" feedback.
- **"That number is wrong"** in QA = ask whether the value is *calculated on the frontend* (display bug, quick fix) or *comes from the backend* (data bug, different team maybe).
- **A dev pushing back on an instant interaction** = it probably needs the server, so "instant" isn't free. Negotiate the loading state instead of the ideal.

Next: [The Building Blocks — HTML, CSS, JavaScript →](02-building-blocks.md)
