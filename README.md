# Dev Literacy for UX Designers

A self-paced course to help you understand how developers build web apps with React, and to learn the vocabulary (webhooks, fetch, APIs, state…) so you can talk to engineers in their own language.

You don't need to learn to code. The goal is **fluency, not production** — you want to understand what devs mean, ask sharper questions, spot design implications early, and know *why* a dev says "that's a backend thing" or "we'll need a new endpoint for that."

## How to use this

- Read the topics in order the first time — each builds on the last.
- Every topic ends with **"How to recognize it as a UX designer"** — concrete signs you'll see in real work.
- Skim the examples; don't memorize syntax. You're learning concepts and words.
- Keep the [Glossary](09-glossary.md) and [Phrasebook](10-cheat-sheet.md) open during standups and refinement meetings.

## Topics

1. [The Big Picture — how a web app actually runs](01-big-picture.md)
   *Frontend vs backend, client vs server, the browser.*
2. [The Building Blocks — HTML, CSS, JavaScript](02-building-blocks.md)
   *What each one does, and which one owns which part of your design.*
3. [React — thinking in components](03-react.md)
   *Components, props, and state — the three words that explain 80% of React.*
4. [Design Systems in Code](04-design-systems-in-code.md)
   *How your Figma components, variants, and tokens map to real code (Clarity included).*
5. [APIs & `fetch` — how the frontend talks to the backend](05-apis-and-fetch.md)
   *Requests, responses, JSON, endpoints, status codes.*
6. [Webhooks — the "don't call us, we'll call you" pattern](06-webhooks.md)
   *What a webhook does, and exactly how to recognize one in a design.*
7. [States & Edge Cases — the part of UX devs care about most](07-states-and-edge-cases.md)
   *Loading, empty, error, success — and why devs keep asking you about them.*
8. [The Dev Workflow & Vocabulary](08-dev-workflow.md)
   *Git, PRs, environments, deploys, bugs, feature flags — what happens after you hand off.*
9. [Glossary](09-glossary.md)
   *Plain-language definitions, alphabetized.*
10. [Phrasebook — talking to devs](10-cheat-sheet.md)
    *What they say → what it means → how you respond.*

## A mental model to carry through the whole course

A web app is a **conversation** between two sides:

- The **frontend** (what the user sees — your designs, running in the browser) politely **asks** for things.
- The **backend** (servers, databases, business logic — invisible to the user) **answers**.

Almost every term in this course is just a detail about *how that conversation happens*: who talks first, what format they use, what happens when someone doesn't reply, and how the UI should look while it waits.

Start with [Topic 1 →](01-big-picture.md)
