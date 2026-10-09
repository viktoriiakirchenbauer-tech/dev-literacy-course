# 6. Webhooks — the "don't call us, we'll call you" pattern

You asked specifically what a webhook does and how to recognize one as a UX designer. This topic answers both. Webhooks confuse people because they're the **reverse** of the normal waiter trip — so let's anchor on that contrast.

## First, recall the normal pattern (polling / fetch)

In [Topic 5](05-apis-and-fetch.md), the frontend **asks** and the backend **answers**. The asker is in control: *"Is it ready yet? Is it ready yet?"*

If you need to know when something happens (e.g. "did the payment clear?"), the naive way is **polling** — asking over and over:

```
Frontend → "Payment done yet?"   Backend → "No."
(wait 5s)
Frontend → "Payment done yet?"   Backend → "No."
(wait 5s)
Frontend → "Payment done yet?"   Backend → "Yes! Here are the details."
```

Polling works but is wasteful: hundreds of "not yet" questions, and the user still waits up to 5 seconds *after* it's actually done. It's the kid in the back seat asking "are we there yet?"

## What a webhook does

A **webhook flips the direction.** Instead of you repeatedly asking, you leave your number and say *"call me the moment it happens."* The other system **pushes** the news to you, unprompted, exactly when the event occurs.

```
(setup, once) → "When a payment clears, POST the details to https://ourapp.com/hooks/payment"

...time passes, nobody asks anything...

Payment clears → Backend immediately calls YOUR URL with the data:
   POST https://ourapp.com/hooks/payment
   { "event": "payment.cleared", "supplier": "Acme Co", "amount": 125000 }
```

So, plainly:

> **A webhook is an automated message one system sends to another the instant an event happens, by calling a pre-agreed URL. It's event-driven and real-time: no asking, no waiting, no polling.** It's "don't call us, we'll call you."

The receiving URL is literally called a **webhook** (a "hook" the event hangs on). You'll also hear **"callback URL," "event notification," "push," "subscribe to an event,"** and **"X fires a webhook when Y happens."** Same concept.

## Everyday webhooks you already rely on

- **Stripe/PayPal** → tells your app "payment succeeded" the instant it clears, so the UI can update without the user refreshing.
- **GitHub** → tells Slack/Jira "a pull request was opened" → the Slack message appears on its own.
- **Calendly** → "someone booked a meeting" → your calendar updates and you get an email, instantly.
- **Shipping carrier** → "package delivered" → the app flips the order to "Delivered" and pushes a notification.

In every case, **something appeared or updated without the user doing anything**, triggered by an event somewhere else. That's the fingerprint.

## Webhook vs API/fetch — the one-line distinction

| | **API / `fetch` (pull)** | **Webhook (push)** |
|---|---|---|
| Who starts the conversation | **The frontend asks** | **The other system tells you** |
| Trigger | User action (open screen, click) | An **event** happening elsewhere |
| Timing | On demand, right now | Whenever the event occurs — could be seconds or days later |
| Analogy | You call the restaurant to check your order | The restaurant texts you "your table is ready" |
| Direction | You → them → back to you | Them → you, unprompted |

**Rule of thumb:** if the UI updates *because the user did something*, it's probably fetch. If the UI updates *because something happened elsewhere, on its own*, a webhook (or a related push mechanism) is likely behind it.

## How to recognize a webhook as a UX designer

This is the part you asked for. Webhooks are invisible — but they produce very recognizable **design signatures**. If a design has any of these, a webhook (or similar push) is almost certainly involved, and that changes what you must design:

**1. Something updates on its own, with no user action.**
A status badge flips from "Processing" → "Paid," a counter ticks up, a new row appears in a list, a toast slides in — and the user didn't click anything. *Ask: "what event triggers this, and is it a webhook?"*

**2. A status that depends on an external system.**
Payment status, shipment tracking, "signature received," "sync complete," third-party approval, invoice "accepted by buyer." Anything owned by *another company or service* almost always arrives via webhook.

**3. "Real-time" or "automatically" in the spec.**
"The dashboard updates in real time when a supplier accepts." "Suppliers are notified automatically when the buyer approves." Those phrases are webhook flags.

**4. Notifications and emails that fire off events.**
"Email the supplier when the payment clears." The payment clearing is an event; the webhook is what tells the system to fire the email/notification.

**5. The dreaded in-between: the delay you don't control.**
This is the biggest UX consequence. A webhook arrives *whenever the external event happens* — which could be **2 seconds or 2 days** later. So you must design the **waiting state in the meantime**:
   - What does the user see *after* they act but *before* the webhook arrives? ("Payment submitted — we'll update this when it clears." + a Pending state.)
   - Is there a visible transition when the update *does* arrive? (Badge animates, toast appears, row re-sorts?)
   - What if it **never** arrives (the external system failed)? Is there a "still pending after 24h — contact support" fallback?

### Worked example — recognizing it in a flow

Imagine you're designing supplier payments (close to your real work):

> A buyer approves an early-payment discount. The supplier should see their status change from **"Offer sent"** to **"Approved — funds on the way,"** and get an email.

Here's how you'd reason as a *fluent* designer:
- The supplier's screen updates **because the buyer did something on a different screen (or even a different company's system)** → not a fetch triggered by the supplier → **webhook signature #1 and #2.**
- So I must design **three states**, not one: `Offer sent / Pending` (the wait — could be minutes or days), `Approved` (the arrival — with a noticeable transition so the supplier isn't surprised), and `Expired / Declined` (the other outcome).
- I should ask the dev: *"Is the approval coming in via a webhook? What's the realistic delay, and what should the supplier see while they wait? And what happens if the webhook never fires?"*

That one set of questions — which you can now ask with confidence — prevents the classic bug where the UI silently sits on "Offer sent" forever while the real status changed hours ago. **Recognizing the webhook is what tells you those extra states must exist.**

## A subtlety worth knowing

The browser can't *directly* receive a webhook (webhooks go server-to-server). So the usual chain is: external event → webhook hits **your backend** → your backend pushes it to the **browser** via a live connection (**WebSocket** / **server-sent events**) *or* the frontend learns about it on its next fetch. You don't need the plumbing — just know: **"webhook" explains why the news exists; a WebSocket/refresh explains how it reaches the screen.** If a dev says "we get a webhook but the UI only shows it on refresh," that's a real UX gap you can flag: the update exists but the user won't see it live.

## How to recognize it — quick checklist

- [ ] Does something change **without the user acting**? → push/webhook.
- [ ] Does the status depend on an **external system or another person**? → likely webhook.
- [ ] Do the words **"real-time," "automatically," "when X happens," "notify"** appear? → webhook flag.
- [ ] Is there an **unpredictable delay** between the user's action and the result? → design the Pending state + the arrival transition + the never-arrives fallback.

Next: [States & Edge Cases →](07-states-and-edge-cases.md)
