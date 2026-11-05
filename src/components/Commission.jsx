import { useState } from "react";
import {
  CATEGORIES, FORMS, SIZE_GROUPS, MATERIALS, PLAITS, COUNTRIES, NZ,
  nzd, usd, sizeGroupFor, hasPlait, timeframe, estimate, shippingFee, materialLabel, isNzOnly,
} from "../data/pricing";
import { SETTINGS } from "../data/settings";
import { copyText } from "./Stone";

function Choice({ name, value, current, onPick, title, sub, aside, disabled, badge }) {
  const id = name + "-" + value;
  return (
    <div className="choice">
      <input type="radio" id={id} name={name} checked={current === value} disabled={disabled} onChange={() => onPick(value)} />
      <label htmlFor={id}>
        <span className="choice-main">
          <b>{title}</b>
          {badge && <span className="cert">{badge}</span>}
          {sub && <small>{sub}</small>}
        </span>
        {aside && <span className="choice-aside">{aside}</span>}
      </label>
    </div>
  );
}

function Field({ id, label, children }) {
  return <div className="field"><label htmlFor={id}>{label}</label>{children}</div>;
}

function ConsentNote() {
  return <p className="note">Every commission is personally reviewed. Kaleikiʻi reserves the right to decline any commission that is not in alignment with its values.</p>;
}

function SendPanel({ summary, label }) {
  const [msg, setMsg] = useState("");
  const href = SETTINGS.requestFormUrl || SETTINGS.instagramUrl;
  const send = () => copyText(summary).then((ok) =>
    setMsg(ok ? "Your request is copied. Paste it into the message that opens." : "Select and copy your details, then send them to @kaleikii."));
  return (
    <>
      <a className="btn primary" href={href} target="_blank" rel="noopener" onClick={send}>{label}</a>
      {msg && <p className="ok-msg" role="status">{msg}</p>}
    </>
  );
}

export function SculpturalInquiry({ onBack }) {
  const [f, setF] = useState({ desc: "", size: "", material: "Not sure yet", use: "", when: "", country: NZ, name: "", email: "", gallery: false });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  const summary = [
    "Kaleikiʻi sculptural inquiry", "Description: " + f.desc, "Approximate size: " + f.size, "Preferred material: " + f.material,
    "Intended use or location: " + f.use, "Timeframe: " + f.when, "Delivering to: " + f.country,
    "Name: " + f.name, "Email: " + f.email, "Gallery photos OK: " + (f.gallery ? "yes" : "no"),
  ].join("\n");
  return (
    <div className="inquiry">
      <p className="eyebrow">Sculptural piece</p>
      <h2>Tell me about your sculptural piece</h2>
      <p className="lede"><b>Every sculptural piece is quoted individually.</b> Share your idea and I'll be in touch with questions and a quote. Nothing is paid until you approve the quote; then payments are 40% to start, 30% at a midway check and 30% on completion.</p>
      <div className="form-grid">
        <Field id="sq-desc" label="Description of the piece"><textarea id="sq-desc" value={f.desc} onChange={set("desc")} placeholder="What would you like carved? Form, feeling, story…" /></Field>
        <div className="two">
          <Field id="sq-size" label="Approximate size"><input id="sq-size" value={f.size} onChange={set("size")} placeholder="e.g. around 30cm tall" /></Field>
          <Field id="sq-mat" label="Preferred material">
            <select id="sq-mat" value={f.material} onChange={set("material")}>
              <option>Not sure yet</option>
              {MATERIALS.filter((m) => f.country === NZ || !m.nzOnly).map((m) => <option key={m.key}>{m.label}</option>)}
            </select>
          </Field>
        </div>
        <div className="two">
          <Field id="sq-use" label="Intended use or location"><input id="sq-use" value={f.use} onChange={set("use")} placeholder="e.g. for a marae entrance, a home, a gift" /></Field>
          <Field id="sq-when" label="Timeframe"><input id="sq-when" value={f.when} onChange={set("when")} placeholder="e.g. by mid next year" /></Field>
        </div>
        <Field id="sq-country" label="Delivering to">
          <select id="sq-country" value={f.country} onChange={(e) => {
            const country = e.target.value;
            const picked = MATERIALS.find((m) => m.label === f.material);
            setF({ ...f, country, material: country !== NZ && picked && picked.nzOnly ? "Not sure yet" : f.material });
          }}>{COUNTRIES.map((c) => <option key={c}>{c}</option>)}</select>
        </Field>
        <Field id="sq-img" label="Images (optional)"><input id="sq-img" type="file" accept="image/*" multiple /></Field>
        <div className="two">
          <Field id="sq-name" label="Full name"><input id="sq-name" value={f.name} onChange={set("name")} autoComplete="name" /></Field>
          <Field id="sq-email" label="Email"><input id="sq-email" type="email" value={f.email} onChange={set("email")} autoComplete="email" /></Field>
        </div>
        <label className="check" htmlFor="sq-gallery"><input id="sq-gallery" type="checkbox" checked={f.gallery} onChange={set("gallery")} /> I'm happy for photos of my finished piece to be shared in the Kaleikiʻi gallery (no names or personal details).</label>
      </div>
      <ConsentNote />
      <div className="nav-btns">
        <button type="button" className="btn ghost" onClick={onBack}>Back</button>
        <SendPanel summary={summary} label="Send my inquiry" />
      </div>
    </div>
  );
}

const EMPTY = { category: null, form: null, size: null, material: null, plait: null, country: NZ, delivery: null, address: "" };

export default function Commission() {
  const [s, setS] = useState(EMPTY);
  const [step, setStep] = useState(0);
  const [d, setD] = useState({ who: "", occasion: "", meaning: "", extra: "", name: "", email: "", phone: "", voucher: "", gallery: false });
  const [voucherMsg, setVoucherMsg] = useState("");
  const full = SETTINGS.openCommissions >= SETTINGS.capacity;

  const update = (patch) => setS((prev) => {
    const next = { ...prev, ...patch };
    if (next.country !== NZ && isNzOnly(next.material)) next.material = null;
    if (next.country !== NZ && next.delivery === "pickup") next.delivery = "ship";
    return next;
  });

  if (s.category === "sculptural") return <SculpturalInquiry onBack={() => { setS(EMPTY); setStep(0); }} />;

  // Steps that apply to this selection
  const steps = ["category"];
  if (s.category === "standard") steps.push("form");
  if (s.category === "standard" || s.category === "tiki") steps.push("size");
  steps.push("material");
  if (hasPlait(s)) steps.push("plait");
  steps.push("delivery", "details");
  const current = steps[Math.min(step, steps.length - 1)];

  const group = sizeGroupFor(s);
  const done = {
    category: !!s.category, form: !!s.form, size: !!s.size, material: !!s.material, plait: !!s.plait,
    delivery: !!s.delivery && (s.delivery === "pickup" || s.address.trim().length > 3), details: true,
  };
  const est = estimate(s);
  const subtotalForShip = est && !est.quote ? est.total - (est.shipping || 0) : 0;
  const ship = shippingFee(s, subtotalForShip);
  const formLabel = s.category === "tiki" ? "Hei tiki" : (FORMS.find((x) => x.key === s.form) || {}).label;
  const sizeObj = group && SIZE_GROUPS[group].find((x) => x.key === s.size);

  const setDf = (k) => (e) => setD({ ...d, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const summary = [
    "Kaleikiʻi commission request",
    "Category: " + (CATEGORIES.find((c) => c.key === s.category) || {}).label,
    formLabel ? "Form: " + formLabel : null,
    sizeObj ? "Size: " + sizeObj.key + " · " + sizeObj.label : null,
    s.material ? "Material: " + materialLabel(s.material) : null,
    hasPlait(s) && s.plait ? "Plait: " + PLAITS.find((p) => p.key === s.plait).label : null,
    "Delivery: " + (s.delivery === "pickup" ? "Pickup in Auckland" : "Ship to " + s.country) + (s.address ? " · " + s.address : ""),
    "Estimate: " + (!est ? "—" : est.quote ? "Quote on request" : (est.isFrom ? "from " : "") + nzd(est.total)),
    "For: " + d.who, "Occasion: " + d.occasion, "Meaning: " + d.meaning, d.extra ? "Anything else: " + d.extra : null,
    "Name: " + d.name, "Email: " + d.email, d.phone ? "Phone: " + d.phone : null,
    d.voucher ? "Gift voucher: " + d.voucher : null, "Gallery photos OK: " + (d.gallery ? "yes" : "no"),
  ].filter(Boolean).join("\n");

  const titles = { category: "Choose a category", form: "Choose a form", size: "Choose a size", material: "Choose a material",
    plait: "Choose a necklace plait", delivery: "Delivery", details: "Who it's for & your details" };

  return (
    <div className="com-grid">
      <div className="com-main">
        {full && <div className="warn">The bench is full right now (10 open commissions). Join the waitlist on Instagram and you'll hear when a spot opens.</div>}
        <p className="step-count">Step {steps.indexOf(current) + 1} of {steps.length}</p>
        <h3 className="step-title">{titles[current]}</h3>

        {current === "category" && (
          <div className="choices">
            {CATEGORIES.map((c) => <Choice key={c.key} name="cat" value={c.key} current={s.category} title={c.label} sub={c.sub}
              onPick={(v) => update({ category: v, form: v === "tiki" ? "hei_tiki" : null, size: null })} />)}
          </div>
        )}
        {current === "form" && (
          <div className="choices cols">
            {FORMS.map((x) => <Choice key={x.key} name="form" value={x.key} current={s.form} title={x.label}
              onPick={(v) => update({ form: v, size: null, plait: v === "earrings" ? null : s.plait })} />)}
          </div>
        )}
        {current === "size" && group && (
          <div className="choices">
            {SIZE_GROUPS[group].map((z) => <Choice key={z.key} name="size" value={z.key} current={s.size} title={z.key + " · " + z.label}
              aside={z.quoteOnly ? "Quote on request" : (z.isFrom ? "from " : "") + nzd(z.price)} onPick={(v) => update({ size: v })} />)}
          </div>
        )}
        {current === "material" && (
          <>
            <Field id="cm-country" label="Delivering to">
              <select id="cm-country" value={s.country} onChange={(e) => update({ country: e.target.value })}>
                {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            {s.country !== NZ && <p className="warn">NZ pounamu and whalebone stay in Aotearoa and are only available to New Zealand buyers. Overseas pieces are carved in nephrite jade from Canada, Wyoming or Guatemala.</p>}
            <div className="choices">
              {MATERIALS.map((m) => <Choice key={m.key} name="mat" value={m.key} current={s.material} title={m.label}
                badge={m.certified ? "Ngāi Tahu certified" : null}
                sub={m.nzOnly ? (s.country === NZ ? "Aotearoa New Zealand only" : "Available to New Zealand buyers only") : null}
                disabled={m.nzOnly && s.country !== NZ}
                aside={(m.isFrom ? "from " : "") + "+" + m.pct + "%"} onPick={(v) => update({ material: v })} />)}
            </div>
          </>
        )}
        {current === "plait" && (
          <div className="choices">
            {PLAITS.map((p) => <Choice key={p.key} name="plait" value={p.key} current={s.plait} title={p.label}
              aside={p.price ? "+" + nzd(p.price) : "Included"} onPick={(v) => update({ plait: v })} />)}
          </div>
        )}
        {current === "delivery" && (
          <>
            <Field id="cm-country2" label="Delivery country">
              <select id="cm-country2" value={s.country} onChange={(e) => update({ country: e.target.value })}>
                {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <div className="choices">
              {s.country === NZ ? (
                <>
                  <Choice name="del" value="ship" current={s.delivery} title="Tracked shipping within NZ" aside={"Free over $" + SETTINGS.nzFreeThreshold + ", otherwise $" + SETTINGS.nzShippingFee} onPick={(v) => update({ delivery: v })} />
                  <Choice name="del" value="pickup" current={s.delivery} title="Pickup in Auckland" sub="CBD or North Shore, arranged by message" aside="Free" onPick={(v) => update({ delivery: v })} />
                </>
              ) : (
                <Choice name="del" value="ship" current={s.delivery} title="International shipping" sub="Tracked and insured" aside={"$" + SETTINGS.intlShippingFee + " NZD"} onPick={(v) => update({ delivery: v })} />
              )}
            </div>
            {s.delivery !== "pickup" && (
              <Field id="cm-addr" label="Delivery address">
                <textarea id="cm-addr" value={s.address} onChange={(e) => update({ address: e.target.value })} />
              </Field>
            )}
            {s.delivery && <p className="note">Shipping: {ship === 0 ? "Free" : ship != null ? nzd(ship) : "—"}</p>}
          </>
        )}
        {current === "details" && (
          <div className="form-grid">
            <div className="two">
              <Field id="cd-who" label="Who is it for?"><input id="cd-who" value={d.who} onChange={setDf("who")} /></Field>
              <Field id="cd-occ" label="The occasion"><input id="cd-occ" value={d.occasion} onChange={setDf("occasion")} /></Field>
            </div>
            <Field id="cd-mean" label="The meaning it should carry"><textarea id="cd-mean" value={d.meaning} onChange={setDf("meaning")} /></Field>
            <Field id="cd-extra" label="Anything else (optional)"><textarea id="cd-extra" value={d.extra} onChange={setDf("extra")} /></Field>
            <Field id="cd-img" label="Inspiration images (optional)"><input id="cd-img" type="file" accept="image/*" multiple /></Field>
            <div className="two">
              <Field id="cd-name" label="Full name"><input id="cd-name" value={d.name} onChange={setDf("name")} autoComplete="name" /></Field>
              <Field id="cd-email" label="Email"><input id="cd-email" type="email" value={d.email} onChange={setDf("email")} autoComplete="email" /></Field>
            </div>
            <div className="two">
              <Field id="cd-phone" label="Phone (optional)"><input id="cd-phone" value={d.phone} onChange={setDf("phone")} autoComplete="tel" /></Field>
              <Field id="cd-voucher" label="Gift voucher code (optional)">
                <div className="inline">
                  <input id="cd-voucher" value={d.voucher} onChange={setDf("voucher")} placeholder="KK-XXXX-XXXX" />
                  <button type="button" className="btn ghost small" onClick={() => setVoucherMsg(/^KK-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(d.voucher.trim())
                    ? "Code noted. It comes off your payments once your request is approved."
                    : "Check the code. It looks like KK-XXXX-XXXX.")}>Apply</button>
                </div>
              </Field>
            </div>
            {voucherMsg && <p className="note" role="status">{voucherMsg}</p>}
            <label className="check" htmlFor="cd-gallery"><input id="cd-gallery" type="checkbox" checked={d.gallery} onChange={setDf("gallery")} /> I'm happy for photos of my finished piece to be shared in the Kaleikiʻi gallery (no names or personal details).</label>
            <ConsentNote />
          </div>
        )}

        <div className="nav-btns">
          {step > 0 && <button type="button" className="btn ghost" onClick={() => setStep(steps.indexOf(current) - 1)}>Back</button>}
          {current !== "details"
            ? <button type="button" className="btn primary" disabled={!done[current]} onClick={() => setStep(steps.indexOf(current) + 1)}>Continue</button>
            : <SendPanel summary={summary} label="Send my request" />}
        </div>
      </div>

      <aside className="summary" aria-live="polite">
        <p className="eyebrow">Your estimate</p>
        <div className="price">
          {!est ? "—" : est.quote ? "Quote on request" : <>{est.isFrom ? "From " : "Estimated "}{nzd(est.total)}<small>≈ {usd(est.total)} · deposit {nzd(est.total * SETTINGS.depositPct / 100)}</small></>}
        </div>
        <p className="note">Timeframe: {timeframe(s)}</p>
        <div className="lines">
          <div><span>Category</span><span>{(CATEGORIES.find((c) => c.key === s.category) || {}).label || "—"}</span></div>
          <div><span>Form</span><span>{formLabel || "—"}</span></div>
          <div><span>Size</span><span>{sizeObj ? sizeObj.key + " · " + sizeObj.label : "—"}</span></div>
          <div><span>Material</span><span>{s.material ? materialLabel(s.material) : "—"}</span></div>
          {hasPlait(s) && <div><span>Plait</span><span>{s.plait ? PLAITS.find((p) => p.key === s.plait).label : "—"}</span></div>}
          <div><span>Shipping</span><span>{ship === 0 ? "Free" : ship != null ? nzd(ship) : "—"}</span></div>
        </div>
        <p className="note">Final price is confirmed when your request is approved. 50% non-refundable deposit on approval; the balance is paid once you've seen photos of the finished piece.</p>
      </aside>
    </div>
  );
}
