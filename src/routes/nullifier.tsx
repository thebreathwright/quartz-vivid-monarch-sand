import { createFileRoute } from "@tanstack/react-router";
import { Panel, StatusChip } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useBench } from "@/lib/brudo/store";
import { shortHash } from "@/lib/utils";

export const Route = createFileRoute("/nullifier")({
  component: NullifierPage,
});

function NullifierPage() {
  const {
    capabilityId,
    setCapabilityId,
    extraMutated,
    toggleMutateExtra,
    extraField,
    claim,
    nullifierRows,
  } = useBench();

  return (
    <div className="space-y-8">
      <section className="max-w-2xl space-y-2">
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Z4 residue</p>
        <h2 className="font-display text-3xl tracking-tight">Successor nullifier</h2>
        <p className="text-muted">
          Only CONSUMED occupies the unique slot. REJECTED_INVALID stays on the log and leaves the capability open.
        </p>
      </section>

      <Panel title="Claim a disposition" kicker="capability identity">
        <label className="block text-sm">
          Capability ID
          <input
            value={capabilityId}
            onChange={(e) => setCapabilityId(e.target.value)}
            className="mt-2 min-h-11 w-full rounded-sm bg-raised px-3 font-mono text-sm shadow-[var(--shadow-border)] outline-none focus:ring-1 focus:ring-accent"
          />
        </label>
        <label className="mt-4 flex min-h-11 items-center gap-3 text-sm">
          <input type="checkbox" checked={extraMutated} onChange={toggleMutateExtra} className="size-4 accent-accent" />
          Mutate extra field ({extraField}) on the next claim
        </label>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant="danger" onClick={() => void claim("REJECTED_INVALID")}>
            Claim invalid
          </Button>
          <Button onClick={() => void claim("CONSUMED")}>Claim consumed</Button>
          <Button variant="secondary" onClick={() => void claim("REJECTED_REPLAY")}>
            Claim replay
          </Button>
        </div>
      </Panel>

      <Panel title="Append-only rows" kicker={`${nullifierRows.length} events`}>
        {nullifierRows.length === 0 ? (
          <p className="text-sm text-muted">No claims yet. Invalid first, then consume, to see reopen.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="font-mono text-xs text-muted">
                <tr>
                  <th className="pb-2 font-medium">#</th>
                  <th className="pb-2 font-medium">Capability</th>
                  <th className="pb-2 font-medium">Cap hash</th>
                  <th className="pb-2 font-medium">Contract</th>
                  <th className="pb-2 font-medium">Disposition</th>
                </tr>
              </thead>
              <tbody>
                {nullifierRows.map((row) => (
                  <tr key={row.eventId} className="border-t border-line">
                    <td className="py-3 font-mono text-xs tabular-nums">{row.eventId}</td>
                    <td className="py-3 font-mono text-xs">{row.capabilityId}</td>
                    <td className="py-3 font-mono text-xs">{shortHash(row.capabilitySha256)}</td>
                    <td className="py-3 font-mono text-xs">{shortHash(row.successorContractSha256)}</td>
                    <td className="py-3">
                      <StatusChip
                        tone={
                          row.disposition === "CONSUMED"
                            ? "admit"
                            : row.disposition === "REJECTED_INVALID"
                              ? "reject"
                              : "hold"
                        }
                      >
                        {row.disposition}
                      </StatusChip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
