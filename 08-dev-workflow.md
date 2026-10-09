# 8. The Dev Workflow & Vocabulary

You now understand *what* devs build. This topic covers *how* they work day to day — the words that fly around standups, Jira, and Slack. Knowing these lets you follow conversations, time your feedback well, and understand why "it's a tiny change" still takes until next week.

## Git — the time machine for code

**Git** is the version-control system that tracks every change to the code. Think of it as **Figma version history + branching, but for code.**

- **Repository ("repo")** — the project's codebase, with its full history. Like a Figma *project file*.
- **Commit** — a saved snapshot of changes with a message ("Add loading state to supplier card"). Like a named version in Figma history.
- **Branch** — a parallel copy where someone works without disturbing the main version. Like **duplicating a page** to explore, so the live design stays safe. The stable branch is usually called **`main`**.
- **Merge** — folding a branch's finished changes back into `main`. Like accepting an exploration back into the source of truth.
- **GitHub** — the website where repos live and collaboration happens (Coupa uses it). Git is the system; GitHub is the hosted home.

## Pull request (PR) — the design critique of code

A **pull request** (PR, sometimes "merge request") is how a dev proposes their change: *"Here's what I changed; please review before it goes into `main`."* Other devs review, comment, request changes, and approve — **exactly like a design critique.**

> **Why it matters to you:** "It's in review" / "waiting on PR approval" means the code is *done* but not yet merged — a normal, often multi-day step. It's not stalling. You may even be asked to **review the PR visually** (does it match the design?) — a great moment to catch drift. Some teams deploy a **preview link** per PR so you can click the real thing before it ships.

## Environments — where the app runs at each stage

The same app runs in several **environments**, each a safer rehearsal of the next:

| Environment | What it's for | Can you break it? |
|---|---|---|
| **Local** | A dev's own laptop | Totally fine |
| **Dev / Development** | Shared early integration | Expected to be messy |
| **Staging / QA / Pre-prod** | A production-like copy for testing & your design QA | Try to break it *here* |
| **Production ("prod")** | The real thing real users use | **Never** break it |

> **Why it matters to you:** "It works on staging but not prod" is a real class of bug. And **do your design QA on staging** — never assume the mock equals the build. "Can you deploy this to staging so I can review?" is a sentence that makes you sound like you've done this before.

## Deploy / release / ship — making it live

- **Deploy** — pushing code to an environment so it runs there.
- **Release / ship** — making it available to users (prod).
- **Rollback** — undoing a bad deploy by reverting to the previous version. (Why devs are cautious: a bad deploy affects real users instantly.)
- **Hotfix** — an urgent fix shipped outside the normal cycle.

## Feature flags — the dimmer switch for features

A **feature flag** (or **toggle**) turns a feature on/off *without a new deploy*. Teams ship code "dark" (flag off), then flip it on for some or all users.

> **Why it matters to you:** This enables **A/B tests** and **gradual rollouts** ("10% of users see the new flow"). It also means "it's shipped" ≠ "everyone sees it." If you're designing an experiment or a phased launch, feature flags are the mechanism — design both the on and off experiences.

## Bugs, tickets, and the tools

- **Jira / ticket / issue** — a tracked unit of work (a feature, bug, or task). Coupa uses Jira. "I'll file a ticket" = "I'll create a tracked task."
- **Bug** — behavior that's wrong vs intended. A good bug report says: steps to reproduce, what happened, what you expected, environment, screenshot.
- **Backlog** — the pile of not-yet-done tickets.
- **Sprint** — a fixed work window (often 2 weeks) the team commits to. "That's not in this sprint" = scheduled later, not refused.
- **Refinement / grooming** — the meeting where upcoming tickets get clarified and estimated. **The best place to raise design questions early** — before estimates lock in.
- **Story points / estimate** — rough sizing of effort. When your design makes something a "bigger story," it's worth knowing why (often: new endpoint, new states, or a custom component).

## CI/CD — the robot that checks and ships

**CI/CD** (Continuous Integration / Continuous Deployment) is automation that, on every change, **runs the tests and builds/deploys** the app. (At Coupa you'll hear tools like TeamCity.)

- **Tests** — automated checks that the code still does what it should. "The build is red/failing" = a test broke; shipping is blocked until it's green.
- **"The build broke"** — something failed in that pipeline; nothing ships until fixed.

> **Why it matters to you:** This is why even a "one-line" change isn't instant — it goes through review, tests, and a pipeline. It's a feature (safety), not bureaucracy.

## A typical journey of your design into the product

1. You design in Figma using the system/tokens → handoff with all states.
2. Dev picks up the **Jira ticket**, creates a **branch**.
3. Dev builds it from **Clarity** components, wiring up **fetch**/APIs and the **states**.
4. Dev opens a **PR**; teammates review; maybe you do visual QA on a **preview link**.
5. Merged to **`main`**; **CI** runs **tests**.
6. **Deployed** to **staging** → your design QA.
7. **Released** to **prod**, possibly behind a **feature flag**, maybe rolled out gradually.

Knowing this map tells you *when* to insert feedback (early, at refinement and PR — cheap) vs *late* (after prod — expensive).

## How to recognize it as a UX designer

- **"It's in review / waiting on PR"** → done but not merged; normal. Offer visual QA.
- **"Works on staging, not prod"** → environment bug; do your QA on staging regardless.
- **"It's behind a flag"** → shipped ≠ visible to all; design on/off and rollout states.
- **"That's a bigger story / not this sprint"** → scope/scheduling, often driven by new endpoints, states, or custom components you specified.
- **"The build is red"** → tests failing; shipping blocked until green.
- **Raise design concerns at refinement**, not after the PR — it's the cheapest point to change course.

Next: [Glossary →](09-glossary.md)
