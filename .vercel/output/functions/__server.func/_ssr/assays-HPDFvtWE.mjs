import { r as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Panel, r as StatusChip } from "./router-DY8XbsL0.mjs";
import { n as useBench, t as Button } from "./store-DmVWWC7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assays-HPDFvtWE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AssaysPage() {
	const { assayResults, assayRunning, runSuite } = useBench();
	(0, import_react.useEffect)(() => {
		if (assayResults.length === 0 && !assayRunning) runSuite();
	}, [
		assayResults.length,
		assayRunning,
		runSuite
	]);
	const passed = assayResults.filter((r) => r.passed).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-2xl space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-[0.16em] text-muted uppercase",
						children: "Discriminators"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-tight",
						children: "Assay suite"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: "These are the relations the patent graph still treats as technical facts. They are not a novelty opinion."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => void runSuite(),
					disabled: assayRunning,
					children: assayRunning ? "Running…" : "Re-run suite"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
					tone: assayResults.length > 0 && passed === assayResults.length ? "admit" : "hold",
					children: assayResults.length ? `${passed}/${assayResults.length} passed` : "idle"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Results",
				kicker: "Family A + Z4 residue",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line",
					children: assayResults.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: row.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-xs text-muted",
								children: row.detail
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
							tone: row.passed ? "admit" : "reject",
							children: row.passed ? "pass" : "fail"
						})]
					}, row.id))
				})
			})
		]
	});
}
//#endregion
export { AssaysPage as component };
