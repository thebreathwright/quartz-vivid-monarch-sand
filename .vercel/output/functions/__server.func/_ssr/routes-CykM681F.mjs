import { r as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, v as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Panel, r as StatusChip } from "./router-DY8XbsL0.mjs";
import { n as useBench, t as Button } from "./store-DmVWWC7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CykM681F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BenchPage() {
	const { assayResults, assayRunning, events, controlLabel, nullifierRows, receipts, runSuite, resetAll, seedBaseline } = useBench();
	(0, import_react.useEffect)(() => {
		if (assayResults.length === 0 && !assayRunning) runSuite();
	}, [
		assayResults.length,
		assayRunning,
		runSuite
	]);
	const passed = assayResults.filter((r) => r.passed).length;
	const latest = receipts[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-2xl space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-[0.16em] text-muted uppercase",
						children: "Live runtime"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-tight sm:text-4xl",
						children: "Two machines. One bench. No donated status."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: "Contract identity controls admission. A failed successor does not consume its capability. Audit keeps the failure. Control only moves when you write a state."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Assays",
						value: assayResults.length ? `${passed}/${assayResults.length}` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Control",
						value: controlLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Nullifier rows",
						value: String(nullifierRows.length)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void runSuite(),
						disabled: assayRunning,
						children: assayRunning ? "Running…" : "Run assay suite"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: seedBaseline,
						children: "Seed baseline"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: resetAll,
						children: "Reset"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Latest receipt",
					kicker: "Family A",
					children: [latest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "space-y-2 font-mono text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "task",
								v: latest.taskId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "contract",
								v: latest.resultContractId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "execution",
								v: latest.executionState
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "admission",
								v: latest.admissionState,
								tone: latest.admissionState === "ADMITTED" ? "admit" : latest.admissionState === "REJECTED" ? "reject" : "hold"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "predicate",
								v: latest.primaryFailedPredicate ?? "none"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No receipt yet. Open Admit and evaluate an output."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admit",
							className: "text-sm text-accent underline-offset-4 hover:underline",
							children: "Open admission"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "What the suite is testing",
					kicker: "Discriminators",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: assayResults.slice(0, 5).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: row.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
								tone: row.passed ? "admit" : "reject",
								children: row.passed ? "pass" : "fail"
							})]
						}, row.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/assays",
							className: "text-sm text-accent underline-offset-4 hover:underline",
							children: "Full suite"
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Event log",
				kicker: "Recent",
				children: events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Quiet. Run the suite or make a claim."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: events.slice(0, 8).map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-0.5 sm:flex-row sm:gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-faint tabular-nums",
							children: event.at.slice(11, 19)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: event.text
						})]
					}, event.at + event.text))
				})
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs tracking-wider text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-mono text-lg tabular-nums",
			children: value
		})]
	});
}
function Row({ k, v, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: tone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
			tone,
			children: v
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-fg",
			children: v
		}) })]
	});
}
//#endregion
export { BenchPage as component };
