---
name: token-optimizer
description: Reduce Claude Code token usage by loading project context progressively, avoiding large file dumps, and maintaining concise project memory.
---

# Token Optimizer Skill

Use this skill whenever working in this codebase.

## Workflow
1. Read `CLAUDE.md` → `.ai/CONTEXT_BRIEF.md` → `.ai/PROJECT_MAP.md`
2. Identify the minimum relevant files for the task
3. Avoid `images/`, `.git/`, any generated output
4. Make targeted edits (Edit tool over Write tool)
5. Return concise diff-oriented summaries
6. Update `.ai/CONTEXT_BRIEF.md` with any new durable facts

## Token Budget Rules
- Small task (single component/style fix): inspect ≤ 3 files
- Medium task (cross-page change): inspect ≤ 8 files
- Large task (new feature/section): create a plan first, then inspect

## Refusal Rule
If asked to scan everything, suggest generating/updating `.ai/PROJECT_MAP.md` instead.
