import { compiledTome, lexPass, runLex, type Fact } from "./tome";

export type Zone = "Z1" | "Z2" | "Z3";

export type LexCase = {
  id: string;
  zone: Zone;
  name: string;
  facts: Fact;
  expectPass: boolean;
};

/** Named cases. Not a borrowed score. Z4 is not a destination. */
export const TOME_CASES: LexCase[] = [
  { id: "z1-unknown-may-resolve", zone: "Z1", name: "UNKNOWN may Resolve", facts: { UNKNOWN: true, RESOLVE: true }, expectPass: true },
  { id: "z1-unknown-no-consequence", zone: "Z1", name: "UNKNOWN does not donate Consequence", facts: { UNKNOWN: true, WANT_CONSEQUENCE: true }, expectPass: false },
  { id: "z1-unknown-no-execute", zone: "Z1", name: "UNKNOWN does not donate Execute", facts: { UNKNOWN: true, WANT_EXECUTE: true }, expectPass: false },
  { id: "z1-unassessed-no-consequence", zone: "Z1", name: "UNASSESSED does not donate Consequence", facts: { UNASSESSED: true, WANT_CONSEQUENCE: true }, expectPass: false },
  { id: "z1-picture-is-not-object", zone: "Z1", name: "π(W)=R does not imply W is the inverse", facts: { PI_W_EQ_R: true, INFER_W_EQ_INV_PI: true }, expectPass: false },
  { id: "z1-layout-is-authorship", zone: "Z1", name: "Spaced layout is not the unedited source", facts: { SPACED_LAYOUT: true, INFER_SOURCE_UNEDITED: true }, expectPass: false },
  { id: "z2-archive-no-execute", zone: "Z2", name: "ARCHIVE does not donate Execute", facts: { ARCHIVE: true, WANT_EXECUTE: true }, expectPass: false },
  { id: "z2-archive-with-grant", zone: "Z2", name: "ARCHIVE plus current grant is not donation", facts: { ARCHIVE: true, WANT_EXECUTE: true, CURRENT_GRANT: true }, expectPass: true },
  { id: "z2-empty-not-relevant-new", zone: "Z2", name: "Empty pending does not imply relevant-new", facts: { EMPTY_PENDING: true, INFER_RELEVANT_NEW: true }, expectPass: false },
  { id: "z3-rejected-not-unassessed", zone: "Z3", name: "REJECTED does not become UNASSESSED", facts: { REJECTED: true, UNASSESSED: true }, expectPass: false },
  { id: "z3-audit-not-control", zone: "Z3", name: "Δ audit does not imply Δ control", facts: { DELTA_AUDIT: true, INFER_DELTA_CONTROL: true }, expectPass: false },
  { id: "z3-render-not-control", zone: "Z3", name: "Δ render does not imply Δ control", facts: { DELTA_RENDER: true, INFER_DELTA_CONTROL: true }, expectPass: false },
  { id: "z3-export-not-control", zone: "Z3", name: "Δ export does not imply Δ control", facts: { DELTA_EXPORT: true, INFER_DELTA_CONTROL: true }, expectPass: false },
  { id: "z3-branch-not-tree", zone: "Z3", name: "A blocked branch is not a blocked tree", facts: { BLOCKED_BRANCH: true, INFER_BLOCKED_TREE: true }, expectPass: false },
  { id: "z1-muscle-without-ramp", zone: "Z1", name: "Muscle work without an open ramp is not flow", facts: { MUSCLE_WORK: true, WANT_FLOW: true }, expectPass: false },
  { id: "z1-muscle-with-ramp", zone: "Z1", name: "Muscle work with an open ramp may be flow", facts: { MUSCLE_WORK: true, WANT_FLOW: true, OPEN_RAMP: true }, expectPass: true },
];

export function runTomeCase(c: LexCase) {
  const verdicts = runLex(compiledTome(), c.facts);
  const passed = lexPass(verdicts) === c.expectPass;
  return {
    id: c.id,
    zone: c.zone,
    name: c.name,
    expectPass: c.expectPass,
    actualPass: lexPass(verdicts),
    passed,
    failedRules: verdicts.filter((v) => !v.ok).map((v) => `${v.rule.op} ${v.rule.left} ${v.rule.right}`),
  };
}

export function runAllTomeCases() {
  return TOME_CASES.map(runTomeCase);
}
