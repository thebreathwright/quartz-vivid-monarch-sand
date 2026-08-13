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
