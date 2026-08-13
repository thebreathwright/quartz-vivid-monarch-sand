import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
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
  assert.deepEqual(cases.map((c) => c.expectPass), freeze.frozen_expect);
  for (const c of cases) {
    assert.notEqual(c.zone, "Z4");
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
  assert.match(src, /CUSTODY_SEAL_MISMATCH/);
  assert.match(src, /custodySealPayload/);
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

test("historical archive name is not a live tip dependency", () => {
  const src = readFileSync("src/lib/canon/loader.ts", "utf8");
  assert.match(src, /sourceArchiveKind: "historical-label-absent-from-tip"/);
  assert.match(src, /wholesaleArchiveIngested: false/);
  assert.match(src, /bindMode: "extract-only"/);
  assert.match(src, /import raw from "\.\/claims\.json"/);
  assert.doesNotMatch(src, /attachments\/UP2SPEED\.zip/);
  assert.doesNotMatch(src, /zipfile|JSZip|yauzl/);
  const zips = execFileSync("git", ["ls-files", "--", "attachments/UP2SPEED.zip", "UP2SPEED.zip"], { encoding: "utf8" })
    .trim()
    .split("\n")
    .filter(Boolean);
  assert.deepEqual(zips, []);
  const live = execFileSync("git", ["ls-files", "--", "artifacts/family_g/test_nested_archive.py"], { encoding: "utf8" })
    .trim();
  assert.equal(live, "");
});
