import { createFileRoute } from "@tanstack/react-router";
import { Panel, StatusChip } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useBench } from "@/lib/brudo/store";
import { shortHash } from "@/lib/utils";

export const Route = createFileRoute("/admit")({
  component: AdmitPage,
});

function AdmitPage() {
  const {
    rawOutput,
    setOutput,
    contracts,
    selectedContractId,
    setContract,
    loadNine,
    loadSix,
    admit,
    tryCandidate,
    receipts,
    candidates,
    lastGate,
    validationError,
    toggleValidation,
  } = useBench();

  return (
    <div className="space-y-8">
      <section className="max-w-2xl space-y-2">
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Family A</p>
        <h2 className="font-display text-3xl tracking-tight">Contract-anchored admission</h2>
        <p className="text-muted">
          Same bytes can pass one contract and fail another. Completion is not admission. Candidates require both.
        </p>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Output" kicker="Producer">
          <div className="mb-3 flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={loadNine}>
              Load nine-key
            </Button>
            <Button size="sm" variant="secondary" onClick={loadSix}>
              Load six-key
            </Button>
          </div>
          <textarea
            value={rawOutput}
            onChange={(e) => setOutput(e.target.value)}
            className="min-h-56 w-full rounded-sm bg-raised p-3 font-mono text-xs text-fg shadow-[var(--shadow-border)] outline-none focus:ring-1 focus:ring-accent"
            spellCheck={false}
          />
        </Panel>

        <Panel title="Contract and gate" kicker="Consumer">
          <div className="space-y-3">
            {contracts.map((contract) => (
              <label key={contract.id} className="flex min-h-11 cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="contract"
                  checked={selectedContractId === contract.id}
                  onChange={() => setContract(contract.id)}
                  className="size-4 accent-accent"
                />
                <span className="text-sm">{contract.label}</span>
              </label>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button onClick={() => void admit()}>Evaluate admission</Button>
            <Button variant="secondary" onClick={tryCandidate}>
              Create candidate
            </Button>
          </div>
          {lastGate ? (
            <p className="mt-4 text-sm">
              Gate: <StatusChip tone={lastGate === "ADMITTED_TO_CANDIDATE" ? "admit" : "reject"}>{lastGate}</StatusChip>
            </p>
          ) : null}
          <label className="mt-4 flex min-h-11 items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={validationError}
              onChange={toggleValidation}
              className="size-4 accent-accent"
            />
            Simulate executor validation error
          </label>
        </Panel>
      </div>

      <Panel title="Receipts" kicker={`${receipts.length} recorded`}>
        {receipts.length === 0 ? (
          <p className="text-sm text-muted">Evaluate an output to bind a receipt.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="font-mono text-xs text-muted">
                <tr>
                  <th className="pb-2 font-medium">Task</th>
                  <th className="pb-2 font-medium">Contract</th>
                  <th className="pb-2 font-medium">Digest</th>
                  <th className="pb-2 font-medium">Admission</th>
                  <th className="pb-2 font-medium">Predicate</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((row) => (
                  <tr key={row.taskId} className="border-t border-line">
                    <td className="py-3 font-mono text-xs">{row.taskId}</td>
                    <td className="py-3 font-mono text-xs">{row.resultContractId}</td>
                    <td className="py-3 font-mono text-xs">{shortHash(row.resultDigest)}</td>
                    <td className="py-3">
                      <StatusChip
                        tone={row.admissionState === "ADMITTED" ? "admit" : row.admissionState === "REJECTED" ? "reject" : "hold"}
                      >
                        {row.admissionState}
                      </StatusChip>
                    </td>
                    <td className="py-3 font-mono text-xs text-muted">{row.primaryFailedPredicate ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <Panel title="Candidates" kicker={`${candidates.length} admitted`}>
        {candidates.length === 0 ? (
          <p className="text-sm text-muted">Nothing has crossed the consumer gate.</p>
        ) : (
          <ul className="space-y-2 font-mono text-xs">
            {candidates.map((c) => (
              <li key={c.id}>
                {c.id} · receipt {c.receiptTaskId} · {shortHash(c.contentDigest)}
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
