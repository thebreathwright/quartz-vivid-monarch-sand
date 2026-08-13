import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

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

console.log(JSON.stringify({ ok: true, files: Object.keys(provenance.files) }, null, 2));
