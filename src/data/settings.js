// Business settings. In the full app these come from the admin dashboard (/api/settings).
export const SETTINGS = {
  instagramUrl: "https://instagram.com/kaleikii",
  requestFormUrl: "", // optional: Tally/Jotform link for requests; empty = Instagram
  usdRate: 0.58, // approximate NZD → USD
  capacity: 10, // pause new requests at this many open commissions
  openCommissions: 3, // example number
  depositPct: 50,
  sculpturalStages: [40, 30, 30],
  nzFreeThreshold: 400,
  nzShippingFee: 10,
  intlShippingFee: 45,
  voucherAmounts: [100, 200, 300, 500],
  voucherMin: 50,
};
