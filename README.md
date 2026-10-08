# NORTHSTAR

**Know where you're going.**

Northstar is an adaptive life-planning system built around a simple idea:

> A goal is not a checklist. It's a destination with multiple possible routes.

The product turns a natural-language goal into context, reality checks, routes, milestones, actions, and — when reality changes — a new route.

## Product principles

- **Intent before forms** — start with what the person actually wants.
- **Reality before motivation** — constraints and tradeoffs matter.
- **Routes, not rigid plans** — there should be more than one way forward.
- **Adaptation is a feature** — plans should change without destroying progress.
- **Useful over decorative** — motion and visual effects must improve comprehension.
- **Human-editable** — AI proposes; the user owns the plan.

## UI direction

Northstar uses selectively chosen interaction patterns from component libraries such as React Bits alongside custom product UI. Components are ingredients, not the design system itself. The interface should feel calm, precise, premium, and intentional — never like an animated AI template.

The current hero uses a locally owned adaptation of React Bits' **BlurText** component, sourced from the project's open-source repository and tuned for Northstar's quieter visual language. React Bits provides copy-ready, customizable React components and documents its licensing in its repository.

## Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```
