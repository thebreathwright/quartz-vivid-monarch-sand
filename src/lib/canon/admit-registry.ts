import { EXPECTED, type ClaimProvenance } from "./loader";
import type { ClaimRecord } from "./types";

export type RegistryIdentity = {
  archiveSha256: string;
  memberSha256: string;
  declaredSourceMember: string;
};

export type RegistryAdmission =
  | { admissionState: "ADMITTED"; primaryFailedPredicate: null; identity: RegistryIdentity }
  | { admissionState: "REJECTED"; primaryFailedPredicate: string; identity: RegistryIdentity | null };

const ID_RE = /^RAC-CLM-(\d{3})$/;

export function sequentialIds(records: ClaimRecord[], expectedCount: number): boolean {
  if (records.length !== expectedCount) return false;
  return records.every((row, i) => row.id === `RAC-CLM-${String(i + 1).padStart(3, "0")}` && ID_RE.test(row.id));
}

/** Dual-digest identity. Extract digest is evidence of serialization, not of the member. */
export function registryIdentity(p: Pick<ClaimProvenance, "archiveSha256" | "memberSha256" | "declaredSourceMember">): RegistryIdentity {
  return {
    archiveSha256: p.archiveSha256,
    memberSha256: p.memberSha256,
    declaredSourceMember: p.declaredSourceMember,
  };
}

export function admitRegistry(input: {
  records: ClaimRecord[];
  provenance: ClaimProvenance;
  expected?: typeof EXPECTED;
  allowWholesale?: boolean;
  writeDatabase?: boolean;
}): RegistryAdmission {
  const expected = input.expected ?? EXPECTED;
  const identity = registryIdentity(input.provenance);

  if (input.allowWholesale || input.provenance.wholesaleArchiveIngested) {
    return { admissionState: "REJECTED", primaryFailedPredicate: "WHOLESALE_INGEST_REFUSED", identity };
  }
  if (input.writeDatabase || input.provenance.databaseWritten) {
    return { admissionState: "REJECTED", primaryFailedPredicate: "DATABASE_WRITE_REFUSED", identity };
  }
  if (!input.provenance.declaredSourceMember || input.provenance.declaredSourceMember !== expected.declaredSourceMember) {
    return { admissionState: "REJECTED", primaryFailedPredicate: "DECLARED_MEMBER_MISMATCH", identity };
  }
  if (input.provenance.archiveSha256 !== expected.archiveSha256) {
    return { admissionState: "REJECTED", primaryFailedPredicate: "CONTAINER_DIGEST_MISMATCH", identity };
  }
  if (input.provenance.memberSha256 !== expected.memberSha256) {
    return { admissionState: "REJECTED", primaryFailedPredicate: "MEMBER_DIGEST_MISMATCH", identity };
  }
  if (input.provenance.archiveSha256 === input.provenance.extractSha256) {
    return { admissionState: "REJECTED", primaryFailedPredicate: "CONTAINER_EXTRACT_COLLAPSED", identity };
  }
  if (input.provenance.memberSha256 === input.provenance.extractSha256) {
    return { admissionState: "REJECTED", primaryFailedPredicate: "MEMBER_EXTRACT_COLLAPSED", identity };
  }
  if (input.provenance.extractRelation !== "same-payload-different-serialization") {
    return { admissionState: "REJECTED", primaryFailedPredicate: "EXTRACT_RELATION_UNLABELED", identity };
  }
  if (!sequentialIds(input.records, expected.expectedCount)) {
    return { admissionState: "REJECTED", primaryFailedPredicate: "ID_SEQUENCE_INVALID", identity };
  }
  if (!input.provenance.valid) {
    return { admissionState: "REJECTED", primaryFailedPredicate: "PROVENANCE_INVALID", identity };
  }
  return { admissionState: "ADMITTED", primaryFailedPredicate: null, identity };
}
