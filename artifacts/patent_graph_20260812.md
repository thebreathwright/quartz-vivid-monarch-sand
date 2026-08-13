# PATENT GRAPH — 2026-08-12

status: Z4_COMBINATION_DAMAGED
objective: PATENT_WORK
legal: research/drafting only; not novelty, FTO, inventorship, or filing authority
bind: attachments + handmade-set traces; no runnable Brudo checkout

## Source lineage

| object | sha256 | status |
|---|---|---|
| hand_made_set_Bruce.zip | `60a208d6ffa7c56385c2f12b04ab6e4f82a2372285c2c0c6cd8dedcb6b681caa` | BYTE_VERIFIED_ARCHIVE |
| Brudo_Hand_Made_Set_Deep_Research_Report.md | `6e51f6c0c6aa820966fa2d735a3dfed40b83385c231c3dd885ace908b13d92e1` | CONSUMED |
| Brudo_Patent_Evidence_Matrix.csv | `a8bf4e5cf9ca0354da318d89de75c7ed3a5b4c915d8a7ef5f6f282d58ba950eb` | CONSUMED |
| Patent Nucleus.pdf / Identity Drift / Exec Summary 11 | see prior | CONSUMED |
| CODEBASE_INTRFACE_34.txt | extracted; 315169 lines | RAW_TRACE_SUPPORTED |
| CODEBASE_INTRFACE_38.txt | ABSENT | not consumed |
| docs/patent_z4_claim_chart_20260812.md | echoed `66ca7911…703ae2d` | TRACE_ECHO only |
| z4 composed assay | `eb71c09903a3190a1019fb67fd0cf4329cf93cb93838380c11038ddc5c52c58f` | RUN 8/8 |

## Families

- **A** Contract-anchored generative admission + cross-layer status: PRIMARY / PREPARE_FOR_COUNSEL. Unrun: same-bytes two-contracts on live CLI.
- **B** Replay-time re-admission / non-amplification: HOLD_TO_IMPLEMENTATION. Z4 reopen is **not** a split; it collapsed into the 070 predicate.
- **C** Occurrence continuity; historical ≠ current: DEPENDENT. Invalid-row retention lives here.
- **D** Consequence quotient: HOLD.
- **E/F** Quiescence / self-prompt: HOLD / research.
- **Z4** label: NOT DISTINCT_CORE. SAME_MATHEMATICAL_SHAPE vs A; DEPENDENT vs B/C.

REPOSITORY WINS over wrapper “implementation-backed full combination.”

## Z4 element statuses (minimization)

Observed object in trace (not the live checkout):

```
UNIQUE (capability_id, capability_sha256) WHERE disposition = 'CONSUMED'
append-only otherwise
StateLedger.latest() = last appended *state* (receipts are a separate stream)
```

### 2026-08-12 composed discriminator (this bind)

Assay: `artifacts/z4_discriminator/test_z4_composed_readback.py`  
sha256: `eb71c09903a3190a1019fb67fd0cf4329cf93cb93838380c11038ddc5c52c58f`  
result: **8 passed** (sqlite replica of mig-070 index + StateLedger.latest write-policy from the fixture)

Status of assay: `ASSAY_FROM_TRACE_SEMANTICS`. Not independent rerun of Brudo. Not patentability.

| ei removed | Effect vs C | graph |
|---|---|---|
| durable `REJECTED_INVALID` row | control exclusion **unchanged** | demote to optional audit embodiment |
| `WHERE disposition='CONSUMED'` | later `CONSUMED` **fails** (069 burn) | **candidate-required** |
| later-reopen as a separate element | same as the partial unique index | **not independent** |
| five extra identity hashes in uniqueness | mutate contract/pred/scope/epoch: second CONSUMED still blocked **only** because consume slot is full; mutate `capability_id` or `capability_sha256`: **escapes** and consumes | five-field claim **excess / unsupported** as the uniqueness nucleus |
| “invalid receipt causes control exclusion” | if invalid is appended as ledger **state**, `latest()` **becomes** it | exclusion = write-policy, **independent** of nullifier retention |

Coupling claim: **NARROWED**. Observed effects are two separate machines:

1. DB: successful-only unique consume on `(capability_id, capability_sha256)`.
2. Ledger: do not `append()` invalid successors as control state.

They **coexist**. Durable invalid retention does not implement (1) or (2).

| element | OBSERVED | IMPLEMENTED (trace) | TESTED | control-effect | graph |
|---|---|---|---|---|---|
| append-only invalid row | Y | Y | Y | coexist only | optional / Family C dependent |
| successful-only unique consume | Y | Y (070) | Y (trace 3 + assay 8) | DB slot | candidate-required embodiment |
| later valid same capability | Y | Y | Y | ordinary consequence of 070 | not a separate element |
| executable exclusion | write-policy in fixture | separate `StateLedger` | assay shows **not** caused by invalid row | independent | HOLD as distinct mechanism; not Z4-coupled |
| audit retains both | Y | Y | Y | no control effect | dependent |
| five-field bound identity | columns exist | Y | mutation assay | only 2 fields in unique index | **NARROW** to those two or HOLD |
| process-shared atomic CONSUMED | claimed | adapter in trace | 3 passed in live DB, not re-run here | UNKNOWN here | embodiment |

Migration 069 unique-on-all-dispositions **burns** capability. That predicate remains the cheapest required nucleus of the *nullifier* machine.

## Prior-art adversary (no new hunt)

From claim-chart/combination-analysis already in the trace (`:212087–212098`, `:213276–213330`):

| interaction | US5808885A | WO2022208520A1 | US20210359852A1 | CN121030766A | US20260121859A1 | HALO / Structured Outputs |
|---|---|---|---|---|---|---|
| retain invalid attempt | PRESENT (log, no accept) | PRESENT (failed auth store) | AMBIGUOUS | AMBIGUOUS | AMBIGUOUS | ABSENT / different object |
| successful-only consume + later valid | ABSENT | ABSENT | ABSENT as successor rule | ABSENT as lineage admission | NOT ESTABLISHED | ABSENT |
| five-field successor identity | ABSENT | ABSENT | different token fields | event/serial keys | NOT ESTABLISHED | n/a |
| invalid excluded from control ancestry | AMBIGUOUS (not projected) | ABSENT | ABSENT | coupled account/audit | display/supersession nearby | fresh recheck ≠ this |
| process-shared atomic admission | ABSENT | ABSENT | no transition race | transactional stream, not Z4 | NOT ESTABLISHED | n/a |

After minimization, the residue that still needs a closest-disclosure hunt is **only** (1): unique-on-success consume of a capability while failed attempts remain insertable. Logging failures (US5808885A / WO2022208520A1) + one-use tokens remain the nearest stack; they do not automatically teach the partial unique predicate. Still not novelty.

No-hit ≠ novelty. Different words ≠ different mechanism.

## Prohibited promotions (still in force)

- implementation-backed ≠ patentable
- 8 local assay passes ≠ live Brudo composed path
- 3 passed live tests ≠ full Z4 combination
- search absence ≠ novelty
- PDF “patent-worthy” prose ≠ graph
- Verified artifact ≠ current successor

## Current frontier

Z4 wrapper combination **consumed and damaged**. Remaining earned edges:

1. Live-checkout confirmation that `StateLedger` is never fed `REJECTED_INVALID` as a state append (compose the real modules). Blocked: no checkout.
2. Family A Experiment 1: same bytes, two contracts, composed CLI path. Blocked: no checkout.
3. Prior-art closest disclosure **for the 070 predicate alone** (not another generic replay list). Optional; do not reopen Z4 coupling.

`PatentAdmissibleSuccessors` in this bind after this assay: empty of non-destructive unrun edges that this workspace can execute.

## SMARTASS on this update

- Did not treat the sqlite assay as the Brudo implementation.
- Did not treat 070 repair as patentability.
- Did not leave five-field identity as required after mutation assay.
- Did not turn UNKNOWN live-checkout into FALSE.
- Did not invent a reconstruction function: used the fixture’s own `latest() = last state append`.
- Repeated “keep working” did not mint a new family.


## Family G (added 2026-08-13)

Dual-digest extract-only registry. TECHNICAL CANDIDATE. Novelty UNASSESSED. See patent_family_g_dual_digest_20260813.md.


## Family H — NEGATIVE BOUNDARY (2026-08-13)

HME / bronchial evidence:
- SURVIVES: measurement canon; safety gating
- KILLED: beneficial-training language as a claim edge (hot-dry training is beneficial)
- NOT AN EDGE: smoker–COVID incidence paradox (current smokers underrepresented in some symptomatic/hospital series). Contested, confounded. Does not license combustion training or a patent claim.


Decision after epi + corpus check (same day):
- Repository: no COVID record in the 60-claim seed. Smoke = source method + RAC-CLM-049 rewrite. Bronchial text: smoke shortens cilia (injury).
- Epi: current-smoker lower infection is a repeated observation. Former smokers and severity are not the same direction. Confounding remains.
- Verdict: negative boundary UNCHANGED. Observation narrowed to current-smoker incidence only. Training inference CONTRADICTED (injury + former-smoker split). Not an edge.

H-mech COUNTEREXAMPLE: smoker-derived cells — blunted interferon; smoke models — increased entry factors, barrier disruption, mucus hypersecretion, ciliary disorder. Not "trained epithelium." Incidence cannot donate a training edge.
