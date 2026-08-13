import { create } from "zustand";
import {
  CONTRACT_K1,
  CONTRACT_K2,
  SAMPLE_NINE,
  SAMPLE_SIX,
  candidateFromReceipt,
  evaluateAdmission,
  type CandidateRecord,
  type ExecutionState,
  type GenerativeReceipt,
  type ResultContract,
} from "./admission";
import { sha256Hex } from "./hash";
import { StateLedger, type LedgerEntry } from "./ledger";
import { SuccessorNullifier, type NullifierDisposition, type NullifierRow } from "./nullifier";
import { runAssays, type AssayResult } from "./assays";

const nullifier = new SuccessorNullifier();
const ledger = new StateLedger();

type EventRow = { at: string; text: string };

type BenchState = {
  contracts: ResultContract[];
  selectedContractId: string;
  rawOutput: string;
  executionState: ExecutionState;
  validationError: boolean;
  requestedConsequence: "CANDIDATE" | "ARCHIVE";
  receipts: GenerativeReceipt[];
  candidates: CandidateRecord[];
  lastGate: string | null;
  capabilityId: string;
  capabilitySha: string;
  extraField: "successorContractSha256" | "predecessorStateSha256" | "consequenceScopeSha256" | "authorityEpochSha256";
  extraMutated: boolean;
  nullifierRows: NullifierRow[];
  ledgerEntries: LedgerEntry[];
  controlLabel: string;
  assayResults: AssayResult[];
  assayRunning: boolean;
  events: EventRow[];
  setOutput: (raw: string) => void;
  setContract: (id: string) => void;
  loadNine: () => void;
  loadSix: () => void;
  admit: () => Promise<void>;
  tryCandidate: () => void;
  claim: (disposition: NullifierDisposition) => Promise<void>;
  seedBaseline: () => void;
  appendInvalidAsState: () => void;
  appendValidAsState: () => void;
  setCapabilityId: (id: string) => void;
  toggleMutateExtra: () => void;
  toggleValidation: () => void;
  runSuite: () => Promise<void>;
  resetAll: () => void;
};

function note(text: string): EventRow {
  return { at: new Date().toISOString(), text };
}

function snapshot() {
  return {
    nullifierRows: nullifier.list(),
    ledgerEntries: ledger.audit(),
    controlLabel: ledger.latest()?.label ?? "none",
  };
}

export const useBench = create<BenchState>((set, get) => ({
  contracts: [CONTRACT_K1, CONTRACT_K2],
  selectedContractId: CONTRACT_K1.id,
  rawOutput: JSON.stringify(SAMPLE_NINE, null, 2),
  executionState: "COMPLETED",
  validationError: false,
  requestedConsequence: "CANDIDATE",
  receipts: [],
  candidates: [],
  lastGate: null,
  capabilityId: "cap-throat-1",
  capabilitySha: "",
  extraField: "successorContractSha256",
  extraMutated: false,
  nullifierRows: [],
  ledgerEntries: [],
  controlLabel: "none",
  assayResults: [],
  assayRunning: false,
  events: [],
  setOutput: (raw) => set({ rawOutput: raw }),
  setContract: (id) => set({ selectedContractId: id }),
  loadNine: () => set({ rawOutput: JSON.stringify(SAMPLE_NINE, null, 2) }),
  loadSix: () => set({ rawOutput: JSON.stringify(SAMPLE_SIX, null, 2) }),
  admit: async () => {
    const state = get();
    const contract = state.contracts.find((c) => c.id === state.selectedContractId) ?? CONTRACT_K1;
    const decision = evaluateAdmission({
      rawOutput: state.rawOutput,
      contract,
      executionState: state.executionState,
      validationError: state.validationError ? "schema" : null,
    });
    const digest = await sha256Hex(state.rawOutput);
    const receipt: GenerativeReceipt = {
      taskId: `task-${state.receipts.length + 1}`,
      resultDigest: digest,
      resultContractId: contract.id,
      validatorId: `validator:${contract.id}`,
      executionState: state.executionState,
      admissionState: decision.admissionState,
      primaryFailedPredicate: decision.primaryFailedPredicate,
      output: state.rawOutput,
      requestedConsequence: state.requestedConsequence,
      issuedAt: new Date().toISOString(),
    };
    set({
      receipts: [receipt, ...state.receipts],
      lastGate: null,
      events: [note(`Admitted ${receipt.taskId} as ${receipt.admissionState} under ${contract.label}`), ...state.events].slice(0, 40),
    });
  },
  tryCandidate: () => {
    const latest = get().receipts[0];
    if (!latest) {
      set({ lastGate: "NO_RECEIPT" });
      return;
    }
    const result = candidateFromReceipt(latest);
    if ("refused" in result) {
      set({
        lastGate: result.refused,
        events: [note(`Candidate refused: ${result.refused}`), ...get().events].slice(0, 40),
      });
      return;
    }
    set({
      candidates: [result, ...get().candidates],
      lastGate: "ADMITTED_TO_CANDIDATE",
      events: [note(`Candidate ${result.id} created`), ...get().events].slice(0, 40),
    });
  },
  claim: async (disposition) => {
    const state = get();
    const capSha = state.capabilitySha || (await sha256Hex(state.capabilityId));
    const extra = state.extraMutated ? await sha256Hex(`mutated:${state.extraField}:${Date.now()}`) : await sha256Hex("epoch-0");
    const result = nullifier.claim({
      capabilityId: state.capabilityId,
      capabilitySha256: capSha,
      successorContractSha256: state.extraField === "successorContractSha256" ? extra : await sha256Hex("contract"),
      predecessorStateSha256: state.extraField === "predecessorStateSha256" ? extra : await sha256Hex("pred"),
      consequenceScopeSha256: state.extraField === "consequenceScopeSha256" ? extra : await sha256Hex("scope"),
      authorityEpochSha256: state.extraField === "authorityEpochSha256" ? extra : await sha256Hex("epoch"),
      disposition,
    });
    if (result.ok && disposition === "REJECTED_INVALID") {
      ledger.appendReceipt({
        id: `n-${result.eventId}`,
        disposition,
        note: "invalid successor retained as receipt only",
      });
    }
    if (result.ok && disposition === "CONSUMED") {
      ledger.appendReceipt({
        id: `n-${result.eventId}`,
        disposition,
        note: "capability consumed",
      });
    }
    set({
      capabilitySha: capSha,
      ...snapshot(),
      events: [
        note(
          result.ok
            ? `${disposition} recorded as event ${result.eventId}`
            : `${disposition} refused: ${result.reason}`,
        ),
        ...state.events,
      ].slice(0, 40),
    });
  },
  seedBaseline: () => {
    if (!ledger.latest()) {
      ledger.appendState({ id: "baseline", label: "authoritative baseline", status: "ADMITTED" });
    }
    set({
      ...snapshot(),
      events: [note("Baseline state appended"), ...get().events].slice(0, 40),
    });
  },
  appendInvalidAsState: () => {
    ledger.appendState({ id: `invalid-${Date.now()}`, label: "invalid successor (leaked)", status: "REJECTED_INVALID" });
    set({
      ...snapshot(),
      events: [note("Leaked invalid successor into control ledger"), ...get().events].slice(0, 40),
    });
  },
  appendValidAsState: () => {
    ledger.appendState({ id: `valid-${Date.now()}`, label: "valid successor", status: "CONSUMED" });
    set({
      ...snapshot(),
      events: [note("Valid successor appended as control state"), ...get().events].slice(0, 40),
    });
  },
  setCapabilityId: (id) => set({ capabilityId: id, capabilitySha: "" }),
  toggleMutateExtra: () => set({ extraMutated: !get().extraMutated }),
  toggleValidation: () => set({ validationError: !get().validationError }),
  runSuite: async () => {
    set({ assayRunning: true });
    const assayResults = await runAssays();
    set({
      assayResults,
      assayRunning: false,
      events: [note(`Assay suite ${assayResults.filter((r) => r.passed).length}/${assayResults.length}`), ...get().events].slice(0, 40),
    });
  },
  resetAll: () => {
    nullifier.reset();
    ledger.reset();
    set({
      receipts: [],
      candidates: [],
      lastGate: null,
      capabilitySha: "",
      extraMutated: false,
      assayResults: [],
      ...snapshot(),
      events: [note("Runtime reset")],
    });
  },
}));
