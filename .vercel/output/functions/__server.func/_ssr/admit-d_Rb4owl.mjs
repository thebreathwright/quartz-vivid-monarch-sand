import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as shortHash, n as Panel, r as StatusChip } from "./router-DY8XbsL0.mjs";
import { n as useBench, t as Button } from "./store-DmVWWC7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admit-d_Rb4owl.js
var import_jsx_runtime = require_jsx_runtime();
function AdmitPage() {
	const { rawOutput, setOutput, contracts, selectedContractId, setContract, loadNine, loadSix, admit, tryCandidate, receipts, candidates, lastGate, validationError, toggleValidation } = useBench();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-2xl space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-[0.16em] text-muted uppercase",
						children: "Family A"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-tight",
						children: "Contract-anchored admission"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: "Same bytes can pass one contract and fail another. Completion is not admission. Candidates require both."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Output",
					kicker: "Producer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: loadNine,
							children: "Load nine-key"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: loadSix,
							children: "Load six-key"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: rawOutput,
						onChange: (e) => setOutput(e.target.value),
						className: "min-h-56 w-full rounded-sm bg-raised p-3 font-mono text-xs text-fg shadow-[var(--shadow-border)] outline-none focus:ring-1 focus:ring-accent",
						spellCheck: false
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Contract and gate",
					kicker: "Consumer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: contracts.map((contract) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-11 cursor-pointer items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "contract",
									checked: selectedContractId === contract.id,
									onChange: () => setContract(contract.id),
									className: "size-4 accent-accent"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: contract.label
								})]
							}, contract.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => void admit(),
								children: "Evaluate admission"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								onClick: tryCandidate,
								children: "Create candidate"
							})]
						}),
						lastGate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm",
							children: ["Gate: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
								tone: lastGate === "ADMITTED_TO_CANDIDATE" ? "admit" : "reject",
								children: lastGate
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 flex min-h-11 items-center gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: validationError,
								onChange: toggleValidation,
								className: "size-4 accent-accent"
							}), "Simulate executor validation error"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Receipts",
				kicker: `${receipts.length} recorded`,
				children: receipts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Evaluate an output to bind a receipt."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[36rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "font-mono text-xs text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Task"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Contract"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Digest"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Admission"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Predicate"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: receipts.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 font-mono text-xs",
									children: row.taskId
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 font-mono text-xs",
									children: row.resultContractId
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 font-mono text-xs",
									children: shortHash(row.resultDigest)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
										tone: row.admissionState === "ADMITTED" ? "admit" : row.admissionState === "REJECTED" ? "reject" : "hold",
										children: row.admissionState
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 font-mono text-xs text-muted",
									children: row.primaryFailedPredicate ?? "—"
								})
							]
						}, row.taskId)) })]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Candidates",
				kicker: `${candidates.length} admitted`,
				children: candidates.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Nothing has crossed the consumer gate."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 font-mono text-xs",
					children: candidates.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						c.id,
						" · receipt ",
						c.receiptTaskId,
						" · ",
						shortHash(c.contentDigest)
					] }, c.id))
				})
			})
		]
	});
}
//#endregion
export { AdmitPage as component };
