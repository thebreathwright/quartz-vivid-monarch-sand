import { createFileRoute, Link } from "@tanstack/react-router";
import { Panel, StatusChip } from "@/components/app-shell";
import { LAWS, LAYERS, SEQUENCE, TREE_ORDER } from "@/lib/canon/field";
import { CLAIM_COUNT, CLAIM_SOURCE } from "@/lib/canon/types";

export const Route = createFileRoute("/")({
  component: FieldPage,
});

function FieldPage() {
  return (
    <div className="space-y-8">
      <section className="max-w-2xl space-y-3">
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Respiratory Adaptation Canon</p>
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Nostril to cell, then back again.</h2>
        <p className="text-muted">
          Living systems adapt to load. Respiration is the neglected domain. This is the operational layer of the
          archive: train what is safe to train, measure what you can, keep claims labeled, and keep the runtime honest.
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["/train", "Train", "Safety-gated modules from THE BE EU program"],
          ["/hme", "HME science", "37 °C / 100% RH · recovery · modeled year"],
          ["/log", "Six-Nines log", "MBPct, SpO2 bar, coverage, PNIF"],
          ["/claims", "Claim registry", `${CLAIM_COUNT} records from ${CLAIM_SOURCE}`],
          ["/ass001", "ASS001", "Maternal-fetal hypothesis. Not instruction."],
          ["/safety", "Firewall", "Pregnancy, water, pressure, SpO2 stops"],
          ["/bench", "Runtime", "Admission, nullifier, ledger, assays"],
        ].map(([to, title, body]) => (
          <Link key={to} to={to} className="rounded-md bg-surface p-4 shadow-[var(--shadow-border)] transition-colors hover:bg-raised">
            <p className="font-medium">{title}</p>
            <p className="mt-1 text-sm text-muted">{body}</p>
          </Link>
        ))}
      </div>

      <Panel title="Conditioning Tree" kicker="Corrected order">
        <ol className="space-y-2">
          {TREE_ORDER.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm">
              <span className="font-mono text-xs text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Laws" kicker="Layer 0">
          <ul className="space-y-3">
            {LAWS.map((law) => (
              <li key={law.id}>
                <p className="text-sm font-medium">{law.name}</p>
                <p className="text-sm text-muted">{law.role}</p>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Sequence for survivability" kicker="Rewrite order">
          <ol className="space-y-2">
            {SEQUENCE.map((item, i) => (
              <li key={item} className="flex gap-3 text-sm">
                <span className="font-mono text-xs text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        </Panel>
      </div>

      <Panel title="Field layers" kicker="Architecture">
        <div className="grid gap-3 sm:grid-cols-2">
          {LAYERS.map((layer) => (
            <div key={layer.id}>
              <p className="font-mono text-xs text-muted">
                {layer.id} · {layer.name}
              </p>
              <p className="text-sm">{layer.text}</p>
            </div>
          ))}
        </div>
      </Panel>

      <p className="text-xs text-muted">
        Self-assessment only. Not a diagnosis. Symbolic mappings are late-bound. High-pressure and pregnancy claims stay
        behind the firewall. <StatusChip tone="hold">strictness 5</StatusChip>
      </p>
    </div>
  );
}
