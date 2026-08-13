import { r as __toESM } from "../_runtime.mjs";
import { _ as createRootRoute, b as require_jsx_runtime, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DY8XbsL0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-reject",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-medium",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
/**
* Whether `origin` is a known Grok embedder. Exported for tests.
* Do not list internal staging hosts here — this file ships in download/export.
*/
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
/** Public preview zone. Staging embedders frame this host via the proxy CSP. */
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
/** Resolve the parent origin to post to, or null when the bridge must noop. */
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	const candidates = [referrer, ancestorOrigin ?? ""].filter(Boolean);
	for (const candidate of candidates) try {
		const origin = candidate.includes("://") ? new URL(candidate).origin : candidate;
		if (isGrokEmbedderOrigin(origin)) return origin;
		if (!isSandboxPreviewGuestHost(guestHostname)) continue;
		const parsed = new URL(origin.includes("://") ? origin : `https://${origin}`);
		if (parsed.protocol === "https:" || parsed.protocol === "http:") return parsed.origin;
	} catch {}
	return null;
}
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function shortHash(hex, n = 8) {
	if (!hex) return "—";
	return hex.slice(0, n);
}
var NAV = [
	{
		to: "/",
		label: "Bench"
	},
	{
		to: "/admit",
		label: "Admit"
	},
	{
		to: "/nullifier",
		label: "Nullifier"
	},
	{
		to: "/ledger",
		label: "Ledger"
	},
	{
		to: "/assays",
		label: "Assays"
	},
	{
		to: "/graph",
		label: "Graph"
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-[0.18em] text-muted uppercase",
					children: "Brudo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl tracking-tight sm:text-2xl",
					children: "Admission Bench"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "-mx-1 flex gap-1 overflow-x-auto pb-1",
					children: NAV.map((item) => {
						const active = pathname === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: cn("min-h-11 shrink-0 rounded-sm px-3 py-2 text-sm transition-colors duration-150", active ? "bg-raised text-fg" : "text-muted hover:text-fg"),
							children: item.label
						}, item.to);
					})
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10",
			children
		})]
	});
}
function Panel({ title, kicker, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("rounded-lg bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-4",
			children: [kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-wider text-muted uppercase",
				children: kicker
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-medium tracking-tight",
				children: title
			})]
		}), children]
	});
}
function StatusChip({ tone, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex min-h-7 items-center rounded-sm px-2 font-mono text-xs tabular-nums", {
			admit: "text-admit bg-admit/10",
			reject: "text-reject bg-reject/10",
			hold: "text-hold bg-hold/10",
			mute: "text-muted bg-raised"
		}[tone]),
		children
	});
}
var styles_default = "/assets/styles-C-JL8nha.css";
var APP_NAME = "BRUDO Admission Bench";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Contract-anchored admission, successor nullifier, and audit/control split."
			},
			{
				name: "apple-mobile-web-app-title",
				content: APP_NAME
			},
			{
				name: "theme-color",
				content: "#0c0c0d"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				property: "og:type",
				content: "website"
			},
			...[]
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$4 = () => import("./routes-CykM681F.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admit-d_Rb4owl.mjs");
var Route$4 = createFileRoute("/admit")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./assays-HPDFvtWE.mjs");
var Route$3 = createFileRoute("/assays")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var Route$2 = createFileRoute("/graph")({ component: GraphPage });
var FAMILIES = [
	{
		id: "A",
		title: "Contract-anchored admission",
		status: "PRIMARY",
		tone: "admit",
		body: "Result contract rides in work identity and in the receipt. Execution and admission stay separate. REJECTED cannot become UNASSESSED. Candidates require ADMITTED."
	},
	{
		id: "B",
		title: "Replay / non-amplification",
		status: "HOLD",
		tone: "hold",
		body: "Prior ARCHIVE admission cannot donate EXECUTE. Z4 reopen collapsed into the unique-on-success predicate."
	},
	{
		id: "C",
		title: "Historical ≠ current",
		status: "DEPENDENT",
		tone: "mute",
		body: "Invalid rows may remain as audit. Control moves only by state append. LINEAGE_BLOCKED lives here."
	},
	{
		id: "D",
		title: "Consequence quotient",
		status: "HOLD",
		tone: "hold",
		body: "Witness symbols were not established in the handmade-set source search."
	},
	{
		id: "E/F",
		title: "Quiescence / self-prompt",
		status: "RESEARCH",
		tone: "mute",
		body: "active_work = 0 is not project-complete. Not a standalone family."
	},
	{
		id: "Z4",
		title: "Successor nullifier",
		status: "NARROWED",
		tone: "reject",
		body: "Not a distinct core. Residue is UNIQUE(capability, hash) WHERE CONSUMED. Five extra identity fields are excess for uniqueness. Durable invalid does not implement control exclusion."
	}
];
function GraphPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "max-w-2xl space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-[0.16em] text-muted uppercase",
					children: "Patent graph"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: "Families after damage"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: "Research and drafting only. Implementation-backed is not patentable. Search absence is not novelty."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: FAMILIES.map((family) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: family.title,
				kicker: `Family ${family.id}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
					tone: family.tone,
					children: family.status
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: family.body
				})]
			}, family.id))
		})]
	});
}
var $$splitComponentImporter$1 = () => import("./ledger-3ood1fiL.mjs");
var Route$1 = createFileRoute("/ledger")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./nullifier-HX9Uk8K1.mjs");
var Route = createFileRoute("/nullifier")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$5.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	AdmitRoute: Route$4.update({
		id: "/admit",
		path: "/admit",
		getParentRoute: () => Route$6
	}),
	AssaysRoute: Route$3.update({
		id: "/assays",
		path: "/assays",
		getParentRoute: () => Route$6
	}),
	GraphRoute: Route$2.update({
		id: "/graph",
		path: "/graph",
		getParentRoute: () => Route$6
	}),
	LedgerRoute: Route$1.update({
		id: "/ledger",
		path: "/ledger",
		getParentRoute: () => Route$6
	}),
	NullifierRoute: Route.update({
		id: "/nullifier",
		path: "/nullifier",
		getParentRoute: () => Route$6
	})
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { shortHash as a, cn as i, Panel as n, StatusChip as r, router_exports as t };
