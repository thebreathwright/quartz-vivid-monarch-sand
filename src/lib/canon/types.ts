export type ClaimRecord = {
  id: string;
  priority_rank: number;
  short_text: string;
  level: string[];
  layer: string;
  special_tags: string[];
  source_refs: string[];
  rationale: string;
  confidence: string;
  depends_on_claims: string[];
  suggested_next_validation: string;
  public_rendering_rule: string;
  created_utc: string;
};

export {
  CLAIM_COUNT,
  CLAIM_PROVENANCE,
  CLAIM_RECORDS,
  CLAIM_SOURCE,
} from "./loader";
