# 5. APIs & `fetch` — how the frontend talks to the backend

This is the waiter trip from [Topic 1](01-big-picture.md), with proper names. Nearly every "where does this data come from?" question lands here. Master this topic and you'll understand loading spinners, error states, slow screens, stale data, and "that's a backend thing" — all at once.

## API — the menu of things you can ask for

An **API** (Application Programming Interface) is the **list of requests the backend will answer**, and the agreed format for asking.

**Analogy:** a restaurant **menu**. The kitchen (backend) can technically make many things, but the menu (API) defines exactly what you're allowed to order and how to order it. You don't walk into the kitchen; you order from the menu.

When a dev says *"we need a new API"* or *"the backend needs to add an endpoint,"* they mean: *the thing you're asking for isn't on the menu yet; the backend team has to add it.* That usually means **cross-team work and more time** — critical for you to know during design, because it affects what's feasible this sprint.

## Endpoint — a single item on the menu

An **endpoint** is one specific thing you can request, identified by a URL-like address:

```
GET  /api/suppliers              → "give me the list of suppliers"
GET  /api/suppliers/42           → "give me supplier #42"
POST /api/suppliers              → "create a new supplier"
```

- `GET` = read/fetch data (no changes). Safe, repeatable.
- `POST` = create something new.
- `PUT` / `PATCH` = update something.
- `DELETE` = remove something.

These are **HTTP methods** (verbs). You'll hear "it's a GET" or "that's a POST." Rough translation: **GET = looking, POST/PUT/PATCH/DELETE = changing.** Changing-things requests are the ones that need confirmation dialogs, undo, and careful error handling in your designs.

## Request and response — the two halves of a trip

Every waiter trip is a **request** (frontend → backend) and a **response** (backend → frontend).

```
REQUEST   →   GET /api/suppliers/42
RESPONSE  ←   { "id": 42, "name": "Acme Co", "status": "active", "balance": 125000 }
```

That response is **JSON** (see below) — the data your UI then displays.

## JSON — the format data travels in

**JSON** (JavaScript Object Notation) is the standard text format for sending data between frontend and backend. It's just **labeled values** — pairs of `"name": value` — which is extremely readable:

```json
{
  "id": 42,
  "name": "Acme Co",
  "status": "active",
  "balance": 125000,
  "contacts": [
    { "name": "Jo Diaz", "email": "jo@acme.com" }
  ]
}
```

> **Why it matters to you:** This JSON is the *raw material* of your screen. If your design shows a supplier's "preferred payment method" but that field isn't in the JSON, the backend doesn't send it — so it either can't be shown or needs new backend work. Peeking at the JSON (devs can paste it, or you can see it in the Network tab) tells you **exactly what data is available to design with.** Designing within the available data = fewer "we don't have that" surprises.

## `fetch` — the actual act of asking

**`fetch`** is the JavaScript command that *makes* the request. When a dev says *"we fetch the suppliers when the page loads,"* they mean: "the moment this screen opens, the frontend sends a GET request and waits for the JSON response."

```javascript
// "Go ask the backend for supplier 42, then show it."
const response = await fetch('/api/suppliers/42');
const supplier = await response.json();   // the JSON becomes usable data
showSupplier(supplier);
```

The key word is **`await`** — "wait for the answer before continuing." That waiting is **not instant.** It takes anywhere from tens of milliseconds to several seconds (slow network, big data, busy server).

> **This is the origin of every loading state.** Because `fetch` takes time, there is *always* a moment where the data isn't here yet. That moment needs a design: spinner, skeleton, progressive reveal. "We fetch it" = "design the wait." (See [Topic 7](07-states-and-edge-cases.md).)

Related terms, same idea: **AJAX**, **XHR**, **"making a call,"** **"hitting the endpoint,"** **"the request,"** **"async"** (asynchronous = "doesn't happen instantly; we wait for it"). All describe the waiter trip.

## Status codes — did the trip succeed?

Every response comes with a 3-digit **status code** telling you how it went. You'll hear these numbers constantly:

| Code | Meaning | Your design job |
|---|---|---|
| **200** | OK — success | Show the data (success state) |
| **201** | Created — your POST worked | Confirm the creation |
| **400** | Bad request — frontend sent something invalid | Inline validation / "please check your input" |
| **401 / 403** | Not logged in / not allowed | Login prompt / "you don't have access" |
| **404** | Not found | "This supplier doesn't exist" empty/error state |
| **500** | Server error — the backend broke | Friendly "something went wrong, try again" |

> **Why it matters to you:** Each code is a **different screen state you should design**. "404" and "500" are not the same message — one is "this thing isn't here," the other is "our system hiccuped." A dev asking *"what should we show on a 500?"* is asking for a design. If you don't provide one, you get the ugly default.

## Watch it happen yourself (designer superpower)

1. Open any web app in Chrome.
2. Right-click → **Inspect** → **Network** tab.
3. Reload or click around.
4. Watch the rows appear — each row is a request. Click one to see the **request**, the **response** (the JSON!), the **status code**, and the **timing**.

Spend ten minutes here and APIs stop being abstract. You'll *see* the waiter trips, the data your UI is built from, and how long they take. It's the single best way to make this topic click.

## How to recognize it as a UX designer

- **Any spinner/skeleton** = a `fetch`/API call. There must be loading, success, *and* error designs.
- **"We need a new endpoint / new API"** = backend work, likely another team, more time. Factor it into scope.
- **"That field isn't in the response"** = the data you want to show doesn't exist yet; design within available JSON or request a backend change.
- **"It's a POST/PUT/DELETE"** = something changes on the server → design confirmation, success, and undo/error.
- **A status code in a bug report (404, 500, 403)** = tells you which error state fired. You can now map the number to the right message.
- **A slow screen** = a slow or chained API call; a chance to design better perceived performance (skeletons, optimistic UI).

Next: [Webhooks →](06-webhooks.md)
