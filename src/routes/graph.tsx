import { createFileRoute } from "@tanstack/react-router";
import { Panel, StatusChip } from "@/components/app-shell";
import { BOUNDARY_H, BOUNDARY_H_FILE, BOUNDARY_H_SHA256 } from "@/lib/canon/boundary-h";

export const Route = createFileRoute("/graph")({
  component: GraphPage,
});

const FAMILIES = [
  {
    id: "A / Z1",
    title: "Contract-anchored admission",
    status: "PRIMARY",
    tone: "admit" as const,
    body: "Result contract rides in work identity and the receipt. UNKNOWN authorizes Resolve only — never Consequence. UNASSESSED cannot donate EXECUTE. REJECTED cannot become UNASSESSED.",
  },
  {
    id: "B / Z2",
    title: "Replay / non-amplification",
    status: "EDGE RUN",
    tone: "admit" as const,
    body: "ARCHIVE admission does not donate EXECUTE. A later EXECUTE needs a current grant. Z4 is not this family.",
  },
  {
    id: "C / Z3",
    title: "Historical ≠ current",
    status: "DEPENDENT",
    tone: "mute" as const,
    body: "Invalid rows may remain as audit. Control moves only by state append. LINEAGE_BLOCKED lives here.",
  },
  {
    id: "D",
    title: "Consequence quotient",
    status: "HOLD",
    tone: "hold" as const,
    body: "Witness symbols were not established in the handmade-set source search.",
  },
  {
    id: "E/F",
    title: "Quiescence / self-prompt",
    status: "RESEARCH",
    tone: "mute" as const,
    body: "active_work = 0 is not project-complete. Not a standalone family.",
  },
  {
    id: "Z4",
    title: "Successor nullifier",
    status: "KILLED NUCLEUS",
    tone: "reject" as const,
    body: "Independent nucleus dead. Infrastructure retained. Audit retention merged to C/Z3. Production ledger adapter is engineering-only. Do not resurrect with more fields.",
  },
  {
    id: "G",
    title: "Dual-digest extract-only registry",
    status: "TECHNICAL CANDIDATE",
    tone: "admit" as const,
    body: "Admission identity is (container digest, declared member digest). Same payload under a different serialization does not donate either identity to the extract. Wholesale ingest and database write are refused. Novelty unassessed.",
  },
];

function GraphPage() {
  return (
    <div className="space-y-8">
      <section className="max-w-2xl space-y-2">
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Patent graph</p>
        <h2 className="font-display text-3xl tracking-tight">Families after damage</h2>
        <p className="text-muted">
          Research and drafting only. Implementation-backed is not patentable. Search absence is not novelty.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {FAMILIES.map((family) => (
          <Panel key={family.id} title={family.title} kicker={`Family ${family.id}`}>
            <StatusChip tone={family.tone}>{family.status}</StatusChip>
            <p className="mt-4 text-sm text-muted">{family.body}</p>
          </Panel>
        ))}
      </div>

      <section className="max-w-2xl space-y-2">
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Negative boundary</p>
        <h3 className="font-display text-2xl tracking-tight">One record. Three classes.</h3>
      </section>

      <Panel title="Five-implication boundary" kicker="src/brudo">
        <p className="text-sm text-muted">
          UNKNOWN ⇏ Consequence. Representation ⇏ object. Prior ⇏ new consequence. Record ⇏ control. Part ⇏
          whole. A caller-supplied grant is not custody. Seventeen cases frozen. Not Z4.
        </p>
        <p className="mt-3 break-all font-mono text-xs text-muted">
          src/brudo/implication.ts
          <br />
          fe4f95b4176c732d71c00d765b9e22beff09a1ae9daff125fe3e6949d8c19d3b
        </p>
      </Panel>

      <Panel title={`Family ${BOUNDARY_H.id}`} kicker={BOUNDARY_H.kind}>
        <div className="mb-3 flex flex-wrap gap-2">
          <StatusChip tone="reject">{BOUNDARY_H.status}</StatusChip>
          <StatusChip tone="hold">{BOUNDARY_H.smoke_route}</StatusChip>
        </div>
        <p className="break-all font-mono text-xs text-muted">
          {BOUNDARY_H_FILE}
          <br />
          {BOUNDARY_H_SHA256}
        </p>
        <ul className="mt-5 space-y-4">
          {BOUNDARY_H.classes.map((row) => (
            <li key={row.id}>
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-muted">{row.id}</span>
                <StatusChip tone={row.status === "SURVIVES" ? "admit" : "reject"}>{row.class}</StatusChip>
                <StatusChip tone="mute">{row.status}</StatusChip>
              </div>
              <p className="text-sm text-muted">{row.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 font-mono text-xs text-muted">Killed · {BOUNDARY_H.killed.join(" · ")}</p>
      </Panel>
    </div>
  );
}
