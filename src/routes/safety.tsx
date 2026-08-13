import { createFileRoute } from "@tanstack/react-router";
import { Panel, StatusChip } from "@/components/app-shell";
import { SAFETY_BOUNDARY, SAFETY_BOUNDARY_FILE, SAFETY_BOUNDARY_SHA256 } from "@/lib/canon/safety-boundary";

export const Route = createFileRoute("/safety")({
  component: SafetyPage,
});

const FLAGS = [
  { id: "pregnancy", text: "Maternal-fetal claims", action: "hypothesis_only" },
  { id: "osa", text: "Known or suspected moderate/severe OSA", action: "medical_evaluation_required" },
  { id: "cv", text: "Hypertension, arrhythmia, aneurysm, syncope, stroke", action: "medical_evaluation_required" },
  { id: "lung", text: "Asthma, COPD, infection, hemoptysis", action: "medical_evaluation_required" },
  { id: "combustion", text: "Smoke, vape, incense as training carrier", action: "rewrite_as_clean_air" },
];

function SafetyPage() {
  return (
    <div className="space-y-8">
      <section className="max-w-2xl space-y-2">
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Protocol safety firewall</p>
        <h2 className="font-display text-3xl tracking-tight">Record S. Pause, not a target.</h2>
        <p className="text-muted">{SAFETY_BOUNDARY.hold.text}</p>
      </section>

      <Panel title="Hold" kicker={SAFETY_BOUNDARY.hold.kind}>
        <div className="mb-3 flex flex-wrap gap-2">
          <StatusChip tone="admit">target {String(SAFETY_BOUNDARY.hold.breath_hold_target)}</StatusChip>
          <StatusChip tone="hold">{SAFETY_BOUNDARY.hold.supervisor}</StatusChip>
        </div>
        <p className="break-all font-mono text-xs text-muted">
          {SAFETY_BOUNDARY_FILE}
          <br />
          {SAFETY_BOUNDARY_SHA256}
        </p>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Hard blocks" kicker={SAFETY_BOUNDARY.id}>
          <ul className="space-y-3">
            {SAFETY_BOUNDARY.hard_blocks.map((b) => (
              <li key={b.id} className="flex items-start justify-between gap-3">
                <span className="text-sm">{b.text}</span>
                <StatusChip tone="reject">{b.id}</StatusChip>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Risk flags" kicker="Default actions">
          <ul className="space-y-3">
            {FLAGS.map((f) => (
              <li key={f.id}>
                <p className="text-sm">{f.text}</p>
                <p className="font-mono text-xs text-muted">{f.action}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="SpO2 as stop rule" kicker="Not diagnosis">
        <dl className="grid gap-3 sm:grid-cols-3 font-mono text-sm">
          <div>
            <dt className="text-xs text-muted">Repeat check</dt>
            <dd className="tabular-nums">under 92%</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Hard stop</dt>
            <dd className="tabular-nums">under 90%</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Urgent evaluation</dt>
            <dd className="tabular-nums">under 88%</dd>
          </div>
        </dl>
      </Panel>
    </div>
  );
}
