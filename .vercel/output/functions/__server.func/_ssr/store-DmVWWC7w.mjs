import "../_runtime.mjs";
import { b as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { i as cn } from "./router-DY8XbsL0.mjs";
import { t as create } from "../_libs/zustand.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-sm text-sm font-medium transition-[opacity,transform,background-color] duration-150 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] min-h-11 px-4", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-raised text-fg shadow-[var(--shadow-border)] hover:bg-surface",
			ghost: "text-muted hover:text-fg hover:bg-raised",
			danger: "bg-reject/15 text-reject hover:bg-reject/25"
		},
		size: {
			default: "min-h-11 px-4",
			sm: "min-h-10 px-3 text-xs",
			icon: "size-11 p-0"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "default"
	}
});
function Button({ className, variant, size, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var CONTRACT_K1 = {
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
		"issued_at"
	]
};
var CONTRACT_K2 = {
	id: "contract-k2-six",
	label: "K2 · six-key result",
	requiredKeys: [
		"id",
		"status",
		"summary",
		"evidence",
		"scope",
		"disposition"
	]
};
var SAMPLE_NINE = {
	id: "r-19",
	status: "ok",
	summary: "successor classified",
	evidence: "trace:211889",
	scope: "control",
	authority: "NONE",
	disposition: "ADMITTED",
	digest: "pending",
	issued_at: "2026-08-12T19:00:00Z"
};
var SAMPLE_SIX = {
	id: "r-06",
	status: "ok",
	summary: "partial payload",
	evidence: "trace:negative",
	scope: "archive",
	disposition: "COMPLETED"
};
function parseOutput(raw) {
	try {
		const value = JSON.parse(raw);
		if (!value || typeof value !== "object" || Array.isArray(value)) return {
			ok: false,
			error: "OUTPUT_NOT_OBJECT"
		};
		return {
			ok: true,
			value
		};
	} catch {
		return {
			ok: false,
			error: "JSON_PARSE"
		};
	}
}
function conformsToContract(value, contract) {
	const missing = contract.requiredKeys.filter((key) => !(key in value));
	return {
		ok: missing.length === 0,
		missing
	};
}
function evaluateAdmission(args) {
	if (args.validationError) return {
		admissionState: "REJECTED",
		primaryFailedPredicate: "EXECUTOR_CONTRACT_VALIDATION"
	};
	if (args.executionState !== "COMPLETED") return {
		admissionState: "UNASSESSED",
		primaryFailedPredicate: "EXECUTION_NOT_COMPLETE"
	};
	const parsed = parseOutput(args.rawOutput);
	if (!parsed.ok) return {
		admissionState: "REJECTED",
		primaryFailedPredicate: parsed.error
	};
	const fit = conformsToContract(parsed.value, args.contract);
	if (!fit.ok) return {
		admissionState: "REJECTED",
		primaryFailedPredicate: `MISSING_KEYS:${fit.missing.join(",")}`
	};
	return {
		admissionState: "ADMITTED",
		primaryFailedPredicate: null
	};
}
function candidateFromReceipt(receipt) {
	if (receipt.executionState !== "COMPLETED") return { refused: "EXECUTION_NOT_COMPLETED" };
	if (receipt.admissionState !== "ADMITTED") return { refused: "ADMISSION_NOT_ADMITTED" };
	if (receipt.requestedConsequence !== "CANDIDATE") return { refused: "CONSEQUENCE_NOT_CANDIDATE" };
	return {
		id: `cand-${receipt.taskId}`,
		receiptTaskId: receipt.taskId,
		contentDigest: receipt.resultDigest,
		createdAt: receipt.issuedAt
	};
}
function toHex(bytes) {
	return [...bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function sha256Hex(input) {
	const data = new TextEncoder().encode(input);
	if (globalThis.crypto?.subtle) return toHex(await globalThis.crypto.subtle.digest("SHA-256", data));
	const { createHash } = await import("node:crypto");
	return createHash("sha256").update(input).digest("hex");
}
var StateLedger = class {
	entries = [];
	seq = 1;
	appendState(state, at = (/* @__PURE__ */ new Date()).toISOString()) {
		const entry = {
			...state,
			kind: "state",
			seq: this.seq++,
			at
		};
		this.entries.push(entry);
		return entry;
	}
	appendReceipt(receipt, at = (/* @__PURE__ */ new Date()).toISOString()) {
		const entry = {
			...receipt,
			kind: "receipt",
			seq: this.seq++,
			at
		};
		this.entries.push(entry);
		return entry;
	}
	latest() {
		for (let i = this.entries.length - 1; i >= 0; i--) {
			const entry = this.entries[i];
			if (entry.kind === "state") return entry;
		}
		return null;
	}
	latestReceipt() {
		for (let i = this.entries.length - 1; i >= 0; i--) {
			const entry = this.entries[i];
			if (entry.kind === "receipt") return entry;
		}
		return null;
	}
	audit() {
		return [...this.entries];
	}
	reset() {
		this.entries = [];
		this.seq = 1;
	}
	hydrate(entries) {
		this.entries = entries.map((entry) => ({ ...entry }));
		this.seq = entries.reduce((max, entry) => Math.max(max, entry.seq), 0) + 1;
	}
};
var SuccessorNullifier = class {
	rows = [];
	nextId = 1;
	list() {
		return [...this.rows];
	}
	forCapability(capabilityId) {
		return this.rows.filter((row) => row.capabilityId === capabilityId);
	}
	isConsumed(capabilityId, capabilitySha256) {
		return this.rows.some((row) => row.capabilityId === capabilityId && row.capabilitySha256 === capabilitySha256 && row.disposition === "CONSUMED");
	}
	claim(claim, recordedAt = (/* @__PURE__ */ new Date()).toISOString()) {
		if (![
			"CONSUMED",
			"REJECTED_REPLAY",
			"REJECTED_INVALID"
		].includes(claim.disposition)) return {
			ok: false,
			reason: "UNSUPPORTED_DISPOSITION"
		};
		if (claim.disposition === "CONSUMED" && this.isConsumed(claim.capabilityId, claim.capabilitySha256)) return {
			ok: false,
			reason: "ALREADY_CONSUMED"
		};
		const row = {
			...claim,
			eventId: this.nextId++,
			recordedAt
		};
		this.rows.push(row);
		return {
			ok: true,
			eventId: row.eventId,
			row
		};
	}
	reset() {
		this.rows = [];
		this.nextId = 1;
	}
	hydrate(rows) {
		this.rows = rows.map((row) => ({ ...row }));
		this.nextId = rows.reduce((max, row) => Math.max(max, row.eventId), 0) + 1;
	}
};
var H = "a".repeat(64);
function claimBase() {
	return {
		capabilityId: "cap-1",
		capabilitySha256: H,
		successorContractSha256: H,
		predecessorStateSha256: H,
		consequenceScopeSha256: H,
		authorityEpochSha256: H
	};
}
async function runAssays() {
	const results = [];
	{
		const store = new SuccessorNullifier();
		const ledger = new StateLedger();
		ledger.appendState({
			id: "baseline",
			label: "baseline",
			status: "ADMITTED"
		});
		const invalid = store.claim({
			...claimBase(),
			disposition: "REJECTED_INVALID",
			successorContractSha256: "d".repeat(64)
		});
		const consumed = store.claim({
			...claimBase(),
			disposition: "CONSUMED",
			successorContractSha256: "e".repeat(64)
		});
		ledger.appendReceipt({
			id: "rej",
			disposition: "REJECTED_INVALID",
			note: "invalid successor"
		});
		ledger.appendState({
			id: "valid",
			label: "valid successor",
			status: "CONSUMED"
		});
		const audit = store.forCapability("cap-1").map((r) => r.disposition);
		const control = ledger.latest();
		const passed = invalid.ok && consumed.ok && audit.join(",") === "REJECTED_INVALID,CONSUMED" && control?.status === "CONSUMED" && control.id === "valid";
		results.push({
			id: "z4-sequence",
			name: "Invalid then consume; audit keeps both; control is last state",
			passed,
			detail: passed ? "Audit: REJECTED_INVALID, CONSUMED. Control: valid successor." : `audit=${audit.join(",")} control=${control?.id ?? "none"}`
		});
	}
	{
		const ledger = new StateLedger();
		ledger.appendState({
			id: "baseline",
			label: "baseline",
			status: "ADMITTED"
		});
		ledger.appendState({
			id: "valid",
			label: "valid successor",
			status: "CONSUMED"
		});
		results.push({
			id: "z4-no-invalid-row",
			name: "C \\ {durable invalid}: control exclusion still holds",
			passed: ledger.latest()?.id === "valid",
			detail: "Exclusion does not require the invalid nullifier row."
		});
	}
	{
		const store = new SuccessorNullifier();
		store.claim({
			...claimBase(),
			disposition: "REJECTED_INVALID"
		});
		const second = store.claim({
			...claimBase(),
			disposition: "CONSUMED"
		});
		results.push({
			id: "z4-reopen",
			name: "REJECTED_INVALID does not burn capability",
			passed: second.ok,
			detail: second.ok ? "Later CONSUMED accepted." : "Later CONSUMED refused."
		});
	}
	{
		const store = new SuccessorNullifier();
		store.claim({
			...claimBase(),
			disposition: "CONSUMED"
		});
		const again = store.claim({
			...claimBase(),
			disposition: "CONSUMED",
			successorContractSha256: "b".repeat(64)
		});
		results.push({
			id: "z4-second-consume",
			name: "Second CONSUMED on same capability pair is refused",
			passed: !again.ok && again.reason === "ALREADY_CONSUMED",
			detail: "Uniqueness is the capability pair, not the extra hashes."
		});
	}
	{
		const store = new SuccessorNullifier();
		store.claim({
			...claimBase(),
			disposition: "CONSUMED"
		});
		const escaped = store.claim({
			...claimBase(),
			capabilitySha256: "b".repeat(64),
			disposition: "CONSUMED"
		});
		results.push({
			id: "z4-escape-sha",
			name: "Mutating capability hash opens a new consume slot",
			passed: escaped.ok,
			detail: "Five-field identity is not what uniqueness enforces."
		});
	}
	{
		const ledger = new StateLedger();
		ledger.appendState({
			id: "baseline",
			label: "baseline",
			status: "ADMITTED"
		});
		ledger.appendReceipt({
			id: "rej",
			disposition: "REJECTED_INVALID",
			note: "invalid"
		});
		ledger.appendState({
			id: "invalid",
			label: "invalid successor",
			status: "REJECTED_INVALID"
		});
		results.push({
			id: "z4-leak-state",
			name: "If invalid is appended as state, latest() becomes it",
			passed: ledger.latest()?.status === "REJECTED_INVALID",
			detail: "Control exclusion is write-policy, not receipt retention."
		});
	}
	{
		const nine = JSON.stringify(SAMPLE_NINE);
		const six = JSON.stringify(SAMPLE_SIX);
		const a = evaluateAdmission({
			rawOutput: nine,
			contract: CONTRACT_K1,
			executionState: "COMPLETED"
		});
		const b = evaluateAdmission({
			rawOutput: nine,
			contract: CONTRACT_K2,
			executionState: "COMPLETED"
		});
		const c = evaluateAdmission({
			rawOutput: six,
			contract: CONTRACT_K1,
			executionState: "COMPLETED"
		});
		const d = evaluateAdmission({
			rawOutput: six,
			contract: CONTRACT_K2,
			executionState: "COMPLETED"
		});
		const passed = a.admissionState === "ADMITTED" && b.admissionState === "ADMITTED" && c.admissionState === "REJECTED" && d.admissionState === "ADMITTED";
		results.push({
			id: "a-same-bytes",
			name: "Same bytes, two contracts: Admit(R,K1) ≠ Admit(R,K2) for six-key payload",
			passed,
			detail: `nine/K1=${a.admissionState} nine/K2=${b.admissionState} six/K1=${c.admissionState} six/K2=${d.admissionState}`
		});
	}
	{
		const gate = candidateFromReceipt({
			taskId: "t-rej",
			resultDigest: await sha256Hex(JSON.stringify(SAMPLE_SIX)),
			resultContractId: CONTRACT_K1.id,
			validatorId: "validator-k1",
			executionState: "COMPLETED",
			admissionState: "REJECTED",
			primaryFailedPredicate: "MISSING_KEYS:authority,digest,issued_at",
			output: JSON.stringify(SAMPLE_SIX),
			requestedConsequence: "CANDIDATE",
			issuedAt: "2026-08-12T19:00:00Z"
		});
		results.push({
			id: "a-consumer-gate",
			name: "COMPLETED + REJECTED cannot become a candidate",
			passed: "refused" in gate && gate.refused === "ADMISSION_NOT_ADMITTED",
			detail: "refused" in gate ? gate.refused : "candidate created (fail)"
		});
	}
	{
		const evaled = evaluateAdmission({
			rawOutput: JSON.stringify(SAMPLE_SIX),
			contract: CONTRACT_K1,
			executionState: "COMPLETED",
			validationError: "schema"
		});
		results.push({
			id: "a-no-unassessed",
			name: "Executor validation error stays REJECTED, not UNASSESSED",
			passed: evaled.admissionState === "REJECTED" && evaled.primaryFailedPredicate === "EXECUTOR_CONTRACT_VALIDATION",
			detail: `${evaled.admissionState} / ${evaled.primaryFailedPredicate}`
		});
	}
	return results;
}
var nullifier = new SuccessorNullifier();
var ledger = new StateLedger();
function note(text) {
	return {
		at: (/* @__PURE__ */ new Date()).toISOString(),
		text
	};
}
function snapshot() {
	return {
		nullifierRows: nullifier.list(),
		ledgerEntries: ledger.audit(),
		controlLabel: ledger.latest()?.label ?? "none"
	};
}
var useBench = create((set, get) => ({
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
			validationError: state.validationError ? "schema" : null
		});
		const digest = await sha256Hex(state.rawOutput);
		const receipt = {
			taskId: `task-${state.receipts.length + 1}`,
			resultDigest: digest,
			resultContractId: contract.id,
			validatorId: `validator:${contract.id}`,
			executionState: state.executionState,
			admissionState: decision.admissionState,
			primaryFailedPredicate: decision.primaryFailedPredicate,
			output: state.rawOutput,
			requestedConsequence: state.requestedConsequence,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		set({
			receipts: [receipt, ...state.receipts],
			lastGate: null,
			events: [note(`Admitted ${receipt.taskId} as ${receipt.admissionState} under ${contract.label}`), ...state.events].slice(0, 40)
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
				events: [note(`Candidate refused: ${result.refused}`), ...get().events].slice(0, 40)
			});
			return;
		}
		set({
			candidates: [result, ...get().candidates],
			lastGate: "ADMITTED_TO_CANDIDATE",
			events: [note(`Candidate ${result.id} created`), ...get().events].slice(0, 40)
		});
	},
	claim: async (disposition) => {
		const state = get();
		const capSha = state.capabilitySha || await sha256Hex(state.capabilityId);
		const extra = state.extraMutated ? await sha256Hex(`mutated:${state.extraField}:${Date.now()}`) : await sha256Hex("epoch-0");
		const result = nullifier.claim({
			capabilityId: state.capabilityId,
			capabilitySha256: capSha,
			successorContractSha256: state.extraField === "successorContractSha256" ? extra : await sha256Hex("contract"),
			predecessorStateSha256: state.extraField === "predecessorStateSha256" ? extra : await sha256Hex("pred"),
			consequenceScopeSha256: state.extraField === "consequenceScopeSha256" ? extra : await sha256Hex("scope"),
			authorityEpochSha256: state.extraField === "authorityEpochSha256" ? extra : await sha256Hex("epoch"),
			disposition
		});
		if (result.ok && disposition === "REJECTED_INVALID") ledger.appendReceipt({
			id: `n-${result.eventId}`,
			disposition,
			note: "invalid successor retained as receipt only"
		});
		if (result.ok && disposition === "CONSUMED") ledger.appendReceipt({
			id: `n-${result.eventId}`,
			disposition,
			note: "capability consumed"
		});
		set({
			capabilitySha: capSha,
			...snapshot(),
			events: [note(result.ok ? `${disposition} recorded as event ${result.eventId}` : `${disposition} refused: ${result.reason}`), ...state.events].slice(0, 40)
		});
	},
	seedBaseline: () => {
		if (!ledger.latest()) ledger.appendState({
			id: "baseline",
			label: "authoritative baseline",
			status: "ADMITTED"
		});
		set({
			...snapshot(),
			events: [note("Baseline state appended"), ...get().events].slice(0, 40)
		});
	},
	appendInvalidAsState: () => {
		ledger.appendState({
			id: `invalid-${Date.now()}`,
			label: "invalid successor (leaked)",
			status: "REJECTED_INVALID"
		});
		set({
			...snapshot(),
			events: [note("Leaked invalid successor into control ledger"), ...get().events].slice(0, 40)
		});
	},
	appendValidAsState: () => {
		ledger.appendState({
			id: `valid-${Date.now()}`,
			label: "valid successor",
			status: "CONSUMED"
		});
		set({
			...snapshot(),
			events: [note("Valid successor appended as control state"), ...get().events].slice(0, 40)
		});
	},
	setCapabilityId: (id) => set({
		capabilityId: id,
		capabilitySha: ""
	}),
	toggleMutateExtra: () => set({ extraMutated: !get().extraMutated }),
	toggleValidation: () => set({ validationError: !get().validationError }),
	runSuite: async () => {
		set({ assayRunning: true });
		const assayResults = await runAssays();
		set({
			assayResults,
			assayRunning: false,
			events: [note(`Assay suite ${assayResults.filter((r) => r.passed).length}/${assayResults.length}`), ...get().events].slice(0, 40)
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
			events: [note("Runtime reset")]
		});
	}
}));
//#endregion
export { useBench as n, Button as t };
