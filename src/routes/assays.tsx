import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Panel, StatusChip } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useBench } from "@/lib/brudo/store";

export const Route = createFileRoute("/assays")({
  component: AssaysPage,
});

function AssaysPage() {
  const { assayResults, assayRunning, runSuite } = useBench();

  useEffect(() => {
    if (assayResults.length === 0 && !assayRunning) {
      void runSuite();
    }
  }, [assayResults.length, assayRunning, runSuite]);

  const passed = assayResults.filter((r) => r.passed).length;

  return (
    <div className="space-y-8">
      <section className="max-w-2xl space-y-2">
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Discriminators</p>
        <h2 className="font-display text-3xl tracking-tight">Assay suite</h2>
        <p className="text-muted">
          These are the relations the patent graph still treats as technical facts. They are not a novelty opinion.
        </p>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => void runSuite()} disabled={assayRunning}>
          {assayRunning ? "Running…" : "Re-run suite"}
        </Button>
        <StatusChip tone={assayResults.length > 0 && passed === assayResults.length ? "admit" : "hold"}>
          {assayResults.length ? `${passed}/${assayResults.length} passed` : "idle"}
        </StatusChip>
      </div>

      <Panel title="Results" kicker="Family A + Z4 residue + G">
        <ul className="divide-y divide-line">
          {assayResults.map((row) => (
            <li key={row.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-xl">
                <p className="text-sm font-medium">{row.name}</p>
                <p className="mt-1 font-mono text-xs text-muted">{row.detail}</p>
              </div>
              <StatusChip tone={row.passed ? "admit" : "reject"}>{row.passed ? "pass" : "fail"}</StatusChip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
