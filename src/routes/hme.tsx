import { createFileRoute, Link } from "@tanstack/react-router";
import { Panel, StatusChip } from "@/components/app-shell";
import { HME_ANCHORS, HME_ORDER, HME_SCENARIOS, HME_SHOWN } from "@/lib/canon/hme";

export const Route = createFileRoute("/hme")({
  component: HmePage,
});

function HmePage() {
  return (
    <div className="space-y-8">
      <section className="max-w-2xl space-y-2">
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Heat–moisture exchange</p>
        <h2 className="font-display text-3xl tracking-tight">It is already in the science.</h2>
        <p className="text-muted">
          The bronchial tree is a heat–moisture exchanger. Every breath must be brought to body heat and full saturation.
          Part of that load is recovered on the way out. That is shown. How far a healthy adult can train the recovery
          coefficient is the gap.
        </p>
      </section>

      <Panel title="Classification" kicker="After the evidence pass">
        <ul className="space-y-2 text-sm">
          <li>HME function is public science. It is not a hypothesis.</li>
          <li>Hot-dry as a training stimulus stays gated. No public steps.</li>
          <li>Combustion and greater-than-52 °C / TRPV2 stay gated.</li>
          <li>The adult HME ceiling is a gap, not a shown result.</li>
          <li>Beneficial-training language is a killed claim edge. Not on the patent graph.</li>
        </ul>
      </Panel>

      <div className="grid gap-3 sm:grid-cols-2">
        {HME_ANCHORS.map((row) => (
          <div key={row.q} className="rounded-md bg-surface p-4 shadow-[var(--shadow-border)]">
            <p className="font-mono text-xs tracking-wider text-muted uppercase">{row.q}</p>
            <p className="mt-1 font-display text-xl tracking-tight">{row.v}</p>
            <p className="mt-2 text-sm text-muted">{row.why}</p>
          </div>
        ))}
      </div>

      <Panel title="Shown vs gap" kicker="Labeled">
        <ul className="space-y-3">
          {HME_SHOWN.map((row) => (
            <li key={row.text} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <p className="text-sm">{row.text}</p>
              <StatusChip tone={row.level === "gap" ? "hold" : row.level.startsWith("L3") ? "admit" : "mute"}>
                {row.level}
              </StatusChip>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Corrected order" kicker="Conditioning Tree">
        <ol className="space-y-2">
          {HME_ORDER.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm">
              <span className="font-mono text-xs text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted">
          Filter is last. Water and heat are the first-order work. Mucociliary transport is a downstream readout of a wet
          exchanger, not the root function.
        </p>
      </Panel>

      <Panel title="Modeled HME-only year" kicker="Not a trial">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead className="font-mono text-xs text-muted">
              <tr>
                <th className="pb-2 font-medium">Climate</th>
                <th className="pb-2 font-medium">Higher</th>
                <th className="pb-2 font-medium">Lower</th>
                <th className="pb-2 font-medium">Δ</th>
              </tr>
            </thead>
            <tbody>
              {HME_SCENARIOS.map((row) => (
                <tr key={row.name} className="border-t border-line">
                  <td className="py-3">
                    {row.name}
                    <div className="font-mono text-xs text-muted">{row.note}</div>
                  </td>
                  <td className="py-3 font-mono text-xs tabular-nums">{row.hi.toLocaleString()}</td>
                  <td className="py-3 font-mono text-xs tabular-nums">{row.lo.toLocaleString()}</td>
                  <td className="py-3 font-mono text-xs tabular-nums">{row.save.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted">kcal/year. Assumptions live in the Adaptive Ceiling HME report. FWOCR beyond local HME is a wider hypothesis.</p>
      </Panel>

      <p className="text-sm text-muted">
        Training rule from the program: load the exchanger with air that is hard to condition. Heat and smoke stay on{" "}
        <Link to="/train" className="text-accent underline-offset-4 hover:underline">
          Train
        </Link>{" "}
        as hypothesis. The science is here, not in a step list.
      </p>
    </div>
  );
}
