import { createFileRoute } from "@tanstack/react-router";
import { Panel, StatusChip } from "@/components/app-shell";

export const Route = createFileRoute("/ass001")({
  component: Ass001Page,
});

function Ass001Page() {
  return (
    <div className="space-y-8">
      <section className="max-w-2xl space-y-2">
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Hypothesis only</p>
        <h2 className="font-display text-3xl tracking-tight">ASS001 — two or none.</h2>
        <p className="text-muted">
          The firewall default for pregnancy is hypothesis_only. This page does not teach Throat Extension. It states
          the claim, the tildes, and what would have to be measured.
        </p>
      </section>

      <div className="flex flex-wrap gap-2">
        <StatusChip tone="hold">hypothesis_only</StatusChip>
        <StatusChip tone="reject">no public instruction</StatusChip>
        <StatusChip tone="mute">supervised_pilot_only if ever dosed</StatusChip>
      </div>

      <Panel title="The statement" kicker="Archive voice, labeled">
        <p className="text-sm leading-relaxed">
          Throat Extension, when dosed like progressive overload — intensely and repeatedly — is claimed to ~prevent
          ~all ~apneas. Each of those last three words is a spectrum. The practical stake named in the archive: a
          pregnant woman does not breathe for one. She breathes for two, or for none. Collapsing airway is hypothesized
          to transmit hypoxic, acidotic, and alkalotic injury.
        </p>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="What is not established" kicker="Strictness 5">
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
            <li>No trial that this maneuver prevents all maternal apneas.</li>
            <li>No dose-response curve in pregnancy.</li>
            <li>Neighboring art (oropharyngeal myofunctional therapy) is not this maneuver.</li>
            <li>“Prevent / all / apneas” cannot be promoted past X_speculative / L2_modeled.</li>
          </ul>
        </Panel>
        <Panel title="What a pilot would have to show" kicker="If anyone ever runs one">
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
            <li>Ethics review. Obstetric and sleep supervision. Explicit stop rules.</li>
            <li>Maternal SpO2, AHI/RDI, PNIF, symptoms. Fetal monitoring as the IRB requires.</li>
            <li>Hard stop below SpO2 90. Urgent evaluation below 88.</li>
            <li>No unsupervised Valsalva. No water. No driving. No pediatric copy.</li>
          </ul>
        </Panel>
      </div>

      <Panel title="Language policy" kicker="Firewall">
        <p className="text-sm text-muted">
          No blame language. No universal cure. No replacement of prescribed CPAP or obstetric care. The archive may
          keep its raw voice. Public render may not turn that voice into steps.
        </p>
      </Panel>
    </div>
  );
}
