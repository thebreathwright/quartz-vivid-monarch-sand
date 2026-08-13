export type LedgerState = {
  kind: "state";
  id: string;
  label: string;
  status: "ADMITTED" | "CONSUMED" | "REJECTED_INVALID" | "BASELINE";
};

export type LedgerReceipt = {
  kind: "receipt";
  id: string;
  disposition: string;
  note: string;
};

export type LedgerEntry = (LedgerState | LedgerReceipt) & { seq: number; at: string };

export class StateLedger {
  private entries: LedgerEntry[] = [];
  private seq = 1;

  appendState(state: Omit<LedgerState, "kind">, at = new Date().toISOString()) {
    const entry: LedgerEntry = { ...state, kind: "state", seq: this.seq++, at };
    this.entries.push(entry);
    return entry;
  }

  appendReceipt(receipt: Omit<LedgerReceipt, "kind">, at = new Date().toISOString()) {
    const entry: LedgerEntry = { ...receipt, kind: "receipt", seq: this.seq++, at };
    this.entries.push(entry);
    return entry;
  }

  latest(): LedgerState | null {
    for (let i = this.entries.length - 1; i >= 0; i--) {
      const entry = this.entries[i];
      if (entry.kind === "state") return entry;
    }
    return null;
  }

  latestReceipt(): LedgerReceipt | null {
    for (let i = this.entries.length - 1; i >= 0; i--) {
      const entry = this.entries[i];
      if (entry.kind === "receipt") return entry;
    }
    return null;
  }

  audit(): LedgerEntry[] {
    return [...this.entries];
  }

  reset() {
    this.entries = [];
    this.seq = 1;
  }

  hydrate(entries: LedgerEntry[]) {
    this.entries = entries.map((entry) => ({ ...entry }));
    this.seq = entries.reduce((max, entry) => Math.max(max, entry.seq), 0) + 1;
  }
}
