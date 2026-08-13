import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Panel, StatusChip } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { nineScore, useLog, type NightLog } from "@/lib/train/log-store";

export const Route = createFileRoute("/log")({
  component: LogPage,
});

function today() {
  return new Date().toISOString().slice(0, 10);
}

function LogPage() {
  const { nights, addNight, removeNight } = useLog();
  const [date, setDate] = useState(today);
  const [mbMouth, setMbMouth] = useState(false);
  const [spo2Bar, setSpo2Bar] = useState<90 | 93 | 95 | 97>(95);
  const [minCov, setMinCov] = useState("95");
  const [pnif, setPnif] = useState("");
  const [dryMouth, setDryMouth] = useState(false);
  const [snore, setSnore] = useState(false);
  const [notes, setNotes] = useState("");
  const { score, lowest } = nineScore(nights);

  function save() {
    const row: NightLog = {
      date,
      mbMouth,
      spo2Bar,
      minCov: minCov === "" ? null : Number(minCov),
      pnif: pnif === "" ? null : Number(pnif),
      dryMouth,
      snore,
      notes,
    };
    addNight(row);
  }

  return (
    <div className="space-y-8">
      <section className="max-w-2xl space-y-2">
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">EUPNEA Six-Nines</p>
        <h2 className="font-display text-3xl tracking-tight">Measure. Do not diagnose.</h2>
        <p className="text-muted">
          Core: mouth-breathing fraction, SpO2 bar, minute coverage, 20-night consistency. Pulse oximetry is a stop
          rule, not a cause.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Nights" value={String(nights.length)} />
        <Stat label="Lowest core %" value={lowest == null ? "—" : `${lowest}`} />
        <Stat label="Nine-score" value={String(score)} />
      </div>

      <Panel title="Tonight" kicker="Self-report">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 min-h-11 w-full rounded-sm bg-raised px-3 font-mono text-sm shadow-[var(--shadow-border)]"
            />
          </label>
          <label className="text-sm">
            SpO2 bar
            <select
              value={spo2Bar}
              onChange={(e) => setSpo2Bar(Number(e.target.value) as 90 | 93 | 95 | 97)}
              className="mt-2 min-h-11 w-full rounded-sm bg-raised px-3 text-sm shadow-[var(--shadow-border)]"
            >
              {[90, 93, 95, 97].map((n) => (
                <option key={n} value={n}>
                  {n}%
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            Minute coverage ≥ bar
            <input
              inputMode="numeric"
              value={minCov}
              onChange={(e) => setMinCov(e.target.value)}
              className="mt-2 min-h-11 w-full rounded-sm bg-raised px-3 font-mono text-sm shadow-[var(--shadow-border)]"
              placeholder="95"
            />
          </label>
          <label className="text-sm">
            PNIF (L/min, optional)
            <input
              inputMode="numeric"
              value={pnif}
              onChange={(e) => setPnif(e.target.value)}
              className="mt-2 min-h-11 w-full rounded-sm bg-raised px-3 font-mono text-sm shadow-[var(--shadow-border)]"
            />
          </label>
        </div>
        <div className="mt-4 space-y-2">
          <Check label="Mouth breathing during sleep (MBPct > 0)" on={mbMouth} set={setMbMouth} />
          <Check label="Dry mouth on wake" on={dryMouth} set={setDryMouth} />
          <Check label="Snore noted" on={snore} set={setSnore} />
        </div>
        <label className="mt-4 block text-sm">
          Notes
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-2 min-h-24 w-full rounded-sm bg-raised p-3 text-sm shadow-[var(--shadow-border)]"
          />
        </label>
        <div className="mt-4">
          <Button onClick={save}>Save night</Button>
        </div>
        <p className="mt-3 text-xs text-muted">Repeat check if SpO2 is under 92. Hard stop under 90. Urgent evaluation under 88.</p>
      </Panel>

      <Panel title="Rolling record" kicker={`${nights.length} nights`}>
        {nights.length === 0 ? (
          <p className="text-sm text-muted">No nights yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="font-mono text-xs text-muted">
                <tr>
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">MB</th>
                  <th className="pb-2 font-medium">Bar</th>
                  <th className="pb-2 font-medium">Cov</th>
                  <th className="pb-2 font-medium">PNIF</th>
                  <th className="pb-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {nights.map((n) => (
                  <tr key={n.date} className="border-t border-line">
                    <td className="py-3 font-mono text-xs">{n.date}</td>
                    <td className="py-3">
                      <StatusChip tone={n.mbMouth ? "reject" : "admit"}>{n.mbMouth ? "mouth" : "nasal"}</StatusChip>
                    </td>
                    <td className="py-3 font-mono text-xs tabular-nums">{n.spo2Bar}</td>
                    <td className="py-3 font-mono text-xs tabular-nums">{n.minCov ?? "—"}</td>
                    <td className="py-3 font-mono text-xs tabular-nums">{n.pnif ?? "—"}</td>
                    <td className="py-3">
                      <button type="button" className="text-xs text-muted" onClick={() => removeNight(n.date)}>
                        Remove
                      </button>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-surface p-4 shadow-[var(--shadow-border)]">
      <p className="font-mono text-xs tracking-wider text-muted uppercase">{label}</p>
      <p className="mt-1 font-mono text-lg tabular-nums">{value}</p>
    </div>
  );
}

function Check({ label, on, set }: { label: string; on: boolean; set: (v: boolean) => void }) {
  return (
    <label className="flex min-h-11 items-center gap-3 text-sm">
      <input type="checkbox" checked={on} onChange={(e) => set(e.target.checked)} className="size-4 accent-accent" />
      {label}
    </label>
  );
}
