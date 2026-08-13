import raw from "./claims.json";
import type { ClaimRecord } from "./types";

export type BindMode = "extract-only";

export type ClaimProvenance = {
  bindMode: BindMode;
  sourceArchive: string;
  declaredSourceMember: string;
  declaredSourceMemberPath: string;
  sourceFile: string;
  extractFile: string;
  archiveSha256: string;
  memberSha256: string;
  seedSha256: string;
  extractSha256: string;
  recordDigest: string;
  extractRelation: "same-payload-different-serialization";
  expectedCount: number;
  count: number;
  firstId: string | null;
  lastId: string | null;
  wholesaleArchiveIngested: false;
  databaseWritten: false;
  valid: boolean;
  failures: string[];
};

const REQUIRED: (keyof ClaimRecord)[] = [
  "id",
  "priority_rank",
  "short_text",
  "level",
  "layer",
  "special_tags",
  "source_refs",
  "rationale",
  "confidence",
  "depends_on_claims",
  "suggested_next_validation",
  "public_rendering_rule",
  "created_utc",
];

/** Declared source is the seed member. claims.json is only the runtime extract. */
export const EXPECTED = {
  sourceArchive: "UP2SPEED.zip",
  declaredSourceMember: "03_claim_registry.seed.jsonl",
  declaredSourceMemberPath:
    "ALEF_v0.4_schema_validated_package/CANONICAL_RECONSTRUCTION_SYSTEM/03_claim_registry.seed.jsonl",
  extractFile: "src/lib/canon/claims.json",
  archiveSha256: "7b1e4af5a750682dbd4a8d4e82fffbc69ca8e983c83dbe0523db26320982e591",
  memberSha256: "783eadf6a209e64ee2e9908f54692297a8bcbd08ee5e4a652e98dbe482256495",
  seedSha256: "783eadf6a209e64ee2e9908f54692297a8bcbd08ee5e4a652e98dbe482256495",
  extractSha256: "c103fb41c8a50585b32ad2977ccb14ff50c38f288375bfeac1ccd574b71dbc73",
  recordDigest: "a16b123779ec1346c8d7e0d09df6fd753f2a8ad342979550a04aa7544a588cdf",
  extractRelation: "same-payload-different-serialization" as const,
  expectedCount: 60,
  firstId: "RAC-CLM-001",
  lastId: "RAC-CLM-060",
} as const;

function asRecords(value: unknown): ClaimRecord[] {
  if (!Array.isArray(value)) return [];
  return value.filter((row): row is ClaimRecord => {
    if (!row || typeof row !== "object") return false;
    return REQUIRED.every((key) => key in row);
  });
}

export function loadClaimRegistry(): { records: ClaimRecord[]; provenance: ClaimProvenance } {
  const records = asRecords(raw);
  const failures: string[] = [];
  if (records.length !== EXPECTED.expectedCount) {
    failures.push(`count ${records.length} != ${EXPECTED.expectedCount}`);
  }
  if (records[0]?.id !== EXPECTED.firstId) failures.push("first id mismatch");
  if (records.at(-1)?.id !== EXPECTED.lastId) failures.push("last id mismatch");
  const ids = records.map((r) => r.id);
  if (new Set(ids).size !== ids.length) failures.push("duplicate ids");
  const expectedIds = Array.from({ length: EXPECTED.expectedCount }, (_, i) =>
    `RAC-CLM-${String(i + 1).padStart(3, "0")}`,
  );
  if (ids.join() !== expectedIds.join()) failures.push("id sequence is not RAC-CLM-001..060");

  const provenance: ClaimProvenance = {
    bindMode: "extract-only",
    sourceArchive: EXPECTED.sourceArchive,
    declaredSourceMember: EXPECTED.declaredSourceMember,
    declaredSourceMemberPath: EXPECTED.declaredSourceMemberPath,
    sourceFile: EXPECTED.declaredSourceMemberPath,
    extractFile: EXPECTED.extractFile,
    archiveSha256: EXPECTED.archiveSha256,
    memberSha256: EXPECTED.memberSha256,
    seedSha256: EXPECTED.seedSha256,
    extractSha256: EXPECTED.extractSha256,
    recordDigest: EXPECTED.recordDigest,
    extractRelation: EXPECTED.extractRelation,
    expectedCount: EXPECTED.expectedCount,
    count: records.length,
    firstId: records[0]?.id ?? null,
    lastId: records.at(-1)?.id ?? null,
    wholesaleArchiveIngested: false,
    databaseWritten: false,
    valid: failures.length === 0,
    failures,
  };

  return { records, provenance };
}

const LOADED = loadClaimRegistry();
export const CLAIM_RECORDS = LOADED.records;
export const CLAIM_PROVENANCE = LOADED.provenance;
export const CLAIM_COUNT = LOADED.records.length;
export const CLAIM_SOURCE = EXPECTED.declaredSourceMember;
