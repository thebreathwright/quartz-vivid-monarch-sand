export type NullifierDisposition = "CONSUMED" | "REJECTED_REPLAY" | "REJECTED_INVALID";

export type NullifierClaim = {
  capabilityId: string;
  capabilitySha256: string;
  successorContractSha256: string;
  predecessorStateSha256: string;
  consequenceScopeSha256: string;
  authorityEpochSha256: string;
  disposition: NullifierDisposition;
};

export type NullifierRow = NullifierClaim & {
  eventId: number;
  recordedAt: string;
};

export type ClaimResult =
  | { ok: true; eventId: number; row: NullifierRow }
  | { ok: false; reason: "ALREADY_CONSUMED" | "UNSUPPORTED_DISPOSITION" };

export class SuccessorNullifier {
  private rows: NullifierRow[] = [];
  private nextId = 1;

  list(): NullifierRow[] {
    return [...this.rows];
  }

  forCapability(capabilityId: string): NullifierRow[] {
    return this.rows.filter((row) => row.capabilityId === capabilityId);
  }

  isConsumed(capabilityId: string, capabilitySha256: string): boolean {
    return this.rows.some(
      (row) =>
        row.capabilityId === capabilityId &&
        row.capabilitySha256 === capabilitySha256 &&
        row.disposition === "CONSUMED",
    );
  }

  claim(claim: NullifierClaim, recordedAt = new Date().toISOString()): ClaimResult {
    if (!["CONSUMED", "REJECTED_REPLAY", "REJECTED_INVALID"].includes(claim.disposition)) {
      return { ok: false, reason: "UNSUPPORTED_DISPOSITION" };
    }
    if (
      claim.disposition === "CONSUMED" &&
      this.isConsumed(claim.capabilityId, claim.capabilitySha256)
    ) {
      return { ok: false, reason: "ALREADY_CONSUMED" };
    }
    const row: NullifierRow = {
      ...claim,
      eventId: this.nextId++,
      recordedAt,
    };
    this.rows.push(row);
    return { ok: true, eventId: row.eventId, row };
  }

  reset() {
    this.rows = [];
    this.nextId = 1;
  }

  hydrate(rows: NullifierRow[]) {
    this.rows = rows.map((row) => ({ ...row }));
    this.nextId = rows.reduce((max, row) => Math.max(max, row.eventId), 0) + 1;
  }
}
