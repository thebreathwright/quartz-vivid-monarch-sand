/** Five recurring mistakes. One implication boundary. Native src/brudo/. */

export const FIVE = [
  "I1_UNKNOWN_NOT_CONSEQUENCE",
  "I2_REPRESENTATION_NOT_OBJECT",
  "I3_PRIOR_NOT_NEW_CONSEQUENCE",
  "I4_RECORD_NOT_CONTROL",
  "I5_PART_NOT_WHOLE",
] as const;

export type ImplicationId = (typeof FIVE)[number];
export type Facts = Record<string, boolean | undefined>;

export type Hit = { id: ImplicationId; ok: boolean; detail: string };

export function checkImplications(f: Facts): Hit[] {
  const hits: Hit[] = [];

  const unknownDonate =
    (f.UNKNOWN || f.UNASSESSED) && (f.WANT_CONSEQUENCE || f.WANT_EXECUTE) && !f.RESOLVE_ONLY;
  hits.push({
    id: "I1_UNKNOWN_NOT_CONSEQUENCE",
    ok: !unknownDonate,
    detail: unknownDonate ? "unknown donated consequence" : "held",
  });

  const pictureIsObject =
    (f.PI_W_EQ_R && f.INFER_W_EQ_INV_PI) ||
    (f.SPACED_LAYOUT && f.INFER_SOURCE_UNEDITED) ||
    (f.TISSUE_SCHEMA && f.INFER_TISSUE_TRAINED);
  hits.push({
    id: "I2_REPRESENTATION_NOT_OBJECT",
    ok: !pictureIsObject,
    detail: pictureIsObject ? "representation treated as object" : "held",
  });

  const priorDonates =
    (f.ARCHIVE && f.WANT_EXECUTE && !f.CUSTODY_GRANT) ||
    (f.EMPTY_PENDING && f.INFER_RELEVANT_NEW) ||
    (f.PERSONAL_RESULT && f.INFER_COHORT);
  hits.push({
    id: "I3_PRIOR_NOT_NEW_CONSEQUENCE",
    ok: !priorDonates,
    detail: priorDonates ? "prior donated new consequence" : "held",
  });

  const recordIsControl =
    (f.DELTA_AUDIT && f.INFER_DELTA_CONTROL) ||
    (f.DELTA_RENDER && f.INFER_DELTA_CONTROL) ||
    (f.DELTA_EXPORT && f.INFER_DELTA_CONTROL) ||
    (f.REJECTED && f.UNASSESSED);
  hits.push({
    id: "I4_RECORD_NOT_CONTROL",
    ok: !recordIsControl,
    detail: recordIsControl ? "record treated as control" : "held",
  });

  const partIsWhole =
    (f.BLOCKED_BRANCH && f.INFER_BLOCKED_TREE) || (f.MUSCLE_WORK && f.WANT_FLOW && !f.OPEN_RAMP);
  hits.push({
    id: "I5_PART_NOT_WHOLE",
    ok: !partIsWhole,
    detail: partIsWhole ? "part treated as whole" : "held",
  });

  return hits;
}

export function boundaryHolds(hits: Hit[]): boolean {
  return hits.every((h) => h.ok);
}
