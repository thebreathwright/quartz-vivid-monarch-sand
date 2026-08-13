import lexSrc from "./tome.lex?raw";

export type Op = "PERMIT" | "FORBID" | "NIMPL" | "REQUIRE" | "SEARCH" | "CONSEQUENCE";

export type LexRule = {
  op: Op;
  left: string;
  right: string;
  unless?: string;
};

const OPS = new Set<Op>(["PERMIT", "FORBID", "NIMPL", "REQUIRE", "SEARCH", "CONSEQUENCE"]);

export function parseLex(src: string): LexRule[] {
  const rules: LexRule[] = [];
  for (const raw of src.split("\n")) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const parts = line.split(/\s+/);
    const op = parts[0] as Op;
    if (!OPS.has(op)) throw new Error(`LEX_UNKNOWN_OP:${parts[0]}`);
    if (op === "SEARCH" || op === "CONSEQUENCE") {
      rules.push({ op, left: parts[1] ?? "", right: "" });
      continue;
    }
    const unlessIdx = parts.indexOf("unless");
    rules.push({
      op,
      left: parts[1] ?? "",
      right: parts[2] ?? "",
      unless: unlessIdx >= 0 ? parts[unlessIdx + 1] : undefined,
    });
  }
  return rules;
}

export type Fact = Record<string, boolean>;

export type Verdict = { rule: LexRule; ok: boolean; detail: string };

export function runLex(rules: LexRule[], facts: Fact): Verdict[] {
  return rules.map((rule) => apply(rule, facts));
}

function apply(rule: LexRule, facts: Fact): Verdict {
  const L = Boolean(facts[rule.left]);
  const R = Boolean(facts[rule.right]);
  if (rule.op === "PERMIT") {
    const ok = !L || R || facts[`${rule.left}_MAY_${rule.right}`] === true;
    return { rule, ok, detail: `${rule.left} may ${rule.right}` };
  }
  if (rule.op === "FORBID") {
    if (rule.unless && facts[rule.unless]) {
      return { rule, ok: true, detail: `except ${rule.unless}` };
    }
    const violated = L && (facts[`WANT_${rule.right}`] === true || R);
    return { rule, ok: !violated, detail: violated ? `${rule.left} donated ${rule.right}` : "held" };
  }
  if (rule.op === "NIMPL") {
    const claimed = L && facts[`INFER_${rule.right}`] === true;
    return { rule, ok: !claimed, detail: claimed ? `${rule.left} wrongly implied ${rule.right}` : "no false implication" };
  }
  if (rule.op === "REQUIRE") {
    const ok = !facts[`HAVE_${rule.left}`] || Boolean(facts[rule.right]);
    return { rule, ok, detail: ok ? "satisfied or unclaimed" : `${rule.left} missing ${rule.right}` };
  }
  return { rule, ok: true, detail: "directive" };
}

export function lexPass(verdicts: Verdict[]): boolean {
  return verdicts.every((v) => v.ok);
}

export const TOME_LEX_SHA256 = "cbf36391a33feb41a6c3a4a7053a3a441b8f0ca68a5183dc7fc35516e00c8e2c";
export const TOME_SOURCE = lexSrc;

export function compiledTome() {
  return parseLex(lexSrc);
}
