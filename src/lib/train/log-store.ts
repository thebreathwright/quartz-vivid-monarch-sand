import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NightLog = {
  date: string;
  mbMouth: boolean;
  spo2Bar: 90 | 93 | 95 | 97;
  minCov: number | null;
  pnif: number | null;
  dryMouth: boolean;
  snore: boolean;
  notes: string;
};

export type GateState = Record<string, boolean>;

type LogState = {
  nights: NightLog[];
  gates: GateState;
  setGate: (id: string, on: boolean) => void;
  allGates: () => boolean;
  addNight: (row: NightLog) => void;
  removeNight: (date: string) => void;
};

export function nineScore(nights: NightLog[]): { score: number; lowest: number | null } {
  if (nights.length === 0) return { score: 0, lowest: null };
  const last = nights.slice(0, 20);
  const mbZero = last.filter((n) => !n.mbMouth).length / last.length;
  const cov = last.filter((n) => n.minCov != null && n.minCov >= 95).length / last.length;
  const lowest = Math.min(mbZero, cov);
  const pct = Math.round(lowest * 100);
  let score = 0;
  const s = String(pct);
  for (const ch of s) {
    if (ch === "9") score += 1;
    else break;
  }
  if (pct === 100) score = 2;
  return { score, lowest: pct };
}

export const useLog = create<LogState>()(
  persist(
    (set, get) => ({
      nights: [],
      gates: {},
      setGate: (id, on) => set({ gates: { ...get().gates, [id]: on } }),
      allGates: () =>
        ["notWater", "notDriving", "notAdministerChild", "notPregnantPressure", "notSevereUnreviewed", "notCombustion", "selfHold", "selfAssess"].every(
          (id) => get().gates[id],
        ),
      addNight: (row) =>
        set({
          nights: [row, ...get().nights.filter((n) => n.date !== row.date)].sort((a, b) => (a.date < b.date ? 1 : -1)),
        }),
      removeNight: (date) => set({ nights: get().nights.filter((n) => n.date !== date) }),
    }),
    { name: "brudo-six-nines" },
  ),
);
