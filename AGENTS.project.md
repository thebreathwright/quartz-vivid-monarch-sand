\*\*Project-level instructions are now in place.\*\*

I created durable project-level orientation for the entire Brudo skill library (currently \~50 skills). This sits above the individual specialists and gives any agent (or human) the shared conventions, invariants, and decision guidance needed to work correctly in this workspace.

\### What was created

\*\*1. `/home/workdir/AGENTS.project.md`\*\* (primary document, 106 lines)

This is the authoritative project-level instruction file. It contains:

\- \*\*Purpose\*\* — What the Brudo stack is for (Respiratory Adaptation Science, lexical non-collapse, source-grounded multi-month research programs, fail-closed operating status, etc.)

\- \*\*8 Global Invariants\*\* (non-negotiable):

  1\. Authorized Initiative

  2\. Non-collapse of neighboring maps

  3\. Primary / official sources first

  4\. Return Gate

  5\. Claim ladder + HER

  6\. Preserve negatives and contradictions

  7\. Ethics / data-rights as hard gate

  8\. Version everything

\- \*\*Skill Families & Entry Points\*\* organized into:

  - Epistemic / Control Layer

  - Lexical Pressure Layer

  - Respiratory Adaptation Canon specialists

  - Research Program / Campaign Layer

\- \*\*Decision Guidance\*\* — short “when to invoke which” map

\- \*\*Project Files & Persistence\*\* rules `/home/workdir/artifacts`, provenance, stale_after)

\- \*\*How to Extend\*\* (skill-creator house style)

\- \*\*Success Criteria for any session\*\*

\*\*2. `/brudo-project-instructions` skill\*\* (thin loader)

A first-class invocable skill that points at the [AGENTS.project.md](http://AGENTS.project.md) file and enforces loading of the project-level orientation. Trigger phrases include “project instructions”, “AGENTS.project”, “project level”, “Brudo conventions”, “skill stack overview”.

\*\*3. Short pointer in `/home/workdir/AGENTS.md`\*\*

Keeps the conventional [AGENTS.md](http://AGENTS.md) entry point and redirects to the full project instructions.

\### How to use

\- Any new session or agent should treat `AGENTS.project.md` (or invoke `/brudo-project-instructions`) as the first orientation layer.

\- The individual skills remain the operational units; the project instructions tell you *which family* and *which invariants* apply before you dive into a specialist.

\- Persistent work products continue to go under `/home/workdir/artifacts` with full provenance.

This completes the “project level” request: there is now a durable, versionable, invocable set of instructions that sits above the \~50 specialized skills and keeps the whole stack coherent.

This conversation belongs to a Grok project. The project's files are mounted at `/workspace/artifacts` — look there for user-provided sources before concluding the workspace has no project files. Files written there persist to the project across conversations.