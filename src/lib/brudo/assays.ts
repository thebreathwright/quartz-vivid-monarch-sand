import {
  CONTRACT_K1,
  CONTRACT_K2,
  SAMPLE_NINE,
  SAMPLE_SIX,
  candidateFromReceipt,
  evaluateAdmission,
  type GenerativeReceipt,
} from "./admission";
import { StateLedger } from "./ledger";
import { SuccessorNullifier } from "./nullifier";
import { sha256Hex } from "./hash";

export type AssayResult = {
  id: string;
  name: string;
  passed: boolean;
  detail: string;
};

const H = "a".repeat(64);

function claimBase() {
  return {
    capabilityId: "cap-1",
    capabilitySha256: H,
    successorContractSha256: H,
    predecessorStateSha256: H,
    consequenceScopeSha256: H,
    authorityEpochSha256: H,
  };
}

export async function runAssays(): Promise<AssayResult[]> {
  const results: AssayResult[] = [];

  {
    const store = new SuccessorNullifier();
    const ledger = new StateLedger();
    ledger.appendState({ id: "baseline", label: "baseline", status: "ADMITTED" });
    const invalid = store.claim({ ...claimBase(), disposition: "REJECTED_INVALID", successorContractSha256: "d".repeat(64) });
    const consumed = store.claim({ ...claimBase(), disposition: "CONSUMED", successorContractSha256: "e".repeat(64) });
    ledger.appendReceipt({ id: "rej", disposition: "REJECTED_INVALID", note: "invalid successor" });
    ledger.appendState({ id: "valid", label: "valid successor", status: "CONSUMED" });
    const audit = store.forCapability("cap-1").map((r) => r.disposition);
    const control = ledger.latest();
    const passed =
      invalid.ok &&
      consumed.ok &&
      audit.join(",") === "REJECTED_INVALID,CONSUMED" &&
      control?.status === "CONSUMED" &&
      control.id === "valid";
    results.push({
      id: "z4-sequence",
      name: "Invalid then consume; audit keeps both; control is last state",
      passed,
      detail: passed
        ? "Audit: REJECTED_INVALID, CONSUMED. Control: valid successor."
        : `audit=${audit.join(",")} control=${control?.id ?? "none"}`,
    });
  }

  {
    const ledger = new StateLedger();
    ledger.appendState({ id: "baseline", label: "baseline", status: "ADMITTED" });
    ledger.appendState({ id: "valid", label: "valid successor", status: "CONSUMED" });
    results.push({
      id: "z4-no-invalid-row",
      name: "C \\ {durable invalid}: control exclusion still holds",
      passed: ledger.latest()?.id === "valid",
      detail: "Exclusion does not require the invalid nullifier row.",
    });
  }

  {
    const store = new SuccessorNullifier();
    store.claim({ ...claimBase(), disposition: "REJECTED_INVALID" });
    const second = store.claim({ ...claimBase(), disposition: "CONSUMED" });
    results.push({
      id: "z4-reopen",
      name: "REJECTED_INVALID does not burn capability",
      passed: second.ok,
      detail: second.ok ? "Later CONSUMED accepted." : "Later CONSUMED refused.",
    });
  }

  {
    const store = new SuccessorNullifier();
    store.claim({ ...claimBase(), disposition: "CONSUMED" });
    const again = store.claim({
      ...claimBase(),
      disposition: "CONSUMED",
      successorContractSha256: "b".repeat(64),
    });
    results.push({
      id: "z4-second-consume",
      name: "Second CONSUMED on same capability pair is refused",
      passed: !again.ok && again.reason === "ALREADY_CONSUMED",
      detail: "Uniqueness is the capability pair, not the extra hashes.",
    });
  }

  {
    const store = new SuccessorNullifier();
    store.claim({ ...claimBase(), disposition: "CONSUMED" });
    const escaped = store.claim({
      ...claimBase(),
      capabilitySha256: "b".repeat(64),
      disposition: "CONSUMED",
    });
    results.push({
      id: "z4-escape-sha",
      name: "Mutating capability hash opens a new consume slot",
      passed: escaped.ok,
      detail: "Five-field identity is not what uniqueness enforces.",
    });
  }

  {
    const ledger = new StateLedger();
    ledger.appendState({ id: "baseline", label: "baseline", status: "ADMITTED" });
    ledger.appendReceipt({ id: "rej", disposition: "REJECTED_INVALID", note: "invalid" });
    ledger.appendState({ id: "invalid", label: "invalid successor", status: "REJECTED_INVALID" });
    results.push({
      id: "z4-leak-state",
      name: "If invalid is appended as state, latest() becomes it",
      passed: ledger.latest()?.status === "REJECTED_INVALID",
      detail: "Control exclusion is write-policy, not receipt retention.",
    });
  }

  {
    const nine = JSON.stringify(SAMPLE_NINE);
    const six = JSON.stringify(SAMPLE_SIX);
    const a = evaluateAdmission({
      rawOutput: nine,
      contract: CONTRACT_K1,
      executionState: "COMPLETED",
    });
    const b = evaluateAdmission({
      rawOutput: nine,
      contract: CONTRACT_K2,
      executionState: "COMPLETED",
    });
    const c = evaluateAdmission({
      rawOutput: six,
      contract: CONTRACT_K1,
      executionState: "COMPLETED",
    });
    const d = evaluateAdmission({
      rawOutput: six,
      contract: CONTRACT_K2,
      executionState: "COMPLETED",
    });
    const passed =
      a.admissionState === "ADMITTED" &&
      b.admissionState === "ADMITTED" &&
      c.admissionState === "REJECTED" &&
      d.admissionState === "ADMITTED";
    results.push({
      id: "a-same-bytes",
      name: "Same bytes, two contracts: Admit(R,K1) ≠ Admit(R,K2) for six-key payload",
      passed,
      detail: `nine/K1=${a.admissionState} nine/K2=${b.admissionState} six/K1=${c.admissionState} six/K2=${d.admissionState}`,
    });
  }

  {
    const digest = await sha256Hex(JSON.stringify(SAMPLE_SIX));
    const receipt: GenerativeReceipt = {
      taskId: "t-rej",
      resultDigest: digest,
      resultContractId: CONTRACT_K1.id,
      validatorId: "validator-k1",
      executionState: "COMPLETED",
      admissionState: "REJECTED",
      primaryFailedPredicate: "MISSING_KEYS:authority,digest,issued_at",
      output: JSON.stringify(SAMPLE_SIX),
      requestedConsequence: "CANDIDATE",
      issuedAt: "2026-08-12T19:00:00Z",
    };
    const gate = candidateFromReceipt(receipt);
    results.push({
      id: "a-consumer-gate",
      name: "COMPLETED + REJECTED cannot become a candidate",
      passed: "refused" in gate && gate.refused === "ADMISSION_NOT_ADMITTED",
      detail: "refused" in gate ? gate.refused : "candidate created (fail)",
    });
  }

  {
    const evaled = evaluateAdmission({
      rawOutput: JSON.stringify(SAMPLE_SIX),
      contract: CONTRACT_K1,
      executionState: "COMPLETED",
      validationError: "schema",
    });
    results.push({
      id: "a-no-unassessed",
      name: "Executor validation error stays REJECTED, not UNASSESSED",
      passed:
        evaled.admissionState === "REJECTED" &&
        evaled.primaryFailedPredicate === "EXECUTOR_CONTRACT_VALIDATION",
      detail: `${evaled.admissionState} / ${evaled.primaryFailedPredicate}`,
    });
  }

  {
    const { CLAIM_PROVENANCE, CLAIM_RECORDS, EXPECTED } = await import("../canon/loader");
    const { admitRegistry } = await import("../canon/admit-registry");
    const ok = admitRegistry({ records: CLAIM_RECORDS, provenance: CLAIM_PROVENANCE });
    results.push({
      id: "g-admit-seed",
      name: "Gate admits bound extract object (not a live zip hash)",
      passed:
        ok.admissionState === "ADMITTED" &&
        ok.identity?.declaredSourceMember === EXPECTED.declaredSourceMember &&
        CLAIM_RECORDS.length === 60,
      detail: `${ok.admissionState} ${ok.identity?.declaredSourceMember ?? ""} ${CLAIM_RECORDS.length}/60`,
    });
  }

  {
    const { CLAIM_PROVENANCE, CLAIM_RECORDS } = await import("../canon/loader");
    const { admitRegistry } = await import("../canon/admit-registry");
    const collapsed = admitRegistry({
      records: CLAIM_RECORDS,
      provenance: { ...CLAIM_PROVENANCE, extractSha256: CLAIM_PROVENANCE.memberSha256 },
    });
    const wrongBox = admitRegistry({
      records: CLAIM_RECORDS,
      provenance: { ...CLAIM_PROVENANCE, archiveSha256: "0".repeat(64) },
    });
    results.push({
      id: "g-no-collapse",
      name: "Same payload cannot donate member or container identity to the extract",
      passed:
        collapsed.primaryFailedPredicate === "MEMBER_EXTRACT_COLLAPSED" &&
        wrongBox.primaryFailedPredicate === "CONTAINER_DIGEST_MISMATCH",
      detail: `collapse=${collapsed.primaryFailedPredicate} box=${wrongBox.primaryFailedPredicate}`,
    });
  }

  {
    const { CLAIM_PROVENANCE, CLAIM_RECORDS } = await import("../canon/loader");
    const { admitRegistry } = await import("../canon/admit-registry");
    const wholesale = admitRegistry({
      records: CLAIM_RECORDS,
      provenance: CLAIM_PROVENANCE,
      allowWholesale: true,
    });
    const db = admitRegistry({
      records: CLAIM_RECORDS,
      provenance: CLAIM_PROVENANCE,
      writeDatabase: true,
    });
    results.push({
      id: "g-no-wholesale",
      name: "Wholesale ingest and database write are refused",
      passed:
        wholesale.primaryFailedPredicate === "WHOLESALE_INGEST_REFUSED" &&
        db.primaryFailedPredicate === "DATABASE_WRITE_REFUSED",
      detail: `${wholesale.primaryFailedPredicate} / ${db.primaryFailedPredicate}`,
    });
  }

  return results;
}
