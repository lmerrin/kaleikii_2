// Content mirrored from the Emergent build (28 Oct 2026).
// Photos are hosted by Emergent; swap for your own photo URLs when you move platforms.
const IMG_BASE = "https://static.prod-images.emergentagent.com/jobs/0a87fd3f-8a7c-4fb7-aa8e-1429f8356085/images/";
export const IMAGES = {
  hero: IMG_BASE + "09885049eda3664a1cce1edbccb475ea29fecc425d2c9e2c4d7415ecec828acb.jpeg",
  hands: IMG_BASE + "b70a5d32957d3ec67b03173c4771ffb31e269c55f3a5ba9a7424d093b0da31b9.jpeg",
  koru: IMG_BASE + "09885049eda3664a1cce1edbccb475ea29fecc425d2c9e2c4d7415ecec828acb.jpeg",
  toki: IMG_BASE + "fa1a1c2905b1b5bdaa3d598f76481a25800994e9495062409801bb3f297809a9.jpeg",
  matau: IMG_BASE + "64c250559a807e2da795587198145f954ccc8cb685368da3bc394a33bb764574.jpeg",
  roimata: IMG_BASE + "939048327962b78ef29c1e65c846b8e3b36f81e69aa20e9ead9a3b427287ec8b.jpeg",
  manaia: IMG_BASE + "cdcdc753330d8bcc0a578e86f7ed801ea256f665aa077febd6fe9e80e6b1e04d.jpeg",
};

export const SHOP_ITEMS = [
  { id: "arahura-koru", title: "Arahura Koru", form: "koru", size: "5.5cm", material: "ngai_tahu_pounamu",
    origin: "Arahura River, Te Tai Poutini (West Coast)", certified: true, price: 520, photo: "koru",
    meaning: "The unfurling fern frond — new life, growth and a fresh beginning." },
  { id: "kawakawa-toki", title: "Kawakawa Toki", form: "toki", size: "6cm", material: "nz_pounamu",
    origin: "South Island, Aotearoa", price: 450, photo: "toki",
    meaning: "The adze — strength, determination and the courage to shape your path." },
  { id: "hei-matau-safe-passage", title: "Hei Matau — Safe Passage", form: "hei_matau", size: "5cm", material: "overseas_nephrite",
    origin: "British Columbia, Canada", price: 300, photo: "matau",
    meaning: "The fish hook — abundance, safe travel over water and respect for Tangaroa." },
  { id: "inanga-roimata", title: "Īnanga Roimata", form: "roimata", size: "4cm", material: "premium",
    origin: "Te Tai Poutini (West Coast)", price: 380, photo: "roimata",
    meaning: "The teardrop — comfort, healing and the bond shared in grief and love." },
  { id: "manaia-guardian", title: "Manaia Guardian (whalebone)", form: "manaia", size: "7cm", material: "whalebone",
    origin: "Aotearoa — whalebone (NZ only)", price: 690, photo: "manaia", bone: true,
    meaning: "The guardian — a messenger between worlds, protecting the wearer." },
];

export const MAORI_FORMS = [
  { k: "koru", n: "Koru", photo: "koru", m: "The unfurling fern frond. New life, growth, harmony and a fresh beginning — often gifted at births, new chapters and reunions." },
  { k: "toki", n: "Toki", photo: "toki", m: "The adze, once a prized tool. Strength, determination, courage and authority — for someone stepping into leadership or a new challenge." },
  { k: "manaia", n: "Manaia", photo: "manaia", m: "The guardian with a bird's head and human form, a messenger between the earthly and spiritual worlds. Protection from harm." },
  { k: "matau", n: "Hei matau", photo: "matau", m: "The fish hook. Abundance, prosperity and safe passage over water — a tribute to Tangaroa, guardian of the sea." },
  { k: "roimata", n: "Roimata", photo: "roimata", m: "The teardrop. Comfort and healing in times of grief, and the tears shared in love and joy." },
  { k: "tiki", n: "Hei tiki", m: "The ancestral figure. A connection to whakapapa and those who came before; associated with fertility and the passing of mana through generations." },
  { k: "earrings", n: "Earrings · kapeu & drops", m: "Small taonga worn close — kapeu, roimata drops or studs that carry the meaning of their form." },
];

export const HAWAIIAN_FORMS = [
  { k: "makau", n: "Makau", m: "The Hawaiian fish hook. Abundance, skill and safe journeys across the ocean; a link to the fishermen and navigators of Hawaiʻi." },
  { k: "honu", n: "Honu", m: "The sea turtle. Longevity, endurance and the guidance of ʻaumākua — finding your way home." },
  { k: "niho", n: "Niho palaoa style", m: "A tongue-shaped pendant inspired by the niho palaoa once worn by aliʻi. Status, mana and respect, carved here in stone." },
  { k: "other", n: "Other / custom idea", m: "Have something else in mind — a family symbol, a place, a new form? Describe it and we'll find the right shape together." },
];

export const EVENTS = [
  { date: "14 November 2026", title: "Parnell Artisan Market", place: "Parnell, Auckland", note: "Ready-made pieces, commission consultations and cord fittings." },
  { date: "5 December 2026", title: "Devonport Christmas Craft Fair", place: "Devonport, North Shore", note: "Last chance for pieces before the holidays." },
  { date: "31 March – 3 April 2027", title: "Merrie Monarch Invitational Hawaiian Arts Fair", place: "Hilo, Hawaiʻi", note: "Find the Kaleikiʻi table with pounamu and jade pieces ready to wear." },
];

export const FAQ = [
  ["How do commissions work?", "Send a request through the Commission page. It is a request only — no payment is taken. Every request is personally reviewed; if approved you'll be emailed a final quote and a link to pay a 50% deposit."],
  ["Are deposits refundable?", "No. Deposits are non-refundable once carving begins, because the stone is cut and shaped for you alone. You'll be asked to tick to agree before paying."],
  ["When do I pay the rest?", "When your piece is finished you'll be emailed photos and a link to pay the remaining 50%. It ships or is collected only after full payment. Sculptural pieces are paid in three stages: 40% to start, 30% at a midway check and 30% on completion."],
  ["How long does it take?", "Simple forms (toki, roimata) take about 1 week. Detailed forms, earrings and hei tiki take 2–3 weeks. Sculptural pieces are agreed case by case. When the bench is full (10 open commissions), new requests pause and you can join the waitlist."],
  ["How much is shipping?", "Within New Zealand: free tracked shipping on orders over $400 NZD, otherwise $10 NZD. International: a flat $45 NZD, tracked and insured. Free pickup or handover in Auckland CBD or the North Shore is arranged by message once your piece is ready."],
  ["Can NZ pounamu or whalebone be sent overseas?", "No. NZ pounamu (including Ngāi Tahu certified and premium varieties) and whalebone stay in Aotearoa — they can only be ordered for delivery or pickup within New Zealand. Overseas buyers can choose nephrite jade from Canada, Wyoming or Guatemala."],
  ["What currency are prices in?", "All prices are in New Zealand dollars (NZD). The USD figure shown alongside is an approximate conversion for guidance; you'll be charged in NZD."],
  ["How do I care for my taonga?", "Pounamu and jade are hard but can chip if dropped — take your piece off for heavy work and contact sports. Wipe with a soft cloth; skin oils will deepen the polish over time. Keep whalebone away from prolonged water, heat and chemicals. Check your cord regularly and have it re-plaited if it wears."],
  ["Can Kaleikiʻi decline a commission?", "Yes. Every commission is personally reviewed. Kaleikiʻi reserves the right to decline any commission that is not in alignment with its values."],
];

export const TERMS = [
  "Commission requests are not orders until approved.",
  "Deposits (50%, or 40% for sculptural pieces) are non-refundable once carving begins.",
  "Final payment is due before shipping or handover.",
  "Every piece is hand-carved from natural material; colour, inclusions and size may vary slightly from photos and estimates.",
  "Shop pieces are one of a kind and paid in full at checkout.",
  "NZ pounamu and whalebone may only be delivered or collected within New Zealand.",
  "Prices are in NZD; USD figures are approximate.",
];
