export type RenderLevel =
  | "public_instruction"
  | "hypothesis_only"
  | "supervised_pilot_only"
  | "historical_or_symbolic";

export type TrainModule = {
  id: string;
  name: string;
  component: string;
  render: RenderLevel;
  laws: string[];
  measure: string;
  publicSteps: string[];
  stop: string[];
  note: string;
  sourceName?: string;
  firewall?: string;
};

export const MODULES: TrainModule[] = [
  {
    id: "nasal-quiet",
    name: "Quiet nasal minutes",
    component: "Whole route",
    render: "public_instruction",
    laws: ["Hannah", "Overload"],
    measure: "Route fraction (nose vs mouth)",
    publicSteps: [
      "Sit or stand still. Do not walk in traffic, drive, cook, or go near water.",
      "Close the mouth. Breathe only through the nose at an easy pace.",
      "A hold is yours if you take it. You are the supervisor. Let go when you need air.",
      "If the nose is blocked, stop and log it.",
    ],
    stop: ["Dizziness", "Chest pain", "Panic that does not settle", "Need to gasp"],
    note: "Low-risk public default. Self-assessment, not a treatment.",
  },
  {
    id: "hold",
    name: "Hold — supervised pause",
    component: "The person pausing",
    render: "public_instruction",
    laws: ["Hannah"],
    measure: "Pause recorded. No time target.",
    publicSteps: [
      "Sit on dry land. Not water. Not a vehicle. Not tools.",
      "Pause if you want. You are the supervisor. There is no time to beat.",
      "When you need air, breathe. No countdown. No coach. No blackout.",
    ],
    stop: ["Water", "Driving", "Chasing a blackout", "Someone else administering this to a child"],
    note: "Durable safety record S: supervised pause, no breath-hold target. Water, driving, blackout, and child-administered protocol stay hard blocks.",
  },
  {
    id: "neat",
    name: "NEAT — nostril entry",
    component: "Nasal valve",
    render: "public_instruction",
    laws: ["RS-01", "Davis", "Hannah"],
    measure: "PNIF (personal baseline, repeated trials)",
    publicSteps: [
      "Wash hands. Sit. Breathe through the nose.",
      "Place fingertips at the sides of the nostrils. Ease outward and slightly up — light first.",
      "Add 8–12 easy voluntary flares. Do not chase pain.",
      "Rest if the tissue is tender. Repeat later in the day only if recovered.",
    ],
    stop: ["Sharp pain", "Bleeding", "Migraine start", "Skin tear"],
    note: "Source program used high force. Public render is ease-first. Hard dosing is not unsupervised instruction.",
  },
  {
    id: "cfat",
    name: "CFAT — craniofacial load",
    component: "Zygoma / sinus walls",
    render: "public_instruction",
    laws: ["Wolff", "RS-01"],
    measure: "Subjective hardness + congestion notes (not a diagnosis)",
    publicSteps: [
      "Palms to cheeks over the cheekbones. Light contact first.",
      "Press for 3–5 seconds. Keep breathing or hold only if you are the one holding and you let go when you need air.",
      "Release. One or two easy repeats. Stop well before strain.",
    ],
    stop: ["Jaw click with pain", "Tooth pain", "Vision change", "Known aneurysm or uncontrolled hypertension"],
    note: "Source used bone-hard 5–7s squeezes. Public render is submaximal. Medical evaluation if cardiovascular risk.",
  },
  {
    id: "hot-dry",
    name: "Hot-dry — bronchial HME",
    component: "Trachea and bronchi",
    render: "hypothesis_only",
    laws: ["Hannah", "RS-01", "Rachel"],
    measure: "Inspired/expired humidity and temperature — lab metrics, not a home protocol",
    sourceName: "HotAir / Snoking (archive)",
    firewall: "stimulus_gated; science_public; rewrite_as_non_combustion_analogue; no_public_steps",
    publicSteps: [],
    stop: [
      "Any public step list",
      "Smoke, vape, incense, or flame",
      "Heated appliance aimed at the face",
      "Heat or combustion as a carrier",
    ],
    note: "Split: HME as organ function is shown (RAC-CLM-032/033/035; 37 °C / 100% RH; ~40–50% recovery). Water-first order is L2 (RAC-CLM-010). The tree as a trainable energy-recovery organ is L2 (RAC-CLM-009). A large adult HME ceiling is a gap. Hot-dry as the training load is archive method, not a public step list. Combustion and >52 °C / TRPV2 stay gated.",
  },
  {
    id: "bruing",
    name: "Bruing — mouth and tongue seal",
    component: "Lips, tongue, oral seal",
    render: "supervised_pilot_only",
    laws: ["Davis", "RS-01"],
    measure: "MBPct (mouth-breathing fraction during sleep)",
    publicSteps: [],
    stop: ["Someone else forcing the seal. Water. Blackout."],
    note: "Mechanism: oral seal + nasal route so the tongue stays forward of the lumen. Fatigue dosing stays a pilot. Any hold in it is self-supervised by the holder.",
  },
  {
    id: "throat",
    name: "Throat Extension",
    component: "Pharynx",
    render: "supervised_pilot_only",
    laws: ["Davis", "Hannah", "Overload"],
    measure: "Sleep SpO2 coverage, AHI if clinically obtained",
    publicSteps: [],
    stop: ["Pregnancy pressure work as public instruction", "Water", "Blackout"],
    note: "ASS001 stays hypothesis. Pressure work is not a public recipe. If a hold occurs, the holder is the supervisor and lets go when they need air.",
  },
  {
    id: "unpanic",
    name: "UnPanicT — down-regulation",
    component: "CO₂ / autonomic",
    render: "public_instruction",
    laws: ["Hannah"],
    measure: "Subjective calm after one or two cycles",
    publicSteps: [
      "Sit on dry land. Mouth closed. Long easy nasal exhale.",
      "Wait. You are holding. You are the supervisor. When you need air, inhale slowly through the nose.",
      "Repeat once or twice if you want. No one else counts you down. Do not chase a blackout.",
    ],
    stop: ["Near-faint", "Asthma flare", "Water", "Driving"],
    note: "The holder supervises the hold. Air hunger ends it. Same rule a child already uses: breathe when you need to.",
  },
];

export const HARD_STOPS = [
  "Chest pain",
  "Fainting or chasing a blackout",
  "Blue lips or confusion",
  "Severe headache or neurologic change",
  "Wheezing",
  "Coughing blood",
  "Persistent throat or voice pain",
  "SpO2 below 90% if you use a pulse oximeter",
  "Smoke, vape, incense, or heated appliance as a training carrier",
  "Water, driving, or someone else holding you under",
] as const;

export const GATES = [
  { id: "notWater", label: "I am not in or near water." },
  { id: "notDriving", label: "I am not driving or using tools." },
  { id: "notAdministerChild", label: "I am not administering a protocol to a child." },
  { id: "notPregnantPressure", label: "I will not run pressure work on a pregnancy as a public recipe." },
  { id: "notSevereUnreviewed", label: "Known moderate/severe OSA or heart/lung disease: clinician first." },
  { id: "notCombustion", label: "I will not use smoke, vape, incense, or open heat as a carrier." },
  { id: "selfHold", label: "If I hold my breath, I am the supervisor. I breathe when I need air." },
  { id: "selfAssess", label: "This is self-assessment and training hypothesis, not a diagnosis or cure." },
] as const;

const BLOCKED_FROM_PUBLIC_STEPS = new Set(["hot-dry", "bruing", "throat"]);

export function publicStepViolations(modules = MODULES) {
  return modules.filter(
    (mod) =>
      (mod.render !== "public_instruction" && mod.publicSteps.length > 0) ||
      (BLOCKED_FROM_PUBLIC_STEPS.has(mod.id) && mod.publicSteps.length > 0) ||
      (mod.firewall?.includes("no_public_steps") && mod.publicSteps.length > 0),
  );
}
