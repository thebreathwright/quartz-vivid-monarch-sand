import raw from "./boundary-h.json";

export type EvidenceClass = "measurement" | "injury" | "observation";

export type BoundaryClass = {
  id: string;
  class: EvidenceClass;
  status: string;
  text: string;
};

export type BoundaryH = {
  id: "H";
  kind: "negative_boundary";
  status: string;
  covid_claim_in_corpus: false;
  current_smoker_signal_is_hme_dose_response: false;
  smoke_route: string;
  classes: BoundaryClass[];
  killed: string[];
};

export const BOUNDARY_H_SHA256 =
  "ea5845fd71150d7025072560d804d9c522c191e270f22a5a245559598b6e8401";
export const BOUNDARY_H_FILE = "src/lib/canon/boundary-h.json";

export const BOUNDARY_H = raw as BoundaryH;

export function boundaryHIntact(hex: string): boolean {
  return hex === BOUNDARY_H_SHA256;
}
