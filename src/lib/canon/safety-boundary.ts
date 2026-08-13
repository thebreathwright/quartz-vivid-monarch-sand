import raw from "./safety-boundary.json";

export type SafetyBoundary = {
  id: "S";
  kind: "safety_boundary";
  hold: {
    id: string;
    kind: "supervised_pause_record";
    breath_hold_target: false;
    supervisor: string;
    text: string;
  };
  hard_blocks: { id: string; text: string }[];
};

export const SAFETY_BOUNDARY_SHA256 =
  "a81d91bea0a376bf9557df7566e4e75584e025c639e7b5a98ec1767dfa10bc66";
export const SAFETY_BOUNDARY_FILE = "src/lib/canon/safety-boundary.json";
export const SAFETY_BOUNDARY = raw as SafetyBoundary;
