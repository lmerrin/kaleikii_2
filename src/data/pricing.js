import { SETTINGS } from "./settings";

// All prices NZD. Base prices are for overseas nephrite; material add-ons apply on top.
export const SIZE_GROUPS = {
  simple: [
    { key: "XS", label: "under 3cm", price: 100 },
    { key: "S", label: "3–4.5cm", price: 180 },
    { key: "M", label: "4.5–6.5cm", price: 280 },
    { key: "L", label: "6.5–9cm", price: 450 },
    { key: "XL", label: "9–13cm", price: 700, isFrom: true },
  ],
  detailed: [
    { key: "XS", label: "under 3cm", price: 130 },
    { key: "S", label: "3–4.5cm", price: 220 },
    { key: "M", label: "4.5–6.5cm", price: 350 },
    { key: "L", label: "6.5–9cm", price: 600 },
    { key: "XL", label: "9–13cm", price: 1000, isFrom: true },
  ],
  earrings: [
    { key: "Studs", label: "under 1.5cm, per pair", price: 90 },
    { key: "Drops", label: "2–4cm, per pair", price: 150 },
    { key: "Carved", label: "carved forms (toki, koru) 3–6cm, per pair", price: 220 },
  ],
  tiki: [
    { key: "S", label: "up to 5cm", price: 600 },
    { key: "M", label: "5–7.5cm", price: 800 },
    { key: "L", label: "around 10cm", price: 1000 },
    { key: "XL", label: "12–15cm", price: 1400 },
    { key: "XXL", label: "over 15cm", price: 0, quoteOnly: true },
  ],
};

export const CATEGORIES = [
  { key: "standard", label: "Standard form", sub: "Koru, toki, manaia, hei matau, roimata, earrings, Hawaiian styles" },
  { key: "tiki", label: "Hei tiki", sub: "Ancestral figure — carved with particular care" },
  { key: "sculptural", label: "Sculptural piece", sub: "Larger works — every sculptural piece is quoted individually" },
  { key: "other", label: "Other custom idea", sub: "Something new? Describe it and we'll talk" },
];

export const FORMS = [
  { key: "toki", label: "Toki", group: "simple" },
  { key: "roimata", label: "Roimata", group: "simple" },
  { key: "koru", label: "Koru", group: "detailed" },
  { key: "hei_matau", label: "Hei matau", group: "detailed" },
  { key: "manaia", label: "Manaia", group: "detailed" },
  { key: "hawaiian", label: "Hawaiian forms", group: "detailed" },
  { key: "earrings", label: "Earrings", group: "earrings" },
];

export const MATERIALS = [
  { key: "overseas_nephrite", label: "Overseas nephrite (Canada, Wyoming, Guatemala)", pct: 0 },
  { key: "nz_pounamu", label: "NZ pounamu (South Island)", pct: 50, nzOnly: true },
  { key: "ngai_tahu_pounamu", label: "Ngāi Tahu certified pounamu", pct: 75, certified: true, nzOnly: true },
  { key: "premium", label: "Premium varieties (īnanga, kahurangi, etc.)", pct: 100, isFrom: true, nzOnly: true },
  { key: "whalebone", label: "Whalebone", pct: 100, isFrom: true, whalebone: true, nzOnly: true },
];

export const PLAITS = [
  { key: "3", label: "3-plait", price: 0 },
  { key: "4", label: "4-plait", price: 50 },
  { key: "8", label: "8-plait and up", price: 150 },
];

export const COUNTRIES = ["Aotearoa New Zealand", "Australia", "United States (incl. Hawaiʻi)", "Other country"];
export const NZ = COUNTRIES[0];

export const nzd = (n) => "$" + Math.round(n).toLocaleString("en-NZ") + " NZD";
export const usd = (n) => "$" + Math.round(n * SETTINGS.usdRate).toLocaleString("en-US") + " USD";
// Materials that can only be delivered or collected within New Zealand
export const isNzOnly = (key) => !!(MATERIALS.find((m) => m.key === key) || {}).nzOnly;

export const materialLabel = (key) => (MATERIALS.find((m) => m.key === key) || {}).label || key;

// Which size group applies to the current selection
export function sizeGroupFor(state) {
  if (state.category === "tiki") return "tiki";
  if (state.category !== "standard" || !state.form) return null;
  return FORMS.find((f) => f.key === state.form).group;
}

export function hasPlait(state) {
  return state.category !== "sculptural" && state.form !== "earrings";
}

export function timeframe(state) {
  if (state.category === "sculptural" || state.category === "other") return "Agreed case by case";
  if (state.category === "tiki") return "2–3 weeks";
  const g = sizeGroupFor(state);
  return g === "simple" || !g ? "About 1 week" : "2–3 weeks";
}

export function shippingFee(state, subtotal) {
  if (!state.delivery) return null;
  if (state.delivery === "pickup") return 0;
  if (state.country !== NZ) return SETTINGS.intlShippingFee;
  return subtotal >= SETTINGS.nzFreeThreshold ? 0 : SETTINGS.nzShippingFee;
}

// Returns { quote: true } or { total, isFrom, shipping }
export function estimate(state) {
  if (state.category === "other") return { quote: true };
  const group = sizeGroupFor(state);
  if (!group || !state.size) return null;
  const size = SIZE_GROUPS[group].find((s) => s.key === state.size);
  if (!size) return null;
  if (size.quoteOnly) return { quote: true };
  const mat = MATERIALS.find((m) => m.key === state.material);
  let total = size.price * (1 + (mat ? mat.pct : 0) / 100);
  const plait = hasPlait(state) ? PLAITS.find((p) => p.key === state.plait) : null;
  if (plait) total += plait.price;
  const ship = shippingFee(state, total);
  if (ship) total += ship;
  return { total, isFrom: !!size.isFrom || !!(mat && mat.isFrom), shipping: ship };
}
