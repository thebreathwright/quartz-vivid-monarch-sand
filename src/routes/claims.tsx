import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Panel, StatusChip } from "@/components/app-shell";
import { CLAIM_COUNT, CLAIM_PROVENANCE, CLAIM_RECORDS, CLAIM_SOURCE, type ClaimRecord } from "@/lib/canon/types";

export const Route = createFileRoute("/claims")({
  component: ClaimsPage,
});

function haystack(c: ClaimRecord) {
  return [
    c.id,
    c.short_text,
    c.rationale,
    c.layer,
    c.confidence,
    c.suggested_next_validation,
    c.public_rendering_rule,
    ...c.level,
    ...c.special_tags,
    ...c.source_refs,
    ...c.depends_on_claims,
  ]
    .join(" ")
    .toLowerCase();
}

function ClaimsPage() {
  const [q, setQ] = useState("");
  const [layer, setLayer] = useState("all");
  const [level, setLevel] = useState("all");
  const layers = useMemo(() => ["all", ...Array.from(new Set(CLAIM_RECORDS.map((c) => c.layer)))], []);
  const levels = useMemo(() => ["all", ...Array.from(new Set(CLAIM_RECORDS.flatMap((c) => c.level)))], []);
  const filtered = CLAIM_RECORDS.filter((c) => {
    const hit = !q || haystack(c).includes(q.toLowerCase());
    const layerOk = layer === "all" || c.layer === layer;
    const levelOk = level === "all" || c.level.includes(level);
    return hit && layerOk && levelOk;
  });

  return (
    <div className="space-y-8">
      <section className="max-w-2xl space-y-2">
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Claim registry</p>
        <h2 className="font-display text-3xl tracking-tight">{CLAIM_COUNT} seed records. None promoted.</h2>
        <p className="text-muted">
          Extract-only bind. The archive is the source. These {CLAIM_COUNT} records are the labeled extract, not a
          wholesale ingest and not a database write.
        </p>
      </section>

      <Panel title="Provenance" kicker={CLAIM_PROVENANCE.valid ? "valid extract" : "bind failed"}>
        <dl className="grid gap-3 font-mono text-xs sm:grid-cols-2">
          <div>
            <dt className="text-muted">Container</dt>
            <dd className="break-all">
              {CLAIM_PROVENANCE.sourceArchive}
              <br />
              {CLAIM_PROVENANCE.archiveSha256}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Declared source member</dt>
            <dd className="break-all">
              {CLAIM_PROVENANCE.declaredSourceMember}
              <br />
              {CLAIM_PROVENANCE.declaredSourceMemberPath}
              <br />
              {CLAIM_PROVENANCE.memberSha256}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Extract</dt>
            <dd className="break-all">
              {CLAIM_PROVENANCE.extractFile}
              <br />
              {CLAIM_PROVENANCE.extractSha256}
              <br />
              {CLAIM_PROVENANCE.extractRelation}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Record digest</dt>
            <dd className="break-all">{CLAIM_PROVENANCE.recordDigest}</dd>
          </div>
          <div>
            <dt className="text-muted">Range</dt>
            <dd>
              {CLAIM_PROVENANCE.firstId} → {CLAIM_PROVENANCE.lastId} · {CLAIM_PROVENANCE.count}/
              {CLAIM_PROVENANCE.expectedCount}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Database</dt>
            <dd>not written · wholesale ingest {String(CLAIM_PROVENANCE.wholesaleArchiveIngested)}</dd>
          </div>
        </dl>
      </Panel>

      <div className="flex flex-col gap-3 lg:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search id, text, rationale, tags, sources"
          className="min-h-11 flex-1 rounded-sm bg-raised px-3 text-sm shadow-[var(--shadow-border)] outline-none focus:ring-1 focus:ring-accent"
        />
        <select
          value={layer}
          onChange={(e) => setLayer(e.target.value)}
          className="min-h-11 rounded-sm bg-raised px-3 text-sm shadow-[var(--shadow-border)]"
        >
          {layers.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="min-h-11 rounded-sm bg-raised px-3 text-sm shadow-[var(--shadow-border)]"
        >
          {levels.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <p className="font-mono text-xs text-muted tabular-nums">
        {filtered.length} / {CLAIM_COUNT} shown
      </p>

      <div className="space-y-3">
        {filtered.map((claim) => (
          <Panel key={claim.id} title={claim.short_text} kicker={`${claim.id} · rank ${claim.priority_rank}`}>
            <div className="flex flex-wrap gap-2">
              {claim.level.map((lv) => (
                <StatusChip key={lv} tone={lv.startsWith("X_") || lv.startsWith("S_") ? "hold" : "mute"}>
                  {lv}
                </StatusChip>
              ))}
              <StatusChip tone="mute">{claim.confidence}</StatusChip>
              {claim.special_tags.map((tag) => (
                <StatusChip key={tag} tone="mute">
                  {tag}
                </StatusChip>
              ))}
            </div>
            <p className="mt-3 text-sm">{claim.rationale}</p>
            <dl className="mt-4 grid gap-2 text-xs text-muted sm:grid-cols-2">
              <div>
                <dt className="font-mono uppercase">Layer</dt>
                <dd>{claim.layer}</dd>
              </div>
              <div>
                <dt className="font-mono uppercase">Sources</dt>
                <dd>{claim.source_refs.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-mono uppercase">Depends on</dt>
                <dd>{claim.depends_on_claims.length ? claim.depends_on_claims.join(", ") : "none"}</dd>
              </div>
              <div>
                <dt className="font-mono uppercase">Next validation</dt>
                <dd>{claim.suggested_next_validation}</dd>
              </div>
            </dl>
            <p className="mt-3 font-mono text-xs text-faint">{claim.public_rendering_rule}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
