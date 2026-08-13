# Brudo Hand-Made Set — Deep Research Report

**Prepared:** 2026-08-12  
**Primary supplied archive:** `hand_made_set_Bruce(2).zip`  
**Archive SHA-256:** `60a208d6ffa7c56385c2f12b04ab6e4f82a2372285c2c0c6cd8dedcb6b681caa`  
**Scope:** technical architecture, evidence quality, implementation support, prior-art pressure, patent-family topology, and decisive next experiments.  
**Legal status:** research analysis for counsel and engineering; not a novelty opinion, freedom-to-operate opinion, or legal advice.

---

## Executive conclusion

The archive does **not** support the broad proposition that Brudo has already implemented a general “constitutional runtime,” a replay-time re-admission engine, a minimal lawful-information runtime, and a proof-carrying self-prompt controller as one finished system.

It supports a narrower and technically more valuable result:

> **The strongest trace-supported mechanism is a contract-anchored generative-result admission path that separates execution completion from semantic admission, carries the declared result contract into a receipt, preserves a typed admission state across scheduler and consumer boundaries, and prevents a completed-but-rejected output from entering candidate state.**

That result matters because the raw terminal trace repeatedly exposes the same class of composed-system defect:


each component can be locally intelligible while a consequence-bearing fact changes type at the boundary where the next component consumes it.

The best specimen is:

```text
model output preserved
+ executor-level validation error
→ scheduler originally classified UNASSESSED
→ downstream meaning became weaker than the executor’s finding
→ scheduler repaired to preserve REJECTED
→ candidate consumer required ADMITTED
```

This is stronger than ordinary JSON validation. It is also narrower than the archive’s early patent prose. The potentially distinctive center is **cross-layer preservation and enforcement of contract-relative semantic status**, not merely:

- using a JSON schema;
- assigning a schema ID;
- validating an LLM output;
- keeping receipts;
- replaying events;
- using three-valued status;
- minimizing observations; or
- asking an agent to prompt itself.

All of those broader ingredients have substantial neighboring art.

The recommended patent topology is therefore:

1. **Primary family — prepare for counsel, but keep filing status conditional:** Contract-Anchored Generative Result Admission with Cross-Layer Status Preservation.
2. **Continuation/split candidate:** Replay-Time Current-Condition Re-Admission and Consequence Non-Amplification.
3. **Dependent-claim/continuation material:** Receipt-Witnessed Occurrence Continuity, Atomic Publication, and Historical-versus-Current Competence Separation.
4. **HOLD:** Consequence Quotient / Minimal Lawful-Information Runtime.
5. **HOLD:** Denominator-Bound Abstention and Quiescence Certificates.
6. **Reject as broad standalone families:** generic schema validation, generic provenance, generic replay validation, generic UNKNOWN/withhold logic, generic self-prompting, and generic minimal-information selection.

The most important next move is not more patent prose. It is a **clean, independently replayable composed-path experiment** in which the same output bytes are evaluated under different contract identities, validator identities, and present consequences—and every layer preserves the resulting admission state through actual downstream use.

---

## 1. Evidence architecture and independence audit

### 1.1 Archive structure

The supplied ZIP contains:

- **62 members**;
- **29 top-level PDFs**;
- **2 top-level terminal transcripts**;
- **31 macOS resource-fork entries** under `__MACOSX`;
- **29,836,170 uncompressed bytes**.

The two terminal transcripts dominate the evidence:

- `CODEBASE_INTRFACE_33.txt`: approximately 12.1 MB and 242,702 lines.
- `CODEBASE_INTRFACE_34.txt`: approximately 14.8 MB and 312,731 lines.

`CODEBASE_INTRFACE_34.txt` shares essentially the entire byte prefix of `CODEBASE_INTRFACE_33.txt` and then continues. They are therefore **not independent replications**. The correct evidentiary model is:

```text
CODEBASE_INTRFACE_33
⊂ approximately
CODEBASE_INTRFACE_34
```

The later trace should ordinarily be used as the fuller source, while the earlier trace can help establish continuity or identify later edits.

### 1.2 PDF dependence

Fourteen of the 29 PDFs are titled variants of “Executive Summary.” Text comparison found one exact duplicate pair and many high-similarity pairs. Several reports also summarize or elaborate the same terminal observations.

Therefore:

```text
repetition across PDFs
≠ independent corroboration
```

The PDFs are useful for:

- locating candidate mechanisms;
- exposing the evolving patent representation;
- identifying claimed code symbols and proposed tests;
- finding contradictions that the raw trace can resolve.

They are weaker than the raw trace for establishing what code was actually inspected, edited, tested, or consumed.

### 1.3 Evidence-status legend

This report uses the following statuses:

| Status | Meaning |
|---|---|
| `BYTE_VERIFIED_ARCHIVE` | The supplied archive’s bytes and inventory were locally inspected. |
| `RAW_TRACE_SUPPORTED` | The terminal trace visibly contains an inspection, edit, test result, or runtime observation. |
| `REPORT_DERIVED_CANDIDATE` | A PDF/report proposes or summarizes a mechanism, but the raw trace does not establish it. |
| `IMPLEMENTATION_NOT_INDEPENDENTLY_REEXECUTED` | The trace shows code/test activity, but no current repository snapshot was supplied for independent rerun. |
| `EXTERNAL_PRIOR_ART` | A public paper, standard, official documentation, or patent publication. |
| `UNKNOWN` | The supplied material does not establish the proposition. |

This mirrors the capsule’s own bounded discipline: the capsule distinguishes archive-byte consistency and enumerated checks from authorship, general semantic equivalence, structural host enforcement, authority, and Canon effect.

---

## 2. What the raw composed system actually taught

## 2.1 The 19-job audit: transport validity and semantic validity separated

The raw trace shows an initially confusing red audit. The jobs themselves were valid and current-profile bound, but the audit reconstructed the expected request without the explicit `think: false` field used by the current runner.

At approximately `CODEBASE_INTRFACE_34.txt:731–786`, the trace records:

1. `request_exact_replay_mismatch`;
2. inspection of the request builder and frozen `REQUEST.json`;
3. identification of an **audit-contract compatibility defect**, not a transport failure;
4. addition of `think=False` to the audit’s expectation;
5. rerun of the audit;
6. emergence of a real semantic rejection population.

The corrected result was:

- 19/19 artifacts valid and current-profile bound;
- 16/19 semantic acceptances;
- three semantic rejections:
  - lesson 02: `failure_correction_direction_reversed`;
  - lessons 04 and 10: `introduced_runtime_scope:live`.

This earns two clean separations:

```text
request replay equivalence
≠ semantic correctness
```

and:

```text
semantic rejection
≠ transport failure
```

Later targeted successor repairs appear to produce a separate 19/19 closure artifact. That does **not** retroactively turn the predecessor population into 19/19. The lawful statement is:

```text
predecessor audit = 16/19
later successor closure = 19/19
```

Both remain represented.

### Technical lesson

The audit and producer independently reconstructed a request contract and drifted. The valuable invariant is not “always add `think:false`.” It is:

> **A producer and its auditor should consume one canonical request representation—or a provably equivalent derived representation—rather than independently reconstructing the same contract.**

That relation is a stronger engineering object than the specific missing Boolean.

---

## 2.2 The 40-item Brullama campaign: one failure population split into several mechanisms

The raw trace around `242620–244085` shows a separate 40-item Brullama campaign.

### Pre-model failures

The first two attempts failed before model execution:

1. `ModuleNotFoundError: No module named 'tools'` under an insufficient `PYTHONPATH`.
2. `FileNotFoundError: 'brullama'` after import repair, even though the adjacent repository binary existed.

These are runner/environment failures, not model-output failures.

### First real model run

After fixing `PATH`, the campaign reached actual model execution. The first bounded run reported **39/40 pass**, with one `UH-01` JSON-decode failure.

A direct single-worker reproduction weakened the initial concurrency explanation. Producer inspection showed that Brullama’s word-wrapping path injected terminal cursor-control sequences into stdout. Adding `--nowordwrap` at the invocation boundary made the same specimen produce:

- valid JSON;
- zero ESC bytes;
- the exact nine-key contract.

This is a strong source-localized repair:

```text
same specimen
+ same model
+ same requested JSON
+ --nowordwrap
→ contaminated stream becomes valid stream
```

### Full retry after producer repair

The full single-worker retry then yielded **28/40 pass and 12 fail**. The original ANSI/cursor contamination was gone. Remaining failures included heterogeneous output defects such as:

- leading `</think>` text;
- trailing or additional JSON data;
- other contract-output instability.

Therefore:

```text
producer stream contamination fixed
≠ model/output contract population fixed
```

The campaign did not contain one generic “JSON failure.” It contained at least:

- environment import failure;
- executable-resolution failure;
- producer stream contamination;
- reasoning-wrapper leakage;
- extra-data / multi-object output;
- possibly contract-semantic failures still requiring classification.

### Technical lesson

The campaign demonstrates why failure receipts need typed jurisdiction. A single red count destroys causal information. The correct pipeline should retain the earliest boundary at which the object became invalid.

---

## 2.3 Contract identity entered the job but initially did not control admission

At approximately `259300–259480`, the raw trace inspects the Grax core and finds:

- `JobIdentity` includes `ResultSchema`;
- the scheduler’s completion path validates work delta and marks execution `COMPLETED`;
- the receipt initially lacks:
  - `ResultSchema`;
  - validator identity;
  - predicate outcomes;
  - result-admission status;
- semantic validation exists at the CLI boundary rather than the core scheduler boundary.

The trace states the important non-equivalence:

```text
contract identity enters job identity
≠ contract identity controls core admission
```

The implementation then adds:

```text
Receipt.ResultSchema
Receipt.AdmissionState = UNASSESSED | ADMITTED | REJECTED
```

and a focused test verifies that a successfully completed execution remains `UNASSESSED` until semantic admission is actually evaluated.

This is an important instrument correction. It creates a state the old representation could not express:

```text
execution completed
∧ semantic admission not evaluated
```

That state is essential. Without it, execution success silently donates semantic acceptance.

---

## 2.4 The consumer boundary: a receipt field became operational

The next material step is not merely adding an enum. The trace later changes the consumer path so that `CandidateDeltaFromReport` requires:

```text
Disposition == COMPLETED
AdmissionState == ADMITTED
EvidenceStatus == MODEL_DERIVED_CANDIDATE
```

A negative test requires:

```text
COMPLETED + REJECTED
→ candidate creation refused
```

This crosses the key threshold:

```text
admission state
→ description only
```

becomes:

```text
admission state
→ downstream eligibility decision
```

That is the point at which the typed distinction becomes executable rather than documentary.

---

## 2.5 The real CLI path exposed a semantic mutation hidden by the direct harness

The archive’s most valuable whole-system specimen appears in the prompt/report and raw trace:

```text
core direct-executor test
→ expected REJECTED behavior
```

but:

```text
real CLI execution path
→ executor performs earlier contract check
→ output is preserved
→ validation error is returned
→ scheduler originally classified UNASSESSED
```

The composed path exposed a state the direct executor test did not exercise. The scheduler was then corrected so that:

```text
preserved output + executor validation error
→ REJECTED
```

This is the deepest engineering result in the set because it reveals the actual object of control:

> **Not one validator and not one receipt, but the lawful transformation of semantic status across every layer that consumes the result.**

The fact changes type across boundaries:

```text
executor fact:
output exists, contract validation failed

scheduler fact before repair:
execution not successfully assessed

receipt status before repair:
UNASSESSED
```

The first semantic mutation occurs at the executor→scheduler boundary. The terminal enum is only the final symptom.

---

## 2.6 Occurrence identity, lineage witness, and the false temptation to merge content with receipt

The trace around `269430–269850` develops a second boundary family.

`CandidateOccurrence` carried a `ReceiptSHA256`, and its occurrence identity was constructed from candidate content plus receipt hash, but state validation initially did not recompute that relation. A negative test mutated only the receipt hash and found the state had accepted the inconsistency.

The repair required:

```text
ReceiptSHA256 must be valid SHA-256
CandidateOccurrenceID = H(CandidateContentID + ":" + ReceiptSHA256)
```

The next self-generated adversary found another possible split:

```text
candidate lineage receipt
≠ every occurrence receipt
```

The repair required the candidate lineage receipt to be witnessed by at least one matching occurrence while still permitting multiple occurrences of the same content.

The trace explicitly rejects a tempting but wrong compression:

```text
candidate content identity
≠ occurrence identity
```

Receipt identity belongs in occurrence/provenance lineage, not necessarily in semantic content identity.

This supports a dependent architectural family:

- stable content identity;
- distinct occurrence identity;
- occurrence bound to receipt;
- lineage receipt witnessed by an occurrence;
- multiplicity preserved;
- historical occurrence does not automatically establish present eligibility.

---

## 2.7 Persistence and current competence: a receipt can survive while its consequence disappears

Later WorkSwarm work reveals several composed persistence defects:

1. Manifest export persisted verification receipts but not corresponding verified pieces.
2. Reload produced:

```text
receipt survives
∧ piece disappears
→ HAVE becomes MISSING
```

3. The repair persisted and validated `VerifiedPiece` objects.
4. A converse adversary then tested mismatched receipt bodies and receipt/piece result identities even when the outer manifest was otherwise valid.
5. Another sibling found that `is_verified()` meant “historical piece exists,” while readiness needed “dependency is currently HAVE.”

The correct distinction became:

```text
historical verification evidence
≠ present execution competence
```

This is strongly aligned with the project’s replay/currentness thesis and provides concrete code-level embodiments that are more defensible than abstract “constitutional memory.”

---

## 2.8 Atomic publication and terminal-state non-reentry

The raw trace later finds:

- `publish_verified()` recorded a receipt before publication was known to succeed;
- a failed publication could leave an orphan receipt;
- ordering was changed so failed publication leaves no orphan receipt.

It also finds terminal-state bypasses:

- superseded work could re-enter through external `CURRENT` eligibility;
- rejected work needed a sibling control;
- persisted production admission remains a historical record, while current work state controls present eligibility.

The resulting theorem is:

```text
historical admission receipt
≠ present actionable work
```

and:

```text
failed publish
→ no durable receipt that falsely implies a completed publication
```

These are good dependent claims or embodiments, but generic transaction atomicity, event history, and provenance are crowded fields. Their value is highest when tied to the core contract/admission mechanism.

---

## 3. What the archive corrects about itself

The archive is valuable partly because the fuller trace falsifies or narrows several claims made by its derivative reports.

## 3.1 “Build still running; no inference” became stale

A “Current State (Audit vs Campaign)” report says the left-side runner build was still ongoing and no inference had occurred. The later raw trace shows:

- the campaign reached actual model execution;
- 39/40 passed before the producer repair;
- 28/40 passed on the full retry after `--nowordwrap`;
- residual model/output failures remained.

The report is a historical state observation, not current truth.

## 3.2 Some “executions” in P2 Findings are imagined

`P2 Findings` explicitly transitions into language such as “Now we imagine executing P4.” Such material is useful as an experimental design, but it cannot establish:

- code behavior;
- passing tests;
- an implemented consumer;
- or an enabled patent embodiment.

It must remain `REPORT_DERIVED_CANDIDATE` until matched to raw trace or source.

## 3.3 ObservationSelectionWitness was claimed more strongly than the repository supported

The later raw trace around `280827–281272` records a repository comparison finding:

- no direct `ObservationSelectionWitness` symbol;
- no direct `CANDIDATE_RELEVANCE_UNRESOLVED` symbol;
- related selector/conservation/authority modules existed, but the exact implementation claimed by PDFs was absent.

Therefore the proof-carrying abstention/quiescence family remains **HOLD**, not implemented.

## 3.4 Replay-time consequence re-admission remains partly code-adjacent

The capsule reference implementation supports currentness, revocation, repository state, environment, replay rejection, and typed failure localization for authorization derivation. But the supplied Lieutenant analysis correctly narrows the broader claim:

- durable stored-result replay-time re-admission: not established;
- typed consequence-tag selection: not established;
- dispatch by selected consequence regime: not established;
- failure receipt controlling recovery: not established;
- actual host-tool inhibition: not established.

The trace supports a **state-bound authorization reevaluation reference**, not yet the full replay-time consequence-specific admission family.

## 3.5 “No prior art found” statements are not reliable novelty conclusions

Several PDFs assert that no known art contains the claimed combination or call candidates “novel.” Those are search outputs, not legal novelty opinions. The outside literature examined here contains several close technical neighbors. The portfolio must be rewritten around the exact residual computation after those collisions, not around the absence of a search hit.

---

## 4. The root cause that best compresses the evidence

The strongest root-cause candidate is:

> **A consequence-bearing relation is established at one layer, but the next layer receives a coarser representation that cannot preserve, contest, or enforce the same relation.**

This can be represented as:


a typed fact at layer A

```text
F_A = (object, contract, validator, evidence, status, consequence)
```

crosses a boundary through transform `T`:

```text
T(F_A) = F_B
```

A lawful transform requires preservation or explicit disposition of every consequence-relevant field:

```text
contract identity
validator identity/version
result identity
execution state
semantic admission state
first failed predicate
requested consequence
currentness / replay scope
```

The recurring failures are instances of projection loss:

| Source fact | Coarser successor fact | Consequence risk |
|---|---|---|
| Output exists + contract failed | UNASSESSED | Rejected output may appear merely unevaluated. |
| Valid transport | Red audit | Transport defect is falsely inferred from stale expectation. |
| Historical receipt exists | Dependency verified | Stale evidence donates present readiness. |
| Candidate content is same | Occurrence is same | Distinct receipt/provenance occurrences collapse. |
| Surface item visible/UNSEEN | Work required | Attention state donates obligation. |
| Prior admission exists | Present consequence eligible | Old authority/status donates new execution permission. |
| Hash matches | Provenance/authority | Byte relation donates semantic or governance status. |

This root cause predicts sibling defects. The raw trace confirms several of them, especially across scheduler, persistence, readiness, and publication boundaries.

### Current scope

`RAW_TRACE_SUPPORTED`:

- contract identity was lost from core receipt before repair;
- semantic admission needed a separate typed state;
- scheduler weakened a validation failure to `UNASSESSED` before repair;
- consumer originally required completion but not admission;
- occurrence/receipt relation was not recomputed;
- receipts and pieces could diverge on persistence;
- historical verification could donate readiness;
- terminal states could re-enter through a separate admission path;
- publication could leave an orphan receipt.

`UNKNOWN`:

- whether one general runtime operator already unifies all these paths in current source;
- whether the supplied terminal edits remain the current repository state;
- whether the same mechanism survives a clean independent checkout and test run;
- whether all legal claim elements were conceived before close outside publications.

---

## 5. External technical and patent pressure

## 5.1 Structured output and schema enforcement are established

OpenAI’s Structured Outputs documentation distinguishes ordinary JSON mode from strict schema adherence. With strict structured output, the generated arguments are constrained to the supplied JSON Schema, subject to documented conditions such as refusal or premature termination. The documentation also states that schema adherence does not prevent mistakes inside the values.

Therefore none of the following is a strong novelty center by itself:

- “LLM emits JSON matching a schema”;
- “reject invalid JSON”;
- “use a supplied JSON Schema”;
- “retry malformed structured output.”

The archive’s strongest residual distinction is downstream and lifecycle-oriented:

> the exact originating contract and validator must remain bound to the result’s admission state through scheduler, receipt, candidate creation, replay, and consequence dispatch.

## 5.2 Schema identity itself is established

JSON Schema recommends declaring a dialect and a unique `$id` for a schema. Thus, assigning identity to a schema is not itself the invention.

The candidate must instead claim a concrete use of contract identity in the execution lifecycle—for example, making it part of job identity, using that exact identity to select or verify the validator, and refusing downstream consequence when the receipt cannot prove that continuity.

## 5.3 HALO is a close technical collision

The 2026 HALO paper describes heterogeneous component admission, localized obligations, prerequisite preservation, exact action rechecking immediately before dispatch, and replacement of blocked actions only by fresh candidates. It reports protocol tests and a PX4/Gazebo evaluation.

HALO substantially crowds broad claims such as:

- “admit supported output components”;
- “withhold unsupported components”;
- “preserve prerequisites”;
- “freshly recheck actions before dispatch”;
- “retain unaffected portions of an agent response.”

Its legal prior-art effect depends on priority dates and counsel’s analysis. Technically, however, it means Brudo should not claim generic localized admission as its residual center.

The stronger Brudo-specific candidate is narrower:

- exact output-contract identity carried through a generative task;
- separate execution and semantic-admission states;
- composed-path preservation of a validator’s status;
- candidate-state admission conditioned on that status;
- non-amplification on replay or changed consequence;
- occurrence/receipt continuity.

## 5.4 Minimal sufficient information is established mathematics

Minimal information transition systems and related work seek the weakest information state sufficient for a policy or task, with existence and uniqueness results under conditions.

Therefore the broad theorem:

```text
retain the minimum information sufficient for policy/dispatch
```

is not a safe novelty claim.

Brudo’s possible residual contribution would need to be a specific computational composition, such as:

```text
independently admitted partial realities
→ consequence- and policy-relative quotient
→ dispatch gate
→ denominator-bound observation acquisition/abstention
→ typed unknown that blocks universal abstention
```

The supplied archive does not yet establish the complete observation-witness implementation. Keep this family on HOLD.

## 5.5 Three-valued runtime status is established

Runtime-verification literature has long used true/false/inconclusive semantics for finite traces. Therefore:

```text
UNKNOWN ≠ FALSE
```

is an important invariant but not a standalone invention.

The possibly claimable engineering lies in how `UNKNOWN` is carried into a specific admission or consequence gate and prevents a concrete prohibited transition.

## 5.6 Provenance and attestations are established

W3C PROV already provides entities, activities, agents, derivation, attribution, revision, invalidation, delegation, and qualified relations. SLSA provenance already separates build definition and run details and binds builder identity, invocation metadata, dependencies, and byproducts.

Therefore broad claims to:

- a justification graph;
- a provenance graph;
- a hash-linked receipt;
- a lineage record;
- an activity/entity/agent chain;
- a build/run receipt

are highly crowded.

Brudo’s narrower value is operational semantics: a particular receipt relation changes admission, readiness, invalidation, or consumer eligibility.

## 5.7 Event sourcing and replay are established

Event sourcing reconstructs state by replaying events; materialized views are read-only projections; schema changes, upcasters, compensating events, and replay compatibility are known concerns.

Therefore “replay state from history,” “keep an audit log,” and “separate projection from authoritative state” are not novel by themselves.

The possible residual is **fresh consequence-specific admission under a changed present context**, especially where a prior receipt is explicitly barred from donating a stronger or different consequence.

## 5.8 Self-refinement and self-prompting are established

Self-Refine and Reflexion already use iterative self-feedback, refinement, reflection, memory, and environment feedback.

The broad proposition:

```text
model observes state
→ writes next prompt
→ iterates
```

is not a strong patent family.

A narrower research/control mechanism might remain if it is implemented as a typed runtime with:

- material-state-change triggers;
- prompt expiry;
- waiting versus action classification;
- bounded stopping certificates;
- preservation of UNKNOWN;
- no authority donation from queued continuation messages.

The supplied archive does not establish that as a complete code path. Keep it as a research program or dependent embodiment.

## 5.9 Generative-output validation patents are already broad

US20250148308A1 describes a generative-AI output validation engine with lexical, semantic, and clarity analysis and output-validation scoring.

That publication makes “validate generative output” far too broad. A viable claim must be anchored to a materially different architecture, not merely a different validation metric.

---

## 6. Recommended patent topology

## 6.1 Family A — Contract-Anchored Generative Result Admission with Cross-Layer Status Preservation

### Current status

```text
RAW_TRACE_SUPPORTED
IMPLEMENTATION_NOT_INDEPENDENTLY_REEXECUTED
PREPARE_FOR_COUNSEL
NOVELTY_NOT_ESTABLISHED
```

### Technical problem

A generative task can carry a declared result contract, yet the output can be treated as complete or enter downstream state without proof that:

- the exact originating contract was applied;
- the identified validator evaluated it;
- the validator’s result survived executor→scheduler→receipt→consumer transformation;
- a preserved output plus validation error remains rejected;
- current consequence use is conditioned on admission rather than mere completion.

### Proposed independent-claim nucleus

A computer-implemented method comprising:

1. receiving a generative work item that includes a result-contract identifier, with the contract identifier contributing to a work identity;
2. invoking a generative model and separately recording an execution state and a semantic-admission state;
3. evaluating generated output using a validator identified for the exact result contract;
4. generating a receipt binding at least:
   - work identity;
   - result-contract identity;
   - result digest;
   - validator identity or version;
   - execution state;
   - admission state;
   - failed predicate information when admission does not succeed;
5. propagating the admission state through a scheduler without replacing a rejection with an unevaluated or completed state;
6. permitting creation or dispatch of a downstream candidate only when the receipt records the required admitted state for the requested consequence.

### Why this is the strongest family

The trace shows concrete failures and repairs at multiple actual boundaries. The mechanism is not merely a desired result. It has identifiable:

- state objects;
- transition rules;
- consumers;
- negative controls;
- observable technical effects.

### Technical effects to measure

- rate of contract-invalid outputs entering candidate state;
- rate of `REJECTED → UNASSESSED` or similar status mutation across layers;
- percentage of receipts with exact contract and validator continuity;
- downstream dispatches blocked by admission state;
- replay divergence under contract/validator changes;
- failure-localization precision.

### Principal prior-art risks

- Structured Outputs and schema validation;
- schema identifiers;
- output-validation engines;
- workflow/result-state machines;
- policy gates;
- HALO’s admission protocol.

### Distinguishing pressure

Do not rely on “schema identity is in the job ID” alone. The claim should require the **same contract-relative semantic state to control the composed downstream consequence**.

---

## 6.2 Family B — Replay-Time Current-Condition Re-Admission and Consequence Non-Amplification

### Current status

```text
PARTIAL_REFERENCE_SUPPORT
FULL_MECHANISM_NOT_ESTABLISHED
HOLD_TO_CONTINUATION
```

### Technical problem

A stored artifact or prior admission can be replayed under a changed:

- requested consequence;
- contract;
- validator;
- policy;
- environment;
- repository state;
- authority grant;
- validity interval.

Byte identity and prior admission do not prove present eligibility.

### Proposed nucleus

On replay or reuse:

1. receive artifact identity and prior-admission identity;
2. receive a presently requested consequence and current context identities;
3. refuse to inherit the prior admission as present authority;
4. recompute current predicates under the selected consequence regime;
5. emit `ADMITTED`, `DENIED`, or `WITHHELD` with first and all failed predicates;
6. allow only a bounded recovery path indicated by the new decision.

### Killer negative control

```text
same artifact bytes
prior consequence = ARCHIVE
current requested consequence = EXECUTE
current execution grant absent
→ DENIED or WITHHELD
```

A successful test would prove that prior admission cannot donate a stronger consequence.

### Risk

Fresh revalidation and pre-dispatch checking are close to HALO, policy engines, event replay, and security authorization. The claim must center on the exact contract/consequence continuity and non-amplification semantics.

---

## 6.3 Family C — Receipt-Witnessed Occurrence Continuity and Atomic Publication

### Current status

```text
RAW_TRACE_SUPPORTED
DEPENDENT_OR_CONTINUATION
```

### Technical nucleus

- semantic content identity remains independent of occurrence identity;
- occurrence identity is derived from content identity and receipt identity;
- candidate lineage receipt is witnessed by at least one occurrence;
- multiple occurrences remain representable;
- publication receipt is committed only with successful publication;
- historical verification does not donate present readiness;
- terminal work state blocks re-leasing and re-admission through every ingress.

### Why dependent rather than primary

Most ingredients resemble provenance, attestation, transaction atomicity, event history, and identity-binding techniques. The best use is to strengthen Family A/B by specifying how admission evidence remains coherent and non-amplifying over persistence and replay.

---

## 6.4 Family D — Consequence Quotient and Minimal Lawful-Information Runtime

### Current status

```text
PARTIAL_GATE_TRACE_SUPPORT
EXACT_WITNESS_IMPLEMENTATION_ABSENT
HOLD
```

The trace supports a consequence quotient/gate in some form, but later repository inspection explicitly reports that the exact `ObservationSelectionWitness` and `CANDIDATE_RELEVANCE_UNRESOLVED` symbols claimed by PDFs were absent.

The broad mathematical goal is crowded. This family should not move until the code demonstrates:

- explicit `(C,B,P)`-relative equivalence;
- over-collapse negative control;
- over-preservation negative control;
- joint-observation/XOR cases;
- UNKNOWN blocking `DO_NOT_OBSERVE`;
- denominator-bound witness tied to candidate definitions and gate version;
- actual control of observation acquisition or dispatch.

---

## 6.5 Family E — Denominator-Bound Quiescence / Proof-Carrying Abstention

### Current status

```text
REPORT_DERIVED_CANDIDATE
HOLD
```

The reports contain a valuable discipline:

```text
active_work = 0
next_automatic_action = NONE
≠ PROJECT_COMPLETE
```

But the code implementation claimed by reports is not established in the supplied raw repository trace. The family should remain research until a real stop controller:

- enumerates the exact obligation/candidate denominator;
- preserves in-flight external processes;
- distinguishes WAITING from BLOCKED from QUIESCENT;
- binds a stop certificate to state and policy version;
- blocks queued “continue” from manufacturing work;
- is consumed by the actual execution controller.

---

## 6.6 Family F — State-Derived Self-Prompt Control

### Current status

```text
RESEARCH_PROGRAM
BROAD_STANDALONE_REJECT
```

The prompts are valuable experimental method. They are not, by themselves, a strong patent family. A technical embodiment would need an actual state-to-prompt controller and measurable effects beyond ordinary self-refinement.

---

## 7. Evidence and claim matrix

| Candidate mechanism | Raw trace evidence | Current implementation status | Closest pressure | Portfolio treatment |
|---|---|---|---|---|
| Result contract preserved into receipt | Direct edit/test shown | Trace-supported; not independently rerun | Structured Outputs, schemas, workflow receipts | Family A core |
| Execution state separate from admission state | Direct enum and negative test shown | Trace-supported | Multi-state workflows, runtime verification | Family A core |
| Rejected output blocked at candidate consumer | `CandidateDeltaFromReport` gate shown | Trace-supported | Policy/admission gates, HALO | Family A core |
| Preserved output + validation error stays rejected across live CLI path | Composed-path defect and repair shown | Trace-supported | Error propagation/state machines | Family A strongest embodiment |
| Validator identity bound to contract and receipt | Identified as missing; later support unclear | `UNKNOWN` / incomplete | Schema registries, validator versioning | Must implement |
| Replay-time current consequence re-admission | Capsule reference partially related; full stored-result path absent | Partial/conceptual | HALO, auth recheck, event replay | Family B HOLD-to-continuation |
| Receipt-controlled recovery | Proposed; not established as consumer behavior | Not established | Workflow recovery/error handling | Dependent only after implementation |
| Occurrence ID binds content + receipt | Direct repair/test shown | Trace-supported | Provenance/attestation | Family C dependent |
| Candidate lineage receipt witnessed by occurrence | Direct repair/test shown | Trace-supported | Provenance consistency | Family C dependent |
| Atomic publish no orphan receipt | Direct repair/test shown | Trace-supported | Transactions/atomic commit | Family C dependent |
| Historical piece existence does not imply current HAVE | Direct readiness repair/test shown | Trace-supported | Event sourcing/current state | Family C/B embodiment |
| Consequence quotient controls dispatch | Focused tests referenced | Partial trace support | Minimal ITS, bisimulation, HALO | Family D HOLD |
| ObservationSelectionWitness and unresolved selector | Later repository search says exact symbols absent | Not implemented as claimed | Value of information, certificates | HOLD |
| Quiescence certificate | Reports only | Not established | Termination detection, workflow stop proofs | HOLD |
| Self-prompt lineage controller | Prompt/report methodology | Not established as runtime | Self-Refine, Reflexion | Research only |

---

## 8. Decisive engineering plan

The following sequence is designed to maximize information and eliminate patent work when mechanisms fail.

## Experiment 1 — Same bytes, different contracts

### Setup

- One generated byte string `R`.
- Two declared contract identities `K1` and `K2`.
- `R` conforms to one and not the other.
- Same model/runtime/source inputs otherwise.

### Required result

```text
Admit(R, K1) != Admit(R, K2)
```

The receipts must bind the exact contract and validator used.

### What it proves

Contract identity is consequence-bearing, not decorative metadata.

### What kills the claim

If downstream admission remains identical because it merely checks JSON validity or ignores contract identity.

---

## Experiment 2 — Same contract, changed validator identity

### Setup

- Same task, contract, result bytes.
- Validator version `V1` admits; `V2` rejects because the rule changed or a previous bug was repaired.

### Required result

- Old receipt remains historical.
- Present reuse requires `V2` or the presently selected validator.
- Result becomes reopened/withheld for present consequence.
- No layer silently reuses the old admission.

### What it proves

Validator identity and present policy are real admission inputs.

---

## Experiment 3 — Composed live-path status preservation

### Setup

Run the actual CLI/runner path, not only the direct executor harness:

```text
output bytes are preserved
executor returns validation error
```

### Required result at every layer

| Layer | Required state |
|---|---|
| Executor | output present + validation failed |
| Scheduler | `REJECTED`, not `UNASSESSED` |
| Receipt | exact contract/validator/result + `REJECTED` |
| Candidate consumer | refuses candidate creation |
| Replay | cannot strengthen status |
| User-facing report | accurately states output exists but is rejected |

### What it proves

The invention lives in composed status preservation, not only validator logic.

---

## Experiment 4 — Prior ARCHIVE admission cannot donate EXECUTE

### Setup

- Artifact admitted for `ARCHIVE` yesterday.
- Same bytes requested for `EXECUTE` today.
- Current execution authorization absent or current contract changed.

### Required result

```text
prior admission + identical bytes
→ no current EXECUTE capability
```

### What it proves

Replay is consequence-relative and non-amplifying.

---

## Experiment 5 — Canonical producer/auditor contract source

### Setup

Recreate the `think:false` failure using two independently reconstructed requests. Then refactor producer and auditor to consume one canonical contract representation or a provably derived one.

### Required result

- the stale-auditor mismatch is detected before semantic verdicts, or becomes unrepresentable;
- field drift causes a typed contract mismatch rather than a false population failure;
- the common source identity appears in both producer and audit receipts.

### What it proves

The mechanism is contract-source continuity, not a one-off Boolean patch.

---

## Experiment 6 — Failure-population taxonomy

For the 40-item campaign, separately classify:

```text
IMPORT_ENVIRONMENT
EXECUTABLE_RESOLUTION
PRODUCER_STREAM_CONTAMINATION
REASONING_WRAPPER_LEAKAGE
TRAILING_OR_EXTRA_JSON
SCHEMA_NONCONFORMANCE
SEMANTIC_CONTRACT_FAILURE
UNKNOWN
```

Each item must have one earliest failed boundary and preserve later observations without allowing them to overwrite the earlier cause.

### What it proves

Typed failures localize repair and prevent red-population collapse.

---

## Experiment 7 — Blinded 19→40 prediction

Derive one semantic failure class from the 19-job audit, freeze its predicate and prediction, and then inspect the 40-item population without changing the classifier.

### Required result

- prediction succeeds: evidence of cross-population reach;
- prediction fails: preserve separate mechanisms and remove merge work.

Do not call it replication unless source construction, model/runtime, and assay conditions justify that status.

---

## Experiment 8 — Quotient minimality and abstention

Only after the exact witness implementation exists:

1. same worlds, different labels, same dispatch → `NONINTERFERING`;
2. same worlds, consequences differ → `DISCRIMINATING`;
3. each observation individually noninterfering, pair jointly discriminating → pair retained;
4. one UNKNOWN outcome → blocks `DO_NOT_OBSERVE`;
5. witness binds state, contract, policy, gate version, candidate definitions, and outcome table.

### What it proves

A concrete denominator-bound information-selection mechanism rather than generic minimality rhetoric.

---

## Experiment 9 — Independent repository reexecution

Supply a content-addressed current source snapshot and run:

- the focused Grax tests;
- the live CLI negative control;
- occurrence/persistence tests;
- WorkSwarm terminal-state tests;
- linters and diff verification;
- a clean model-run specimen.

Until this exists, the correct status remains:

```text
RAW_TRACE_SUPPORTED
IMPLEMENTATION_NOT_INDEPENDENTLY_REEXECUTED
```

---

## 9. Written-description architecture for counsel

For Family A, the disclosure should contain at least the following concrete structures.

### 9.1 Records

```text
GenerativeTaskIdentity
- task_id
- input_identity
- source_identity
- model_identity
- model_config_identity
- result_contract_identity
- requested_consequence

ValidationContext
- validator_identity
- validator_version
- contract_identity
- policy_identity
- evaluation_time
- execution_environment_identity

GenerativeResultReceipt
- task_id
- result_digest
- result_contract_identity
- validator_identity
- execution_state
- admission_state
- primary_failed_predicate
- all_predicate_results
- requested_consequence
- issued_at
- receipt_digest

CandidateOccurrence
- candidate_content_identity
- receipt_digest
- occurrence_identity
- source_run_identity
- observed_at
```

### 9.2 State machine

```text
NOT_STARTED
→ EXECUTING
→ OUTPUT_PRESENT
→ VALIDATION_PENDING
→ ADMITTED | REJECTED | WITHHELD
→ CONSUMED | INVALIDATED | SUPERSEDED | REOPENED
```

Prohibited implicit transitions:

```text
OUTPUT_PRESENT → ADMITTED
EXECUTION_SUCCEEDED → ADMITTED
REJECTED → UNASSESSED
PRIOR_ADMITTED → PRESENT_ADMITTED
RECEIPT_EXISTS → CURRENT_COMPETENCE
```

### 9.3 Core pseudocode

```python
def process_result(task, execution, context):
    receipt = Receipt(
        task_id=task.id,
        result_contract_id=task.result_contract_id,
        result_digest=hash(execution.output),
        execution_state=execution.state,
        admission_state="UNASSESSED",
    )

    if execution.validation_error is not None:
        receipt.admission_state = "REJECTED"
        receipt.primary_failed_predicate = "EXECUTOR_CONTRACT_VALIDATION"
        return receipt

    validator = resolve_validator(
        contract_id=task.result_contract_id,
        validator_id=context.validator_id,
    )
    decision = validator.evaluate(execution.output, context)
    receipt.validator_id = validator.id
    receipt.admission_state = decision.state
    receipt.all_predicate_results = decision.results
    return receipt


def candidate_from_receipt(receipt):
    if receipt.execution_state != "COMPLETED":
        raise NotEligible
    if receipt.admission_state != "ADMITTED":
        raise NotEligible
    return Candidate(...)
```

### 9.4 Required embodiments

- undefined contract;
- mismatched contract identity;
- mismatched validator version;
- valid JSON but missing required fields;
- output present with validator error;
- same output under two contracts;
- replay under changed consequence;
- multiple occurrences of same content;
- persistence and reload;
- publication failure without orphan receipt;
- superseded/rejected work attempting alternate ingress.

### 9.5 Discriminating observations

Every claim element should map to:

- code location;
- negative test;
- receipt field;
- consumer branch;
- measurable failure prevented;
- closest prior-art feature;
- exact residual distinction.

This matters because USPTO written-description guidance focuses on whether the application shows possession of the claimed invention as a whole. Function-only language without supporting structure or acts can be insufficient, especially where it merely states the desired result.

---

## 10. Claims that should be killed or narrowed now

### Kill as broad standalone

- “A system that validates LLM JSON output.”
- “A system that binds a schema ID to a request.”
- “A system that emits provenance receipts.”
- “A system that replays state and checks it.”
- “A system with admitted/rejected/unknown states.”
- “A system that keeps only information needed for a policy.”
- “A system that self-prompts from observations.”
- “A graph whose edges carry semantics.”

### Narrow aggressively

- “State Admission Engine” → exact contract-/validator-/consequence-bound result admission across named layers.
- “Replay-Time Re-Admission” → present consequence cannot inherit prior admission; specify current predicates and dispatch inhibition.
- “Minimal Lawful Information” → specific quotient, gate, candidate denominator, joint-observation test, and typed witness.
- “Proof-Carrying Abstention” → actual execution controller consumes a denominator-bound certificate; UNKNOWN blocks abstention.
- “Provenance” → receipt/occurrence relation changes readiness, invalidation, or publication atomically.

---

## 11. Current frontier

The archive’s most important newly askable question is:

> **Can the system prove, end to end, that the exact contract-relative semantic decision made about one generated result is the same decision that controls every later consequence—including candidate creation, persistence, replay, and publication—without any layer weakening, amplifying, or reconstructing it independently?**

That question could not be asked responsibly when the portfolio was still organized around abstract admission engines, receipts, or state reconstruction. It becomes available only after the raw system exposed:

- stale audit expectation versus valid jobs;
- producer stream contamination versus model failures;
- contract identity present upstream but absent in core admission;
- execution completion versus semantic admission;
- `REJECTED → UNASSESSED` mutation in the live composed path;
- consumer admission gating;
- occurrence/receipt continuity;
- historical verification versus current readiness;
- atomic publication and terminal-state alternate ingress.

### Current status

```text
PRIMARY TECHNICAL NUCLEUS:
contract-relative semantic status preservation and enforcement across composed runtime boundaries

IMPLEMENTATION STATUS:
RAW_TRACE_SUPPORTED
NOT INDEPENDENTLY REEXECUTED

PATENT STATUS:
CANDIDATE FOR COUNSEL-LEVEL CLAIM CHART
NOVELTY NOT ESTABLISHED

NEXT DISCRIMINATING OPERATION:
clean source snapshot + same-bytes/different-contract composed-path assay
```

### Why stop this research cycle here

Another horizontal brainstorm would add nouns. The present uncertainty is no longer conceptual. It is empirical and sharply bounded:

- Does exact contract/validator continuity exist in current source?
- Does it survive the real composed path?
- Does it change downstream consequence?
- Does replay refuse non-equivalent present use?
- What remains after HALO, Structured Outputs, provenance, event sourcing, minimal ITS, runtime verification, and output-validation art are claim-charted?

Reality—not another architecture label—must answer those questions.

---

## Appendix A — Selected raw-trace anchors

| Topic | `CODEBASE_INTRFACE_34.txt` approximate lines |
|---|---:|
| Audit request mismatch and `think:false` repair | 731–786 |
| Semantic rejection population | 786–810 |
| Brullama import/path failures and corrected run | 242620–243050 |
| `--nowordwrap` root cause and repair | 243050–244063 |
| Full retry 28/40, residual heterogeneous failures | 243996–244063 |
| Core receipt contract/admission instrumentation | 259300–259480 |
| Composed preserved-output + validation-error specimen | 262483 onward |
| Candidate consumer requires `ADMITTED` | 265049–265194 |
| Occurrence ID and receipt witness repairs | 269470–269839 |
| Exact observation-witness symbols absent | 280827–281272 |
| Atomic publication / no orphan receipt | 311681–311748 |
| Superseded/rejected alternate-ingress controls | 312514–312650 |

These anchors identify terminal observations. They do not substitute for a source-code snapshot or independent rerun.

---

## Appendix B — External comparison set

1. OpenAI, *Introducing Structured Outputs in the API* and official Function Calling guidance.
2. JSON Schema, official guidance on `$schema` and `$id`.
3. Park et al., *HALO: Heterogeneous Admission through Localized Obligations for Safe Agentic Execution* (2026).
4. Sakcak, Weinstein, and LaValle, *The Limits of Learning and Planning: Minimal Sufficient Information Transition Systems*.
5. Bauer, Leucker, and Schallhart, three-valued runtime verification for finite traces.
6. W3C, *PROV-O: The PROV Ontology*.
7. SLSA Provenance v1.1.
8. Microsoft Azure Architecture Center, *Event Sourcing Pattern*.
9. Madaan et al., *Self-Refine: Iterative Refinement with Self-Feedback*.
10. Shinn et al., *Reflexion: Language Agents with Verbal Reinforcement Learning*.
11. US20250148308A1, *Generative artificial intelligence output validation engine in an artificial intelligence system*.
12. USPTO MPEP §§ 2106 and 2163.

