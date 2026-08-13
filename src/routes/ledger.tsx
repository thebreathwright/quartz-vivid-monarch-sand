import { createFileRoute } from "@tanstack/react-router";
import { Panel, StatusChip } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useBench } from "@/lib/brudo/store";

export const Route = createFileRoute("/ledger")({
  component: LedgerPage,
});

function LedgerPage() {
  const { seedBaseline, appendInvalidAsState, appendValidAsState, ledgerEntries, controlLabel } = useBench();
  const control = [...ledgerEntries].reverse().find((e) => e.kind === "state");

  return (
    <div className="space-y-8">
      <section className="max-w-2xl space-y-2">
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Audit / control</p>
        <h2 className="font-display text-3xl tracking-tight">State ledger</h2>
        <p className="text-muted">
          Receipts never become current. latest() is the last appended state. Leak an invalid state to watch control
          collapse.
        </p>
      </section>

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={seedBaseline}>
          Append baseline
        </Button>
        <Button onClick={appendValidAsState}>Append valid state</Button>
        <Button variant="danger" onClick={appendInvalidAsState}>
          Leak invalid as state
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Control reconstruction" kicker="latest state">
          <p className="font-mono text-lg">{controlLabel}</p>
          {control && control.kind === "state" ? (
            <p className="mt-3">
              <StatusChip
                tone={
                  control.status === "REJECTED_INVALID" ? "reject" : control.status === "CONSUMED" ? "admit" : "hold"
                }
              >
                {control.status}
              </StatusChip>
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted">No state yet.</p>
          )}
        </Panel>
        <Panel title="Audit projection" kicker="every entry">
          <p className="font-mono text-lg tabular-nums">{ledgerEntries.length} records</p>
          <p className="mt-3 text-sm text-muted">Receipts remain visible here even when they are not current.</p>
        </Panel>
      </div>

      <Panel title="History" kicker="append-only">
        {ledgerEntries.length === 0 ? (
          <p className="text-sm text-muted">Empty ledger.</p>
        ) : (
          <ol className="space-y-3">
            {ledgerEntries.map((entry) => (
              <li key={entry.seq} className="flex flex-col gap-1 border-t border-line pt-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs text-muted">
                    #{entry.seq} · {entry.kind}
                  </p>
                  <p className="text-sm">{entry.kind === "state" ? entry.label : entry.note}</p>
                </div>
                <StatusChip tone={entry.kind === "receipt" ? "mute" : "hold"}>
                  {entry.kind === "state" ? entry.status : entry.disposition}
                </StatusChip>
              </li>
            ))}
          </ol>
        )}
      </Panel>
    </div>
  );
}
