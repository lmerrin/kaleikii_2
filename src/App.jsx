import { useEffect, useState } from "react";
import { Gradients } from "./components/Stone";
import { I18N } from "./data/i18n";
import { SETTINGS } from "./data/settings";
import {
  HomePage, CommissionPage, ShopPage, ShopItemPage, GalleryPage, GiftPage,
  FormsPage, AboutPage, EventsPage, FaqPage, ContactPage,
} from "./pages/Pages";

const NAV = [
  ["commission", "navCommission"], ["shop", "navShop"], ["gallery", "navGallery"], ["gift", "navGift"],
  ["forms", "navForms"], ["about", "navAbout"], ["events", "navEvents"], ["faq", "navFaq"], ["contact", "navContact"],
];

function readHash() {
  const h = (window.location.hash || "").replace(/^#/, "");
  return h || "home";
}
function readLang() {
  try {
    const v = localStorage.getItem("kk-lang");
    if (v === "en" || v === "mi" || v === "haw") return v;
  } catch (e) { /* storage unavailable */ }
  return "en";
}

export default function App() {
  const [route, setRoute] = useState(readHash);
  const [lang, setLang] = useState(readLang);
  const [menu, setMenu] = useState(false);
  const t = (k) => I18N[lang][k] || I18N.en[k] || k;

  useEffect(() => {
    const on = () => { setRoute(readHash()); setMenu(false); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("kk-lang", lang); } catch (e) { /* ignore */ }
  }, [lang]);

  let page;
  if (route.startsWith("item-")) page = <ShopItemPage id={route.slice(5)} />;
  else page = {
    commission: <CommissionPage />, shop: <ShopPage />, gallery: <GalleryPage />, gift: <GiftPage />,
    forms: <FormsPage />, about: <AboutPage />, events: <EventsPage />, faq: <FaqPage />, contact: <ContactPage />,
  }[route] || <HomePage t={t} />;

  const active = route.startsWith("item-") ? "shop" : route;

  return (
    <>
      <Gradients />
      <a className="skip" href="#main-content" onClick={(e) => { e.preventDefault(); document.getElementById("main-content").focus(); }}>Skip to content</a>
      <header className="top">
        <div className="wrap bar">
          <a className="brand" href="#home">Kaleikiʻi <span>Carver</span></a>
          <nav className={"links" + (menu ? " open" : "")} aria-label="Main">
            {NAV.map(([r, k]) => <a key={r} href={"#" + r} aria-current={active === r ? "page" : undefined}>{t(k)}</a>)}
          </nav>
          <div className="lang" role="group" aria-label="Language">
            {["en", "mi", "haw"].map((l) => (
              <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
            ))}
          </div>
          <button type="button" className="menu-btn" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? "Close" : "Menu"}</button>
        </div>
        {lang !== "en" && <div className="draftnote">Draft translation of menus and headings, still to be checked by a fluent speaker.</div>}
      </header>

      <main id="main-content" tabIndex={-1}>{page}</main>

      <footer>
        <div className="wrap foot">
          <div>
            <p className="f-brand">Kaleikiʻi <span>Carver</span></p>
            <p>Hand-carved pounamu, jade and bone taonga from Tāmaki Makaurau, Auckland. Shipping worldwide; whalebone within Aotearoa only.</p>
            <p className="cert">Certified carver</p>
          </div>
          <nav aria-label="Footer">{NAV.map(([r, k]) => <a key={r} href={"#" + r}>{t(k)}</a>)}</nav>
          <div>
            <p><a href={SETTINGS.instagramUrl} target="_blank" rel="noopener">@kaleikii</a></p>
            <p>Tāmaki Makaurau · Auckland, Aotearoa</p>
          </div>
        </div>
        <div className="wrap copy">© 2026 Kaleikiʻi. Ngā mihi · Mahalo nui.</div>
      </footer>
    </>
  );
}
