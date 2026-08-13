export const HME_ANCHORS = [
  { q: "Conditioned target", v: "37 °C · 100% RH", why: "Every inspired liter has to get here." },
  { q: "Expiratory recovery", v: "~40% rest · ~50% max", why: "Sets net annual heat/water cost." },
  { q: "Lung heat share", v: "~6–7% of resting metabolic heat", why: "Organ-scale, not a footnote." },
  { q: "Modeled HME-only savings", v: "~15–60k kcal/year", why: "Lower- vs higher-function states. Modeled, not a trial." },
] as const;

export const HME_ORDER = [
  "humidify / recover water",
  "distribute / recover heat",
  "maintain patency",
  "absorb / sense / clear / respond",
  "filter",
] as const;

export const HME_SCENARIOS = [
  { name: "Mild indoor", hi: 44000, lo: 60000, save: 16000, note: "22 °C / 40% RH · 6 L/min" },
  { name: "Cool climate", hi: 67000, lo: 97000, save: 30000, note: "15 °C / 40% RH · 8 L/min" },
  { name: "Cold dry / high VE", hi: 88000, lo: 150000, save: 62000, note: "5 °C / 30% RH · 10 L/min" },
] as const;

export const HME_SHOWN = [
  { level: "L3 literature", text: "Airways warm and humidify toward 37 °C / 100% RH. Loss of that function dries, crusts, and plugs." },
  { level: "L3 literature", text: "About 40% of inspiratory heat/water is recovered on expiration at rest; about 50% at maximal effort in the mammalian models used here." },
  { level: "L3 literature", text: "Lungs dissipate on the order of 6–7% of metabolic heat at rest." },
  { level: "L2 modeled", text: "HME-only annual savings between poorer and better recovery land around 15,000–60,000 kcal/year under the stated assumptions." },
  { level: "L1 observed", text: "Archive training rule: give the tree HME load — air that is hard to condition (hot-dry)." },
  { level: "gap", text: "Large trainable HME ceiling in healthy adults is not yet shown. Exchanger endpoints are almost never the trial outcome." },
] as const;
