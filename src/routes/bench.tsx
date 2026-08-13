import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Panel, StatusChip } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useBench } from "@/lib/brudo/store";

export const Route = createFileRoute("/bench")({
  component: BenchPage,
});

function BenchPage() {
  const { assayResults, assayRunning, events, controlLabel, nullifierRows, receipts, runSuite, resetAll, seedBaseline } =
    useBench();

  useEffect(() => {
    if (assayResults.length === 0 && !assayRunning) {
      void runSuite();
    }
  }, [assayResults.length, assayRunning, runSuite]);

  const passed = assayResults.filter((r) => r.passed).length;
  const latest = receipts[0];

  return (
    <div className="space-y-8">
      <section className="max-w-2xl space-y-3">
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Runtime</p>
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          Two machines. One bench. No donated status.
        </h2>
        <p className="text-muted">
          Contract identity controls admission. A failed successor does not consume its capability. Audit keeps the
          failure. Control only moves when you write a state.
        </p>
      </section>

      <div className="flex flex-wrap gap-2">
        {[
          ["/admit", "Admit"],
          ["/nullifier", "Nullifier"],
          ["/ledger", "Ledger"],
          ["/assays", "Assays"],
          ["/graph", "Graph"],
        ].map(([to, label]) => (
          <Link
            key={to}
            to={to}
            className="inline-flex min-h-11 items-center rounded-sm bg-raised px-3 text-sm shadow-[var(--shadow-border)]"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Assays" value={assayResults.length ? `${passed}/${assayResults.length}` : "—"} />
        <Stat label="Control" value={controlLabel} />
        <Stat label="Nullifier rows" value={String(nullifierRows.length)} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => void runSuite()} disabled={assayRunning}>
          {assayRunning ? "Running…" : "Run assay suite"}
        </Button>
        <Button variant="secondary" onClick={seedBaseline}>
          Seed baseline
        </Button>
        <Button variant="ghost" onClick={resetAll}>
          Reset
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Latest receipt" kicker="Family A">
          {latest ? (
            <dl className="space-y-2 font-mono text-xs">
              <Row k="task" v={latest.taskId} />
              <Row k="contract" v={latest.resultContractId} />
              <Row k="execution" v={latest.executionState} />
              <Row
                k="admission"
                v={latest.admissionState}
                tone={latest.admissionState === "ADMITTED" ? "admit" : latest.admissionState === "REJECTED" ? "reject" : "hold"}
              />
              <Row k="predicate" v={latest.primaryFailedPredicate ?? "none"} />
            </dl>
          ) : (
            <p className="text-sm text-muted">No receipt yet. Open Admit and evaluate an output.</p>
          )}
        </Panel>
        <Panel title="What the suite is testing" kicker="Discriminators">
          <ul className="space-y-3">
            {assayResults.slice(0, 5).map((row) => (
              <li key={row.id} className="flex items-start justify-between gap-3">
                <span className="text-sm">{row.name}</span>
                <StatusChip tone={row.passed ? "admit" : "reject"}>{row.passed ? "pass" : "fail"}</StatusChip>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Event log" kicker="Recent">
        {events.length === 0 ? (
          <p className="text-sm text-muted">Quiet. Run the suite or make a claim.</p>
        ) : (
          <ul className="space-y-2">
            {events.slice(0, 8).map((event) => (
              <li key={event.at + event.text} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                <span className="font-mono text-xs text-faint tabular-nums">{event.at.slice(11, 19)}</span>
                <span className="text-sm">{event.text}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-surface p-4 shadow-[var(--shadow-border)]">
      <p className="font-mono text-xs tracking-wider text-muted uppercase">{label}</p>
      <p className="mt-1 font-mono text-lg tabular-nums">{value}</p>
    </div>
  );
}

function Row({ k, v, tone }: { k: string; v: string; tone?: "admit" | "reject" | "hold" }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted">{k}</dt>
      <dd>{tone ? <StatusChip tone={tone}>{v}</StatusChip> : <span className="text-fg">{v}</span>}</dd>
    </div>
  );
}
