# Queron AI Agent Framework

This project uses the Queron AI Agent Framework for opencode.

## Workflow
Always follow PLAN → REVIEW → EXECUTE. Produce a plan before making changes.

## Agents
| Agent | Purpose |
|---|---|
| `@architect` | System architecture & data modeling |
| `@frontend` | UI components, pages |
| `@backend` | APIs, server logic |
| `@database` | Schema design, migrations |
| `@reviewer` | Code review (read-only) |
| `@tester` | Unit/integration/e2e tests |

## Engram
engram_project: my-portfolio-v2
Set the engram_project value above (remove the comment markers) to enable persistent context across sessions.
Engram saves context automatically after edits and loads it on session start.

## MCP
- Context7: Provides up-to-date documentation for dependencies and frameworks.
- Engram: Persistent memory across sessions.

## Conventions
- Follow existing project patterns — inspect neighboring files before writing new code.
- Prefer existing stack and libraries; do not introduce new dependencies.
- Subagents are invoked via @name mentions (e.g., @reviewer review this).
