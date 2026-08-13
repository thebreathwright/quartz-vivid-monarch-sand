import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { runFrozen } from "../src/brudo/implication-cases.ts";

function sha256(path: string) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

const provenance = JSON.parse(readFileSync("src/brudo/public-provenance.json", "utf8"));
const drifted: string[] = [];
for (const [file, expected] of Object.entries(provenance.files as Record<string, string>)) {
  const got = sha256(file);
  if (got !== expected) drifted.push(`${file}\n  expected ${expected}\n  got      ${got}`);
}
if (drifted.length) {
  throw new Error(`provenance drift\n${drifted.join("\n")}`);
}
if ((provenance.not_included as string[]).some((f: string) => {
  try {
    return readFileSync(".gitignore", "utf8").includes(f) === false;
  } catch {
    return true;
  }
})) {
  throw new Error("private paths must remain gitignored");
}

const forbidden = JSON.parse(readFileSync("src/brudo/forbidden-tip-paths.json", "utf8"));
const { execFileSync } = await import("node:child_process");
const present = execFileSync("git", ["ls-files", "--", ...forbidden.paths], { encoding: "utf8" })
  .trim()
  .split("\n")
  .filter(Boolean);
if (present.length) throw new Error(`forbidden paths on tip: ${present.join(", ")}`);
for (const prefix of (forbidden.prefixes ?? []) as string[]) {
  const under = execFileSync("git", ["ls-files", "--", prefix], { encoding: "utf8" })
    .trim()
    .split("\n")
    .filter(Boolean);
  if (under.length) throw new Error(`forbidden prefix on tip ${prefix}: ${under.join(", ")}`);
}

const freeze = runFrozen();
if (!freeze.freezeMatch || !freeze.allNamed || freeze.z4 || freeze.count !== 17) {
  throw new Error(`native freeze failed ${JSON.stringify(freeze)}`);
}

console.log(JSON.stringify({ ok: true, files: Object.keys(provenance.files), forbidden: forbidden.paths.length, freeze: freeze.count }, null, 2));
