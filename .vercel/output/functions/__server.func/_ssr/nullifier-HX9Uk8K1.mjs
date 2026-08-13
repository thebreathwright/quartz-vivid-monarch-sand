import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as shortHash, n as Panel, r as StatusChip } from "./router-DY8XbsL0.mjs";
import { n as useBench, t as Button } from "./store-DmVWWC7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nullifier-HX9Uk8K1.js
var import_jsx_runtime = require_jsx_runtime();
function NullifierPage() {
	const { capabilityId, setCapabilityId, extraMutated, toggleMutateExtra, extraField, claim, nullifierRows } = useBench();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-2xl space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-[0.16em] text-muted uppercase",
						children: "Z4 residue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-tight",
						children: "Successor nullifier"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: "Only CONSUMED occupies the unique slot. REJECTED_INVALID stays on the log and leaves the capability open."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Claim a disposition",
				kicker: "capability identity",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Capability ID", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: capabilityId,
							onChange: (e) => setCapabilityId(e.target.value),
							className: "mt-2 min-h-11 w-full rounded-sm bg-raised px-3 font-mono text-sm shadow-[var(--shadow-border)] outline-none focus:ring-1 focus:ring-accent"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 flex min-h-11 items-center gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: extraMutated,
								onChange: toggleMutateExtra,
								className: "size-4 accent-accent"
							}),
							"Mutate extra field (",
							extraField,
							") on the next claim"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "danger",
								onClick: () => void claim("REJECTED_INVALID"),
								children: "Claim invalid"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => void claim("CONSUMED"),
								children: "Claim consumed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								onClick: () => void claim("REJECTED_REPLAY"),
								children: "Claim replay"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Append-only rows",
				kicker: `${nullifierRows.length} events`,
				children: nullifierRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No claims yet. Invalid first, then consume, to see reopen."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[40rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "font-mono text-xs text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "#"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Capability"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Cap hash"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Contract"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Disposition"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: nullifierRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 font-mono text-xs tabular-nums",
									children: row.eventId
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 font-mono text-xs",
									children: row.capabilityId
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 font-mono text-xs",
									children: shortHash(row.capabilitySha256)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 font-mono text-xs",
									children: shortHash(row.successorContractSha256)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
										tone: row.disposition === "CONSUMED" ? "admit" : row.disposition === "REJECTED_INVALID" ? "reject" : "hold",
										children: row.disposition
									})
								})
							]
						}, row.eventId)) })]
					})
				})
			})
		]
	});
}
//#endregion
export { NullifierPage as component };
