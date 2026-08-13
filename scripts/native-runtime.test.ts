import assert from "node:assert/strict";
import { test } from "node:test";
import { runFrozen } from "../src/brudo/implication-cases.ts";
import {
  authorityFromUnknown,
  custodySealHex,
  requestConsequence,
  type GenerativeReceipt,
} from "../src/lib/brudo/admission.ts";

test("native runFrozen matches the published freeze vector", () => {
  const frozen = runFrozen();
  assert.equal(frozen.freezeMatch, true);
  assert.equal(frozen.allNamed, true);
  assert.equal(frozen.z4, false);
  assert.equal(frozen.count, frozen.vector.length);
});

test("native UNKNOWN authorizes Resolve only", () => {
  const resolve = authorityFromUnknown({ predicate: "UNKNOWN", action: "RESOLVE" });
  const consequence = authorityFromUnknown({ predicate: "UNKNOWN", action: "CONSEQUENCE" });
  const execute = authorityFromUnknown({ predicate: "UNKNOWN", action: "EXECUTE" });
  const known = authorityFromUnknown({ predicate: "TRUE", action: "CONSEQUENCE" });
  assert.equal("ok" in resolve, true);
  assert.equal("refused" in consequence && consequence.refused, "UNKNOWN_DOES_NOT_AUTHORIZE_CONSEQUENCE");
  assert.equal("refused" in execute, true);
  assert.equal("ok" in known, true);
});

test("native custody requires digest, contract, and seal", async () => {
  const resultDigest = "aa".repeat(32);
  const resultContractId = "contract-k1";
  const receipt: GenerativeReceipt = {
    taskId: "t-native",
    resultDigest,
    resultContractId,
    validatorId: "validator-k1",
    executionState: "COMPLETED",
    admissionState: "ADMITTED",
    primaryFailedPredicate: null,
    output: "{}",
    requestedConsequence: "ARCHIVE",
    issuedAt: "2026-08-12T19:00:00Z",
  };
  const seal = await custodySealHex({ resultDigest, resultContractId });
  const bound = {
    capabilityId: "cap-exec",
    scope: "EXECUTE" as const,
    authorityId: "auth-1",
    resultDigest,
    resultContractId,
    sha256: seal,
  };
  const ok = await requestConsequence({ receipt, wanted: "EXECUTE", custody: bound });
  const digest = await requestConsequence({
    receipt,
    wanted: "EXECUTE",
    custody: { ...bound, resultDigest: "bb".repeat(32) },
  });
  const contract = await requestConsequence({
    receipt,
    wanted: "EXECUTE",
    custody: { ...bound, resultContractId: "other-contract" },
  });
  const token = await requestConsequence({
    receipt,
    wanted: "EXECUTE",
    custody: { ...bound, sha256: "ab".repeat(32) },
  });
  const asserted = await requestConsequence({
    receipt,
    wanted: "EXECUTE",
    assertedGrant: "EXECUTE",
  });
  assert.equal("ok" in ok, true);
  assert.equal("refused" in digest && digest.refused, "CUSTODY_DIGEST_MISMATCH");
  assert.equal("refused" in contract && contract.refused, "CUSTODY_CONTRACT_MISMATCH");
  assert.equal("refused" in token && token.refused, "CUSTODY_SEAL_MISMATCH");
  assert.equal("refused" in asserted && asserted.refused, "ASSERTED_GRANT_IS_NOT_CUSTODY");
});
