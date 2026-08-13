# Family G — Dual-digest extract-only registry admission

status: IMPLEMENTATION-BACKED TECHNICAL CANDIDATE
novelty: UNASSESSED
legal: research/drafting only

## Reconciliation

The 12/12 bench label is not archive evidence. It ran the in-app gate on a
bound provenance object. The live nested-archive discriminator is separate.

| Check | What it actually ran | Result |
|---|---|---|
| Bench 12/12 | Family A + Z4 residue + three G *gates* | 12/12 on the gate objects |
| `g-admit-seed` | `admitRegistry(CLAIM_RECORDS, CLAIM_PROVENANCE)` | PASS as a gate, not a zip hash |
| `g-no-collapse` | mutated provenance object | PASS |
| `g-no-wholesale` | allowWholesale / writeDatabase flags | PASS |
| Live nested archive | `artifacts/family_g/test_nested_archive.py` against `UP2SPEED.zip` | PASS |

Live test side effects: `temp_files=false`, `extractall=false`. Member bytes
were read from the zip in memory.

## Live nested-archive observation

- container `UP2SPEED.zip` `7b1e4af5a750682dbd4a8d4e82fffbc69ca8e983c83dbe0523db26320982e591`
- member `03_claim_registry.seed.jsonl` `783eadf6a209e64ee2e9908f54692297a8bcbd08ee5e4a652e98dbe482256495`
- 60 IDs RAC-CLM-001 → RAC-CLM-060
- payload equal to `src/lib/canon/claims.json`
- result file: `artifacts/family_g/nested_archive_result.json`

## Selected edge (unchanged)

Admit a claim-registry extract iff declared member + container digest +
member digest match, extract identity is not collapsed, wholesale ingest and
database write are refused, ID sequence is intact.

## Prior-art pressure

Crowded: zip CRC, git, SLSA, SPDX. Combination unassessed.

## Proof incomplete

- No prior-art search.
- No counsel.
- Implementation-backed ≠ patentable.
- Bench 12/12 still does not hash the zip.
