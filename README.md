# Kaleikiʻi — Hand-carved pounamu, jade & bone taonga

The website for **Kaleikiʻi**, a certified carver in Tāmaki Makaurau (Auckland), Aotearoa. Kaleikiʻi hand-carves pounamu, nephrite jade and whalebone in Māori and Hawaiian forms.

The site takes custom commission requests with a live price estimate. It also sells one-of-a-kind ready-made pieces and gift vouchers, and explains the meaning of each form.

> **Status:** front end only. This code matches the site built in Emergent as of 28 October 2026. Payments, emails, the admin dashboard and the database are not included yet (see [What's not included](#whats-not-included)).

---

## Features

**Pages**
- Home
- Commission
- Shop, with a page for each piece
- Gallery
- Gift vouchers
- Forms & meanings
- About
- Events
- FAQ & Terms
- Contact

**Commission request flow** (up to 7 steps, with a live estimate in NZD and approximate USD):
1. Category: standard form, hei tiki, sculptural piece or other custom idea
2. Form: toki, roimata, koru, hei matau, manaia, Hawaiian forms or earrings
3. Size
4. Material and delivery country
5. Necklace plait
6. Delivery: tracked shipping or Auckland pickup
7. Details: who it's for, the occasion, the meaning, inspiration images, contact details, gift voucher code and gallery consent

**Other rules and features**
- **Sculptural pieces** go to a separate quote-only inquiry form. No prices are shown.
- **NZ-only materials:** NZ pounamu (including Ngāi Tahu certified and premium varieties) and whalebone can't be selected when the delivery country is outside New Zealand. Overseas buyers choose nephrite jade.
- **Capacity:** new requests pause when 10 commissions are open (the number is set in `settings.js`).
- **Language toggle:** English, te reo Māori and ʻōlelo Hawaiʻi.
- **Design:** mobile friendly, with light and dark mode.

---

## Pricing

All prices are in NZD. Base prices are for overseas nephrite.

| Group | Forms | XS | S | M | L | XL |
|---|---|---|---|---|---|---|
| Simple | toki, roimata | $100 | $180 | $280 | $450 | from $700 |
| Detailed | koru, hei matau, manaia, Hawaiian forms | $130 | $220 | $350 | $600 | from $1,000 |

**Sizes** (longest side of the carving):

| Size | Length |
|---|---|
| XS | under 3cm |
| S | 3–4.5cm |
| M | 4.5–6.5cm |
| L | 6.5–9cm |
| XL | 9–13cm |

**Earrings** (per pair):

| Type | Size | Price |
|---|---|---|
| Studs | under 1.5cm | $90 |
| Drops | 2–4cm | $150 |
| Carved forms (toki, koru) | 3–6cm | $220 |

**Hei tiki:**

| Size | Height | Price |
|---|---|---|
| S | up to 5cm | $600 |
| M | 5–7.5cm | $800 |
| L | around 10cm | $1,000 |
| XL | 12–15cm | $1,400 |
| Larger | over 15cm | quote only |

**Sculptural pieces:** quote only.

**Material add-ons:**

| Material | Add-on |
|---|---|
| Overseas nephrite | +0% |
| NZ pounamu (NZ only) | +50% |
| Ngāi Tahu certified pounamu (NZ only) | +75% |
| Premium varieties, īnanga, kahurangi (NZ only) | from +100% |
| Whalebone (NZ only) | from +100% |

**Plait:**

| Plait | Add-on |
|---|---|
| 3-plait | included |
| 4-plait | +$50 |
| 8-plait and up | +$150 |

**Shipping:**

| Delivery | Cost |
|---|---|
| Within NZ, orders of $400 or more | free |
| Within NZ, orders under $400 | $10 |
| International (tracked and insured) | $45 |
| Pickup in Auckland CBD or North Shore | free |

**How the estimate is worked out:**

```
base × (1 + material %) + plait + shipping
```

**Payments:**
- 50% non-refundable deposit on approval, and the balance once the finished piece has been seen.
- Sculptural pieces are paid in stages: 40% to start, 30% at a midway check, 30% on completion.

---

## Getting started

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev      # start a local preview at http://localhost:5173
npm run build    # build the site into /dist for hosting
```

To view the site without installing anything, open **`preview/kaleikii-preview.html`** in any web browser.

---

## Project structure

```
├── index.html                 Page title, description and fonts
├── package.json               Dependencies and scripts
├── vite.config.js             Vite build settings
├── preview/
│   └── kaleikii-preview.html  Single-file preview of the whole site
├── tools/
│   └── build_preview.py       Rebuilds the preview file from the source
└── src/
    ├── main.jsx               Starts the app
    ├── App.jsx                Header, menu, language toggle, page routing, footer
    ├── index.css              Colours, fonts and all styling
    ├── components/
    │   ├── Commission.jsx     The commission steps and sculptural inquiry form
    │   └── Stone.jsx          Photos, drawn stone placeholders, copy helper
    ├── pages/
    │   └── Pages.jsx          Every page (Home, Shop, Gift, Forms, About…)
    └── data/
        ├── pricing.js         Prices, sizes, forms, materials, plaits, estimate maths
        ├── settings.js        Capacity, deposit %, shipping, voucher amounts, links
        ├── content.js         Shop pieces, meanings, events, FAQ, terms, photo links
        └── i18n.js            English / Māori / Hawaiian translations
```

### Common edits

| To change… | Edit |
|---|---|
| A price, size or add-on | `src/data/pricing.js` |
| Capacity, shipping fees, voucher amounts, Instagram link | `src/data/settings.js` |
| Shop pieces, events, FAQ, form meanings, photos | `src/data/content.js` |
| Menu and heading translations | `src/data/i18n.js` |
| Colours or fonts | the `:root` block at the top of `src/index.css` |

---

## Brand

| Colour | Hex | Use |
|---|---|---|
| Pounamu Green | `#4A7053` | Buttons, links, brand accents |
| Bone White | `#F3F1E9` | Main background |
| Charcoal Ink | `#253122` | Headings, navigation, footer |
| Mineral Grey | `#A2B0AD` | Subtle borders and details |
| ʻAlaea Earth | `#8A6452` | Warm accents and labels |
| Sage Stone | `#C1C494` | Soft accents |

**Fonts:** Playfair Display for headings and Instrument Sans for body text, both from Google Fonts.

Keep macrons and the ʻokina correct throughout: Kaleikiʻi, Ngāi Tahu, ʻōlelo Hawaiʻi.

---

## What's not included

The following parts ran on Emergent's servers and still need building or connecting:

- **Admin dashboard and login:** a pipeline of commission stages (Requested → Approved/Declined → Deposit paid → Carving → Finished → Balance paid → Shipped/Collected), quote editing, and management of the shop, events and prices.
- **Payments:** Stripe checkout for deposits, balances, shop pieces and gift vouchers.
- **Emails:** automatic emails at each stage, plus the waitlist.
- **Database:** saving requests, inquiries, contact messages and voucher codes, and counting open commissions.

Until these exist, the **Send** and **Buy** buttons copy the details to the clipboard and open Instagram ([@kaleikii](https://instagram.com/kaleikii)).

**Photos:** the product photos currently link to images hosted by Emergent (`static.prod-images.emergentagent.com`). Replace them with your own photo links in `src/data/content.js`, because Emergent's links may stop working once the project is closed.

**Translations:** the Māori and Hawaiian text is a draft. Please have fluent speakers check it before launch.

---

## Hosting

The built site (`npm run build` → `/dist`) is a static website. It can be hosted free on Netlify, Vercel, Cloudflare Pages or GitHub Pages. AI builders such as Lovable, Bolt and Replit can also import this repository from GitHub.

---

© 2026 Kaleikiʻi. Ngā mihi · Mahalo nui.
