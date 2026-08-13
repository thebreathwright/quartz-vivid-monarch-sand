import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Panel, r as StatusChip } from "./router-DY8XbsL0.mjs";
import { n as useBench, t as Button } from "./store-DmVWWC7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger-3ood1fiL.js
var import_jsx_runtime = require_jsx_runtime();
function LedgerPage() {
	const { seedBaseline, appendInvalidAsState, appendValidAsState, ledgerEntries, controlLabel } = useBench();
	const control = [...ledgerEntries].reverse().find((e) => e.kind === "state");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-2xl space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-[0.16em] text-muted uppercase",
						children: "Audit / control"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-tight",
						children: "State ledger"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: "Receipts never become current. latest() is the last appended state. Leak an invalid state to watch control collapse."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: seedBaseline,
						children: "Append baseline"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: appendValidAsState,
						children: "Append valid state"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						onClick: appendInvalidAsState,
						children: "Leak invalid as state"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Control reconstruction",
					kicker: "latest state",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-lg",
						children: controlLabel
					}), control && control.kind === "state" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
							tone: control.status === "REJECTED_INVALID" ? "reject" : control.status === "CONSUMED" ? "admit" : "hold",
							children: control.status
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "No state yet."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Audit projection",
					kicker: "every entry",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-lg tabular-nums",
						children: [ledgerEntries.length, " records"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "Receipts remain visible here even when they are not current."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "History",
				kicker: "append-only",
				children: ledgerEntries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Empty ledger."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-3",
					children: ledgerEntries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-1 border-t border-line pt-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs text-muted",
							children: [
								"#",
								entry.seq,
								" · ",
								entry.kind
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: entry.kind === "state" ? entry.label : entry.note
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
							tone: entry.kind === "receipt" ? "mute" : "hold",
							children: entry.kind === "state" ? entry.status : entry.disposition
						})]
					}, entry.seq))
				})
			})
		]
	});
}
//#endregion
export { LedgerPage as component };
