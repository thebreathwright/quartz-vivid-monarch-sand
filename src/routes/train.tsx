import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Panel, StatusChip } from "@/components/app-shell";
import { GATES, HARD_STOPS, MODULES, publicStepViolations, type TrainModule } from "@/lib/train/modules";
import { useLog } from "@/lib/train/log-store";

export const Route = createFileRoute("/train")({
  component: TrainPage,
});

function TrainPage() {
  const { gates, setGate, allGates } = useLog();
  const [open, setOpen] = useState<string>(MODULES[0].id);
  const allowed = allGates();
  const current = MODULES.find((m) => m.id === open) ?? MODULES[0];

  return (
    <div className="space-y-8">
      <section className="max-w-2xl space-y-2">
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">THE BE EU program</p>
        <h2 className="font-display text-3xl tracking-tight">Train the stack. Keep the firewall on.</h2>
        <p className="text-muted">
          A hold is supervised by the one holding. You breathe when you need air. Water, blackout-chasing, combustion,
          and pregnancy pressure work stay blocked.
        </p>
      </section>

      <Panel title="Gate" kicker="Required before public modules">
        <ul className="space-y-2">
          {GATES.map((g) => (
            <li key={g.id}>
              <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(gates[g.id])}
                  onChange={(e) => setGate(g.id, e.target.checked)}
                  className="mt-1 size-4 accent-accent"
                />
                <span>{g.label}</span>
              </label>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          <StatusChip tone={allowed ? "admit" : "hold"}>{allowed ? "gates open" : "gates closed"}</StatusChip>
        </p>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-[16rem_1fr]">
        <div className="flex gap-2 overflow-x-auto lg:flex-col">
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              type="button"
              onClick={() => setOpen(mod.id)}
              className={`min-h-11 shrink-0 rounded-sm px-3 text-left text-sm ${
                open === mod.id ? "bg-raised text-fg" : "text-muted"
              }`}
            >
              {mod.name}
            </button>
          ))}
        </div>
        <ModuleCard module={current} unlocked={allowed} />
      </div>

      <Panel title="Hard stops" kicker="Any one ends the session">
        <ul className="grid gap-2 sm:grid-cols-2">
          {HARD_STOPS.map((s) => (
            <li key={s} className="text-sm text-muted">
              {s}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

function ModuleCard({ module, unlocked }: { module: TrainModule; unlocked: boolean }) {
  const blocked = Boolean(module.firewall?.includes("no_public_steps")) || module.id === "hot-dry";
  const publicOk = module.render === "public_instruction" && module.publicSteps.length > 0 && !blocked;
  return (
    <Panel title={module.name} kicker={module.component}>
      <div className="mb-3 flex flex-wrap gap-2">
        <StatusChip tone={publicOk ? "admit" : "hold"}>{module.render}</StatusChip>
        {module.firewall ? <StatusChip tone="hold">{module.firewall}</StatusChip> : null}
        {module.sourceName ? <StatusChip tone="mute">{module.sourceName}</StatusChip> : null}
        {module.laws.map((law) => (
          <StatusChip key={law} tone="mute">
            {law}
          </StatusChip>
        ))}
      </div>
      <p className="text-sm text-muted">{module.note}</p>
      <p className="mt-3 font-mono text-xs text-muted">Measure · {module.measure}</p>

      {publicOk && !unlocked ? (
        <p className="mt-5 text-sm">Accept every gate to open public modules.</p>
      ) : publicOk && unlocked ? (
        <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm">
          {module.publicSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      ) : (
        <div className="mt-5 space-y-2 text-sm">
          <p>No public step list. This module stays {module.render.replaceAll("_", " ")}.</p>
          <p className="text-muted">
            Source archive contains a method. The firewall will not render it as a home protocol. This is a hypothesis,
            not unsupervised respiratory instruction.
          </p>
        </div>
      )}

      <div className="mt-5">
        <p className="font-mono text-xs text-muted uppercase">Stop if</p>
        <ul className="mt-2 space-y-1 text-sm text-muted">
          {module.stop.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
