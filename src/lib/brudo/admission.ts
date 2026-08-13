export type ExecutionState = "NOT_STARTED" | "EXECUTING" | "COMPLETED" | "FAILED";
export type AdmissionState = "UNASSESSED" | "ADMITTED" | "REJECTED" | "WITHHELD";

export type ResultContract = {
  id: string;
  label: string;
  requiredKeys: string[];
};

export type GenerativeReceipt = {
  taskId: string;
  resultDigest: string;
  resultContractId: string;
  validatorId: string;
  executionState: ExecutionState;
  admissionState: AdmissionState;
  primaryFailedPredicate: string | null;
  output: string;
  requestedConsequence: "CANDIDATE" | "ARCHIVE";
  issuedAt: string;
};

export type CandidateRecord = {
  id: string;
  receiptTaskId: string;
  contentDigest: string;
  createdAt: string;
};

export const CONTRACT_K1: ResultContract = {
  id: "contract-k1-nine",
  label: "K1 · nine-key result",
  requiredKeys: [
    "id",
    "status",
    "summary",
    "evidence",
    "scope",
    "authority",
    "disposition",
    "digest",
    "issued_at",
  ],
};

export const CONTRACT_K2: ResultContract = {
  id: "contract-k2-six",
  label: "K2 · six-key result",
  requiredKeys: ["id", "status", "summary", "evidence", "scope", "disposition"],
};

export const SAMPLE_NINE: Record<string, string> = {
  id: "r-19",
  status: "ok",
  summary: "successor classified",
  evidence: "trace:211889",
  scope: "control",
  authority: "NONE",
  disposition: "ADMITTED",
  digest: "pending",
  issued_at: "2026-08-12T19:00:00Z",
};

export const SAMPLE_SIX: Record<string, string> = {
  id: "r-06",
  status: "ok",
  summary: "partial payload",
  evidence: "trace:negative",
  scope: "archive",
  disposition: "COMPLETED",
};

export function parseOutput(raw: string): { ok: true; value: Record<string, unknown> } | { ok: false; error: string } {
  try {
    const value = JSON.parse(raw) as unknown;
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return { ok: false, error: "OUTPUT_NOT_OBJECT" };
    }
    return { ok: true, value: value as Record<string, unknown> };
  } catch {
    return { ok: false, error: "JSON_PARSE" };
  }
}

export function conformsToContract(
  value: Record<string, unknown>,
  contract: ResultContract,
): { ok: boolean; missing: string[] } {
  const missing = contract.requiredKeys.filter((key) => !(key in value));
  return { ok: missing.length === 0, missing };
}

export function evaluateAdmission(args: {
  rawOutput: string;
  contract: ResultContract;
  executionState: ExecutionState;
  validationError?: string | null;
}): Pick<GenerativeReceipt, "admissionState" | "primaryFailedPredicate"> {
  if (args.validationError) {
    return {
      admissionState: "REJECTED",
      primaryFailedPredicate: "EXECUTOR_CONTRACT_VALIDATION",
    };
  }
  if (args.executionState !== "COMPLETED") {
    return {
      admissionState: "UNASSESSED",
      primaryFailedPredicate: "EXECUTION_NOT_COMPLETE",
    };
  }
  const parsed = parseOutput(args.rawOutput);
  if (!parsed.ok) {
    return { admissionState: "REJECTED", primaryFailedPredicate: parsed.error };
  }
  const fit = conformsToContract(parsed.value, args.contract);
  if (!fit.ok) {
    return {
      admissionState: "REJECTED",
      primaryFailedPredicate: `MISSING_KEYS:${fit.missing.join(",")}`,
    };
  }
  return { admissionState: "ADMITTED", primaryFailedPredicate: null };
}


export type GrantCustody = {
  capabilityId: string;
  scope: "EXECUTE";
  authorityId: string;
  resultDigest: string;
  resultContractId: string;
  sha256: string;
};

export function isExecuteCustody(custody: GrantCustody | null | undefined): custody is GrantCustody {
  return Boolean(
    custody &&
      custody.scope === "EXECUTE" &&
      custody.capabilityId &&
      custody.authorityId &&
      /^[0-9a-f]{64}$/.test(custody.resultDigest) &&
      Boolean(custody.resultContractId) &&
      /^[0-9a-f]{64}$/.test(custody.sha256),
  );
}

export function custodyBindsReceipt(
  custody: GrantCustody | null | undefined,
  receipt: GenerativeReceipt,
): custody is GrantCustody {
  return (
    isExecuteCustody(custody) &&
    custody.resultDigest === receipt.resultDigest &&
    custody.resultContractId === receipt.resultContractId
  );
}

export function requestConsequence(args: {
  receipt: GenerativeReceipt;
  wanted: "EXECUTE" | "ARCHIVE" | "CANDIDATE";
  assertedGrant?: "EXECUTE" | "ARCHIVE" | "NONE";
  custody?: GrantCustody | null;
}): { ok: true } | { refused: string } {
  const shapeOk = isExecuteCustody(args.custody);
  const bound = custodyBindsReceipt(args.custody, args.receipt);
  if (args.wanted === "EXECUTE" || args.wanted === "CANDIDATE") {
    if (!shapeOk) {
      if (args.assertedGrant === "EXECUTE") {
        return { refused: "ASSERTED_GRANT_IS_NOT_CUSTODY" };
      }
      if (args.receipt.requestedConsequence === "ARCHIVE") {
        return { refused: "ARCHIVE_DOES_NOT_DONATE_EXECUTE" };
      }
      return { refused: "NO_CUSTODY_GRANT" };
    }
    if (!bound) {
      if (args.custody && args.custody.resultDigest !== args.receipt.resultDigest) {
        return { refused: "CUSTODY_DIGEST_MISMATCH" };
      }
      return { refused: "CUSTODY_CONTRACT_MISMATCH" };
    }
  }
  if (args.receipt.admissionState !== "ADMITTED") {
    return { refused: "ADMISSION_NOT_ADMITTED" };
  }
  return { ok: true };
}

export type PredicateState = "UNKNOWN" | "TRUE" | "FALSE";
export type UnknownAction = "RESOLVE" | "CONSEQUENCE" | "EXECUTE" | "CANDIDATE";

/** UNKNOWN authorizes Resolve only. It never authorizes Consequence. */
export function authorityFromUnknown(args: {
  predicate: PredicateState;
  action: UnknownAction;
}): { ok: true } | { refused: string } {
  if (args.predicate === "UNKNOWN") {
    if (args.action === "RESOLVE") return { ok: true };
    return { refused: "UNKNOWN_DOES_NOT_AUTHORIZE_CONSEQUENCE" };
  }
  return { ok: true };
}

export function candidateFromReceipt(receipt: GenerativeReceipt): CandidateRecord | { refused: string } {
  if (receipt.executionState !== "COMPLETED") {
    return { refused: "EXECUTION_NOT_COMPLETED" };
  }
  if (receipt.admissionState !== "ADMITTED") {
    return { refused: "ADMISSION_NOT_ADMITTED" };
  }
  if (receipt.requestedConsequence !== "CANDIDATE") {
    return { refused: "CONSEQUENCE_NOT_CANDIDATE" };
  }
  return {
    id: `cand-${receipt.taskId}`,
    receiptTaskId: receipt.taskId,
    contentDigest: receipt.resultDigest,
    createdAt: receipt.issuedAt,
  };
}
