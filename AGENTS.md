# AGENTS.md

Workflow guidelines for AI agents executing tasks from EXECUTION_PLAN.md.

---

## Project Context

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript (ES6+), no build tools

**Dev Server:** Open `index.html` directly in browser (no server needed)

**Test Runner:** None (manual browser testing for this MVP)

---

## Workflow

```
HUMAN (Orchestrator)
├── Completes pre-phase setup
├── Assigns tasks from EXECUTION_PLAN.md
├── Reviews and approves at phase checkpoints

AGENT (Executor)
├── Executes one task at a time
├── Works in git branch
├── Implements, then verifies in browser
└── Reports completion or blockers
```

---

## Task Execution

1. **Load context** — Read AGENTS.md and your task from EXECUTION_PLAN.md
2. **Create branch** — If first task in phase: `git checkout -b phase-{N}`
3. **Verify dependencies** — Confirm prior tasks are complete
4. **Implement** — Write the code specified in the task
5. **Test in browser** — Open index.html, verify acceptance criteria manually
6. **Update progress** — Check off completed criteria in EXECUTION_PLAN.md
7. **Commit** — Format: `task(1.1.A): brief description`

### Checkbox Format

When updating EXECUTION_PLAN.md:

```markdown
# Before
- [ ] Button grid contains digits 0-9

# After
- [x] Button grid contains digits 0-9
```

---

## Context Management

**Start fresh for each task.** Do not carry conversation history between tasks.

Before starting any task, load:
1. AGENTS.md (this file)
2. PRODUCT_SPEC.md and TECHNICAL_SPEC.md
3. Your task definition from EXECUTION_PLAN.md

---

## Verification

This project uses manual browser testing (no test framework).

For each acceptance criterion:
1. Open `index.html` in browser
2. Perform the action described
3. Verify the expected result
4. Check off the criterion if it passes

---

## When to Stop and Ask

Stop and ask the human if:
- Acceptance criteria are ambiguous
- You need to modify files outside your task scope
- Something doesn't work and you can't determine why

**Blocker format:**
```
BLOCKED: Task {id}
Issue: {what's wrong}
Tried: {what you attempted}
Need: {what would unblock}
```

---

## Completion Report

When done:
- What was built (1-2 sentences)
- Files created/modified
- Verification status (all criteria checked)
- Commit hash

---

## Git Conventions

**Branch:** `phase-{N}` (e.g., `phase-1`)

**Commit:** `task({id}): {description}` (e.g., `task(1.1.A): Add calculator HTML`)

---

## Guardrails

- Make the smallest change that satisfies acceptance criteria
- Do not duplicate files to work around issues
- Do not add features not in the spec
- Test in browser after each change
