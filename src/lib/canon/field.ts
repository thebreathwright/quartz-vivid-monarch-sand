export const LAWS = [
  { id: "RS-01", name: "Peak Demand Adaptation", role: "System adapts toward recent peak demand." },
  { id: "Hannah", name: "Hannah’s Law", role: "Flow and tissue systems adapt to mechanical, thermal, chemical, pressure, and flow loads." },
  { id: "Davis", name: "Davis’s Law", role: "Soft tissue adapts to imposed demands." },
  { id: "Wolff", name: "Wolff’s Law", role: "Bone adapts to mechanical load." },
  { id: "Rachel", name: "Rachel’s Law", role: "Glandular and secretory systems adapt to demand." },
  { id: "Overload", name: "Progressive Overload", role: "Dose must exceed capacity and remain recoverable." },
  { id: "BreathYear", name: "Breath-Year Accounting", role: "Annualize small per-breath costs and savings." },
  { id: "FWOCR", name: "FWOCR", role: "Full work of cellular respiration — harvest through delivery." },
] as const;

export const LAYERS = [
  { id: "L0", name: "Core laws", text: "Adaptation to load, flow, pressure, heat, chemistry, water, use and disuse." },
  { id: "L1", name: "Measurement", text: "PNIF, route fraction, SpO2 coverage, Six-Nines, RMR/REE." },
  { id: "L2", name: "Intervention", text: "Safety-translated methods after the firewall." },
  { id: "L3", name: "Consequence", text: "Patency, sleep, water/heat recovery, maternal-fetal hypotheses." },
  { id: "L4", name: "Systems", text: "Public health, education, occupation, climate, development." },
  { id: "L5", name: "Language", text: "TRIE, causal repair, pathology vs adaptation framing." },
  { id: "L6", name: "Symbolic", text: "Late-bound: DJED, Grail, WAS, ANKH, Jalandhara." },
] as const;

export const SEQUENCE = [
  "Breath-Year economics",
  "Conditioning Tree heat/water recovery",
  "Airway trainability",
  "PNIF, route automaticity, Six-Nines",
  "ASL, mucus, mucociliary adaptation",
  "Dose-response and progressive overload",
  "Airway phenotype clustering",
  "FWOCR energy model",
  "OSA, hypotonia, sleep oxygenation",
  "Maternal-fetal respiratory burden",
  "TRIE and causal language",
  "Symbolic convergence last",
] as const;

export const TREE_ORDER = [
  "humidify / recover water",
  "distribute / recover heat",
  "maintain patency",
  "absorb / sense / clear / respond",
  "filter",
] as const;
