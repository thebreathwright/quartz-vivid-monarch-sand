# Brudo Skill Inventory (Durable)
Updated: 2026-07-25 (session restore)
Live target: 59

## Higher-level integrity layer (real, validated)

- brudo-skill-stack-health — detect HAVE/MISS
- brudo-durable-skill-writer — rematerialize inventory-listed only

## Required skills that drop between turns (must restore)

1. brudo-project-instructions
2. brudo-force-family
3. brudo-breath-hub
4. brudo-implementation-behavior-matrix
5. brudo-category-stability
6. brudo-actor-taxonomy
7. brudo-skill-stack-health
8. brudo-durable-skill-writer

## Not required (phantom / not validated on disk)

Do not invent under restore:
- brudo-session-bootstrap
- brudo-stack-orchestrator
- brudo-epistemic-kernel
- brudo-respiratory-orchestrator
- brudo-program-orchestrator
- brudo-portfolio-governance
- brudo-invariant-enforcer

These names appeared in earlier inventory drafts but were never validated as SKILL.md on disk in this project. Create only with an explicit named gap or new archive.

## Rule

No leaf specialists without new archive or concrete named gap.
On drop: stack-health → durable-skill-writer.
