import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function checkImplications(f) {
  return [
    {
      id: "I1_UNKNOWN_NOT_CONSEQUENCE",
      ok: !((f.UNKNOWN || f.UNASSESSED) && (f.WANT_CONSEQUENCE || f.WANT_EXECUTE) && !f.RESOLVE_ONLY),
    },
    {
      id: "I2_REPRESENTATION_NOT_OBJECT",
      ok: !((f.PI_W_EQ_R && f.INFER_W_EQ_INV_PI) || (f.SPACED_LAYOUT && f.INFER_SOURCE_UNEDITED)),
    },
    {
      id: "I3_PRIOR_NOT_NEW_CONSEQUENCE",
      ok: !((f.ARCHIVE && f.WANT_EXECUTE && !f.CUSTODY_GRANT) || (f.EMPTY_PENDING && f.INFER_RELEVANT_NEW)),
    },
    {
      id: "I4_RECORD_NOT_CONTROL",
      ok: !(
        (f.DELTA_AUDIT && f.INFER_DELTA_CONTROL) ||
        (f.DELTA_RENDER && f.INFER_DELTA_CONTROL) ||
        (f.DELTA_EXPORT && f.INFER_DELTA_CONTROL) ||
        (f.REJECTED && f.UNASSESSED)
      ),
    },
    {
      id: "I5_PART_NOT_WHOLE",
      ok: !((f.BLOCKED_BRANCH && f.INFER_BLOCKED_TREE) || (f.MUSCLE_WORK && f.WANT_FLOW && !f.OPEN_RAMP)),
    },
  ];
}

test("digest provenance matches public baseline files", () => {
  const provenance = JSON.parse(readFileSync("src/brudo/public-provenance.json", "utf8"));
  for (const [file, expected] of Object.entries(provenance.files)) {
    assert.equal(sha256(file), expected, file);
  }
});

test("private controller stays gitignored and untracked", () => {
  const ignore = readFileSync(".gitignore", "utf8");
  assert.match(ignore, /src\/brudo\/policy\.ts/);
  assert.match(ignore, /src\/brudo\/ablation\.ts/);
  const tracked = execFileSync("git", ["ls-files", "src/brudo"], { encoding: "utf8" });
  assert.doesNotMatch(tracked, /policy\.ts/);
  assert.doesNotMatch(tracked, /ablation\.ts/);
});

test("I1–I5 freeze vector runs", () => {
  const freeze = JSON.parse(readFileSync("src/brudo/implication-freeze.json", "utf8"));
  const cases = JSON.parse(readFileSync("src/brudo/implication-cases.json", "utf8"));
  assert.equal(cases.length, freeze.case_count);
  assert.equal(freeze.not_destination, "Z4");
  assert.deepEqual(freeze.destinations, ["Z1", "Z2", "Z3"]);
  const vector = cases.map((c) => checkImplications(c.facts).every((h) => h.ok));
  assert.deepEqual(vector, freeze.frozen_expect);
  for (const c of cases) {
    assert.notEqual(c.zone, "Z4");
    assert.equal(vector[cases.indexOf(c)], c.expectPass, c.id);
  }
});

test("safety boundary: pause record, no hold target, hard blocks", () => {
  const safety = JSON.parse(readFileSync("src/lib/canon/safety-boundary.json", "utf8"));
  assert.equal(safety.hold.breath_hold_target, false);
  assert.equal(safety.hold.kind, "supervised_pause_record");
  assert.deepEqual(
    safety.hard_blocks.map((b) => b.id),
    ["water", "driving", "blackout", "child"],
  );
});

test("admission runtime refuses asserted grant without custody", () => {
  const src = readFileSync("src/lib/brudo/admission.ts", "utf8");
  assert.match(src, /ASSERTED_GRANT_IS_NOT_CUSTODY/);
  assert.match(src, /isExecuteCustody/);
  assert.match(src, /custodyBindsReceipt/);
  assert.match(src, /CUSTODY_DIGEST_MISMATCH/);
  assert.match(src, /CUSTODY_CONTRACT_MISMATCH/);
  assert.match(src, /ARCHIVE_DOES_NOT_DONATE_EXECUTE/);
  assert.doesNotMatch(src, /from ["']@\/brudo\/policy/);
  assert.doesNotMatch(src, /runAblation/);
});

test("forbidden raw bundles and traces are absent from the git tip", () => {
  const { paths, prefixes = [] } = JSON.parse(readFileSync("src/brudo/forbidden-tip-paths.json", "utf8"));
  assert.ok(paths.length > 0);
  const tracked = execFileSync("git", ["ls-files", "--", ...paths], { encoding: "utf8" })
    .trim()
    .split("\n")
    .filter(Boolean);
  assert.deepEqual(tracked, [], `still on tip: ${tracked.join(", ")}`);
  const zips = execFileSync("git", ["ls-files", "*.zip"], { encoding: "utf8" })
    .trim()
    .split("\n")
    .filter(Boolean);
  assert.deepEqual(zips, [], `zip still on tip: ${zips.join(", ")}`);
  for (const prefix of prefixes) {
    const under = execFileSync("git", ["ls-files", "--", prefix], { encoding: "utf8" })
      .trim()
      .split("\n")
      .filter(Boolean);
    assert.deepEqual(under, [], `extract still on tip under ${prefix}: ${under.join(", ")}`);
  }
});
