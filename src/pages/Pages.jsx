import { useState } from "react";
import { Photo, Stone, copyText } from "../components/Stone";
import Commission from "../components/Commission";
import { SHOP_ITEMS, MAORI_FORMS, HAWAIIAN_FORMS, EVENTS, FAQ, TERMS } from "../data/content";
import { SETTINGS } from "../data/settings";
import { nzd, usd, materialLabel, FORMS, isNzOnly } from "../data/pricing";

function PageHead({ eyebrow, title, lede }) {
  return (
    <div className="page-head">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}

function PieceCard({ item }) {
  return (
    <a className="piece" href={"#item-" + item.id}>
      <Photo name={item.photo} alt={item.title} shape={item.form === "hei_matau" ? "matau" : item.form} bone={item.bone} />
      {item.certified && <span className="cert">Ngāi Tahu certified</span>}
      <h3>{item.title}</h3>
      <p className="p">{nzd(item.price)} <span>(approx. {usd(item.price)})</span></p>
    </a>
  );
}

export function HomePage({ t }) {
  return (
    <>
      <section className="hero">
        <Photo name="hero" alt="Carved pounamu koru resting on river stones beside a West Coast river" shape="koru" className="hero-bg" />
        <div className="hero-shade" />
        <div className="wrap hero-inner">
          <p className="eyebrow light">{t("heroEyebrow")}</p>
          <h1>{t("heroTitle")}</h1>
          <p className="hero-lede">Kaleikiʻi carves pounamu, nephrite jade and whalebone into taonga that hold your story — each piece made to order by a certified carver in Auckland.</p>
          <div className="cta">
            <a className="btn primary" href="#commission">{t("ctaStart")}</a>
            <a className="btn ghost light" href="#shop">{t("ctaShop")}</a>
          </div>
          <p className="hero-cert">✓ {t("certified")}</p>
        </div>
      </section>

      <section className="wrap band">
        <div className="split">
          <div className="prose">
            <p className="eyebrow">The journey of a piece</p>
            <h2>Every commission begins with a conversation.</h2>
            <p className="lede">You share who the piece is for, the moment it marks and the meaning it should carry. The stone is chosen to suit — West Coast pounamu, Ngāi Tahu certified stone, or nephrite from Canada, Wyoming and Guatemala — and carved slowly by hand.</p>
          </div>
          <Photo name="hands" alt="The carver's hands shaping pounamu at the workbench" shape="toki" className="tall" />
        </div>
        <ol className="journey">
          <li><span>01</span><h3>Share your story</h3><p>A guided request — form, size, stone, plait and the meaning behind it.</p></li>
          <li><span>02</span><h3>Personal review</h3><p>Every request is read and answered personally with a final quote.</p></li>
          <li><span>03</span><h3>Carved by hand</h3><p>Standard pieces about 1 week; complex pieces and hei tiki 2–3 weeks.</p></li>
          <li><span>04</span><h3>Home to you</h3><p>Tracked shipping worldwide, or handover in Auckland CBD or the North Shore.</p></li>
        </ol>
      </section>

      <section className="alt">
        <div className="wrap band">
          <h2>Where the stone comes from</h2>
          <div className="origins">
            <div className="origin"><h3>NZ pounamu</h3><p>From the rivers of Te Waipounamu, the South Island — some Ngāi Tahu certified. For New Zealand buyers only.</p><span className="cert">Ngāi Tahu certified</span></div>
            <div className="origin"><h3>Nephrite jade</h3><p>Canada, Wyoming and Guatemala — beautiful stone, lighter on the price, and shipped worldwide.</p></div>
            <div className="origin"><h3>Whalebone</h3><p>Carved for wearers in Aotearoa only — it may not leave the country.</p></div>
          </div>
        </div>
      </section>

      <section className="wrap band">
        <div className="row-head"><h2>One of a kind, ready to wear</h2><a href="#shop">See all pieces →</a></div>
        <div className="grid">{SHOP_ITEMS.slice(0, 3).map((i) => <PieceCard key={i.id} item={i} />)}</div>
      </section>

      <section className="alt">
        <div className="wrap band narrow">
          <h2>A certified carver</h2>
          <p className="lede">Kaleikiʻi is a certified carver. Pieces made from Ngāi Tahu certified pounamu carry the certification badge, so you know the stone's origin is authentic and respected.</p>
          <a className="btn primary" href="#commission">{t("ctaStart")}</a>
        </div>
      </section>
    </>
  );
}

export function CommissionPage() {
  return (
    <section className="wrap band">
      <PageHead eyebrow="Custom commission" title="Begin your commission"
        lede="Seven gentle steps. This is a request only — no payment is taken until your commission is personally reviewed and approved." />
      <Commission />
    </section>
  );
}

export function ShopPage() {
  return (
    <section className="wrap band">
      <PageHead eyebrow="Ready-made taonga" title="The shop" lede="Each piece is one of a kind and paid in full at checkout. Once it finds its home, it's marked sold." />
      <div className="grid">
        {SHOP_ITEMS.map((i) => (
          <div key={i.id} className="shop-card">
            <span className="avail">Available</span>
            <PieceCard item={i} />
            <p className="d">{materialLabel(i.material)} · {i.size}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ShopItemPage({ id }) {
  const item = SHOP_ITEMS.find((i) => i.id === id);
  if (!item) return <section className="wrap band"><p>That piece couldn't be found. <a href="#shop">Back to the shop</a></p></section>;
  return (
    <section className="wrap band">
      <a className="back" href="#shop">← The shop</a>
      <div className="item">
        <Photo name={item.photo} alt={item.title} shape={item.form === "hei_matau" ? "matau" : item.form} bone={item.bone} className="square" />
        <div className="prose">
          {item.certified && <span className="cert">Ngāi Tahu certified</span>}
          <h1>{item.title}</h1>
          <p className="item-price">{nzd(item.price)} <span>(approx. {usd(item.price)})</span></p>
          <dl className="specs">
            <div><dt>Form</dt><dd>{(FORMS.find((f) => f.key === item.form) || {}).label}</dd></div>
            <div><dt>Size</dt><dd>{item.size}</dd></div>
            <div><dt>Material</dt><dd>{materialLabel(item.material)}</dd></div>
            <div><dt>Stone origin</dt><dd>{item.origin}</dd></div>
          </dl>
          <p className="eyebrow">Meaning</p>
          <p>{item.meaning}</p>
          {isNzOnly(item.material) && <p className="warn">{item.material === "whalebone" ? "Whalebone" : "NZ pounamu"}: delivery or pickup within New Zealand only.</p>}
          <a className="btn primary" href={SETTINGS.instagramUrl} target="_blank" rel="noopener">Buy this piece</a>
        </div>
      </div>
    </section>
  );
}

export function GalleryPage() {
  return (
    <section className="wrap band">
      <PageHead eyebrow="Finished commissions" title="Taonga that found their people" lede="A selection of finished commissions, shared with the permission of the people who wear them." />
      <div className="empty">
        <Stone k="koru" />
        <p>The first finished pieces will appear here soon.</p>
        <a className="btn primary" href="#commission">Start your own commission</a>
      </div>
    </section>
  );
}

export function GiftPage() {
  const [amount, setAmount] = useState(200);
  const [g, setG] = useState({ fromName: "", fromEmail: "", toName: "", toEmail: "", message: "", copy: true, terms: false });
  const [msg, setMsg] = useState("");
  const set = (k) => (e) => setG({ ...g, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  const valid = amount >= SETTINGS.voucherMin && g.terms;
  const buy = () => {
    const text = ["Kaleikiʻi gift voucher", "Amount: " + nzd(amount), "From: " + g.fromName + " (" + g.fromEmail + ")",
      "To: " + g.toName + " (" + g.toEmail + ")", "Message: " + g.message, "Email me a copy: " + (g.copy ? "yes" : "no")].join("\n");
    copyText(text).then(() => setMsg("Your voucher details are copied. Send them to @kaleikii to complete payment."));
  };
  return (
    <section className="wrap band">
      <PageHead eyebrow="Gift a commission" title="A taonga for someone far away"
        lede="Send whānau and friends anywhere in the world a gift voucher towards a hand-carved commission. They choose the form, the stone and the story." />
      <div className="com-grid">
        <div className="com-main form-grid">
          <p className="eyebrow">Choose an amount</p>
          <div className="amounts">
            {SETTINGS.voucherAmounts.map((a) => (
              <button key={a} type="button" className={"amount" + (amount === a ? " on" : "")} aria-pressed={amount === a} onClick={() => setAmount(a)}>${a}</button>
            ))}
          </div>
          <Field2 id="gv-amt" label={"Or another amount (minimum $" + SETTINGS.voucherMin + " NZD)"}>
            <input id="gv-amt" type="number" min={SETTINGS.voucherMin} value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} />
          </Field2>
          <p className="eyebrow">From you</p>
          <div className="two">
            <Field2 id="gv-fn" label="Your name"><input id="gv-fn" value={g.fromName} onChange={set("fromName")} /></Field2>
            <Field2 id="gv-fe" label="Your email"><input id="gv-fe" type="email" value={g.fromEmail} onChange={set("fromEmail")} /></Field2>
          </div>
          <p className="eyebrow">To</p>
          <div className="two">
            <Field2 id="gv-tn" label="Their name"><input id="gv-tn" value={g.toName} onChange={set("toName")} /></Field2>
            <Field2 id="gv-te" label="Their email"><input id="gv-te" type="email" value={g.toEmail} onChange={set("toEmail")} /></Field2>
          </div>
          <Field2 id="gv-msg" label="Personal message (optional)"><textarea id="gv-msg" value={g.message} onChange={set("message")} /></Field2>
          <label className="check" htmlFor="gv-copy"><input id="gv-copy" type="checkbox" checked={g.copy} onChange={set("copy")} /> Email me a copy of the voucher</label>
          <label className="check" htmlFor="gv-terms"><input id="gv-terms" type="checkbox" checked={g.terms} onChange={set("terms")} /> I understand gift vouchers are non-refundable, valid for two years, and redeemable against custom commissions.</label>
          <button type="button" className="btn primary" disabled={!valid} onClick={buy}>Buy voucher · {nzd(amount)}</button>
          {amount < SETTINGS.voucherMin && <p className="warn">The minimum voucher is ${SETTINGS.voucherMin} NZD.</p>}
          {msg && <p className="ok-msg" role="status">{msg}</p>}
        </div>
        <aside className="summary voucher">
          <p className="f-brand">Kaleikiʻi</p>
          <p className="eyebrow">Gift a commission</p>
          <div className="price">{nzd(amount)}<small>≈ {usd(amount)}</small></div>
          <p className="eyebrow">How it works</p>
          <ol className="how">
            <li>You pay securely and we email the voucher, with your message, straight to them.</li>
            <li>They enter the code on the last step of the commission form.</li>
            <li>Its value comes off their payments until it's used up — valid for two years.</li>
          </ol>
        </aside>
      </div>
    </section>
  );
}

function Field2({ id, label, children }) {
  return <div className="field"><label htmlFor={id}>{label}</label>{children}</div>;
}

function FormCard({ f }) {
  return (
    <div className="meaning">
      {f.photo ? <Photo name={f.photo} alt={f.n} shape={f.k} className="thumb" /> : <div className="letter"><Stone k={f.k} /></div>}
      <div>
        <h3>{f.n}</h3>
        <p>{f.m}</p>
        <a href="#commission">Commission this form →</a>
      </div>
    </div>
  );
}

export function FormsPage() {
  return (
    <section className="wrap band">
      <PageHead eyebrow="Ngā āhua · Nā kinona" title="Forms & meanings" lede="Each form carries a meaning handed down through generations. Choose one that speaks to the person who will wear it." />
      <h2 className="sub">Māori forms</h2>
      <div className="meanings">{MAORI_FORMS.map((f) => <FormCard key={f.k} f={f} />)}</div>
      <h2 className="sub">Hawaiian forms</h2>
      <div className="meanings">{HAWAIIAN_FORMS.map((f) => <FormCard key={f.k} f={f} />)}</div>
    </section>
  );
}

export function AboutPage() {
  return (
    <section className="wrap band">
      <PageHead eyebrow="The carver" title="About Kaleikiʻi" lede="A certified carver working in Tāmaki Makaurau, carving taonga that connect Aotearoa and Hawaiʻi." />
      <div className="split">
        <div className="prose">
          <p>Kaleikiʻi began at the carving bench, learning to listen to the stone before shaping it. Each piece starts as a river-worn boulder or slab and is slowly ground, shaped and polished by hand until the form inside comes through.</p>
          <p>The work bridges two homes — Aotearoa and Hawaiʻi. You'll find Kaleikiʻi at craft fairs in Auckland and at the Merrie Monarch festival in Hilo, sharing pounamu with the wider Pacific family.</p>
          <p>Every commission is treated as a taonga in the making: the story you share shapes the form, the stone and the way the piece is finished.</p>
          <h2>Certification</h2>
          <p>Kaleikiʻi is a certified carver. Pieces made from Ngāi Tahu certified pounamu carry a certification badge on this site, confirming the stone was sourced with the blessing of Ngāi Tahu, kaitiaki of pounamu in Te Waipounamu.</p>
          <span className="cert">Ngāi Tahu certified</span>
        </div>
        <Photo name="hands" alt="Carving pounamu by hand" shape="toki" className="tall" />
      </div>
      <h2 className="sub">Where the stone comes from</h2>
      <div className="origins">
        <div className="origin"><h3>NZ pounamu</h3><p>From the South Island's West Coast rivers. Some stone is Ngāi Tahu certified; premium varieties include īnanga and kahurangi. NZ pounamu pieces are only delivered or handed over within New Zealand.</p></div>
        <div className="origin"><h3>Nephrite jade</h3><p>From Canada (British Columbia), Wyoming in the United States, and Guatemala. The same mineral family as pounamu, at a gentler price.</p></div>
        <div className="origin"><h3>Whalebone</h3><p>Carved from naturally sourced bone, and by law and tikanga it stays in Aotearoa. Whalebone pieces are only delivered or handed over within New Zealand.</p></div>
      </div>
      <a className="btn primary" href="#commission">Start a commission</a>
    </section>
  );
}

export function EventsPage() {
  return (
    <section className="wrap band">
      <PageHead eyebrow="Fairs & markets" title="Upcoming events" lede="Meet the carver, see the stone in person and talk through a commission." />
      <div className="events">
        {EVENTS.map((e) => (
          <div className="event" key={e.title}>
            <span className="when">{e.date}</span>
            <div><h3>{e.title}</h3><span className="where">{e.place}</span><p>{e.note}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FaqPage() {
  return (
    <section className="wrap band">
      <PageHead eyebrow="Good to know" title="FAQ & Terms" />
      <div className="faq">
        {FAQ.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>)}
      </div>
      <h2 className="sub">Terms</h2>
      <ol className="terms">{TERMS.map((x) => <li key={x}>{x}</li>)}</ol>
    </section>
  );
}

export function ContactPage() {
  const [c, setC] = useState({ name: "", email: "", subject: "", message: "" });
  const [msg, setMsg] = useState("");
  const set = (k) => (e) => setC({ ...c, [k]: e.target.value });
  const send = () => copyText("From: " + c.name + " (" + c.email + ")\nSubject: " + c.subject + "\n\n" + c.message)
    .then(() => setMsg("Your message is copied. Paste it into the Instagram message that opens."));
  return (
    <section className="wrap band">
      <PageHead eyebrow="Kōrero mai" title="Contact" lede="Questions about a piece, a commission or an event? Send a message and you'll hear back personally." />
      <div className="split">
        <div className="form-grid">
          <div className="two">
            <Field2 id="ct-name" label="Full name"><input id="ct-name" value={c.name} onChange={set("name")} autoComplete="name" /></Field2>
            <Field2 id="ct-email" label="Email"><input id="ct-email" type="email" value={c.email} onChange={set("email")} autoComplete="email" /></Field2>
          </div>
          <Field2 id="ct-subj" label="Subject"><input id="ct-subj" value={c.subject} onChange={set("subject")} /></Field2>
          <Field2 id="ct-msg" label="Message"><textarea id="ct-msg" value={c.message} onChange={set("message")} /></Field2>
          <a className="btn primary" href={SETTINGS.instagramUrl} target="_blank" rel="noopener" onClick={send}>Send message</a>
          {msg && <p className="ok-msg" role="status">{msg}</p>}
        </div>
        <div className="prose contact-side">
          <h3>Tāmaki Makaurau · Auckland</h3>
          <p>Free pickup or handover in Auckland CBD or the North Shore, arranged by message once ready.</p>
          <p>Instagram: <a href={SETTINGS.instagramUrl} target="_blank" rel="noopener">@kaleikii</a></p>
        </div>
      </div>
    </section>
  );
}
